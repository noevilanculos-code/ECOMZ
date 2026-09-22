export type CycleStage =
  | 'OBSERVAR'
  | 'LOCALIZAR'
  | 'DIAGNOSTICAR'
  | 'SIMULAR'
  | 'PLANEAR'
  | 'EXECUTAR'
  | 'MONITORIZAR'
  | 'AVALIAR'
  | 'INFORMAR';

export type UserRole = 'cidadao' | 'tecnico' | 'gestor' | 'instituicao' | 'admin';

export type EnvironmentalCategory =
  | 'Desmatamento'
  | 'Queimadas Descontroladas'
  | 'Poluição Hídrica'
  | 'Erosão Costeira/Pluvial'
  | 'Resíduos Sólidos Urbanos'
  | 'Destruição de Mangais'
  | 'Caça Furtiva & Biodiversidade'
  | 'Mineração Ilegal';

export type SeverityLevel = 'Baixo' | 'Médio' | 'Alto' | 'Crítico';

export type OccurrenceStatus =
  | 'Recebido'
  | 'Em Validação'
  | 'Validado'
  | 'Em Intervenção'
  | 'Resolvido';

export type MozambiqueProvince =
  | 'Cabo Delgado'
  | 'Niassa'
  | 'Nampula'
  | 'Zambézia'
  | 'Tete'
  | 'Manica'
  | 'Sofala'
  | 'Inhambane'
  | 'Gaza'
  | 'Maputo Província'
  | 'Maputo Cidade';

export interface Occurrence {
  id: string;
  protocol: string;
  title: string;
  category: EnvironmentalCategory;
  severity: SeverityLevel;
  province: MozambiqueProvince;
  district: string;
  locationDetails: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  reportedBy: string;
  isAnonymous: boolean;
  timestamp: string;
  status: OccurrenceStatus;
  description: string;
  imageUrl?: string;
  validationScore: number;
  assignedTeam?: string;
  actionSummary?: string;
}

export interface EnvironmentalProject {
  id: string;
  title: string;
  category: EnvironmentalCategory;
  province: MozambiqueProvince;
  district: string;
  leadEntity: string;
  status: 'Planeado' | 'Em Execução' | 'Concluído';
  progress: number;
  budgetTotalMZN: number;
  budgetRaisedMZN: number;
  startDate: string;
  targetDate: string;
  description: string;
  keyMetric: string;
  keyMetricAchieved: string;
  volunteerSpots: number;
  volunteersEnrolled: number;
}

export interface FieldActionTask {
  id: string;
  projectId: string;
  title: string;
  assignedTechnician: string;
  deadline: string;
  status: 'Pendente' | 'Em Andamento' | 'Concluída';
  province: MozambiqueProvince;
  location: string;
  evidenceBefore?: string;
  evidenceAfter?: string;
  notes: string;
}

export interface VolunteerOpportunity {
  id: string;
  projectId: string;
  title: string;
  location: string;
  province: MozambiqueProvince;
  district?: string;
  date: string;
  hoursCredit: number;
  spotsTotal: number;
  spotsTaken: number;
  badgeName: string;
  description: string;
  requirements: string[];
  category?: string;
  spots?: number;
  enrolled?: number;
}

export interface GreenSealCert {
  id: string;
  institutionName: string;
  category: 'Empresa Privada' | 'ONG' | 'Comunidade Local' | 'Escola/Universidade';
  province: MozambiqueProvince;
  score: number;
  status: 'Certificado Ativo' | 'Em Auditoria' | 'Renovação Pendente';
  sealLevel: 'Ouro' | 'Prata' | 'Bronze';
  validUntil: string;
  achievements: string[];
}

export interface EarlyAlert {
  id: string;
  type: string;
  level: SeverityLevel | 'Vermelho' | 'Laranja' | 'Amarelo';
  affectedProvinces?: MozambiqueProvince[];
  affectedDistricts?: string[];
  issuedAt: string;
  expiresAt?: string;
  headline?: string;
  title?: string;
  threat?: string;
  instructions?: string;
  recommendations: string[];
  source: string;
  active: boolean;
}

export type EnvironmentalAlert = EarlyAlert;

export interface EducationalModule {
  id: string;
  title: string;
  topic?: 'Florestas & Biodiversidade' | 'Água & Bacias Hidrográficas' | 'Resíduos & Economia Circular' | 'Clima & Adaptação' | string;
  level?: string;
  duration?: string;
  readingTimeMin?: number;
  summary?: string;
  description?: string;
  lessonsCount?: number;
  keyLessons?: string[];
  quizQuestions?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
  }[];
}

export interface SimulationParams {
  scenarioName: string;
  reforestationHectares: number;
  wasteRecyclingRate: number;
  mangroveRestorationKm: number;
  cleanEnergyBudgetMZN: number;
  targetYears: 1 | 5 | 10;
}
