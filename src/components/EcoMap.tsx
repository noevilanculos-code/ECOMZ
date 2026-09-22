import React, { useState } from 'react';
import {
  MapPin,
  Layers,
  Filter,
  AlertTriangle,
  Flame,
  Droplets,
  Trees,
  Trash2,
  Maximize2,
  Calendar,
  Eye,
  Info,
  ChevronRight,
  ShieldCheck,
  Download
} from 'lucide-react';
import { Occurrence, MozambiqueProvince, EnvironmentalCategory, SeverityLevel } from '../types';
import { MOZAMBIQUE_PROVINCES, ProvinceInfo } from '../data/mockData';

interface EcoMapProps {
  occurrences: Occurrence[];
  selectedProvince: MozambiqueProvince | 'Todas';
  setSelectedProvince: (prov: MozambiqueProvince | 'Todas') => void;
  onSelectOccurrence: (occ: Occurrence) => void;
  onNewReport: () => void;
}

export const EcoMap: React.FC<EcoMapProps> = ({
  occurrences,
  selectedProvince,
  setSelectedProvince,
  onSelectOccurrence,
  onNewReport
}) => {
  const [activeLayer, setActiveLayer] = useState<'marcadores' | 'calor' | 'comparador'>('marcadores');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('Todas');
  const [comparePeriod, setComparePeriod] = useState<'2024' | '2026'>('2026');

  // Filter occurrences
  const filteredOccurrences = occurrences.filter((occ) => {
    if (selectedProvince !== 'Todas' && occ.province !== selectedProvince) return false;
    if (selectedCategory !== 'Todas' && occ.category !== selectedCategory) return false;
    if (selectedSeverity !== 'Todas' && occ.severity !== selectedSeverity) return false;
    return true;
  });

  const getCategoryIcon = (category: EnvironmentalCategory) => {
    switch (category) {
      case 'Destruição de Mangais':
      case 'Desmatamento':
        return <Trees className="w-3.5 h-3.5" />;
      case 'Queimadas Descontroladas':
        return <Flame className="w-3.5 h-3.5" />;
      case 'Poluição Hídrica':
        return <Droplets className="w-3.5 h-3.5" />;
      case 'Resíduos Sólidos Urbanos':
        return <Trash2 className="w-3.5 h-3.5" />;
      default:
        return <AlertTriangle className="w-3.5 h-3.5" />;
    }
  };

  const getSeverityBadgeClass = (severity: SeverityLevel) => {
    switch (severity) {
      case 'Crítico':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Alto':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Médio':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Baixo':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  };

  const currentProvinceData: ProvinceInfo | null =
    selectedProvince !== 'Todas' ? MOZAMBIQUE_PROVINCES[selectedProvince] : null;

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Province Selector Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-full">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Província:</span>
          <button
            onClick={() => setSelectedProvince('Todas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedProvince === 'Todas'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Nacional (Todas)
          </button>
          {Object.keys(MOZAMBIQUE_PROVINCES).map((prov) => {
            const isSelected = selectedProvince === prov;
            return (
              <button
                key={prov}
                onClick={() => setSelectedProvince(prov as MozambiqueProvince)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {prov}
              </button>
            );
          })}
        </div>

        {/* Right actions: Layer switch & Report button */}
        <div className="flex items-center space-x-2">
          <div className="bg-slate-100 p-0.5 rounded-lg flex items-center border border-slate-200">
            <button
              onClick={() => setActiveLayer('marcadores')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center space-x-1 ${
                activeLayer === 'marcadores' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pontos ({filteredOccurrences.length})</span>
            </button>
            <button
              onClick={() => setActiveLayer('calor')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center space-x-1 ${
                activeLayer === 'calor' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-orange-600" />
              <span>Mapa de Calor</span>
            </button>
            <button
              onClick={() => setActiveLayer('comparador')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center space-x-1 ${
                activeLayer === 'comparador' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Antes/Depois</span>
            </button>
          </div>

          <button
            onClick={onNewReport}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs flex items-center space-x-1 transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>+ Reportar Ocorrência</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Map & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map Canvas Card */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          {/* Map Header Status */}
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-800">
                {selectedProvince === 'Todas' ? 'Visualização Geral de Moçambique' : `Província de ${selectedProvince}`}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">{filteredOccurrences.length} ocorrências ativas filtradas</span>
            </div>
            {currentProvinceData && (
              <div className="flex items-center space-x-3 text-[11px]">
                <span className="text-slate-600">Capital: <strong>{currentProvinceData.capital}</strong></span>
                <span className="text-slate-600">Vulnerabilidade: <strong className="text-rose-600">{currentProvinceData.vulnerabilityIndex}%</strong></span>
              </div>
            )}
          </div>

          {/* SVG & Visual Geospatial Representation */}
          <div className="relative bg-slate-900 p-6 flex-1 min-h-[480px] flex items-center justify-center overflow-hidden">
            {/* Coordinate Grid Background */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  'radial-gradient(circle, #34d399 1px, transparent 1px), radial-gradient(circle, #60a5fa 1px, transparent 1px)',
                backgroundSize: '30px 30px',
                backgroundPosition: '0 0, 15px 15px'
              }}
            />

            {/* If Comparador layer is selected */}
            {activeLayer === 'comparador' ? (
              <div className="relative z-10 w-full max-w-xl bg-slate-800/90 rounded-xl p-5 border border-slate-700 text-white">
                <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-3">
                  <div>
                    <h4 className="font-bold text-sm text-emerald-400">Comparação Temporal de Intervenção</h4>
                    <p className="text-xs text-slate-300">Costa da Beira (Sofala) — Restauração de Mangais</p>
                  </div>
                  <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-700">
                    <button
                      onClick={() => setComparePeriod('2024')}
                      className={`px-3 py-1 text-xs rounded font-semibold ${
                        comparePeriod === '2024' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      2024 (Antes)
                    </button>
                    <button
                      onClick={() => setComparePeriod('2026')}
                      className={`px-3 py-1 text-xs rounded font-semibold ${
                        comparePeriod === '2026' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      2026 (Atual)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="relative rounded-lg overflow-hidden border border-slate-700 h-44 bg-slate-950 flex items-center justify-center">
                      <img
                        src="/assets/img/imagens/ChatGPT Image 18 de set. de 2026, 17_07_09.png"
                        alt="Área degradada 2024"
                        className="object-cover w-full h-full opacity-80"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-bold text-rose-400">
                        Outubro 2024: Degradação Severa
                      </span>
                    </div>
                    <ul className="text-[11px] text-slate-300 space-y-1">
                      <li>• 65 ha de mangleiros abatidos</li>
                      <li>• Intrusão salina nas machambas</li>
                      <li>• Alto risco de inundação de maré</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="relative rounded-lg overflow-hidden border border-emerald-500/40 h-44 bg-slate-950 flex items-center justify-center">
                      <img
                        src="/assets/img/imagens/ChatGPT Image 18 de set. de 2026, 17_08_41.png"
                        alt="Área restaurada 2026"
                        className="object-cover w-full h-full"
                      />
                      <span className="absolute bottom-2 left-2 bg-emerald-900/80 px-2 py-0.5 rounded text-[10px] font-bold text-emerald-300">
                        Setembro 2026: Regeneração
                      </span>
                    </div>
                    <ul className="text-[11px] text-slate-300 space-y-1">
                      <li>• 120.000 propágulos plantados</li>
                      <li>• Redução de 45% na erosão de margem</li>
                      <li>• Retorno de fauna aquática e caranguejo</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              /* Geographic Visualization with Pins & Heatspots */
              <div className="relative z-10 w-full max-w-2xl h-[420px] flex items-center justify-center">
                {/* Mozambique Outline Diagrammatic Layout */}
                <div className="relative w-full h-full flex flex-col justify-between py-2 px-8">
                  {/* North Region: Cabo Delgado, Niassa, Nampula */}
                  <div className="border border-slate-700/60 bg-slate-800/50 rounded-xl p-3 backdrop-blur-xs">
                    <div className="flex items-center justify-between text-[11px] font-bold text-emerald-400 mb-2">
                      <span>ZONA NORTE</span>
                      <span className="text-slate-400">Rovuma ao Lúrio</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Niassa', 'Cabo Delgado', 'Nampula'] as MozambiqueProvince[]).map((prov) => {
                        const count = occurrences.filter((o) => o.province === prov).length;
                        const isTarget = selectedProvince === prov || selectedProvince === 'Todas';
                        return (
                          <button
                            key={prov}
                            onClick={() => setSelectedProvince(prov)}
                            className={`p-2 rounded-lg text-left border transition-all ${
                              selectedProvince === prov
                                ? 'bg-emerald-950/80 border-emerald-400 text-white'
                                : isTarget
                                ? 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-500'
                                : 'opacity-40 border-slate-800 text-slate-500'
                            }`}
                          >
                            <p className="text-xs font-bold leading-tight truncate">{prov}</p>
                            <div className="flex items-center justify-between mt-1 text-[10px]">
                              <span className="text-slate-400">{MOZAMBIQUE_PROVINCES[prov].capital}</span>
                              <span className="px-1.5 py-0.2 rounded bg-slate-800 text-emerald-400 font-bold">
                                {count} occ
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Central Region: Zambézia, Tete, Manica, Sofala */}
                  <div className="border border-slate-700/60 bg-slate-800/50 rounded-xl p-3 backdrop-blur-xs my-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-blue-400 mb-2">
                      <span>ZONA CENTRO</span>
                      <span className="text-slate-400">Bacias do Zambeze & Púnguè</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {(['Tete', 'Zambézia', 'Manica', 'Sofala'] as MozambiqueProvince[]).map((prov) => {
                        const count = occurrences.filter((o) => o.province === prov).length;
                        const isTarget = selectedProvince === prov || selectedProvince === 'Todas';
                        return (
                          <button
                            key={prov}
                            onClick={() => setSelectedProvince(prov)}
                            className={`p-2 rounded-lg text-left border transition-all ${
                              selectedProvince === prov
                                ? 'bg-blue-950/80 border-blue-400 text-white'
                                : isTarget
                                ? 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-500'
                                : 'opacity-40 border-slate-800 text-slate-500'
                            }`}
                          >
                            <p className="text-xs font-bold leading-tight truncate">{prov}</p>
                            <div className="flex items-center justify-between mt-1 text-[10px]">
                              <span className="text-slate-400">{MOZAMBIQUE_PROVINCES[prov].capital}</span>
                              <span className="px-1.5 py-0.2 rounded bg-slate-800 text-blue-400 font-bold">
                                {count} occ
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* South Region: Inhambane, Gaza, Maputo Província, Maputo Cidade */}
                  <div className="border border-slate-700/60 bg-slate-800/50 rounded-xl p-3 backdrop-blur-xs">
                    <div className="flex items-center justify-between text-[11px] font-bold text-amber-400 mb-2">
                      <span>ZONA SUL</span>
                      <span className="text-slate-400">Save ao Ponta do Ouro</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {(['Inhambane', 'Gaza', 'Maputo Província', 'Maputo Cidade'] as MozambiqueProvince[]).map((prov) => {
                        const count = occurrences.filter((o) => o.province === prov).length;
                        const isTarget = selectedProvince === prov || selectedProvince === 'Todas';
                        return (
                          <button
                            key={prov}
                            onClick={() => setSelectedProvince(prov)}
                            className={`p-2 rounded-lg text-left border transition-all ${
                              selectedProvince === prov
                                ? 'bg-amber-950/80 border-amber-400 text-white'
                                : isTarget
                                ? 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-500'
                                : 'opacity-40 border-slate-800 text-slate-500'
                            }`}
                          >
                            <p className="text-xs font-bold leading-tight truncate">{prov}</p>
                            <div className="flex items-center justify-between mt-1 text-[10px]">
                              <span className="text-slate-400">{MOZAMBIQUE_PROVINCES[prov].capital}</span>
                              <span className="px-1.5 py-0.2 rounded bg-slate-800 text-amber-400 font-bold">
                                {count} occ
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Heat Overlay (if active) */}
                {activeLayer === 'calor' && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-around opacity-40">
                    <div className="w-48 h-48 rounded-full bg-rose-500 blur-2xl"></div>
                    <div className="w-56 h-56 rounded-full bg-orange-500 blur-3xl"></div>
                    <div className="w-36 h-36 rounded-full bg-amber-400 blur-xl"></div>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Floating Legend */}
            <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-lg text-[10px] text-slate-300 backdrop-blur-xs">
              <div className="flex items-center space-x-3">
                <span className="font-bold text-slate-400">Gravidade:</span>
                <span className="inline-flex items-center text-rose-400">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mr-1 animate-ping"></span> Crítico
                </span>
                <span className="inline-flex items-center text-orange-400">
                  <span className="w-2 h-2 rounded-full bg-orange-500 mr-1"></span> Alto
                </span>
                <span className="inline-flex items-center text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mr-1"></span> Médio
                </span>
                <span className="inline-flex items-center text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1"></span> Baixo
                </span>
              </div>
              <div className="text-slate-400 hidden sm:block">
                Coordenadas WGS84 • Datum Nacional MozNet
              </div>
            </div>
          </div>
        </div>

        {/* Occurrences List & Province Dossier Column */}
        <div className="lg:col-span-4 space-y-4">
          {/* Selected Province Details Card */}
          {currentProvinceData ? (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{currentProvinceData.name}</h3>
                  <p className="text-xs text-slate-500">Capital Provincial: {currentProvinceData.capital}</p>
                </div>
                <span className="px-2 py-1 rounded bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                  Risco {currentProvinceData.vulnerabilityIndex}%
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                <div className="bg-slate-50 p-2 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">População:</span>
                  <span className="font-bold text-slate-700">{currentProvinceData.population}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">Área Territorial:</span>
                  <span className="font-bold text-slate-700">{currentProvinceData.areaKm2}</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-500">Principais Ameaças Mapeadas:</span>
                <div className="flex flex-wrap gap-1">
                  {currentProvinceData.dominantThreats.map((threat, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px]">
                      {threat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 text-emerald-900 text-xs">
              <p className="font-bold text-sm mb-1">Moçambique: 11 Províncias Monitoradas</p>
              <p className="text-emerald-800 leading-relaxed">
                Selecione uma província acima para analisar dados desagregados de vulnerabilidade climática, histórico de ocorrências e projetos de intervenção em andamento.
              </p>
            </div>
          )}

          {/* Filtered Occurrences Stream */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-col h-[380px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center space-x-1">
                <span>Ocorrências Registadas</span>
                <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px]">
                  {filteredOccurrences.length}
                </span>
              </span>
              <button
                onClick={() => {
                  setSelectedProvince('Todas');
                  setSelectedCategory('Todas');
                  setSelectedSeverity('Todas');
                }}
                className="text-[11px] text-emerald-600 hover:underline"
              >
                Limpar filtros
              </button>
            </div>

            <div className="space-y-2.5 overflow-y-auto pr-1 flex-1">
              {filteredOccurrences.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">
                  <p>Nenhuma ocorrência encontrada com estes filtros.</p>
                </div>
              ) : (
                filteredOccurrences.map((occ) => (
                  <div
                    key={occ.id}
                    onClick={() => onSelectOccurrence(occ)}
                    className="p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all cursor-pointer space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-1 leading-tight">
                        {occ.title}
                      </h4>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded border whitespace-nowrap ${getSeverityBadgeClass(
                          occ.severity
                        )}`}
                      >
                        {occ.severity}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {occ.description}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{occ.district}, {occ.province}</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                        {occ.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
