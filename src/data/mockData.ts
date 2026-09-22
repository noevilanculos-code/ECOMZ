import {
  Occurrence,
  EnvironmentalProject,
  FieldActionTask,
  VolunteerOpportunity,
  GreenSealCert,
  EarlyAlert,
  EducationalModule,
  MozambiqueProvince
} from '../types';

export interface ProvinceInfo {
  name: MozambiqueProvince;
  capital: string;
  population: string;
  areaKm2: string;
  lat: number;
  lng: number;
  vulnerabilityIndex: number; // 0 - 100
  dominantThreats: string[];
}

export const MOZAMBIQUE_PROVINCES: Record<MozambiqueProvince, ProvinceInfo> = {
  'Cabo Delgado': {
    name: 'Cabo Delgado',
    capital: 'Pemba',
    population: '2.3M',
    areaKm2: '82.625 km²',
    lat: -12.9732,
    lng: 40.5178,
    vulnerabilityIndex: 78,
    dominantThreats: ['Destruição de Mangais', 'Garimpo Ilegal de Rubis', 'Erosão Costeira']
  },
  'Niassa': {
    name: 'Niassa',
    capital: 'Lichinga',
    population: '1.8M',
    areaKm2: '129.056 km²',
    lat: -13.3128,
    lng: 35.2406,
    vulnerabilityIndex: 64,
    dominantThreats: ['Queimadas Descontroladas', 'Desmatamento Florestal', 'Caça Furtiva']
  },
  'Nampula': {
    name: 'Nampula',
    capital: 'Nampula',
    population: '6.1M',
    areaKm2: '81.606 km²',
    lat: -15.1165,
    lng: 39.2666,
    vulnerabilityIndex: 72,
    dominantThreats: ['Resíduos Sólidos Urbanos', 'Degradação de Solos', 'Erosão Pluvial']
  },
  'Zambézia': {
    name: 'Zambézia',
    capital: 'Quelimane',
    population: '5.1M',
    areaKm2: '105.008 km²',
    lat: -17.8786,
    lng: 36.8883,
    vulnerabilityIndex: 85,
    dominantThreats: ['Inundações Cíclicas', 'Desmatamento de Madeiras Nativas', 'Degradação de Mangais']
  },
  'Tete': {
    name: 'Tete',
    capital: 'Tete',
    population: '2.7M',
    areaKm2: '100.724 km²',
    lat: -16.1564,
    lng: 33.5863,
    vulnerabilityIndex: 69,
    dominantThreats: ['Poluição por Poeiras de Carvão', 'Poluição Hídrica no Rio Zambeze', 'Seca Severa']
  },
  'Manica': {
    name: 'Manica',
    capital: 'Chimoio',
    population: '1.9M',
    areaKm2: '61.661 km²',
    lat: -19.1164,
    lng: 33.4833,
    vulnerabilityIndex: 61,
    dominantThreats: ['Garimpo Fluvial de Ouro', 'Contaminação de Rios por Mercúrio', 'Erosão']
  },
  'Sofala': {
    name: 'Sofala',
    capital: 'Beira',
    population: '2.2M',
    areaKm2: '68.018 km²',
    lat: -19.8436,
    lng: 34.8389,
    vulnerabilityIndex: 91,
    dominantThreats: ['Ciclones Tropicais', 'Erosão Costeira Crítica', 'Inundações da Bacia do Púnguè']
  },
  'Inhambane': {
    name: 'Inhambane',
    capital: 'Inhambane',
    population: '1.5M',
    areaKm2: '68.615 km²',
    lat: -23.8650,
    lng: 35.3833,
    vulnerabilityIndex: 66,
    dominantThreats: ['Erosão de Dunas Costeiras', 'Pesca Precocious', 'Degradação de Recifes de Coral']
  },
  'Gaza': {
    name: 'Gaza',
    capital: 'Xai-Xai',
    population: '1.4M',
    areaKm2: '75.709 km²',
    lat: -25.0444,
    lng: 33.6406,
    vulnerabilityIndex: 74,
    dominantThreats: ['Seca Extrema no Alto Limpopo', 'Cheias no Baixo Limpopo', 'Salinização de Terrenos']
  },
  'Maputo Província': {
    name: 'Maputo Província',
    capital: 'Matola',
    population: '2.0M',
    areaKm2: '26.058 km²',
    lat: -25.9622,
    lng: 32.4589,
    vulnerabilityIndex: 68,
    dominantThreats: ['Poluição Industrial no Rio Matola', 'Ocupação Desordenada de Zonas Húmidas', 'Resíduos']
  },
  'Maputo Cidade': {
    name: 'Maputo Cidade',
    capital: 'Maputo',
    population: '1.1M',
    areaKm2: '347 km²',
    lat: -25.9692,
    lng: 32.5732,
    vulnerabilityIndex: 63,
    dominantThreats: ['Depósitos Ilegais de Lixo', 'Inundações Urbanas no Bairro Hulene', 'Poluição da Baía']
  }
};

