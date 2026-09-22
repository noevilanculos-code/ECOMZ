import React, { useState } from 'react';
import {
  TreePine,
  ShieldAlert,
  Users,
  FolderKanban,
  ArrowUpRight,
  MapPin,
  Plus,
  Eye,
  ArrowRight,
  Calendar,
  Sparkles,
  Droplets,
  Wind,
  Thermometer,
  Layers,
  ChevronRight,
  ExternalLink,
  Flame,
  Trash2,
  Waves,
  Sun,
  Bell,
  Search,
  CheckCircle2,
  Clock,
  Compass
} from 'lucide-react';
import { Occurrence, EnvironmentalProject, UserRole, MozambiqueProvince } from '../types';

interface EcoMainDashboardProps {
  occurrences: Occurrence[];
  projects: EnvironmentalProject[];
  onSelectOccurrence: (occ: Occurrence) => void;
  onSelectProject: (proj: EnvironmentalProject) => void;
  onNewOccurrence: () => void;
  onNewProject: () => void;
  onNavigateToTab: (tab: string) => void;
  onOpenEcoBot: () => void;
}

export const EcoMainDashboard: React.FC<EcoMainDashboardProps> = ({
  occurrences,
  projects,
  onSelectOccurrence,
  onSelectProject,
  onNewOccurrence,
  onNewProject,
  onNavigateToTab,
  onOpenEcoBot
}) => {
  const [activeProvinceFilter, setActiveProvinceFilter] = useState<string>('Todas');
  const [activeMapLayer, setActiveMapLayer] = useState<'todas' | 'ocorrencias' | 'projetos' | 'areas' | 'alertas'>('todas');
  const [mapZoom, setMapZoom] = useState<number>(1);

  // Mockup recent occurrences matching images 17_07_09 and 17_13_44
  const mockupOccurrences = [
    {
      id: 'mock-1',
      title: 'Poluição do rio',
      location: 'Rio Púnguè – Manica',
      date: 'Hoje, 10:24',
      status: 'Em análise',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: Droplets,
      iconColor: 'text-blue-500 bg-blue-50',
      category: 'Poluição Hídrica'
    },
    {
      id: 'mock-2',
      title: 'Desmatamento',
      location: 'Distrito de Moatize – Tete',
      date: 'Hoje, 09:17',
      status: 'Validada',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: TreePine,
      iconColor: 'text-emerald-500 bg-emerald-50',
      category: 'Desmatamento'
    },
    {
      id: 'mock-3',
      title: 'Queimadas descontroladas',
      location: 'Maganja da Costa – Zambézia',
      date: 'Hoje, 08:45',
      status: 'Atribuída',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: Flame,
      iconColor: 'text-amber-500 bg-amber-50',
      category: 'Queimadas'
    },
    {
      id: 'mock-4',
      title: 'Resíduos sólidos',
      location: 'Baixa da Cidade – Maputo',
      date: 'Hoje, 07:32',
      status: 'Resolvida',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: Trash2,
      iconColor: 'text-purple-500 bg-purple-50',
      category: 'Resíduos Sólidos'
    },
    {
      id: 'mock-5',
      title: 'Erosão costeira acelerada',
      location: 'Barra e Tofo – Inhambane',
      date: 'Ontem, 16:20',
      status: 'Em intervenção',
      statusColor: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: Waves,
      iconColor: 'text-teal-500 bg-teal-50',
      category: 'Erosão Costeira'
    }
  ];

  // Projects from mockups
  const featuredProjects = [
    {
      id: 'p-1',
      title: 'Proteção da Costa de Inhambane',
      province: 'Inhambane',
      progress: 65,
      status: 'Em execução',
      statusColor: 'bg-blue-100 text-blue-800',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80'
    },
    {
      id: 'p-2',
      title: 'Restauração de Mangais da Beira',
      province: 'Sofala',
      progress: 100,
      status: 'Concluído',
      statusColor: 'bg-emerald-100 text-emerald-800',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80'
    },
    {
      id: 'p-3',
      title: 'Reflorestamento de Gorongosa',
      province: 'Sofala / Manica',
      progress: 0,
      status: 'Planeado',
      statusColor: 'bg-slate-100 text-slate-700',
      image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=400&q=80'
    }
  ];

  // Simulations from mockups
  const simulationsList = [
    {
      title: 'Cenário de Reflorestamento Miombo',
      region: 'Tete / Zambézia',
      date: '14 Maio 2025',
      status: 'Concluída',
      badge: 'bg-emerald-100 text-emerald-800'
    },
    {
      title: 'Impacto da Urbanização e Erosão',
      region: 'Baía de Maputo',
      date: '10 Maio 2025',
      status: 'Em análise',
      badge: 'bg-amber-100 text-amber-800'
    },
    {
      title: 'Simulação Hidrológica de Cheias Búzi',
      region: 'Búzi & Dondo (Sofala)',
      date: '02 Maio 2025',
      status: 'Concluída',
      badge: 'bg-emerald-100 text-emerald-800'
    }
  ];

  // News from mockups
  const newsList = [
    {
      title: 'Moçambique reforça compromisso com a conservação ambiental',
      date: '12 de Maio de 2025',
      category: 'Ambiente',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&q=80'
    },
    {
      title: 'Novo programa de reflorestamento comunitário no Niassa',
      date: '08 de Maio de 2025',
      category: 'Projetos',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=300&q=80'
    },
    {
      title: 'AQUA intensifica fiscalização contra corte ilegal de madeira',
      date: '04 de Maio de 2025',
      category: 'Fiscalização',
      image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=300&q=80'
    }
  ];

  // Map markers matching Mozambique geography
  const mapPoints = [
    { name: 'Pemba / Quirimbas', prov: 'Cabo Delgado', type: 'area', x: 80, y: 15, label: 'Parque Nacional das Quirimbas' },
    { name: 'Reserva do Niassa', prov: 'Niassa', type: 'area', x: 55, y: 20, label: 'Reserva Especial de Niassa' },
    { name: 'Nampula Cidade', prov: 'Nampula', type: 'projeto', x: 75, y: 35, label: 'Projeto Eco-Nampula' },
    { name: 'Moatize', prov: 'Tete', type: 'ocorrencia', x: 35, y: 42, label: 'Desmatamento Validado' },
    { name: 'Quelimane', prov: 'Zambézia', type: 'alerta', x: 65, y: 50, label: 'Alerta de Queimadas' },
    { name: 'Parque de Gorongosa', prov: 'Sofala', type: 'area', x: 45, y: 56, label: 'Parque Nacional da Gorongosa' },
    { name: 'Beira / Búzi', prov: 'Sofala', type: 'projeto', x: 52, y: 65, label: 'Restauração de Mangais' },
    { name: 'Púnguè', prov: 'Manica', type: 'ocorrencia', x: 38, y: 62, label: 'Poluição de Rio' },
    { name: 'Vilankulo / Bazaruto', prov: 'Inhambane', type: 'area', x: 58, y: 76, label: 'Parque Nacional de Bazaruto' },
    { name: 'Tofo / Barra', prov: 'Inhambane', type: 'ocorrencia', x: 60, y: 84, label: 'Erosão Costeira' },
    { name: 'Xai-Xai / Limpopo', prov: 'Gaza', type: 'alerta', x: 42, y: 88, label: 'Risco de Cheias Limpopo' },
    { name: 'Maputo Cidade & Baixa', prov: 'Maputo Cidade', type: 'ocorrencia', x: 32, y: 95, label: 'Resíduos Sólidos Resolvidos' }
  ];

  return (
    <div className="space-y-6">
      {/* 1. Hero Dual-Banners (As in Mockup 17_07_09 & 17_13_44) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Welcome Banner (Wider ~8 cols) */}
        <div className="lg:col-span-8 relative overflow-hidden rounded-2xl bg-linear-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white p-6 sm:p-8 shadow-xl border border-emerald-800/40 flex flex-col justify-between min-h-[220px]">
          {/* Background Scenic Image with Dark Gradient Overlay */}
          <div
            className="absolute inset-0 opacity-30 mix-blend-overlay bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80')`
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

          {/* Floating Tag */}
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold mb-3 backdrop-blur-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Cuidar do ambiente é investir no nosso futuro</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              Bem-vindo ao ECO-MZ 360
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              Plataforma Inteligente de Observação, Diagnóstico, Simulação e Gestão Ambiental de Moçambique.
            </p>
          </div>

          <div className="relative z-10 pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateToTab('territorio')}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-1.5"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Explorar Mapa Ambiental</span>
            </button>
            <button
              onClick={onNewOccurrence}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all backdrop-blur-xs flex items-center space-x-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Registar Ocorrência</span>
            </button>
            <button
              onClick={() => onNavigateToTab('mockups')}
              className="px-3.5 py-2 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold transition-all backdrop-blur-xs flex items-center space-x-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Ver Modelos de Interface</span>
            </button>
          </div>
        </div>

        {/* Right Info Banner (Narrower ~4 cols) */}
        <div className="lg:col-span-4 relative overflow-hidden rounded-2xl bg-linear-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-6 shadow-xl border border-slate-700/60 flex flex-col justify-between min-h-[220px]">
          <div
            className="absolute inset-0 opacity-25 mix-blend-overlay bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80')`
            }}
          />
          <div className="relative z-10">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-2">
              ECO-INSIGHTS MOÇAMBIQUE
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              Mais dados. Melhores decisões. Um ambiente mais seguro.
            </h2>
            <p className="text-slate-300 text-xs mt-2 leading-relaxed">
              Integração geoespacial de dados de satélite, alertas comunitários e legislação ambiental (Lei n.º 20/97).
            </p>
          </div>

          <div className="relative z-10 pt-4">
            <button
              onClick={() => onNavigateToTab('territorio')}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2 group"
            >
              <span>Ver Mapa</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top 4 KPI Metrics Cards (Exact values from mockups 17_07_09 & 17_13_44) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Ocorrências */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ocorrências</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <TreePine className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-slate-900">243</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +12% este mês
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Registos em 11 províncias</p>
        </div>

        {/* KPI 2: Projetos */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Projetos</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-slate-900">18</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +5% este mês
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Ações comunitárias e restauração</p>
        </div>

        {/* KPI 3: Alertas Ativos */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Alertas Ativos</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-slate-900">7</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +2% este mês
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Monitorizados pelo INGD / MTA</p>
        </div>

        {/* KPI 4: Cidadãos Participantes */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cidadãos Participantes</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-slate-900">1.246</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +18% este mês
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Rede de fiscais e voluntários</p>
        </div>
      </div>

      {/* 3. Central Section: Mapa Ambiental & Ocorrências Recentes (2-Column Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Mapa Ambiental (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          {/* Map Header Toolbar */}
          <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>Mapa Ambiental de Moçambique</span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Visualização satélite territorial e marcadores geoespaciais em tempo real
              </p>
            </div>

            {/* Layer Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs">
              <button
                onClick={() => setActiveMapLayer('todas')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  activeMapLayer === 'todas'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Todas Camadas
              </button>
              <button
                onClick={() => setActiveMapLayer('ocorrencias')}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 ${
                  activeMapLayer === 'ocorrencias'
                    ? 'bg-rose-600 text-white'
                    : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Ocorrências
              </button>
              <button
                onClick={() => setActiveMapLayer('projetos')}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 ${
                  activeMapLayer === 'projetos'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Projetos
              </button>
              <button
                onClick={() => setActiveMapLayer('areas')}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 ${
                  activeMapLayer === 'areas'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Áreas Protegidas
              </button>
            </div>
          </div>

          {/* Interactive Map Visual Stage */}
          <div className="relative flex-1 min-h-[420px] bg-slate-900 overflow-hidden flex items-center justify-center">
            {/* Map Canvas Background Texture */}
            <div
              className="absolute inset-0 opacity-40 bg-cover bg-center pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, #064e3b 0%, #0f172a 100%)`
              }}
            />

            {/* Stylized SVG Map of Mozambique */}
            <div
              className="relative w-full h-[400px] flex items-center justify-center transition-transform duration-300"
              style={{ transform: `scale(${mapZoom})` }}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full max-h-[380px] drop-shadow-2xl"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Mozambique Coastline & Borders Path */}
                <path
                  d="M 68 10 Q 75 14 78 22 Q 74 35 70 42 Q 62 48 55 58 Q 50 68 56 78 Q 54 86 42 92 Q 35 97 32 94 Q 28 88 38 78 Q 42 66 38 56 Q 30 48 38 38 Q 45 28 55 20 Z"
                  fill="#065f46"
                  stroke="#34d399"
                  strokeWidth="0.8"
                  className="transition-colors hover:fill-emerald-800"
                />

                {/* Regional dividers */}
                <path d="M 60 22 L 72 32" stroke="#059669" strokeWidth="0.5" strokeDasharray="1,1" />
                <path d="M 45 42 L 68 45" stroke="#059669" strokeWidth="0.5" strokeDasharray="1,1" />
                <path d="M 38 58 L 54 62" stroke="#059669" strokeWidth="0.5" strokeDasharray="1,1" />
                <path d="M 40 76 L 56 80" stroke="#059669" strokeWidth="0.5" strokeDasharray="1,1" />

                {/* Map Labels for key provinces */}
                <text x="70" y="16" fill="#a7f3d0" fontSize="3" fontWeight="bold">Cabo Delgado</text>
                <text x="44" y="24" fill="#a7f3d0" fontSize="3">Niassa</text>
                <text x="68" y="36" fill="#a7f3d0" fontSize="3">Nampula</text>
                <text x="32" y="44" fill="#a7f3d0" fontSize="3">Tete</text>
                <text x="58" y="52" fill="#a7f3d0" fontSize="3">Zambézia</text>
                <text x="32" y="60" fill="#a7f3d0" fontSize="3">Manica</text>
                <text x="50" y="66" fill="#a7f3d0" fontSize="3" fontWeight="bold">Sofala</text>
                <text x="54" y="80" fill="#a7f3d0" fontSize="3">Inhambane</text>
                <text x="34" y="86" fill="#a7f3d0" fontSize="3">Gaza</text>
                <text x="24" y="94" fill="#a7f3d0" fontSize="3" fontWeight="bold">Maputo</text>

                {/* Dynamic Markers based on layers */}
                {mapPoints.map((pt, idx) => {
                  if (activeMapLayer !== 'todas') {
                    if (activeMapLayer === 'ocorrencias' && pt.type !== 'ocorrencia') return null;
                    if (activeMapLayer === 'projetos' && pt.type !== 'projeto') return null;
                    if (activeMapLayer === 'areas' && pt.type !== 'area') return null;
                    if (activeMapLayer === 'alertas' && pt.type !== 'alerta') return null;
                  }

                  let color = '#ef4444'; // Red for ocorrências
                  if (pt.type === 'projeto') color = '#3b82f6'; // Blue
                  if (pt.type === 'area') color = '#10b981'; // Green
                  if (pt.type === 'alerta') color = '#f59e0b'; // Amber

                  return (
                    <g key={idx} className="cursor-pointer group">
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="3.5"
                        fill={color}
                        opacity="0.3"
                        className="animate-ping"
                      />
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="2"
                        fill={color}
                        stroke="#ffffff"
                        strokeWidth="0.6"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Floating Zoom Controls (+ / -) */}
            <div className="absolute top-4 left-4 flex flex-col bg-slate-900/90 border border-slate-700 rounded-xl overflow-hidden shadow-lg backdrop-blur-xs">
              <button
                onClick={() => setMapZoom(Math.min(1.8, mapZoom + 0.2))}
                className="p-2 text-white hover:bg-slate-800 transition-colors border-b border-slate-800"
                title="Aumentar zoom"
              >
                +
              </button>
              <button
                onClick={() => setMapZoom(Math.max(0.8, mapZoom - 0.2))}
                className="p-2 text-white hover:bg-slate-800 transition-colors"
                title="Diminuir zoom"
              >
                -
              </button>
            </div>

            {/* Floating Legend Box (Bottom Right - Exactly as in mockups) */}
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-xl border border-slate-200 text-xs space-y-1.5 min-w-[150px]">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block border-b border-slate-100 pb-1">
                Legenda do Mapa
              </span>
              <div className="flex items-center space-x-2 text-[11px] text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                <span>Ocorrências</span>
              </div>
              <div className="flex items-center space-x-2 text-[11px] text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                <span>Projetos</span>
              </div>
              <div className="flex items-center space-x-2 text-[11px] text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Áreas Protegidas</span>
              </div>
              <div className="flex items-center space-x-2 text-[11px] text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <span>Alertas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Ocorrências Recentes (4 cols - As in mockups) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <TreePine className="w-4 h-4 text-emerald-600" />
                <span>Ocorrências Recentes</span>
              </h3>
              <button
                onClick={() => onNavigateToTab('territorio')}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5"
              >
                <span>Ver todas</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* List of 5 Occurrences */}
            <div className="divide-y divide-slate-100 mt-2">
              {mockupOccurrences.map((occ) => {
                const Icon = occ.icon;
                return (
                  <div
                    key={occ.id}
                    onClick={() => {
                      const realOcc = occurrences.find((o) => o.category === occ.category) || occurrences[0];
                      if (realOcc) onSelectOccurrence(realOcc);
                    }}
                    className="py-3 flex items-start justify-between gap-2.5 hover:bg-slate-50/80 px-2 rounded-xl transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start space-x-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${occ.iconColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {occ.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {occ.location}
                        </p>
                        <span className="text-[10px] text-slate-400">
                          {occ.date}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${occ.statusColor}`}>
                      {occ.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={onNewOccurrence}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>+ Nova Ocorrência</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Feeds & Highlights Row (ECO-PULSE, News & Promotional card as in mockup 17_13_44) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: ECO-PULSE Activity Timeline (6 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>ECO-PULSE • Atualizações em Tempo Real</span>
            </h3>
            <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
              LIVE
            </span>
          </div>

          <div className="space-y-3.5 mt-3">
            <div className="flex items-start space-x-3 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <div>
                <p className="font-semibold text-slate-800">
                  Nova atualização de dados de qualidade da água no Rio Púnguè
                </p>
                <span className="text-[10px] text-slate-400">Há 20 minutos • Província de Manica</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              <div>
                <p className="font-semibold text-slate-800">
                  Lançado novo projeto de restauração de mangais na Beira
                </p>
                <span className="text-[10px] text-slate-400">Há 2 horas • Província de Sofala</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <div>
                <p className="font-semibold text-slate-800">
                  Alerta meteorológico de risco de ventos fortes emitido pelo INAM
                </p>
                <span className="text-[10px] text-slate-400">Há 4 horas • Canal de Moçambique</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs">
              <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0" />
              <div>
                <p className="font-semibold text-slate-800">
                  15 novos voluntários comunitários registados no distrito de Vilankulo
                </p>
                <span className="text-[10px] text-slate-400">Há 6 horas • Inhambane</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Notícia em Destaque (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
          <div className="relative h-36 bg-slate-100 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80"
              alt="Notícia ambiental"
              className="w-full h-full object-cover"
            />
            <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
              Destaque Nacional
            </span>
          </div>

          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block">12 de Maio de 2025</span>
              <h4 className="font-bold text-xs text-slate-900 mt-1 leading-snug">
                Moçambique reforça compromisso com a conservação ambiental e proteção de mangais
              </h4>
              <p className="text-[11px] text-slate-500 mt-1.5 line-clamp-2">
                Governo e parceiros anunciam expansão das áreas marinhas protegidas e combate rigoroso ao desmatamento.
              </p>
            </div>

            <button
              onClick={() => onNavigateToTab('educacao')}
              className="mt-3 text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 self-start"
            >
              <span>Ler artigo completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Card Motivacional (3 cols - Exact phrase from mockup) */}
        <div className="lg:col-span-3 rounded-2xl bg-linear-to-br from-emerald-900 to-slate-900 p-5 text-white shadow-xs border border-emerald-800/40 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 mb-3">
              <TreePine className="w-5 h-5" />
            </div>
            <h4 className="font-black text-lg text-white leading-tight">
              Pequenas ações, grandes impactos!
            </h4>
            <p className="text-slate-300 text-xs mt-2 leading-relaxed">
              Cada árvore plantada e cada reporte de infração ajudam a preservar a rica biodiversidade de Moçambique.
            </p>
          </div>

          <div className="pt-4 border-t border-emerald-800/40">
            <button
              onClick={onOpenEcoBot}
              className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Consultar EcoBot MZ</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Bottom 4-Column Grid (From Mockup 17_13_44 & 17_07_09) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Coluna 1: Projetos em Destaque */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <FolderKanban className="w-3.5 h-3.5 text-blue-600" />
                <span>Projetos em Destaque</span>
              </h4>
              <button
                onClick={() => onNavigateToTab('projetos')}
                className="text-[11px] font-semibold text-blue-600 hover:underline"
              >
                Ver todos
              </button>
            </div>

            <div className="space-y-3">
              {featuredProjects.map((p) => (
                <div key={p.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-xs text-slate-900 line-clamp-1">{p.title}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${p.statusColor}`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>{p.province}</span>
                    <span className="font-bold font-mono">{p.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${p.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`}
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onNewProject}
            className="mt-3 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Novo Projeto</span>
          </button>
        </div>

        {/* Coluna 2: Simulações */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                <span>Simulações Recentes</span>
              </h4>
              <button
                onClick={() => onNavigateToTab('analise')}
                className="text-[11px] font-semibold text-emerald-600 hover:underline"
              >
                Modelar
              </button>
            </div>

            <div className="space-y-2.5">
              {simulationsList.map((sim, idx) => (
                <div key={idx} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1">
                  <div className="flex items-start justify-between gap-1">
                    <span className="font-bold text-xs text-slate-900 leading-snug">{sim.title}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full shrink-0 ${sim.badge}`}>
                      {sim.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">{sim.region} • {sim.date}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateToTab('analise')}
            className="mt-3 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Nova Simulação</span>
          </button>
        </div>

        {/* Coluna 3: ECO-DASH (Indicadores de Saúde Ambiental 2x2) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>ECO-DASH • Indicadores</span>
              </h4>
              <span className="text-[10px] text-slate-400 font-mono">Índice Geral</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-center">
                <Wind className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span className="text-[10px] text-slate-500 block">Qualidade do Ar</span>
                <span className="font-black text-xs text-emerald-700">Boa (88%)</span>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 text-center">
                <Droplets className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <span className="text-[10px] text-slate-500 block">Qualidade da Água</span>
                <span className="font-black text-xs text-blue-700">Moderada</span>
              </div>

              <div className="p-2.5 rounded-xl bg-teal-50/60 border border-teal-100 text-center">
                <TreePine className="w-4 h-4 text-teal-600 mx-auto mb-1" />
                <span className="text-[10px] text-slate-500 block">Cobertura Vegetal</span>
                <span className="font-black text-xs text-teal-700">78%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100 text-center">
                <Thermometer className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <span className="text-[10px] text-slate-500 block">Temp. Média</span>
                <span className="font-black text-xs text-amber-700">26°C</span>
              </div>
            </div>
          </div>

          <div className="mt-3 p-2 bg-slate-50 rounded-xl text-[10px] text-slate-500 text-center border border-slate-100">
            Atualizado via dados de satélite e sensores locais
          </div>
        </div>

        {/* Coluna 4: Últimas Notícias */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Últimas Notícias</span>
              </h4>
              <button
                onClick={() => onNavigateToTab('educacao')}
                className="text-[11px] font-semibold text-emerald-600 hover:underline"
              >
                Fórum
              </button>
            </div>

            <div className="space-y-2.5">
              {newsList.map((n, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs group cursor-pointer">
                  <img
                    src={n.image}
                    alt={n.title}
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                  />
                  <div>
                    <h5 className="font-bold text-[11px] text-slate-800 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                      {n.title}
                    </h5>
                    <span className="text-[9px] text-slate-400">{n.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateToTab('educacao')}
            className="mt-3 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
          >
            <span>Ver Todas as Notícias</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
