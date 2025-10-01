import React from 'react';
import {
  Leaf, Factory, Warehouse, Search, Coffee, Package, Truck, Globe, Award, CalendarDays, ExternalLink, ChevronRight 
} from 'lucide-react';

// Mapeamentos para labels e ícones da Lucide React
const stageInfo = {
  'producer': { title: 'Coffee Origin', icon: Leaf },
  'beneficiamento': { title: 'Processing', icon: Factory },
  'warehouse': { title: 'Storage', icon: Warehouse },
  'grader': { title: 'Quality Grading', icon: Search },
  'roaster': { title: 'Roasting', icon: Coffee },
  'packager': { title: 'Packaging', icon: Package },
  'logistics': { title: 'Logistics', icon: Truck },
  'sustainability': { title: 'Sustainability', icon: Globe },
  'end_consumer': { title: 'To the Consumer', icon: Award }, // Usando Award para um toque final
};

// Mock data para garantir que o componente sempre tenha algo para exibir durante o desenvolvimento
const mockStages = [
  {
    step_name: 'producer',
    ipfsCid: 'mock-cid-producer-1',
    timestamp: 1715788800000, // milissegundos
    metadata: {
      name: "Farm Ouro Negro",
      description: "Harvested high-quality Bourbon Amarelo beans.",
      location: "São Sebastião da Grama-SP",
    },
    status: 'completed'
  },
  {
    step_name: 'beneficiamento',
    ipfsCid: 'mock-cid-beneficiamento-2',
    timestamp: 1718812800000, // milissegundos
    metadata: {
      name: "Processing Plant A",
      description: "Beans milled and prepared for storage.",
      location: "Industrial Zone, MG",
    },
    status: 'completed'
  },
  {
    step_name: 'warehouse',
    ipfsCid: 'mock-cid-warehouse-3',
    timestamp: 1721596800000, // milissegundos
    metadata: {
      name: "Main Storage Facility",
      description: "Stored in controlled conditions to preserve quality.",
      location: "São Paulo, SP",
    },
    status: 'completed'
  },
  {
    step_name: 'grader',
    ipfsCid: 'mock-cid-grader-4',
    timestamp: 1725225600000, // milissegundos
    metadata: {
      name: "Q-Grader Evaluation",
      description: "Achieved an outstanding SCA score of 89.25.",
      location: "Coffee Lab",
    },
    status: 'completed'
  },
  {
    step_name: 'roaster',
    ipfsCid: 'mock-cid-roaster-5',
    timestamp: 1725571200000, // milissegundos
    metadata: {
      name: "Craft & Roast Co.",
      description: "Expertly roasted to a medium-light profile.",
      location: "São Paulo, SP",
    },
    status: 'completed'
  },
  {
    step_name: 'packager',
    ipfsCid: 'mock-cid-packager-6',
    timestamp: 1726003200000, // milissegundos
    metadata: {
      name: "Artisan Packaging",
      description: "Packed in eco-friendly 250g bags.",
      location: "São Paulo, SP",
    },
    status: 'in_progress' // Exemplo de etapa em andamento
  },
  {
    step_name: 'logistics',
    ipfsCid: 'mock-cid-logistics-7',
    timestamp: 1726262400000, // milissegundos
    metadata: {
      name: "Coffee Express",
      description: "Currently in transit to local distributors.",
      location: "São Paulo-SP to Destination",
    },
    status: 'upcoming' // Exemplo de etapa futura
  }
];


const formatDate = (timestamp) => {
  if (!timestamp) return 'Not available';
  const date = new Date(timestamp);
  // Verifica se a data é válida
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

// Sub-componente para cada cartão da etapa
const StageCard = ({ stage, index }) => {
  const info = stageInfo[stage.step_name] || { title: `Stage #${index + 1}`, icon: ExternalLink };
  const IconComponent = info.icon; // Componente de ícone dinâmico
  
  const isCompleted = stage.status === 'completed';
  const isUpcoming = stage.status === 'upcoming';
  const cardClasses = `
    bg-gray-800 bg-opacity-60 p-6 rounded-2xl shadow-xl border 
    ${isCompleted ? 'border-amber-500' : isUpcoming ? 'border-gray-600' : 'border-gray-700'}
    transition-all duration-300 transform 
    group-hover:scale-[1.02] group-hover:shadow-2xl 
    ${isCompleted ? 'group-hover:border-amber-400' : 'group-hover:border-white'}
  `;

  const titleClasses = `
    font-bold text-xl 
    ${isCompleted ? 'text-amber-300' : 'text-white'}
  `;

  const descriptionClasses = `
    text-gray-400 mt-2 text-sm italic
    ${isUpcoming ? 'text-gray-500' : ''}
  `;

  return (
    <a href={`#${stage.step_name}-section`} className="block group scroll-smooth">
      <div className={`flex items-start space-x-4 ${index % 2 === 0 ? 'sm:justify-end sm:flex-row-reverse' : ''}`}>
        {/* Cartão de Conteúdo */}
        <div className={`flex-1 ${index % 2 === 0 ? 'sm:text-right' : ''} ${cardClasses}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={titleClasses}>{info.title}</h3>
            <span className="text-sm text-gray-400 flex items-center">
              <CalendarDays className="h-4 w-4 mr-1 text-gray-500" />
              {formatDate(stage.timestamp)}
            </span>
          </div>
          
          <p className={descriptionClasses}>
            {stage.metadata?.description || `Details about the ${info.title.toLowerCase()} stage.`}
          </p>
          
          <div className="mt-4 text-right">
            <span
              className="text-amber-400 hover:text-amber-300 underline text-sm font-medium flex items-center justify-end transition-colors duration-200"
            >
              View Details
              <ChevronRight className="h-4 w-4 inline ml-1 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export function BatchTimeline({ stages }) {
  const dataToRender = stages && stages.length > 0 ? stages : mockStages;
  const hasStages = dataToRender.length > 0;

  return (
    <div className="container mx-auto px-4 py-16 text-white">
      <div className="max-w-4xl mx-auto relative">
        {/* Linha vertical central */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-transparent via-gray-700 to-transparent hidden sm:block z-0"></div>
        
        <h2 className="text-3xl sm:text-4xl font-playfair font-black text-center mb-16 drop-shadow-lg">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
            The Journey: A Story in Stages
          </span>
        </h2>
        
        <div className="space-y-16">
          {hasStages ? (
            dataToRender.map((stage, index) => {
              const IconComponent = stageInfo[stage.step_name]?.icon || ExternalLink;
              const isCompleted = stage.status === 'completed';
              const isUpcoming = stage.status === 'upcoming';
              const isCurrent = stage.status === 'in_progress';

              return (
                <div key={index} className={`relative group ${index % 2 === 0 ? 'sm:pr-10' : 'sm:pl-10'}`}>
                  {/* Ícone circular na linha do tempo */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 top-0 mt-6 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl shadow-md transition-all duration-300 z-10 
                    ${isCompleted ? 'bg-amber-500 shadow-lg shadow-amber-500/30' : 
                      isCurrent ? 'bg-blue-500 shadow-lg shadow-blue-500/30' : 
                      'bg-gray-700 border-2 border-gray-600'
                    }
                    group-hover:scale-110 group-hover:shadow-xl`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <StageCard stage={stage} index={index} />
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 italic text-center sm:col-span-2">No stages registered for this batch yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}