export const INITIAL_OCCURRENCES: Occurrence[] = [
  {
    id: 'occ-001',
    protocol: 'ECO-2026-MZ-001',
    title: 'Corte Ilegal e Queimada em Mangais de Munhava',
    category: 'Destruição de Mangais',
    severity: 'Crítico',
    province: 'Sofala',
    district: 'Beira',
    locationDetails: 'Entorno do Rio Maria, Bairro Munhava-Matope',
    coordinates: { lat: -19.8211, lng: 34.8562 },
    reportedBy: 'Elias Mufunde',
    isAnonymous: false,
    timestamp: '2026-09-21 09:30',
    status: 'Em Intervenção',
    description: 'Abate massivo de mangleiros para produção de lenha e carvão vegetal com desestabilização da barreira de maré.',
    imageUrl: '/assets/img/imagens/ChatGPT Image 18 de set. de 2026, 17_07_09.png',
    validationScore: 96,
    assignedTeam: 'Brigada Florestal SDAE Beira',
    actionSummary: 'Notificação emitida, apreensão de fornos clandestinos e plantio de 400 propágulos.'
  },
  {
    id: 'occ-002',
    protocol: 'ECO-2026-MZ-002',
    title: 'Foco de Queimada Descontrolada no Corredor de Marrupa',
    category: 'Queimadas Descontroladas',
    severity: 'Alto',
    province: 'Niassa',
    district: 'Marrupa',
    locationDetails: 'Ao longo da EN14, proximidade do Parque Nacional do Niassa',
    coordinates: { lat: -13.1842, lng: 37.5211 },
    reportedBy: 'Comunidade Nativa',
    isAnonymous: true,
    timestamp: '2026-09-20 14:15',
    status: 'Validado',
    description: 'Fogo descontrolado para abertura de machambas ameaçando a reserva florestal comunitária e fauna silvestre.',
    imageUrl: '/assets/img/imagens/ChatGPT Image 18 de set. de 2026, 17_08_41.png',
    validationScore: 89,
    assignedTeam: 'Guarda Florestal ANAC Niassa'
  },
  {
    id: 'occ-003',
    protocol: 'ECO-2026-MZ-003',
    title: 'Descarga de Efluentes no Rio Infulene',
    category: 'Poluição Hídrica',
    severity: 'Crítico',
    province: 'Maputo Província',
    district: 'Matola',
    locationDetails: 'Vale do Infulene, próximo à ponte da Av. 24 de Julho',
    coordinates: { lat: -25.9315, lng: 32.5312 },
    reportedBy: 'Joel Ali Viano',
    isAnonymous: false,
    timestamp: '2026-09-19 11:20',
    status: 'Em Intervenção',
    description: 'Água com forte odor químico e coloração cinzenta escura contaminando machambas hortícolas irrigadas no vale.',
    imageUrl: '/assets/img/imagens/ChatGPT Image 18 de set. de 2026, 17_13_44.png',
    validationScore: 94,
    assignedTeam: 'AQUA - Agência Nacional de Qualidade Ambiental'
  },
  {
    id: 'occ-004',
    protocol: 'ECO-2026-MZ-004',
    title: 'Ravina de Erosão Ameaçando Habitações em Maxixe',
    category: 'Erosão Costeira/Pluvial',
    severity: 'Alto',
    province: 'Inhambane',
    district: 'Maxixe',
    locationDetails: 'Bairro Agostinho Neto, encosta da Baía de Inhambane',
    coordinates: { lat: -23.8589, lng: 35.3481 },
    reportedBy: 'Comité de Gestão de Riscos',
    isAnonymous: false,
    timestamp: '2026-09-18 16:45',
    status: 'Validado',
    description: 'Desmoronamento acelerado de solo arenoso após as últimas chuvas com risco iminente de colapso de 14 casas.',
    validationScore: 91,
    assignedTeam: 'Conselho Municipal da Cidade de Maxixe'
  },
  {
    id: 'occ-005',
    protocol: 'ECO-2026-MZ-005',
    title: 'Acumulação Crítica de Resíduos no Mercado de Hulene',
    category: 'Resíduos Sólidos Urbanos',
    severity: 'Médio',
    province: 'Maputo Cidade',
    district: 'Kamavota',
    locationDetails: 'Adjacente à circular de Maputo, Hulene B',
    coordinates: { lat: -25.9082, lng: 32.5891 },
    reportedBy: 'Roque Armando',
    isAnonymous: false,
    timestamp: '2026-09-17 08:10',
    status: 'Resolvido',
    description: 'Lixeira a céu aberto obstruindo via secundária de drenagem pluvial.',
    validationScore: 88,
    assignedTeam: 'Direcção Municipal de Salubridade',
    actionSummary: 'Recolha de 28 toneladas e colocação de contentores de 1100L com vigilância comunitária.'
  }
];

