import React from 'react';
import { LocationMap } from './LocationMap';

const formatDate = (dateString) => {
  if (!dateString) return 'Not available';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

// Mapeamentos para labels em inglês
const incomingMaterialLabels = {
  pergaminho: 'Pergaminho (Dried Cherry)',
  cereja: 'Dried Cherry',
  pulped_wet: 'Pulped Wet',
  other: 'Other'
};

const processingStepsLabels = {
  dehulling: 'Dehulling',
  hulling: 'Hulling',
  polishing: 'Polishing',
  sieving: 'Sieving',
  density_separation: 'Density Separation',
  color_sorting: 'Color Sorting',
  destoning: 'Destoning',
  drying: 'Drying',
  bagging: 'Bagging',
  fumigation: 'Fumigation'
};

const dryingMethodLabels = {
  sun: 'Sun / Patio',
  raised_beds: 'Raised Beds',
  mechanical: 'Mechanical',
  tunnel: 'Tunnel / Greenhouse',
  solar: 'Solar'
};

const densityMethodLabels = {
  gravity_table: 'Gravity Table',
  water_table: 'Water Table',
  densimeter: 'Densimeter',
  other: 'Other'
};

const defectTypesLabels = {
  black_bean: 'Black Bean',
  insect_damage: 'Insect Damage',
  broken: 'Broken',
  fermented: 'Fermented',
  mold: 'Mold',
  foreign_material: 'Foreign Material'
};

const storageTypeLabels = {
  silo: 'Silo',
  big_bag: 'Big Bag',
  jute_bag: 'Jute Bag',
  grain_pro: 'GrainPro'
};

const pesticideResults = {
  pass: 'Passed',
  fail: 'Failed',
  'n/a': 'Not Tested'
};

export function BeneficiamentoDetails({ beneficiamentoMetadata }) {
  // Mock data for development
  const mockBeneficiamentoData = {
    millingFacilityName: "Green Bean Processing Plant",
    facilityLocation: "Highway BR-101, Km 120 - Industrial Zone",
    facilityCoordinates: { lat: -22.9201, lng: -46.7652 },
    operatorName: "Carlos Alberto",
    operationDate: "2024-06-15T00:00:00.000Z",
    incomingMaterial: "pergaminho",
    incomingWeightKg: 1000,
    incomingMoisture: 12.5,
    initialQualityNotes: "Material arrived in excellent condition, with no visual defects or fermented smell.",
    processingSteps: ["hulling", "polishing", "sieving", "density_separation", "color_sorting", "bagging"],
    machineSettings: {
      hullerModel: "Huller X-2000",
      hullerSettings: "RPM 1200, opening 2.3 mm",
      polisherModel: "Polisher P-90",
      colorSorterModel: "Sorter Z-300",
      dryerModel: null
    },
    dryingMethod: null,
    dryingParameters: {
      dryingStartMoisture: null,
      dryingEndMoisture: null,
      dryingTempC: null,
      dryingDurationHours: null
    },
    sievingProfile: {
      sieve18PlusPct: 12.5,
      sieve17Pct: 30.0,
      sieve16Pct: 25.0,
      sieve15Pct: 20.0,
      finesPct: 12.5
    },
    densitySeparation: {
      method: "gravity_table",
      densityThreshold: 700,
      highDensityPct: 35.0
    },
    defectDistribution: {
      primaryDefectsCount: 3,
      secondaryDefectsCount: 12,
      defectivePercentage: 1.5,
      defectTypes: ["black_bean", "broken"]
    },
    moistureAfterProcessing: 11.2,
    finalGreenWeightKg: 720,
    yieldPercentage: 72.0,
    internalLotNumber: "BNF-2025-001",
    isMicrolot: "yes",
    microlotId: "MICRO-001",
    sampleForCupping: {
      sampleId: "SAMP-2025-01",
      sampleDate: "2024-06-16T00:00:00.000Z",
      sampleWeightGr: 300,
      sampleRoastProfile: "210°C - 12min",
      sampleRoaster: "Test - Roastery X"
    },
    labTests: {
      ochratoxinA_ppb: 2.1,
      pesticideScreen: "pass",
      microbialResult: "<100 cfu/g",
      labReportFile: "https://example.com/lab-report.pdf",
      labReportHash: "Qm..."
    },
    photos: "https://example.com/photos.zip",
    documents: "https://example.com/documents.zip",
    traceabilityHash: "0xabc123...",
    qc: {
      qcOfficerName: "Ana Paula",
      qcDate: "2024-06-16T00:00:00.000Z",
      qcNotes: "Lot approved for roasting, excellent uniformity."
    },
    storageAfterProcessing: {
      storageType: "jute_bag",
      storageTemperatureC: 20,
      storageHumidityPct: 60,
      storageEntryDate: "2024-06-16T00:00:00.000Z",
      storageDurationDays: 30
    },
    beneficiamentoNotes: "This microlot was separated due to its high density and uniform sieve profile. A truly high-quality batch of green beans."
  };

  const data = beneficiamentoMetadata || mockBeneficiamentoData;

  const {
    millingFacilityName,
    facilityLocation,
    facilityCoordinates,
    operationDate,
    incomingMaterial,
    incomingWeightKg,
    incomingMoisture,
    initialQualityNotes,
    processingSteps,
    machineSettings,
    dryingMethod,
    dryingParameters,
    sievingProfile,
    densitySeparation,
    defectDistribution,
    moistureAfterProcessing,
    finalGreenWeightKg,
    yieldPercentage,
    internalLotNumber,
    isMicrolot,
    microlotId,
    sampleForCupping,
    labTests,
    photos,
    documents,
    qc,
    storageAfterProcessing,
    beneficiamentoNotes
  } = data;

  const stepsLabels = processingSteps?.map(step => processingStepsLabels[step] || step).join(', ') || 'Not available';
  const defectLabels = defectDistribution?.defectTypes?.map(type => defectTypesLabels[type] || type).join(', ') || 'None identified';
  const isMicrolotLabel = isMicrolot === 'yes' ? 'Yes' : 'No';

  return (
    <div className="container mx-auto px-4 py-16 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-playfair font-black text-center mb-10 drop-shadow-lg">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
            The Art of Transformation
          </span>
        </h2>

        {/* Informações da Unidade de Beneficiamento */}
        <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg border border-gray-700 mb-12">
          <h3 className="text-2xl font-bold text-amber-300 drop-shadow-md mb-1">
            {millingFacilityName || 'Processing Facility'}
          </h3>
          <p className="text-sm font-light text-gray-400 mb-6">
            {facilityLocation || 'Location not specified'}
          </p>
          <LocationMap
            lat={facilityCoordinates?.lat}
            lng={facilityCoordinates?.lng}
            farmName={millingFacilityName}
            address={facilityLocation}
          />
        </div>

        {/* Layout de duas colunas para dados técnicos */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Coluna da Esquerda: Dados de Entrada e Processo */}
          <div className="flex flex-col space-y-8 bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg border border-gray-700">
            <h3 className="text-xl font-bold text-amber-300">Process & Yield</h3>
            
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-gray-300 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Operation Date</span>
                <span className="text-white mt-1">{formatDate(operationDate)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Lot Number</span>
                <span className="text-white mt-1">{internalLotNumber || 'Not specified'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Incoming Material</span>
                <span className="text-white mt-1">{incomingMaterialLabels[incomingMaterial] || incomingMaterial || 'Not specified'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Initial Weight</span>
                <span className="text-white mt-1">{incomingWeightKg ? `${incomingWeightKg} kg` : 'Not specified'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Final Weight</span>
                <span className="text-white mt-1">{finalGreenWeightKg ? `${finalGreenWeightKg} kg` : 'Not specified'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Yield</span>
                <span className="text-white mt-1">{yieldPercentage ? `${yieldPercentage}%` : 'Not specified'}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <h4 className="text-md font-semibold text-amber-300 mb-2">Processing Steps</h4>
              <p className="text-sm font-light leading-relaxed italic text-gray-300">
                {stepsLabels}
              </p>
            </div>
            
            {beneficiamentoNotes && (
              <div className="border-t border-gray-700 pt-6">
                <h4 className="text-md font-semibold text-amber-300 mb-2">Operator Notes</h4>
                <p className="text-sm font-light leading-relaxed italic text-gray-300">
                  {beneficiamentoNotes}
                </p>
              </div>
            )}
          </div>

          {/* Coluna da Direita: Métricas de Qualidade e Análise */}
          <div className="flex flex-col space-y-8 bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg border border-gray-700">
            <h3 className="text-xl font-bold text-amber-300">Quality Metrics</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-gray-300 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Final Moisture</span>
                <span className="text-white mt-1">{moistureAfterProcessing ? `${moistureAfterProcessing}%` : 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Sieve Profile</span>
                <span className="text-white mt-1">{sievingProfile?.sieve18PlusPct ? `18+ (${sievingProfile.sieve18PlusPct}%)` : 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Density Separation</span>
                <span className="text-white mt-1">{densitySeparation?.highDensityPct ? `${densitySeparation.highDensityPct}%` : 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Defect Percentage</span>
                <span className="text-white mt-1">{defectDistribution?.defectivePercentage ? `${defectDistribution.defectivePercentage}%` : 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Pesticide Screen</span>
                <span className="text-white mt-1">{pesticideResults[labTests?.pesticideScreen] || 'N/A'}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <h4 className="text-md font-semibold text-amber-300 mb-2">Defect Types</h4>
              <p className="text-sm font-light leading-relaxed italic text-gray-300">
                {defectLabels}
              </p>
            </div>
            
            {qc?.qcNotes && (
              <div className="border-t border-gray-700 pt-6">
                <h4 className="text-md font-semibold text-amber-300 mb-2">QC Notes</h4>
                <p className="text-sm font-light leading-relaxed italic text-gray-300">
                  {qc.qcNotes}
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Seção de Documentos e Rastreabilidade */}
        <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg border border-gray-700 mt-8">
          <h3 className="text-xl font-bold text-amber-300 mb-4">Documents & Traceability</h3>
          <p className="text-sm font-light leading-relaxed italic text-gray-300">
            All the documentation and traceability data related to the dry milling process, stored securely on the blockchain.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-gray-400 text-sm">
            {photos && (
              <a href={photos} target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-400 transition-colors duration-200 underline">
                View Process Photos →
              </a>
            )}
            {documents && (
              <a href={documents} target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-400 transition-colors duration-200 underline">
                View Official Documents →
              </a>
            )}
            {labTests?.labReportFile && (
              <a href={labTests.labReportFile} target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-400 transition-colors duration-200 underline">
                View Lab Report →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}