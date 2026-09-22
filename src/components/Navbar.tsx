import React, { useState } from 'react';
import {
  ShieldAlert,
  Globe2,
  Users,
  Compass,
  FileSpreadsheet,
  Cpu,
  BarChart3,
  TreePine,
  Bell,
  Sparkles,
  Menu,
  X,
  CheckCircle2,
  ClipboardList,
  Database,
  Search,
  Sun,
  Layers,
  LayoutDashboard,
  MessageSquare
} from 'lucide-react';
import { UserRole, CycleStage } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  activeCycleStage: CycleStage;
  setActiveCycleStage: (stage: CycleStage) => void;
  urgentAlertCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeRole,
  setActiveRole,
  activeCycleStage,
  setActiveCycleStage,
  urgentAlertCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const CYCLE_STAGES: CycleStage[] = [
    'OBSERVAR',
    'LOCALIZAR',
    'DIAGNOSTICAR',
    'SIMULAR',
    'PLANEAR',
    'EXECUTAR',
    'MONITORIZAR',
    'AVALIAR',
    'INFORMAR'
  ];

  const roleLabels: Record<UserRole, { label: string; desc: string; badge: string }> = {
    cidadao: { label: 'Cidadão', desc: 'Participação, reportes e voluntariado', badge: 'bg-emerald-100 text-emerald-800' },
    tecnico: { label: 'Técnico', desc: 'Validação de terreno e tarefas', badge: 'bg-blue-100 text-blue-800' },
    gestor: { label: 'Gestor', desc: 'Dashboards, metas e decisões', badge: 'bg-indigo-100 text-indigo-800' },
    instituicao: { label: 'Instituição', desc: 'Projetos, financiamento e Selo Verde', badge: 'bg-amber-100 text-amber-800' },
    admin: { label: 'Administrador', desc: 'Auditoria, utilizadores e API', badge: 'bg-purple-100 text-purple-800' }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Principal', icon: LayoutDashboard, badge: 'MOCKUP UI' },
    { id: 'territorio', label: 'Território & Mapa', icon: Globe2, badge: 'ECO-MAP' },
    { id: 'projetos', label: 'Ação & Projetos', icon: TreePine, badge: 'PROJETOS' },
    { id: 'analise', label: 'Diagnóstico & Simulação', icon: Cpu, badge: 'SIMULADOR' },
    { id: 'alertas', label: 'Alertas & Avisos', icon: ShieldAlert, badge: '3 Ativos', urgent: true },
    { id: 'ecobot', label: 'EcoBot Gemini', icon: Sparkles, badge: 'AI & MAPS' },
    { id: 'mockups', label: 'Modelos de Interface', icon: Layers, badge: 'UI DESIGNS' },
    { id: 'php-mysql', label: 'PHP & MySQL', icon: Database, badge: 'LAMP STACK' },
    { id: 'participacao', label: 'Voluntariado & Selo', icon: Users, badge: 'COMUNIDADE' },
    { id: 'educacao', label: 'Educação & Fórum', icon: Compass, badge: 'ECO-EDU' },
    { id: 'forms', label: 'Google Forms', icon: ClipboardList, badge: 'INQUÉRITOS' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Banner: Cycle Indicator & Regional Context */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-emerald-400">CICLO AMBIENTAL ECO-MZ:</span>
            <div className="flex items-center space-x-1 overflow-x-auto">
              {CYCLE_STAGES.map((stage, idx) => {
                const isActive = activeCycleStage === stage;
                return (
                  <button
                    key={stage}
                    onClick={() => setActiveCycleStage(stage)}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium tracking-wider transition-colors ${
                      isActive
                        ? 'bg-emerald-500 text-white font-bold shadow-xs'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {idx + 1}. {stage}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center space-x-3 text-slate-400">
            <span>República de Moçambique</span>
            <span className="h-3 w-px bg-slate-700"></span>
            <span>MTA & INGD Alinhado</span>
            <span className="h-3 w-px bg-slate-700"></span>
            <span className="inline-flex items-center text-emerald-400 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse mr-1"></span>
              Rede Nacional Ativa
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center space-x-3 text-left focus:outline-none"
            >
              <img
                src="/assets/img/imagens/logo/ECOMZ-LOGO-09.svg"
                alt="ECO-MZ 360 Logo"
                className="h-10 w-auto max-w-[160px] sm:max-w-[190px] object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                }}
              />
              <div className="border-l border-slate-200 pl-3 hidden lg:block">
                <p className="text-[11px] font-bold text-slate-900 tracking-tight leading-tight">
                  ECO-MZ 360
                </p>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Observação & Gestão Ambiental
                </p>
              </div>
            </button>
          </div>

          {/* Search Bar (Matching Mockup 17_08_41 & 17_13_44) */}
          <div className="hidden md:flex items-center flex-1 max-w-xs mx-2">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Pesquisar no sistema..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden 2xl:flex items-center space-x-0.5">
            {navItems.slice(0, 7).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.urgent && (
                    <span className="ml-1 px-1.5 py-0.2 bg-rose-500 text-white text-[9px] rounded-full font-bold animate-pulse">
                      3
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Weather, Alerts Bell, EcoBot & Profile (Matching Mockups) */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Weather & Time Widget (Exact text from mockup 17_13_44) */}
            <div className="hidden lg:flex items-center space-x-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-xl text-[11px] text-slate-600">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-medium">Seg, 26 de Maio de 2025 • 14:35</span>
            </div>

            {/* Notification Bell with Badge 3 (From mockups) */}
            <button
              onClick={() => setActiveTab('alertas')}
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors border border-transparent hover:border-slate-200"
              title="3 Alertas Ativos no Sistema"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
            </button>

            {/* Chat Icon / EcoBot Trigger */}
            <button
              onClick={() => setActiveTab('ecobot')}
              className={`p-2 rounded-xl text-xs font-medium flex items-center space-x-1.5 border transition-all ${
                activeTab === 'ecobot'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}
              title="Abrir Assistente EcoBot MZ com Gemini"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline font-bold">EcoBot MZ</span>
            </button>

            {/* User Profile Pill: Noé Samuel (Administrador) as in mockups */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs ring-2 ring-emerald-200">
                NS
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">Noé Samuel</p>
                <div className="flex items-center space-x-1">
                  <select
                    id="role-select"
                    value={activeRole}
                    onChange={(e) => setActiveRole(e.target.value as UserRole)}
                    className="bg-transparent text-[10px] text-slate-500 font-semibold focus:outline-none cursor-pointer p-0"
                  >
                    <option value="admin">Administrador</option>
                    <option value="gestor">Gestor</option>
                    <option value="tecnico">Técnico</option>
                    <option value="cidadao">Cidadão</option>
                    <option value="instituicao">Instituição</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="2xl:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="2xl:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-4 space-y-1">
          <div className="py-2 mb-2 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-500 mb-1">Mudar Etapa do Ciclo:</p>
            <div className="flex flex-wrap gap-1">
              {CYCLE_STAGES.map((stage) => (
                <button
                  key={stage}
                  onClick={() => {
                    setActiveCycleStage(stage);
                  }}
                  className={`text-[10px] px-2 py-1 rounded font-medium ${
                    activeCycleStage === stage
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-lg text-xs font-semibold flex items-center space-x-2 text-left ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="truncate">
                    <p className="leading-tight">{item.label}</p>
                    <p className="text-[10px] text-slate-400 font-normal leading-tight">{item.badge}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