export const INITIAL_PROJECTS: EnvironmentalProject[] = [
  {
    id: 'proj-001',
    title: 'Restauração Ecológica dos Mangais da Costa da Beira',
    category: 'Destruição de Mangais',
    province: 'Sofala',
    district: 'Beira & Dondo',
    leadEntity: 'Associação Amigos do Mangal de Sofala & UEM',
    status: 'Em Execução',
    progress: 68,
    budgetTotalMZN: 4500000,
    budgetRaisedMZN: 3250000,
    startDate: '2025-10-01',
    targetDate: '2027-03-31',
    description: 'Plantio de 120.000 propágulos de Avicennia marina e Rhizophora mucronata para reconstrução da defesa costeira natural.',
    keyMetric: 'Hectares de mangal replantados',
    keyMetricAchieved: '82 ha / 120 ha',
    volunteerSpots: 250,
    volunteersEnrolled: 198
  },
  {
    id: 'proj-002',
    title: 'Brigadas Comunitárias de Prevenção de Queimadas no Niassa',
    category: 'Queimadas Descontroladas',
    province: 'Niassa',
    district: 'Lichinga, Marrupa & Mecula',
    leadEntity: 'Rede Ambiental de Lichinga & ANAC',
    status: 'Em Execução',
    progress: 52,
    budgetTotalMZN: 2800000,
    budgetRaisedMZN: 2100000,
    startDate: '2026-01-15',
    targetDate: '2026-11-30',
    description: 'Criação de faixas corta-fogo em 450 km de florestas miombo e capacitação de 35 comités rurais em queima prescrita.',
    keyMetric: 'Quilómetros de corta-fogo protegidos',
    keyMetricAchieved: '240 km / 450 km',
    volunteerSpots: 180,
    volunteersEnrolled: 142
  },
  {
    id: 'proj-003',
    title: 'Bacia Viva: Recuperação e Monitorização do Rio Zambeze',
    category: 'Poluição Hídrica',
    province: 'Tete',
    district: 'Tete & Moatize',
    leadEntity: 'ARA-Zambeze & Instituto Superior Politécnico de Tete',
    status: 'Em Execução',
    progress: 41,
    budgetTotalMZN: 6200000,
    budgetRaisedMZN: 3800000,
    startDate: '2025-08-01',
    targetDate: '2027-12-31',
    description: 'Instalação de sensores de qualidade da água, filtros biológicos ribeirinhos e despoluição de tributários mineiros.',
    keyMetric: 'Pontos de água revitalizados',
    keyMetricAchieved: '16 / 35 estações',
    volunteerSpots: 120,
    volunteersEnrolled: 85
  },
  {
    id: 'proj-004',
    title: 'Economia Circular e Reciclagem Comunitária em Nampula',
    category: 'Resíduos Sólidos Urbanos',
    province: 'Nampula',
    district: 'Nampula & Nacala',
    leadEntity: 'Cooperativa Verde Nampula & UniLúrio',
    status: 'Planeado',
    progress: 18,
    budgetTotalMZN: 3100000,
    budgetRaisedMZN: 850000,
    startDate: '2026-04-01',
    targetDate: '2027-06-30',
    description: 'Ecopontos de triagem de plástico e vidro geridos por cooperativas de catadores locais com prensas solares.',
    keyMetric: 'Toneladas de plástico recolhidas por mês',
    keyMetricAchieved: '14 t / 80 t meta',
    volunteerSpots: 90,
    volunteersEnrolled: 34
  }
];

