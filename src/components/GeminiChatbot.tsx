import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Search,
  MapPin,
  ExternalLink,
  Shield,
  TreePine,
  Microscope,
  Users,
  Zap,
  Brain,
  Layers,
  Trash2,
  Copy,
  Check,
  RefreshCw,
  Info,
  Map
} from 'lucide-react';

export type ChatRole = 'fiscal' | 'gestor' | 'cientista' | 'comunitario';
export type ChatModel = 'gemini-3.5-flash' | 'gemini-3.1-pro-preview' | 'gemini-3.1-flash-lite';
export type GroundingMode = 'none' | 'search' | 'maps';

interface GroundingSource {
  type: 'web' | 'maps';
  title: string;
  uri: string;
  snippet?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  roleUsed?: ChatRole;
  modelUsed?: string;
  groundingUsed?: GroundingMode;
  groundingSources?: GroundingSource[];
  searchQueries?: string[];
  isFallback?: boolean;
}

const PROVINCE_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'Maputo Cidade': { lat: -25.9692, lng: 32.5732 },
  'Maputo Província': { lat: -25.6667, lng: 32.3333 },
  'Gaza': { lat: -25.0444, lng: 33.6444 },
  'Inhambane': { lat: -23.8650, lng: 35.3833 },
  'Sofala (Beira)': { lat: -19.8436, lng: 34.8389 },
  'Manica': { lat: -18.9333, lng: 32.8833 },
  'Tete': { lat: -16.1564, lng: 33.5863 },
  'Zambézia (Quelimane)': { lat: -17.8786, lng: 36.8883 },
  'Nampula': { lat: -15.1165, lng: 39.2666 },
  'Niassa': { lat: -13.3125, lng: 35.2406 },
  'Cabo Delgado (Pemba)': { lat: -12.9732, lng: 40.5178 }
};

