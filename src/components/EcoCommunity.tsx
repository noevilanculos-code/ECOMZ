import React, { useState } from 'react';
import {
  Users,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  Award,
  Sparkles,
  ChevronRight,
  Send,
  HeartHandshake
} from 'lucide-react';
import { VolunteerOpportunity } from '../types';
import { INITIAL_VOLUNTEER_OPPS } from '../data/mockData';

export const EcoCommunity: React.FC = () => {
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>(INITIAL_VOLUNTEER_OPPS);
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'voluntariado' | 'forum'>('voluntariado');

  // Forum state
  const [forumPosts, setForumPosts] = useState([
    {
      id: 'post-1',
      author: 'Noé Samuel Vilanculos',
      role: 'Ativista Ecológico',
      province: 'Sofala',
      time: 'Há 2 horas',
      content: 'Estamos a organizar um viveiro comunitário no bairro da Ponta Gea para fornecer mudas aos pescadores da Praia Nova. Quem tiver recipientes plásticos de 5L para reaproveitamento pode entrar em contacto!',
      likes: 18,
      comments: 6
    },
    {
      id: 'post-2',
      author: 'Dra. Amina Mussá',
      role: 'Bióloga Marinha',
      province: 'Cabo Delgado',
      time: 'Ontem',
      content: 'Atenção aos comités de gestão de pescas no Ibo: registámos desova de tartarugas-verdes no setor norte do arquipélago das Quirimbas. Reforçar vigilância contra apanha noturna de ovos.',
      likes: 34,
      comments: 12
    }
  ]);
  const [newPostContent, setNewPostContent] = useState('');

  const handleEnroll = (oppId: string) => {
    if (enrolledIds.includes(oppId)) {
      setEnrolledIds(enrolledIds.filter((id) => id !== oppId));
      setOpportunities((prev) =>
        prev.map((o) => (o.id === oppId ? { ...o, enrolled: Math.max(0, (o.enrolled || 0) - 1) } : o))
      );
    } else {
      setEnrolledIds([...enrolledIds, oppId]);
      setOpportunities((prev) =>
        prev.map((o) => (o.id === oppId ? { ...o, enrolled: (o.enrolled || 0) + 1 } : o))
      );
    }
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost = {
      id: `post-${Date.now()}`,
      author: 'Noé Samuel Vilanculos',
      role: 'Cidadão Guardião',
      province: 'Sofala',
      time: 'Agora mesmo',
      content: newPostContent.trim(),
      likes: 1,
      comments: 0
    };

    setForumPosts([newPost, ...forumPosts]);
    setNewPostContent('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 bg-teal-50 text-teal-800 px-2.5 py-0.5 rounded-full text-xs font-semibold mb-1">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>ECO-COMMUNITY • Rede de Mobilização e Voluntariado</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Ação Comunitária e Diálogo Socioambiental
          </h2>
          <p className="text-xs text-slate-500">
            Campanhas coletivas de plantio, brigadas de limpeza e fórum aberto de boas práticas entre províncias.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('voluntariado')}
            className={`px-3 py-1.5 rounded-md font-semibold ${
              activeTab === 'voluntariado' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            Vagas de Voluntariado ({opportunities.length})
          </button>
          <button
            onClick={() => setActiveTab('forum')}
            className={`px-3 py-1.5 rounded-md font-semibold ${
              activeTab === 'forum' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            Fórum Comunitário ({forumPosts.length})
          </button>
        </div>
      </div>

      {activeTab === 'voluntariado' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {opportunities.map((opp) => {
            const isEnrolled = enrolledIds.includes(opp.id);
            return (
              <div
                key={opp.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-teal-300 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                      {opp.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {opp.enrolled}/{opp.spots} vagas
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 leading-snug">{opp.title}</h3>
                  <p className="text-[11px] text-slate-500 line-clamp-3">{opp.description}</p>

                  <div className="text-[11px] text-slate-500 space-y-1 pt-2 border-t border-slate-100">
                    <p className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{opp.district}, {opp.province}</span>
                    </p>
                    <p className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Data: {opp.date}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="w-full">
                    <button
                      onClick={() => handleEnroll(opp.id)}
                      className={`w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors ${
                        isEnrolled
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-teal-600 hover:bg-teal-700 text-white'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isEnrolled ? 'Inscrição Confirmada ✓' : 'Quero Ser Voluntário'}</span>
                    </button>
                    {isEnrolled && (
                      <p className="text-[10px] text-center text-emerald-600 mt-1 font-medium">
                        Horas creditadas automaticamente no perfil guardião!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Community Forum View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            {/* Create Post Form */}
            <form onSubmit={handleAddPost} className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900">Iniciar Nova Discussão Ecológica</h3>
              <textarea
                required
                rows={3}
                placeholder="Partilhe iniciativas locais, dúvidas sobre legislação ambiental ou alerte para situações na sua comunidade..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <div className="flex justify-between items-center pt-1">
                <span className="text-[11px] text-slate-400">Publicando em: Sofala (Público)</span>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg shadow-xs flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publicar Mensagem</span>
                </button>
              </div>
            </form>

            {/* Post Feed */}
            <div className="space-y-3">
              {forumPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <strong className="text-slate-900 block">{post.author}</strong>
                        <span className="text-[10px] text-slate-400">{post.role} • {post.province}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400">{post.time}</span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">{post.content}</p>

                  <div className="flex items-center space-x-4 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <button className="flex items-center space-x-1 hover:text-teal-600">
                      <span>👍 {post.likes} apoios</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-teal-600">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.comments} respostas</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Normas de Moderação e Convivência</span>
              </h4>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Este espaço destina-se exclusivamente à proteção ecológica e bem-estar comunitário de Moçambique.
              </p>
              <ul className="space-y-1.5 text-[11px] text-slate-600 list-disc pl-4">
                <li>Respeito mútuo entre comunidades tradicionais e técnicos.</li>
                <li>Proibição de discursos partidários ou de ódio.</li>
                <li>Partilha de evidências verificáveis sobre a fauna e flora.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