export const INITIAL_TASKS: FieldActionTask[] = [
  {
    id: 'tsk-001',
    projectId: 'proj-001',
    title: 'Monitorização da Sobrevivência de Propágulos na Ilha dos Amores',
    assignedTechnician: 'Dra. Amina Bacar (Técnica Sénior)',
    deadline: '2026-09-28',
    status: 'Em Andamento',
    province: 'Sofala',
    location: 'Estuário do Rio Púnguè, Beira',
    notes: 'Taxa de enraizamento estimada em 84% após 3 meses do plantio.'
  },
  {
    id: 'tsk-002',
    projectId: 'proj-002',
    title: 'Abertura de Faixa Corta-Fogo de 20 metros no Perímetro do Miombo',
    assignedTechnician: 'Eng. Mateus Tembe',
    deadline: '2026-10-05',
    status: 'Pendente',
    province: 'Niassa',
    location: 'Comunidade de Chimbunila',
    notes: 'Coordenação com o líder tradicional local e fornecimento de sachos e abafadores.'
  },
  {
    id: 'tsk-003',
    projectId: 'proj-003',
    title: 'Coleta de Amostras Físico-Químicas no Rio Revúboè',
    assignedTechnician: 'Téc. Fernando Chissano',
    deadline: '2026-09-25',
    status: 'Concluída',
    province: 'Tete',
    location: 'Confluência Revúboè-Zambeze',
    notes: 'Parâmetros de pH e condutividade registados no módulo ECO-DATA.'
  }
];

