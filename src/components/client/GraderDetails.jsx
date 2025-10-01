import React from 'react';

// Mapeamentos para labels
const screenSizes = {
  '18+': '18+ (Above)',
  '17': '17',
  '16': '16',
  '15': '15',
  '14': '14',
  '13-': '13- (Below)'
};

const bodyLabels = {
  light: 'Light',
  medium: 'Medium',
  heavy: 'Heavy / Full',
  creamy: 'Creamy'
};

const acidityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  bright: 'Bright',
  citric: 'Citric',
  malic: 'Malic'
};

const balanceLabels = {
  excellent: 'Excellent',
  good: 'Good',
  regular: 'Regular',
  poor: 'Poor'
};

const aromaLabels = {
  floral: 'Floral',
  fruity: 'Fruity',
  nutty: 'Nutty / Chocolatey',
  chocolate: 'Chocolatey',
  caramel: 'Caramel',
  spicy: 'Spicy',
  herbal: 'Herbal'
};

const formatDate = (dateString) => {
  if (!dateString) return 'Not available';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export function GraderDetails({ graderMetadata }) {
  // Mock data for development
  const mockGraderData = {
    evaluatorName: "Maria Santos - Q-Grader",
    evaluationDate: "2024-09-01T00:00:00.000Z",
    sensoryNotes: "Fragrance: floral, caramel. Flavor: red berries, dark chocolate. Acidity: citric, bright. Body: medium, creamy. Aftertaste: persistent, sweet. Balance: excellent. Uniformity: high. Clean Cup: yes. Sweetness: very high. Overall: outstanding.",
    cupsNumber: 5,
    officialReport: "https://example.com/report/123.pdf", // Link de exemplo para o laudo
    scaScore: 89.25,
    defectPercentage: 1.5,
    screenSize: "17",
    moistureContent: 11.2,
    waterActivity: 0.58,
    beanDensity: 720,
    aroma: "fruity",
    flavor: "Red berries, dark chocolate, caramel",
    body: "medium",
    acidity: "bright",
    aftertaste: "Persistent, clean",
    balance: "excellent",
    qualityNotes: "A truly exceptional coffee with complex flavor notes. Ideal for espresso and pour-over methods."
  };

  const data = graderMetadata || mockGraderData;

  const {
    evaluatorName,
    evaluationDate,
    scaScore,
    flavor,
    aroma,
    body,
    acidity,
    aftertaste,
    qualityNotes,
    cupsNumber,
    defectPercentage,
    screenSize,
    moistureContent,
    waterActivity,
    beanDensity,
    officialReport,
    // Fix: Add 'balance' to the destructuring list
    balance 
  } = data;

  return (
    <div className="container mx-auto px-4 py-16 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Título da Seção */}
        <h2 className="text-3xl sm:text-4xl font-playfair font-black text-center mb-10 drop-shadow-lg">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
            The Grader's Verdict
          </span>
        </h2>

        {/* Avaliação Principal - Pontuação SCA em destaque */}
        <div className="text-center mb-16">
          <div className="inline-block relative p-4 rounded-3xl backdrop-blur-3xl border border-gray-700 shadow-xl">
            <p className="text-xl sm:text-2xl font-light text-gray-400 uppercase tracking-widest">
              SCA Score
            </p>
            <h3 className="text-6xl sm:text-8xl md:text-9xl font-playfair font-black leading-none drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-white via-stone-200 to-gray-400">
              {scaScore?.toFixed(2) || '--'}
            </h3>
            <p className="text-sm font-light text-gray-400 italic">
              Evaluated by <strong className="text-white">{evaluatorName || 'Not specified'}</strong> on {formatDate(evaluationDate)}
            </p>
          </div>
        </div>

        {/* Layout de 3 Colunas para Notas Sensoriais */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Card de Notas Sensoriais */}
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h4 className="text-lg font-bold text-amber-300 mb-4">Sensory Profile</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <strong className="text-white">Aroma:</strong> {aromaLabels[aroma] || aroma || 'Not specified'}
              </li>
              <li>
                <strong className="text-white">Flavor:</strong> {flavor || 'Not specified'}
              </li>
              <li>
                <strong className="text-white">Body:</strong> {bodyLabels[body] || body || 'Not specified'}
              </li>
              <li>
                <strong className="text-white">Acidity:</strong> {acidityLabels[acidity] || acidity || 'Not specified'}
              </li>
              <li>
                <strong className="text-white">Aftertaste:</strong> {aftertaste || 'Not specified'}
              </li>
              <li>
                <strong className="text-white">Balance:</strong> {balanceLabels[balance] || balance || 'Not specified'}
              </li>
            </ul>
          </div>

          {/* Card de Físico e Dados Técnicos */}
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h4 className="text-lg font-bold text-amber-300 mb-4">Physical Analysis</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <strong className="text-white">Moisture Content:</strong> {moistureContent ? `${moistureContent}%` : 'Not specified'}
              </li>
              <li>
                <strong className="text-white">Water Activity:</strong> {waterActivity ? `${waterActivity} Aw` : 'Not specified'}
              </li>
              <li>
                <strong className="text-white">Bean Density:</strong> {beanDensity ? `${beanDensity} g/L` : 'Not specified'}
              </li>
              <li>
                <strong className="text-white">Screen Size:</strong> {screenSizes[screenSize] || screenSize || 'Not specified'}
              </li>
              <li>
                <strong className="text-white">Defects:</strong> {defectPercentage ? `${defectPercentage}%` : 'Not specified'}
              </li>
              <li>
                <strong className="text-white">Cups Cupped:</strong> {cupsNumber || 'Not specified'}
              </li>
            </ul>
          </div>

          {/* Card de Observações do Classificador */}
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h4 className="text-lg font-bold text-amber-300 mb-4">Grader's Notes</h4>
            <p className="text-sm font-light leading-relaxed italic text-gray-300">
              {qualityNotes || 'No specific notes from the grader.'}
            </p>
            {officialReport && (
              <a 
                href={officialReport} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-6 inline-block text-amber-400 hover:text-amber-300 transition-colors duration-200"
              >
                View Official Report →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}