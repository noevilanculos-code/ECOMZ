import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/assets', express.static(path.join(process.cwd(), 'assets')));

// Lazy-initialization of GoogleGenAI client with required User-Agent
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// System instructions per chatbot persona
const ROLE_SYSTEM_INSTRUCTIONS: Record<string, string> = {
  fiscal: `Você é o Fiscal Ambiental Sénior do sistema ECO-MZ 360 em Moçambique.
Especialidade: Aplicação rigorosa da Lei do Ambiente (Lei n.º 20/97), Regulamento de Florestas e Fauna Bravia (Decreto n.º 12/2002), combate ao corte ilegal de madeira nativa, caça furtiva, crimes contra mangais e poluição hídrica.
Postura: Técnico, autoritativo, orientador e prático. Indique sempre os procedimentos legais, canais de denúncia da AQUA (Agência Nacional para o Controlo da Qualidade Ambiental) e medidas imediatas.`,

  gestor: `Você é o Gestor de Conservação e Projetos Ecológicos do ECO-MZ 360.
Especialidade: Restauração de ecossistemas (Miombo, mangais costeiros), metas de plantio de árvores, envolvimento comunitário, gestão de voluntariado e auditoria para o Selo Verde Moçambique.
Postura: Estratégico, analítico, focado em impacto sustentável e métricas ecológicas mensuráveis.`,

  cientista: `Você é o Biólogo Marinho e Cientista Climático do ECO-MZ 360.
Especialidade: Biodiversidade moçambicana, modelação de impacto de ciclones (Idai, Kenneth, Freddy), monitoramento costeiro do Canal de Moçambique, resiliência climática e oceanografia.
Postura: Científico, didático, citando evidências empíricas e terminologias botânicas e ecológicas precisas.`,

  comunitario: `Você é o Facilitador Comunitário e Articulador Local do ECO-MZ 360.
Especialidade: Sensibilização das comunidades rurais e costeiras, machambas sustentáveis, prevenção comunitária de queimadas descontroladas, comités de gestão de recursos naturais (CGRN) e alertas meteorológicos antecipados em línguas locais e português.
Postura: Acessível, empático, encorajador e focado em soluções práticas para os cidadãos.`
};

// API: Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString()
  });
});