export const INITIAL_VOLUNTEER_JOBS: VolunteerOpportunity[] = [
  {
    id: 'vol-001',
    projectId: 'proj-001',
    title: 'Grande Jornada de Plantio de Mangais na Beira',
    location: 'Praia Nova e Estuário do Búzi, Sofala',
    province: 'Sofala',
    date: '2026-10-04 (Domingo, 07:30)',
    hoursCredit: 6,
    spotsTotal: 100,
    spotsTaken: 72,
    badgeName: 'Guardião dos Mangais',
    description: 'Participação cívica com distribuição de botas, luvas e lanche para plantio intensivo na maré baixa.',
    requirements: ['Idade mínima de 16 anos', 'Calçado adequado para lama', 'Espírito de equipa']
  },
  {
    id: 'vol-002',
    projectId: 'proj-004',
    title: 'Brigada de Limpeza e Triagem na Baía de Nacala',
    location: 'Praia de Fernão Veloso, Nacala-Porto',
    province: 'Nampula',
    date: '2026-10-10 (Sábado, 08:00)',
    hoursCredit: 5,
    spotsTotal: 50,
    spotsTaken: 29,
    badgeName: 'Oceano Sem Plástico',
    description: 'Campanha costeira com pesagem de detritos e encaminhamento direto para trituração e reciclagem.',
    requirements: ['Protetor solar e chapéu', 'Inscrição confirmada na plataforma']
  },
  {
    id: 'vol-003',
    projectId: 'proj-002',
    title: 'Vigilância Comunitária e Sensibilização em Lichinga',
    location: 'Arredores de Meponda, Lago Niassa',
    province: 'Niassa',
    date: '2026-10-18 (Sábado, 09:00)',
    hoursCredit: 4,
    spotsTotal: 30,
    spotsTaken: 18,
    badgeName: 'Eco-Defensor do Miombo',
    description: 'Distribuição de folhetos educativos em Ciyao e Português sobre risco de queimadas descontroladas.',
    requirements: ['Comunicação fluida', 'Conhecimento da área rural']
  }
];

export const INITIAL_VOLUNTEER_OPPS = INITIAL_VOLUNTEER_JOBS;

export const INITIAL_SEALS: GreenSealCert[] = [
  {
    id: 'cert-001',
    institutionName: 'Portos e Caminhos de Ferro de Moçambique (CFM Centro)',
    category: 'Empresa Privada',
    province: 'Sofala',
    score: 93,
    status: 'Certificado Ativo',
    sealLevel: 'Ouro',
    validUntil: '2027-08-31',
    achievements: [
      'Gestão 100% controlada de resíduos perigosos no Porto da Beira',
      'Plano de transição para iluminação LED solar nos cais',
      'Financiamento de 3 viveiros comunitários de mangal'
    ]
  },
  {
    id: 'cert-002',
    institutionName: 'Universidade Eduardo Mondlane - Faculdade de Ciências',
    category: 'Escola/Universidade',
    province: 'Maputo Cidade',
    score: 89,
    status: 'Certificado Ativo',
    sealLevel: 'Ouro',
    validUntil: '2027-04-15',
    achievements: [
      'Campus com triagem seletiva e compostagem orgânica',
      'Laboratório aberto de monitorização da qualidade ambiental',
      'Pesquisas publicadas com dados integrados na ECO-API'
    ]
  },
  {
    id: 'cert-003',
    institutionName: 'Cooperativa Agrícola de Horticultores de Chókwè',
    category: 'Comunidade Local',
    province: 'Gaza',
    score: 81,
    status: 'Certificado Ativo',
    sealLevel: 'Prata',
    validUntil: '2026-12-31',
    achievements: [
      'Uso eficiente de irrigação gota-a-gota',
      'Redução de 60% no uso de pesticidas sintéticos'
    ]
  }
];

export const INITIAL_ALERTS: EarlyAlert[] = [
  {
    id: 'alt-001',
    type: 'Ciclone Tropical',
    level: 'Crítico',
    affectedProvinces: ['Sofala', 'Zambézia', 'Inhambane'],
    issuedAt: '2026-09-22 06:00',
    headline: 'Depressão Tropical em Intensificação no Canal de Moçambique',
    recommendations: [
      'Fixação preventiva de telhados e estruturas precárias',
      'Evacuação imediata de povoações em leitos de cheia dos rios Púnguè e Búzi',
      'Interrupção imediata da faina marítima e navegação costeira',
      'Armazenamento de água potável, alimentos não perecíveis e lanternas'
    ],
    source: 'Instituto Nacional de Meteorologia (INAM) / INGD',
    active: true
  },
  {
    id: 'alt-002',
    type: 'Risco Crítico de Queimada',
    level: 'Alto',
    affectedProvinces: ['Niassa', 'Tete', 'Manica'],
    issuedAt: '2026-09-21 12:00',
    headline: 'Ventos Fortes e Baixa Humidade (<20%) Elevam Alerta de Fogo',
    recommendations: [
      'Proibição absoluta de queima de machambas nas próximas 72 horas',
      'Manutenção preventiva das faixas corta-fogo ao redor de aldeias',
      'Notificação imediata no ECO-CITIZEN ou às autoridades florestais ao primeiro foco'
    ],
    source: 'Centro Nacional de Alerta Precoce (MTA)',
    active: true
  }
];

