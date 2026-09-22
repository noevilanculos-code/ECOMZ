import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { GeminiChatbot } from './GeminiChatbot';

interface EcoBotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EcoBotModal: React.FC<EcoBotModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full h-[88vh] max-h-[780px] shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold leading-tight flex items-center space-x-2">
                <span>EcoBot MZ • Assistente Gemini & Grounding</span>
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-black text-[9px] font-black uppercase">
                  Google Gemini Live
                </span>
              </h3>
              <p className="text-[10px] text-slate-400">
                Multi-Turn • Google Search Grounding • Google Maps Grounding
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Fechar assistente"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gemini Chatbot Engine */}
        <div className="flex-1 overflow-hidden">
          <GeminiChatbot />
        </div>
      </div>
    </div>
  );
};
