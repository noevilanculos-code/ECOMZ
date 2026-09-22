import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { EcoMap } from './components/EcoMap';
import { EcoCitizen } from './components/EcoCitizen';
import { EcoPulse } from './components/EcoPulse';
import { EcoDiag } from './components/EcoDiag';
import { EcoSim } from './components/EcoSim';
import { EcoDash } from './components/EcoDash';
import { EcoMainDashboard } from './components/EcoMainDashboard';
import { EcoMockupViewer } from './components/EcoMockupViewer';
import { EcoProjects } from './components/EcoProjects';
import { EcoAction } from './components/EcoAction';
import { EcoEdu } from './components/EcoEdu';
import { EcoCommunity } from './components/EcoCommunity';
import { EcoAlerts } from './components/EcoAlerts';
import { EcoCertData } from './components/EcoCertData';
import { EcoForms } from './components/EcoForms';
import { PhpMysqlStack } from './components/PhpMysqlStack';
import { OccurrenceModal } from './components/OccurrenceModal';
import { ProjectModal } from './components/ProjectModal';
import { EcoBotModal } from './components/EcoBotModal';
import { GeminiChatbot } from './components/GeminiChatbot';

import {
  Occurrence,
  EnvironmentalProject,
  UserRole,
  CycleStage,
  MozambiqueProvince,
  OccurrenceStatus
} from './types';
import { INITIAL_OCCURRENCES, INITIAL_PROJECTS, INITIAL_ALERTS } from './data/mockData';
import {
  MapPin,
  AlertTriangle,
  Activity,
  Cpu,
  Sliders,
  TreePine,
  Briefcase,
  Users,
  Award,
  Sparkles,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

export const App: React.FC = () => {
  // Navigation & Role states
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeRole, setActiveRole] = useState<UserRole>('admin');
  const [activeCycleStage, setActiveCycleStage] = useState<CycleStage>('OBSERVAR');

  // Sub-tab states for navigation groupings
  const [territorySubTab, setTerritorySubTab] = useState<'mapa' | 'cidadao' | 'pulso'>('mapa');
  const [analysisSubTab, setAnalysisSubTab] = useState<'diagnostico' | 'simulador'>('diagnostico');
  const [projectsSubTab, setProjectsSubTab] = useState<'projetos' | 'acao'>('projetos');
  const [participationSubTab, setParticipationSubTab] = useState<'comunidade' | 'selo'>('comunidade');

  // Core Data States
  const [occurrences, setOccurrences] = useState<Occurrence[]>(INITIAL_OCCURRENCES);
  const [projects, setProjects] = useState<EnvironmentalProject[]>(INITIAL_PROJECTS);
  const [selectedProvince, setSelectedProvince] = useState<MozambiqueProvince | 'Todas'>('Todas');

  // Modal States
  const [selectedOccurrence, setSelectedOccurrence] = useState<Occurrence | null>(null);
  const [selectedProject, setSelectedProject] = useState<EnvironmentalProject | null>(null);
  const [isEcoBotOpen, setIsEcoBotOpen] = useState<boolean>(false);

  // Handlers
  const handleAddOccurrence = (newOcc: Occurrence) => {
    setOccurrences((prev) => [newOcc, ...prev]);
    // Auto-advance cycle stage
    setActiveCycleStage('LOCALIZAR');
  };

  const handleUpdateOccurrenceStatus = (
    occId: string,
    newStatus: OccurrenceStatus,
    note?: string
  ) => {
    setOccurrences((prev) =>
      prev.map((occ) => {
        if (occ.id === occId) {
          return {
            ...occ,
            status: newStatus,
            actionSummary: note || occ.actionSummary
          };
        }
        return occ;
      })
    );
  };

  const handleCreateProject = (newProj: EnvironmentalProject) => {
    setProjects((prev) => [newProj, ...prev]);
    setActiveCycleStage('PLANEAR');
  };

  const handleExportSimToProject = (draft: Partial<EnvironmentalProject>) => {
    const newProj: EnvironmentalProject = {
      id: `proj-${Date.now()}`,
      title: draft.title || 'Projeto Gerado no Simulador',
      category: draft.category || 'Desmatamento',
      province: draft.province || 'Sofala',
      district: draft.district || 'Beira',
      leadEntity: draft.leadEntity || 'Consórcio ECO-MZ',
      status: 'Planeado',
      progress: 0,
      budgetTotalMZN: draft.budgetTotalMZN || 2500000,
      budgetRaisedMZN: 0,
      startDate: new Date().toISOString().substring(0, 10),
      targetDate: '2028-12-31',
      description: draft.description || '',
      keyMetric: draft.keyMetric || 'Área recuperada',
      keyMetricAchieved: draft.keyMetricAchieved || '0 / 100 meta',
      volunteerSpots: draft.volunteerSpots || 40,
      volunteersEnrolled: 0
    };
    setProjects((prev) => [newProj, ...prev]);
    setActiveTab('projetos');
    setProjectsSubTab('projetos');
    setActiveCycleStage('PLANEAR');
  };

  const handleEnrollVolunteerInProject = (projectId: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId ? { ...p, volunteersEnrolled: p.volunteersEnrolled + 1 } : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Primary Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'ecobot') {
            setIsEcoBotOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        activeCycleStage={activeCycleStage}
        setActiveCycleStage={setActiveCycleStage}
        urgentAlertCount={INITIAL_ALERTS.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Subtabs Bar for Grouped Modules */}
        {activeTab === 'territorio' && (
          <div className="mb-6 bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-2 overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => setTerritorySubTab('mapa')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                territorySubTab === 'mapa'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>ECO-MAP (Mapa Interativo & Camadas)</span>
            </button>
            <button
              onClick={() => setTerritorySubTab('cidadao')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                territorySubTab === 'cidadao'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>ECO-CITIZEN (Reportar & Rastrear Protocolos)</span>
            </button>
            <button
              onClick={() => setTerritorySubTab('pulso')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                territorySubTab === 'pulso'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Activity className="w-4 h-4 text-blue-400" />
              <span>ECO-PULSE (Fluxo em Tempo Real)</span>
            </button>
          </div>
        )}

        {activeTab === 'analise' && (
          <div className="mb-6 bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-2 overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => setAnalysisSubTab('diagnostico')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                analysisSubTab === 'diagnostico'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>ECO-DIAG (Matriz de Risco & Sazonalidade)</span>
            </button>
            <button
              onClick={() => setAnalysisSubTab('simulador')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                analysisSubTab === 'simulador'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>ECO-SIM (Simulador de Cenários & CO₂)</span>
            </button>
          </div>
        )}

        {activeTab === 'projetos' && (
          <div className="mb-6 bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-2 overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => setProjectsSubTab('projetos')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                projectsSubTab === 'projetos'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <TreePine className="w-4 h-4 text-emerald-400" />
              <span>ECO-PROJECTS (Programas & Orçamentos)</span>
            </button>
            <button
              onClick={() => setProjectsSubTab('acao')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                projectsSubTab === 'acao'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-4 h-4 text-blue-400" />
              <span>ECO-ACTION (Brigadas & Tarefas de Terreno)</span>
            </button>
          </div>
        )}

        {activeTab === 'participacao' && (
          <div className="mb-6 bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-2 overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => setParticipationSubTab('comunidade')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                participationSubTab === 'comunidade'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4 text-teal-400" />
              <span>ECO-COMMUNITY (Voluntariado & Fórum)</span>
            </button>
            <button
              onClick={() => setParticipationSubTab('selo')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                participationSubTab === 'selo'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>ECO-CERT (Selo Verde Moçambique)</span>
            </button>
          </div>
        )}

        {/* View Switcher Router */}
        {activeTab === 'territorio' && (
          <>
            {territorySubTab === 'mapa' && (
              <EcoMap
                occurrences={occurrences}
                selectedProvince={selectedProvince}
                setSelectedProvince={setSelectedProvince}
                onSelectOccurrence={(occ) => setSelectedOccurrence(occ)}
                onNewReport={() => setTerritorySubTab('cidadao')}
              />
            )}
            {territorySubTab === 'cidadao' && (
              <EcoCitizen
                onAddOccurrence={handleAddOccurrence}
                occurrences={occurrences}
              />
            )}
            {territorySubTab === 'pulso' && (
              <EcoPulse
                occurrences={occurrences}
                onSelectOccurrence={(occ) => setSelectedOccurrence(occ)}
              />
            )}
          </>
        )}

        {activeTab === 'analise' && (
          <>
            {analysisSubTab === 'diagnostico' && <EcoDiag />}
            {analysisSubTab === 'simulador' && (
              <EcoSim onExportToProject={handleExportSimToProject} />
            )}
          </>
        )}

        {activeTab === 'dashboard' && (
          <EcoMainDashboard
            occurrences={occurrences}
            projects={projects}
            onSelectOccurrence={(occ) => setSelectedOccurrence(occ)}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onNewOccurrence={() => {
              setActiveTab('territorio');
              setTerritorySubTab('cidadao');
            }}
            onNewProject={() => {
              setActiveTab('projetos');
              setProjectsSubTab('projetos');
            }}
            onNavigateToTab={(tab) => setActiveTab(tab)}
            onOpenEcoBot={() => setActiveTab('ecobot')}
          />
        )}

        {activeTab === 'mockups' && (
          <EcoMockupViewer onNavigateToTab={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'analitico' && (
          <EcoDash
            activeRole={activeRole}
            occurrences={occurrences}
            projects={projects}
          />
        )}

        {activeTab === 'projetos' && (
          <>
            {projectsSubTab === 'projetos' && (
              <EcoProjects
                projects={projects}
                onSelectProject={(proj) => setSelectedProject(proj)}
                onNewProject={handleCreateProject}
              />
            )}
            {projectsSubTab === 'acao' && (
              <EcoAction projects={projects} occurrences={occurrences} />
            )}
          </>
        )}

        {activeTab === 'participacao' && (
          <>
            {participationSubTab === 'comunidade' && <EcoCommunity />}
            {participationSubTab === 'selo' && (
              <EcoCertData occurrences={occurrences} />
            )}
          </>
        )}

        {activeTab === 'alertas' && <EcoAlerts />}

        {activeTab === 'forms' && <EcoForms />}

        {activeTab === 'php-mysql' && <PhpMysqlStack />}

        {activeTab === 'educacao' && <EcoEdu />}

        {activeTab === 'dados-api' && (
          <EcoCertData occurrences={occurrences} />
        )}

        {activeTab === 'ecobot' && (
          <section className="space-y-6">
            <div className="bg-linear-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-6 text-white shadow-xl border border-slate-700/60">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Google Gemini 3.5 & Grounding Ativo</span>
                  </div>
                  <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                    EcoBot MZ • Assistente de Inteligência Ambiental
                  </h1>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
                    Chat multi-turn com papéis especializados (Fiscal da Lei 20/97, Gestor de Conservação, Cientista Climático e Facilitador Comunitário), suporte a pesquisa em tempo real com <strong>Google Search Grounding</strong> e locais verificados com <strong>Google Maps Grounding</strong>.
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start md:self-auto">
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                    Multi-Turn & Grounding
                  </span>
                </div>
              </div>
            </div>

            <GeminiChatbot embedded={true} />
          </section>
        )}
      </main>

      {/* Floating EcoBot Quick Access Button */}
      <button
        onClick={() => setIsEcoBotOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg flex items-center space-x-2 transition-all hover:scale-105 active:scale-95 group"
        title="Consultar Assistente EcoBot MZ"
      >
        <Sparkles className="w-5 h-5 text-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold">
          EcoBot MZ
        </span>
      </button>

      {/* Modals */}
      <OccurrenceModal
        occurrence={selectedOccurrence}
        onClose={() => setSelectedOccurrence(null)}
        onUpdateStatus={handleUpdateOccurrenceStatus}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEnrollVolunteer={handleEnrollVolunteerInProject}
      />

      <EcoBotModal
        isOpen={isEcoBotOpen}
        onClose={() => setIsEcoBotOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">ECO-MZ 360</span>
            <span>— Plataforma Inteligente de Gestão Ambiental de Moçambique</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>República de Moçambique</span>
            <span>•</span>
            <span>MTA / INGD Alinhado</span>
            <span>•</span>
            <span>Versão 1.1</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