export const INITIAL_MODULES: EducationalModule[] = [
  {
    id: 'edu-001',
    title: 'Os Mangais de Moçambique: Muralha Natural e Berçário da Vida',
    topic: 'Florestas & Biodiversidade',
    readingTimeMin: 7,
    summary: 'Moçambique possui a terceira maior extensão de mangais de África. Descubra a sua relevância vital na proteção contra ciclones e na economia pesqueira.',
    keyLessons: [
      'As raízes aéreas amortecem até 66% da energia das ondas de tempestade.',
      'Mais de 70% das espécies de camarão e peixe comercial de Sofala e Zambézia dependem dos mangais para reprodução.',
      'Um hectare de mangal captura até 4 vezes mais carbono do que florestas tropicais terrestres.'
    ],
    quizQuestions: [
      {
        question: 'Qual é o principal papel dos mangais na proteção costeira de cidades como a Beira e Quelimane?',
        options: [
          'Apenas embelezar a costa',
          'Amortecer a energia das ondas e impedir a erosão marinha',
          'Aumentar o calor na praia',
          'Não têm função protetora'
        ],
        correctIndex: 1,
        explanation: 'As raízes entrelaçadas do mangal dissipam a força mecânica das ondas de maré e fixam os sedimentos de solo arenoso.'
      },
      {
        question: 'Em termos de carbono azul, qual é a capacidade de absorção dos mangais?',
        options: [
          'Capturam até 4 vezes mais carbono que florestas terrestres comuns',
          'Não absorvem carbono',
          'Capturam menos que capim seco',
          'Apenas armazenam oxigénio'
        ],
        correctIndex: 0,
        explanation: 'Os mangais armazenam carbono tanto na sua biomassa vegetal quanto nos sedimentos anaeróbios profundos por séculos.'
      }
    ]
  },
  {
    id: 'edu-002',
    title: 'Gestão Sustentável da Água e as Bacias Hidrográficas Nacionais',
    topic: 'Água & Bacias Hidrográficas',
    readingTimeMin: 6,
    summary: 'Dos rios internacionais que desaguam em Moçambique às bacias do Limpopo e Zambeze: como proteger o recurso mais precioso.',
    keyLessons: [
      'Mais de 50% da água doce de Moçambique provém de países a montante (Zimbabwe, Zâmbia, África do Sul).',
      'A preservação das matas ciliares nas margens é essencial para evitar o assoreamento dos rios.',
      'A Lei n.º 16/91 (Lei de Águas) consagra o princípio de que a água é património público do Estado.'
    ],
    quizQuestions: [
      {
        question: 'O que acontece aos rios quando a vegetação das margens (matas ciliares) é removida?',
        options: [
          'A água fica mais cristalina',
          'Ocorre assoreamento rápido, turvação e perda de caudal nos períodos secos',
          'O rio alarga sem consequências',
          'Não há impacto significativo'
        ],
        correctIndex: 1,
        explanation: 'As raízes das matas ciliares filtram sedimentos e poluentes. Sem elas, a terra desliza para o leito do rio causando assoreamento.'
      }
    ]
  }
];

export const INITIAL_EDU_MODULES = INITIAL_MODULES;
