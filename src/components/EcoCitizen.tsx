import React, { useState } from 'react';
import {
  Camera,
  MapPin,
  Shield,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  Upload,
  UserCheck,
  Award,
  Search,
  Clock
} from 'lucide-react';
import {
  Occurrence,
  MozambiqueProvince,
  EnvironmentalCategory,
  SeverityLevel
} from '../types';
import { MOZAMBIQUE_PROVINCES } from '../data/mockData';

interface EcoCitizenProps {
  onAddOccurrence: (newOcc: Occurrence) => void;
  occurrences: Occurrence[];
}

export const EcoCitizen: React.FC<EcoCitizenProps> = ({ onAddOccurrence, occurrences }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EnvironmentalCategory>('Destruição de Mangais');
  const [severity, setSeverity] = useState<SeverityLevel>('Médio');
  const [province, setProvince] = useState<MozambiqueProvince>('Sofala');
  const [district, setDistrict] = useState('');
  const [locationDetails, setLocationDetails] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reporterName, setReporterName] = useState('Noé Samuel Vilanculos');
  const [capturedCoords, setCapturedCoords] = useState<{ lat: number; lng: number }>({
    lat: -19.8211,
    lng: 34.8562
  });
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string>(
    '/assets/img/imagens/ChatGPT Image 18 de set. de 2026, 17_07_09.png'
  );
  const [submittedProtocol, setSubmittedProtocol] = useState<string | null>(null);

  // Search Protocol state
  const [searchProtocolInput, setSearchProtocolInput] = useState('');
  const [trackedOccurrence, setTrackedOccurrence] = useState<Occurrence | null>(null);

  const categories: EnvironmentalCategory[] = [
    'Destruição de Mangais',
    'Desmatamento',
    'Queimadas Descontroladas',
    'Poluição Hídrica',
    'Erosão Costeira/Pluvial',
    'Resíduos Sólidos Urbanos',
    'Caça Furtiva & Biodiversidade',
    'Mineração Ilegal'
  ];

  const handleCaptureGPS = () => {
    setIsGettingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCapturedCoords({
            lat: Number(position.coords.latitude.toFixed(4)),
            lng: Number(position.coords.longitude.toFixed(4))
          });
          setIsGettingLocation(false);
        },
        () => {
          // Fallback to province default coords
          const provCoords = MOZAMBIQUE_PROVINCES[province];
          setCapturedCoords({ lat: provCoords.lat, lng: provCoords.lng });
          setIsGettingLocation(false);
        },
        { timeout: 5000 }
      );
    } else {
      const provCoords = MOZAMBIQUE_PROVINCES[province];
      setCapturedCoords({ lat: provCoords.lat, lng: provCoords.lng });
      setIsGettingLocation(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !district.trim() || !description.trim()) {
      return;
    }

    const uniqueId = `occ-${Date.now()}`;
    const generatedProtocol = `ECO-2026-MZ-${Math.floor(100 + Math.random() * 900)}`;

    const newOcc: Occurrence = {
      id: uniqueId,
      protocol: generatedProtocol,
      title: title.trim(),
      category,
      severity,
      province,
      district: district.trim(),
      locationDetails: locationDetails.trim() || 'Coordenadas capturadas via GPS',
      coordinates: capturedCoords,
      reportedBy: isAnonymous ? 'Cidadão Anónimo' : reporterName,
      isAnonymous,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Em Validação',
      description: description.trim(),
      imageUrl: selectedPhoto,
      validationScore: 85
    };

    onAddOccurrence(newOcc);
    setSubmittedProtocol(generatedProtocol);

    // Reset fields
    setTitle('');
    setDistrict('');
    setLocationDetails('');
    setDescription('');
  };

  const handleTrackProtocol = (e: React.FormEvent) => {
    e.preventDefault();
    const found = occurrences.find(
      (o) => o.protocol.toLowerCase().trim() === searchProtocolInput.toLowerCase().trim()
    );
    setTrackedOccurrence(found || null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Citizen Eco-Reputation */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-xl p-6 text-white shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 bg-emerald-700/60 px-2.5 py-0.5 rounded-full text-xs font-semibold text-emerald-200">
              <Shield className="w-3.5 h-3.5" />
              <span>ECO-CITIZEN • Participação Comunitária</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">Portal do Cidadão Guardião Ambiental</h2>
            <p className="text-emerald-100 text-xs max-w-2xl leading-relaxed">
              Reporte agressões ecológicas, desmatamento, queimadas e lixeiras com anonimato protegido e georreferenciação. Cada reporte validado fortalece a intervenção das autoridades distritais em Moçambique.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 flex items-center space-x-4 shrink-0">
            <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-300">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-xs">
              <p className="text-emerald-200 font-medium">Reputação do Cidadão</p>
              <p className="text-sm font-bold">Nível 3: Guardião Ativo</p>
              <p className="text-[10px] text-emerald-300">92% de reportes confirmados</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Registration Form Card */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-xs p-6">
          {submittedProtocol ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Ocorrência Submetida com Sucesso!
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                O seu reporte foi registado no sistema nacional de monitorização. Guarde o protocolo para acompanhar a validação técnica e o envio de brigadas de intervenção:
              </p>
              <div className="inline-block bg-white px-4 py-2 rounded-lg border border-emerald-300 font-mono text-sm font-bold text-emerald-800 shadow-xs">
                {submittedProtocol}
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setSubmittedProtocol(null)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
                >
                  Registrar Outra Ocorrência
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Formulário de Registo de Ocorrência</h3>
                <p className="text-xs text-slate-500">
                  Preencha as informações do local e anexe fotografias de evidência para acelerar a validação.
                </p>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Título da Ocorrência *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Abate descontrolado de árvores na margem do rio..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Category & Severity Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Categoria Ambiental *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as EnvironmentalCategory)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Gravidade Estimada *
                  </label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as SeverityLevel)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="Baixo">Baixo (Impacto localizado recente)</option>
                    <option value="Médio">Médio (Ameaça em progressão)</option>
                    <option value="Alto">Alto (Risco elevado a comunidades ou fauna)</option>
                    <option value="Crítico">Crítico (Danos severos e contaminação ativa)</option>
                  </select>
                </div>
              </div>

              {/* Province & District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Província *
                  </label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value as MozambiqueProvince)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    {Object.keys(MOZAMBIQUE_PROVINCES).map((prov) => (
                      <option key={prov} value={prov}>
                        {prov}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Distrito / Município *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Beira, Marrupa, Matola, Chimoio..."
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Location details & GPS coordinates */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ponto de Referência / Bairro
                </label>
                <input
                  type="text"
                  placeholder="Ex: Perto do posto de saúde comunitário, margem esquerda da ponte..."
                  value={locationDetails}
                  onChange={(e) => setLocationDetails(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-slate-700">Coordenadas GPS:</span>
                  <span className="font-mono text-slate-500">
                    {capturedCoords.lat}, {capturedCoords.lng}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCaptureGPS}
                  disabled={isGettingLocation}
                  className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded text-slate-700 font-semibold flex items-center space-x-1"
                >
                  <span>{isGettingLocation ? 'Localizando...' : 'Atualizar GPS'}</span>
                </button>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Descrição dos Factos Observados *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Descreva detalhadamente o que presenciou, possíveis causadores, extensão da área e impactos observados..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Photographic Evidence Attachment */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Evidência Fotográfica
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Mangais Danificados', url: '/assets/img/imagens/ChatGPT Image 18 de set. de 2026, 17_07_09.png' },
                    { label: 'Foco de Queimada', url: '/assets/img/imagens/ChatGPT Image 18 de set. de 2026, 17_08_41.png' },
                    { label: 'Poluição Hídrica', url: '/assets/img/imagens/ChatGPT Image 18 de set. de 2026, 17_13_44.png' }
                  ].map((photo, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedPhoto(photo.url)}
                      className={`relative rounded-lg overflow-hidden border-2 text-left h-20 transition-all ${
                        selectedPhoto === photo.url ? 'border-emerald-600 ring-2 ring-emerald-300' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={photo.url} alt={photo.label} className="object-cover w-full h-full" />
                      <span className="absolute bottom-1 left-1 right-1 bg-black/60 text-white text-[9px] px-1 rounded truncate">
                        {photo.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Anonymity toggle & Reporter identity */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300"
                  />
                  <span className="font-semibold text-slate-700">Reportar como Denúncia Anónima</span>
                </label>
                {!isAnonymous && (
                  <span className="text-slate-500">
                    Identificado como: <strong>{reporterName}</strong>
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-xs flex items-center justify-center space-x-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Submeter Ocorrência para a Rede ECO-MZ 360</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Tracker & Educational Advice Column */}
        <div className="lg:col-span-4 space-y-4">
          {/* Protocol Tracker Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <h3 className="text-xs font-bold text-slate-800 mb-2 flex items-center space-x-1.5">
              <Search className="w-3.5 h-3.5 text-emerald-600" />
              <span>Rastrear Estado de Ocorrência</span>
            </h3>
            <p className="text-[11px] text-slate-500 mb-3">
              Consulte a intervenção técnica e medidas tomadas pelo código de protocolo.
            </p>
            <form onSubmit={handleTrackProtocol} className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Ex: ECO-2026-MZ-001"
                value={searchProtocolInput}
                onChange={(e) => setSearchProtocolInput(e.target.value)}
                className="flex-1 text-xs p-2 rounded-lg border border-slate-300 focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg"
              >
                Buscar
              </button>
            </form>

            {trackedOccurrence ? (
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-700">{trackedOccurrence.protocol}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {trackedOccurrence.status}
                  </span>
                </div>
                <p className="font-semibold text-slate-800">{trackedOccurrence.title}</p>
                <p className="text-[11px] text-slate-600">{trackedOccurrence.locationDetails}, {trackedOccurrence.province}</p>
                {trackedOccurrence.assignedTeam && (
                  <p className="text-[10px] text-slate-500">
                    Equipa técnica: <strong>{trackedOccurrence.assignedTeam}</strong>
                  </p>
                )}
                {trackedOccurrence.actionSummary && (
                  <div className="p-2 bg-white rounded border border-slate-200 text-[10px] text-slate-700">
                    <strong>Ação executada:</strong> {trackedOccurrence.actionSummary}
                  </div>
                )}
              </div>
            ) : searchProtocolInput && (
              <p className="text-[11px] text-rose-500 italic">
                Nenhum registo encontrado com este protocolo.
              </p>
            )}
          </div>

          {/* Citizen Legal Rights and Guarantees in Mozambique */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2.5 text-xs">
            <h4 className="font-bold text-slate-800 flex items-center space-x-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>Garantia Legal do Cidadão</span>
            </h4>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              O direito a um ambiente ecologicamente equilibrado é garantido pelo <strong>Artigo 90 da Constituição da República de Moçambique</strong> e pela <strong>Lei n.º 20/97 (Lei do Ambiente)</strong>.
            </p>
            <ul className="text-[11px] text-slate-600 space-y-1.5 list-disc pl-4">
              <li>Proteção contra represálias em denúncias ambientais.</li>
              <li>Obrigação de resposta em até 15 dias pelas Direcções Provinciais do Ambiente.</li>
              <li>Direito de recurso ao Ministério Público para reparação de danos coletivos.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
