import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface EcoBotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'bot' | 'user';
  text: string;
  source?: string;
}

export const EcoBotModal: React.FC<EcoBotModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Olá! Sou o EcoBot MZ, assistente inteligente do sistema ECO-MZ 360. Posso esclarecer dúvidas sobre a legislação ambiental de Moçambique (Lei n.º 20/97), procedimentos de denúncia de agressões ecológicas, proteção de mangais ou planos de emergência comunitários. Como posso ajudar?',
      source: 'Base Jurídica: Legislação Ambiental da República de Moçambique'
    }
  ]);

  const quickPrompts = [
    'O que diz a Lei n.º 20/97 sobre corte ilegal de árvores?',
    'Como posso denunciar queimada descontrolada anonimamente?',
    'Qual a importância dos mangais para a costa da Beira?',
    'Quem contactar em emergência de ciclone no Canal de Moçambique?'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = { sender: 'user', text: query.trim() };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Formulate knowledgeable response grounded in Mozambican environmental context
    setTimeout(() => {
      let botResponse = '';
      let source = 'Constituição da República & Lei n.º 20/97';

      const lower = query.toLowerCase();
      if (lower.includes('lei') || lower.includes('20/97') || lower.includes('multa') || lower.includes('corte')) {
        botResponse =
          'Segundo a Lei n.º 20/97 (Lei do Ambiente) e o Decreto n.º 12/2002 (Regulamento de Florestas e Fauna Bravia), o corte de espécies florestais nativas sem licença da Direcção Provincial constitui infração grave com apreensão imediata do produto e aplicação de coima. Além disso, o poluidor é civilmente obrigado a reparar os danos causados (princípio do poluidor-pagador).';
        source = 'Art. 26 da Lei n.º 20/97 e Regulamento Florestal';
      } else if (lower.includes('denuncia') || lower.includes('denúncia') || lower.includes('anonim')) {
        botResponse =
          'No portal ECO-CITIZEN do ECO-MZ 360, pode assinalar a opção "Denúncia Anónima". A sua identidade permanecerá estritamente encriptada, enquanto as coordenadas GPS e fotos de evidência serão encaminhadas às brigadas distritais do SDAE e da Polícia de Proteção Ambiental para fiscalização no terreno.';
        source = 'Garantias do Cidadão Guardião ECO-MZ 360';
      } else if (lower.includes('mangal') || lower.includes('beira') || lower.includes('costa')) {
        botResponse =
          'Os mangais constituem a primeira linha de defesa natural de Moçambique contra a erosão marítima e a energia de ciclones tropicais. Na Beira e Quelimane, espécies como Rhizophora mucronata e Avicennia marina protegem as comunidades litorais e funcionam como berçário indispensável para camarão e peixe comercial.';
        source = 'Estratégia Nacional de Gestão de Mangais 2020-2030';
      } else if (lower.includes('ciclone') || lower.includes('emergencia') || lower.includes('contacto') || lower.includes('ingd')) {
        botResponse =
          'Em situação de alerta ciclónico ou inundações, contacte imediatamente a Linha Verde do CENOE/INGD: 800 112 112 (gratuita). Siga as orientações das bandeiras de aviso (Amarela = Atenção; Laranja = Preparação; Vermelha = Evacuação Imediata para zonas altas).';
        source = 'Plano de Contingência Nacional INGD';
      } else {
        botResponse =
          `Compreendi a sua questão sobre "${query}". No âmbito da gestão ambiental integrada em Moçambique, recomendamos consultar o módulo ECO-DIAG para avaliação de risco territorial ou registar uma ocorrência no ECO-CITIZEN para mobilização técnica local.`;
        source = 'Plataforma ECO-MZ 360';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse, source }]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-xl w-full h-[620px] shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Top Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold leading-tight flex items-center space-x-1.5">
                <span>EcoBot MZ • Assistente Ambiental</span>
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-black text-[9px] font-black">
                  ONLINE
                </span>
              </h3>
              <p className="text-[10px] text-slate-400">
                Especialista em Legislação e Ecossistemas de Moçambique
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start space-x-2 text-xs ${
                m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  m.sender === 'user' ? 'bg-slate-800 text-white' : 'bg-emerald-600 text-white'
                }`}
              >
                {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`p-3 rounded-xl max-w-[82%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-xs'
                }`}
              >
                <p>{m.text}</p>
                {m.source && (
                  <p className="text-[10px] text-emerald-700 font-medium mt-1.5 pt-1 border-t border-slate-100 flex items-center space-x-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{m.source}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Prompts Bar */}
        <div className="p-2.5 bg-white border-t border-slate-200 overflow-x-auto flex items-center space-x-1.5 text-[11px]">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg whitespace-nowrap transition-colors border border-slate-200/60"
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
          className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder="Coloque a sua dúvida sobre leis ambientais, denúncias ou ecossistemas..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