interface GeminiChatbotProps {
  embedded?: boolean;
}

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({ embedded = false }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Saudações! Sou o assistente de inteligência ambiental do ECO-MZ 360, impulsionado pelos modelos Google Gemini com suporte a pesquisa web em tempo real (Google Search) e mapeamento geoespacial (Google Maps).\n\nPosso atuar com diferentes perfis: Fiscalização da Lei n.º 20/97, Gestão de Conservação, Ciência Climática ou Apoio Comunitário.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      roleUsed: 'fiscal',
      modelUsed: 'gemini-3.5-flash',
      groundingUsed: 'none'
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<ChatRole>('fiscal');
  const [selectedModel, setSelectedModel] = useState<ChatModel>('gemini-3.5-flash');
  const [groundingMode, setGroundingMode] = useState<GroundingMode>('none');
  const [selectedProvince, setSelectedProvince] = useState<string>('Sofala (Beira)');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const roleConfigs: Record<
    ChatRole,
    { label: string; icon: React.ComponentType<{ className?: string }>; desc: string; color: string }
  > = {
    fiscal: {
      label: 'Fiscal Ambiental',
      icon: Shield,
      desc: 'Lei n.º 20/97, crimes ecológicos, sanções e denúncias AQUA',
      color: 'border-emerald-500 bg-emerald-50 text-emerald-800'
    },
    gestor: {
      label: 'Gestor de Conservação',
      icon: TreePine,
      desc: 'Restauração de mangais, metas florestais e Selo Verde',
      color: 'border-blue-500 bg-blue-50 text-blue-800'
    },
    cientista: {
      label: 'Cientista Climático',
      icon: Microscope,
      desc: 'Biodiversidade, modelação de ciclones e dados marinhos',
      color: 'border-purple-500 bg-purple-50 text-purple-800'
    },
    comunitario: {
      label: 'Apoio Comunitário',
      icon: Users,
      desc: 'Prevenção de queimadas, machambas e alertas em línguas locais',
      color: 'border-amber-500 bg-amber-50 text-amber-800'
    }
  };

  const quickPromptsByRole: Record<ChatRole, string[]> = {
    fiscal: [
      'Quais as sanções previstas na Lei 20/97 para corte e transporte ilegal de madeira nativa?',
      'Como funciona o procedimento de auto de notícia emitido pela fiscalização da AQUA?',
      'Quais são os requisitos legais para o abate de mangais em Moçambique?'
    ],
    gestor: [
      'Qual o plano recomendado para restauração de 50 hectares de mangal degradado na Beira?',
      'Como estruturar uma auditoria comunitária para obtenção do Selo Verde Moçambique?',
      'Quais espécies nativas do Miombo têm maior taxa de sobrevivência em reflorestamento?'
    ],
    cientista: [
      'Quais foram os impactos ecológicos acumulados dos ciclones Idai e Freddy no Canal de Moçambique?',
      'Como a salinização dos solos agrícolas pode ser mitigada em áreas costeiras de Sofala?',
      'Buscar dados atualizados sobre o estado de conservação do Dugongo em Inhambane'
    ],
    comunitario: [
      'Como organizar uma brigada comunitária voluntária de prevenção a queimadas descontroladas?',
      'Quais as boas práticas para criar aceiros de proteção ao redor das machambas?',
      'Quais são os sinais naturais que alertam para a chegada de tempestades tropicais severas?'
    ]
  };

  const handleSend = async (overridePrompt?: string) => {
    const textToSend = overridePrompt || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!overridePrompt) setInput('');
    setLoading(true);

    try {
      // Build conversation history to maintain multi-turn context
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome-1')
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          content: m.text
        }));

      const provinceCoords = PROVINCE_COORDINATES[selectedProvince] || { lat: -18.665695, lng: 35.529562 };

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyPayload,
          message: textToSend.trim(),
          model: selectedModel,
          role: selectedRole,
          grounding: groundingMode,
          location: {
            latitude: provinceCoords.lat,
            longitude: provinceCoords.lng
          }
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.details || data.error || 'Erro ao processar mensagem com Gemini');
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.text || 'Sem resposta de texto disponível.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        roleUsed: selectedRole,
        modelUsed: data.modelUsed || selectedModel,
        groundingUsed: data.groundingUsed || groundingMode,
        groundingSources: data.groundingSources || [],
        searchQueries: data.searchQueries || [],
        isFallback: Boolean(data.isFallback)
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Erro na resposta do assistente:', err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'bot',
        text: `Não foi possível obter resposta do servidor: ${err.message}. Verifique a conexão ou adicione a sua chave no painel Settings > Secrets.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        roleUsed: selectedRole,
        modelUsed: selectedModel,
        groundingUsed: groundingMode,
        isFallback: true
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    if (window.confirm('Deseja limpar todo o histórico da conversa atual?')) {
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          sender: 'bot',
          text: 'Histórico de conversa reiniciado. Selecione uma função e envie a sua questão para continuar.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          roleUsed: selectedRole,
          modelUsed: selectedModel,
          groundingUsed: groundingMode
        }
      ]);
    }
  };

  return (
    <div className={`flex flex-col bg-white ${embedded ? 'h-[750px] rounded-2xl border border-slate-200 shadow-md' : 'h-full'}`}>
      {/* Top Controls: Persona Selector & Grounding Options */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Persona / Role Selector */}
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              Papel do Assistente (Instrução de Sistema)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {(Object.keys(roleConfigs) as ChatRole[]).map((r) => {
                const conf = roleConfigs[r];
                const Icon = conf.icon;
                const isSelected = selectedRole === r;
                return (
                  <button
                    key={r}
                    onClick={() => setSelectedRole(r)}
                    className={`px-2.5 py-1.5 rounded-lg border text-left text-xs font-medium transition-all flex items-center space-x-2 ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs font-semibold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
                    <span className="truncate">{conf.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Model Selector & Grounding Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Model Selector */}
            <div className="flex items-center space-x-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
              <Brain className="w-3.5 h-3.5 text-indigo-600" />
              <label htmlFor="model-select" className="sr-only">Modelo Gemini</label>
              <select
                id="model-select"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as ChatModel)}
                className="bg-transparent text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="gemini-3.5-flash">Gemini 3.5 Flash (Geral & Grounding)</option>
                <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Complexo & Raciocínio)</option>
                <option value="gemini-3.1-flash-lite">Gemini 3.1 Flash Lite (Rápido)</option>
              </select>
            </div>

            {/* Clear Button */}
            <button
              onClick={handleClearHistory}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-slate-200 bg-white transition-colors"
              title="Limpar histórico da conversa"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Grounding Toolbar (Google Search & Google Maps Grounding) */}
        <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1 mr-1">
              <Zap className="w-3 h-3 text-amber-500" />
              Conexões Externas (Grounding):
            </span>

            <button
              onClick={() => setGroundingMode(groundingMode === 'none' ? 'search' : 'none')}
              className={`px-2.5 py-1 rounded-full border text-[11px] font-semibold flex items-center gap-1.5 transition-all ${
                groundingMode === 'search'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Search className="w-3 h-3" />
              <span>Google Search Data</span>
              {groundingMode === 'search' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>}
            </button>

            <button
              onClick={() => setGroundingMode(groundingMode === 'maps' ? 'none' : 'maps')}
              className={`px-2.5 py-1 rounded-full border text-[11px] font-semibold flex items-center gap-1.5 transition-all ${
                groundingMode === 'maps'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-3 h-3" />
              <span>Google Maps Data</span>
              {groundingMode === 'maps' && <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse"></span>}
            </button>
          </div>

          {/* Regional Reference for Maps Grounding */}
          {groundingMode === 'maps' && (
            <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-emerald-800 text-[11px]">
              <Map className="w-3 h-3 text-emerald-600" />
              <span>Localização de Referência:</span>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="bg-transparent font-bold focus:outline-none cursor-pointer text-emerald-900"
              >
                {Object.keys(PROVINCE_COORDINATES).map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                  isUser
                    ? 'bg-slate-900 text-white'
                    : 'bg-emerald-600 text-white'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] rounded-2xl p-4 leading-relaxed text-xs space-y-2.5 ${
                  isUser
                    ? 'bg-slate-900 text-white rounded-tr-none shadow-xs'
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/80 shadow-xs'
                }`}
              >
                {/* Header Metadata */}
                <div className="flex items-center justify-between gap-3 text-[10px] pb-1 border-b border-slate-200/40 opacity-80">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold">
                      {isUser ? 'Cidadão / Utilizador' : 'Assistente ECO-MZ 360'}
                    </span>
                    {!isUser && m.modelUsed && (
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[9px]">
                        {m.modelUsed}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{m.timestamp}</span>
                    <button
                      onClick={() => handleCopy(m.id, m.text)}
                      className="hover:text-emerald-500 transition-colors"
                      title="Copiar texto"
                    >
                      {copiedId === m.id ? (
                        <Check className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="whitespace-pre-wrap leading-relaxed text-[13px]">
                  {m.text}
                </div>

                {/* Grounding Sources (Search or Maps) */}
                {m.groundingSources && m.groundingSources.length > 0 && (
                  <div className="pt-2.5 border-t border-slate-100 space-y-2">
                    <p className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                      {m.groundingUsed === 'maps' ? (
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Search className="w-3.5 h-3.5 text-blue-600" />
                      )}
                      Fontes Verificadas ({m.groundingUsed === 'maps' ? 'Google Maps' : 'Google Search'}):
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {m.groundingSources.map((src, sIdx) => (
                        <a
                          key={sIdx}
                          href={src.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-300 transition-all flex flex-col justify-between group"
                        >
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-semibold text-slate-800 text-[11px] line-clamp-1 group-hover:text-emerald-700">
                              {src.title}
                            </span>
                            <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                          </div>
                          {src.snippet && (
                            <p className="text-[10px] text-slate-500 line-clamp-2 mt-1">
                              "{src.snippet}"
                            </p>
                          )}
                          <span className="text-[9px] text-emerald-600 font-mono truncate mt-1">
                            {src.type === 'maps' ? 'Ver no Google Maps ↗' : 'Aceder à fonte web ↗'}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search Queries used */}
                {m.searchQueries && m.searchQueries.length > 0 && (
                  <div className="text-[10px] text-slate-400 flex items-center gap-1 flex-wrap pt-1">
                    <span>Consultas realizadas:</span>
                    {m.searchQueries.map((q, qIdx) => (
                      <span key={qIdx} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        "{q}"
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 text-xs shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-600 font-medium">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                <span>
                  Consultando Gemini ({selectedModel})
                  {groundingMode === 'search' && ' com Google Search ativo...'}
                  {groundingMode === 'maps' && ` com Google Maps ativo (${selectedProvince})...`}
                </span>
              </div>
              <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full animate-pulse w-3/4"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-200 overflow-x-auto flex items-center gap-2 text-xs">
        <span className="text-[10px] font-bold text-slate-500 shrink-0 uppercase tracking-wider">
          Perguntas Rápidas:
        </span>
        {quickPromptsByRole[selectedRole].map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp)}
            disabled={loading}
            className="px-2.5 py-1 bg-white hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 rounded-lg whitespace-nowrap transition-colors border border-slate-200 shadow-2xs text-[11px] disabled:opacity-50"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={
              groundingMode === 'search'
                ? 'Pergunte usando dados em tempo real do Google Search...'
                : groundingMode === 'maps'
                ? `Pesquise locais ou ecossistemas no Google Maps (${selectedProvince})...`
                : 'Escreva a sua dúvida ambiental sobre Moçambique (Enter para enviar)...'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="w-full text-xs p-3 pr-8 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl transition-all shadow-xs shrink-0 flex items-center justify-center font-bold"
          title="Enviar Mensagem"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