// API: Multi-turn Chatbot with Gemini, Role System Instruction, Search & Maps Grounding
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const {
      messages = [],
      message,
      model = 'gemini-3.5-flash',
      role = 'fiscal',
      grounding = 'none', // 'none' | 'search' | 'maps'
      location = { latitude: -18.665695, longitude: 35.529562 } // Centro de Moçambique
    } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Mensagem do utilizador é obrigatória.' });
    }

    const ai = getGeminiClient();

    // System instruction for the selected role
    const systemInstruction =
      ROLE_SYSTEM_INSTRUCTIONS[role] || ROLE_SYSTEM_INSTRUCTIONS.fiscal;

    // Fallback if no API key is provided
    if (!ai) {
      return res.json({
        text: `[Modo Informativo Local]\nRecebi a sua questão sobre: "${message}".\n\n` +
          `Para ativar as respostas dinâmicas em tempo real com os modelos Gemini (` +
          `${model}), Pesquisa Google e Google Maps em direto, adicione a sua chave no painel **Settings > Secrets** (variável \`GEMINI_API_KEY\`).\n\n` +
          `Orientação rápida com base na Lei n.º 20/97: Todos os cidadãos têm direito a viver num ambiente equilibrado e o dever de denunciar atos de degradação como queimadas ou abate de mangal às autoridades competentes (AQUA / DINAB).`,
        groundingSources: [],
        modelUsed: 'local-fallback',
        isFallback: true
      });
    }

    // Determine model to use
    // If search or maps grounding is requested, gemini-3.5-flash is required
    let targetModel = model;
    if (grounding === 'search' || grounding === 'maps') {
      targetModel = 'gemini-3.5-flash';
    } else if (model === 'fast') {
      targetModel = 'gemini-3.1-flash-lite';
    } else if (model === 'complex') {
      targetModel = 'gemini-3.1-pro-preview';
    } else if (!['gemini-3.5-flash', 'gemini-3.1-pro-preview', 'gemini-3.1-flash-lite'].includes(targetModel)) {
      targetModel = 'gemini-3.5-flash';
    }

    // Assemble conversation history into Gemini format
    // Map previous turns: { role: 'user' | 'model', parts: [{ text: ... }] }
    const contents: any[] = [];

    if (Array.isArray(messages)) {
      for (const turn of messages) {
        if (turn.content && (turn.role === 'user' || turn.role === 'model')) {
          contents.push({
            role: turn.role,
            parts: [{ text: turn.content }]
          });
        }
      }
    }

    // Append current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Build model config
    const config: any = {
      systemInstruction
    };

    // Configure Grounding Tools
    if (grounding === 'search') {
      config.tools = [{ googleSearch: {} }];
    } else if (grounding === 'maps') {
      config.tools = [{ googleMaps: {} }];
      config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: Number(location.latitude) || -18.665695,
            longitude: Number(location.longitude) || 35.529562
          }
        }
      };
    }

    let response;
    try {
      response = await ai.models.generateContent({
        model: targetModel,
        contents,
        config
      });
    } catch (apiError: any) {
      const errMsg = apiError.message || String(apiError);
      console.warn('Tentativa com Gemini resultou em erro:', errMsg);

      // If failed with 429 quota exhaustion or grounding tool failure, attempt fallback without tools
      if (config.tools && (errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('quota'))) {
        console.info('Tentando chamada alternativa sem ferramentas de grounding devido a limites de quota...');
        const fallbackConfig = { systemInstruction };
        try {
          response = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents,
            config: fallbackConfig
          });
        } catch (innerError) {
          throw apiError; // Throw original if even fallback fails
        }
      } else {
        throw apiError;
      }
    }

    const responseText = response.text || 'Sem resposta de texto gerada.';

    // Extract Grounding Chunks (Web Search & Google Maps links)
    const groundingSources: Array<{
      type: 'web' | 'maps';
      title: string;
      uri: string;
      snippet?: string;
    }> = [];

    const candidate = response.candidates?.[0];
    const chunks = candidate?.groundingMetadata?.groundingChunks;

    if (Array.isArray(chunks)) {
      for (const chunk of chunks) {
        // Web Search Grounding
        if (chunk.web?.uri) {
          groundingSources.push({
            type: 'web',
            title: chunk.web.title || 'Fonte Web (Google Search)',
            uri: chunk.web.uri
          });
        }
        // Google Maps Grounding
        if (chunk.maps?.uri) {
          groundingSources.push({
            type: 'maps',
            title: chunk.maps.title || 'Localização no Google Maps',
            uri: chunk.maps.uri,
            snippet: chunk.maps.placeAnswerSources?.reviewSnippets?.[0]
          });
        }
      }
    }

    const searchQueries = candidate?.groundingMetadata?.webSearchQueries || [];

    res.json({
      text: responseText,
      groundingSources,
      searchQueries,
      modelUsed: targetModel,
      roleUsed: role,
      groundingUsed: grounding
    });

  } catch (error: any) {
    console.error('Erro na chamada Gemini:', error);
    const errMsg = error.message || String(error);
    const isQuotaExceeded = errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED');

    if (isQuotaExceeded) {
      return res.status(200).json({
        text: `[Aviso de Quota da API Gemini]\nO limite temporário de requisições para a ferramenta externa foi atingido na chave atual. Se desejar maior capacidade, pode configurar uma chave faturada no menu **Settings > Secrets**.\n\n` +
          `Orientação rápida do sistema ECO-MZ 360:\n` +
          `• **Avisos Meteorológicos Oficiais:** Consulte o Instituto Nacional de Meteorologia de Moçambique (INAM).\n` +
          `• **Apoio a Desastres e Ciclones:** Contacte a Linha Verde do INGD pelo 800 112 112 (gratuita).\n` +
          `• **Fiscalização Ambiental:** Contacte as brigadas provinciais da AQUA ou a Polícia de Proteção Ambiental.`,
        groundingSources: [
          { type: 'web', title: 'Instituto Nacional de Meteorologia (INAM)', uri: 'https://www.inam.gov.mz' },
          { type: 'web', title: 'Instituto Nacional de Gestão de Desastres (INGD)', uri: 'https://www.ingd.gov.mz' }
        ],
        searchQueries: ['INAM Moçambique', 'INGD Moçambique'],
        modelUsed: 'gemini-fallback',
        isFallback: true
      });
    }

    res.status(500).json({
      error: 'Falha ao processar resposta com o Gemini.',
      details: errMsg
    });
  }
});

// Vite Middleware & Static Serving setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Express v5 wildcard route
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ECO-MZ 360 Full-Stack Server rodando na porta ${PORT}`);
  });
}

startServer();
