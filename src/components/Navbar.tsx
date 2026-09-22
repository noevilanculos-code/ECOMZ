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
  CheckCircle2
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
    { id: 'territorio', label: 'Território & Mapa', icon: Globe2, badge: 'ECO-MAP / CITIZEN' },
    { id: 'analise', label: 'Diagnóstico & Simulação', icon: Cpu, badge: 'ECO-DIAG / SIM' },
    { id: 'dashboard', label: 'Painel Analítico', icon: BarChart3, badge: 'ECO-DASH' },
    { id: 'projetos', label: 'Ação & Projetos', icon: TreePine, badge: 'ECO-PROJECTS / ACTION' },
    { id: 'participacao', label: 'Voluntariado & Selo', icon: Users, badge: 'VOLUNTEER / CERT' },
    { id: 'alertas', label: 'Alertas & Defesa', icon: ShieldAlert, badge: `${urgentAlertCount} Ativos`, urgent: urgentAlertCount > 0 },
    { id: 'educacao', label: 'Educação & Fórum', icon: Compass, badge: 'ECO-EDU' },
    { id: 'dados-api', label: 'Dados & API', icon: FileSpreadsheet, badge: 'ECO-DATA / API' }
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
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab('territorio')}
              className="flex items-center space-x-3 text-left focus:outline-none"
            >
              <img
                src="/assets/img/imagens/logo/ECOMZ-LOGO-09.svg"
                alt="ECO-MZ 360 Logo"
                className="h-11 w-auto max-w-[170px] sm:max-w-[210px] object-contain"
                onError={(e) => {
                  // Fallback to text + icon if svg rendering fails
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

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.urgent && (
                    <span className="ml-1 px-1.5 py-0.2 bg-rose-500 text-white text-[9px] rounded-full font-bold animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Role Selector & Assistant Button */}
          <div className="flex items-center space-x-2">
            {/* User Role Switcher Dropdown */}
            <div className="relative inline-block text-left">
              <label htmlFor="role-select" className="sr-only">Perfil de Utilizador</label>
              <div className="flex items-center space-x-1 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <select
                  id="role-select"
                  value={activeRole}
                  onChange={(e) => setActiveRole(e.target.value as UserRole)}
                  className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer pr-1"
                >
                  <option value="cidadao">Cidadão</option>
                  <option value="tecnico">Técnico</option>
                  <option value="gestor">Gestor</option>
                  <option value="instituicao">Instituição</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            </div>

            {/* EcoBot Trigger */}
            <button
              onClick={() => setActiveTab('ecobot')}
              className={`p-2 rounded-lg text-xs font-medium flex items-center space-x-1.5 border transition-all ${
                activeTab === 'ecobot'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}
              title="Abrir Assistente EcoBot MZ"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline font-semibold">EcoBot MZ</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-4 space-y-1">
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
