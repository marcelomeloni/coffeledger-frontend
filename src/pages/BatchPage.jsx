import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBatchById } from '../api/batchService';

// Componentes modulares
import { BatchHero } from '../components/client/BatchHero';
import { BatchTimeline } from '../components/client/BatchTimeline';
import { ProductionDetails } from '../components/client/ProductionDetails';
import { WarehouseDetails } from '../components/client/WarehouseDetails';
import { BeneficiamentoDetails } from '../components/client/BeneficiamentoDetails';
import { DistributorDetails } from '../components/client/DistributorDetails';
import { EndConsumerDetails } from '../components/client/EndConsumerDetails';
import { LogisticsDetails } from '../components/client/LogisticsDetails';
import { PackagerDetails } from '../components/client/PackagerDetails';
import { RoasterDetails } from '../components/client/RoasterDetails';
import { SustainabilityDetails } from '../components/client/SustainabilityDetails';
import { GraderDetails } from '../components/client/GraderDetails';

// Função auxiliar para buscar metadados do IPFS
const fetchMetadata = async (ipfsCid) => {
  if (!ipfsCid || ipfsCid.startsWith('Qm...')) {
    console.log('📦 Skipping mock IPFS CID:', ipfsCid);
    return null;
  }
  
  const url = `https://ipfs.io/ipfs/${ipfsCid}`;
  console.log('🔍 Fetching IPFS metadata from:', url);
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar metadados: ${response.statusText}`);
    }
    const metadata = await response.json();
    console.log('✅ IPFS metadata fetched successfully:', metadata);
    return metadata;
  } catch (error) {
    console.error("❌ Falha ao buscar metadados do IPFS:", error);
    return null;
  }
};

const BatchPage = () => {
  const { id } = useParams();
  console.log('🚀 BatchPage initialized with ID:', id);

  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        console.log('📡 Fetching batch data for ID:', id);
        
        const data = await getBatchById(id);
        console.log('✅ Batch data received:', data);

        // Garantir que stages seja um array
        const stages = Array.isArray(data.stages) ? data.stages : [];
        console.log('📋 Stages found:', stages.length, stages);

        console.log('🔄 Starting IPFS metadata fetch for', stages.length, 'stages...');
        
        const stagesWithMetadata = await Promise.all(
          stages.map(async (stage, index) => {
            console.log(`🔍 Processing stage ${index + 1}/${stages.length}:`, stage.stageName, 'CID:', stage.stageDataHash);
            
            try {
              const metadata = await fetchMetadata(stage.stageDataHash);
              // Usar partnerType dos metadados como identificador do stage
              const stepName = metadata?.partnerType || stage.stageName || 'unknown';
              const result = { 
                ...stage, 
                metadata,
                step_name: stepName // Agora baseado no partnerType
              };
              console.log(`✅ Stage ${stepName} processed:`, result);
              return result;
            } catch (err) {
              console.error(`❌ Error processing stage ${stage.stageName}:`, err);
              return {
                ...stage,
                metadata: null,
                step_name: 'unknown'
              };
            }
          })
        );

        const completeBatchData = {
          ...data,
          stages: stagesWithMetadata,
        };

        console.log('🎉 All data processed successfully:', completeBatchData);
        setBatch(completeBatchData);
        setError(null);
      } catch (err) {
        console.error("💥 Falha ao carregar os dados do lote:", err);
        setError("Não foi possível carregar os dados do lote.");
      } finally {
        console.log('🏁 Loading completed');
        setLoading(false);
      }
    };
    
    fetchAllData();
  }, [id]);

  if (loading) {
    console.log('⏳ Rendering loading state...');
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-300">Construindo a história do seu café...</p>
        </div>
      </div>
    );
  }

  if (error || !batch) {
    console.log('❌ Rendering error state:', { error, batch });
    return (
      <div className="p-8 text-center min-h-screen flex items-center justify-center bg-black">
        <div className="max-w-md">
          <p className="text-red-400 text-xl mb-4">⚠️</p>
          <p className="text-gray-300 text-lg mb-2">{error || "Nenhum dado de lote encontrado."}</p>
          <p className="text-gray-500 text-sm">Batch ID: {id}</p>
        </div>
      </div>
    );
  }

  const { details, stages } = batch;
  console.log('🎬 Rendering batch page with:', { details, stages });

  // Helper para pegar metadata de cada etapa - CORRIGIDO para logística
  const getStageMetadata = (partnerType) => {
    if (!stages || !Array.isArray(stages)) {
      console.log(`🔍 No stages found for ${partnerType}`);
      return null;
    }
    
    // CASO ESPECIAL: Para logística, retornamos um ARRAY com todos os estágios de logística
    if (partnerType === 'logistics') {
      const logisticsStages = stages
        .filter(s => s && s.step_name === 'logistics' && s.metadata)
        .map(s => s.metadata);
      
      console.log(`🔍 Found ${logisticsStages.length} logistics stages:`, logisticsStages);
      return logisticsStages.length > 0 ? logisticsStages : null;
    }
    
    // Para outros tipos, retornamos o primeiro encontrado (comportamento original)
    const stage = stages.find((s) => s && s.step_name === partnerType);
    const result = stage?.metadata || null;
    console.log(`🔍 Stage ${partnerType} metadata:`, result ? '✅ Found' : '❌ Not found');
    return result;
  };

  // Lista de etapas para renderizar - agora baseado nos partnerTypes reais
  const stageComponents = [
    { 
      name: 'producer', 
      component: ProductionDetails, 
      propName: 'producerMetadata' 
    },
    { 
      name: 'warehouse', 
      component: WarehouseDetails, 
      propName: 'warehouseMetadata' 
    },
    { 
      name: 'beneficiamento', 
      component: BeneficiamentoDetails, 
      propName: 'beneficiamentoMetadata' 
    },
    { 
      name: 'grader', 
      component: GraderDetails, 
      propName: 'graderMetadata' 
    },
    { 
      name: 'roaster', 
      component: RoasterDetails, 
      propName: 'roasterMetadata' 
    },
    { 
      name: 'packager', 
      component: PackagerDetails, 
      propName: 'packagerMetadata' 
    },
    { 
      name: 'logistics', 
      component: LogisticsDetails, 
      propName: 'logisticsMetadata' 
    },
    { 
      name: 'distributor', 
      component: DistributorDetails, 
      propName: 'distributorMetadata' 
    },
    { 
      name: 'end_consumer', 
      component: EndConsumerDetails, 
      propName: 'endConsumerMetadata' 
    },
    { 
      name: 'sustainability', 
      component: SustainabilityDetails, 
      propName: 'sustainabilityMetadata' 
    },
  ];

  console.log('🧩 Starting to render stage components...');

  return (
    <div className="font-sans text-gray-800 bg-black">
      <BatchHero 
        producerName={details?.producer_name || 'Unknown Producer'} 
        onchainId={details?.onchain_id || 'Unknown ID'} 
        batchAddress={details?.id} 
      />

      {/* Etapas detalhadas - agora baseadas nos partnerTypes reais */}
      {stageComponents.map(({ name, component: Component, propName }) => {
        const metadata = getStageMetadata(name);
        console.log(`🎯 Rendering ${name}:`, metadata ? '✅' : '❌ skipping`');
        
        if (!metadata) return null;

        try {
          const props = { [propName]: metadata };
          return <Component key={name} {...props} />;
        } catch (componentError) {
          console.error(`💥 Error rendering ${name} component:`, componentError);
          return (
            <section key={name} className="py-32 px-6 bg-black">
              <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-2xl text-red-400 mb-4">Error rendering {name}</h2>
                <p className="text-stone-400">Failed to load {name} details</p>
              </div>
            </section>
          );
        }
      })}

      {/* Timeline geral do lote */}
      <BatchTimeline stages={stages} />

      {/* Rodapé */}
      <div className="bg-gray-900 text-gray-400 p-8 text-center mt-12">
        <p className="text-sm mb-2">
          Este registro é mantido de forma segura e imutável na blockchain de Solana.
        </p>
        <p className="text-xs break-all mb-4">
          Endereço On-chain do Lote: {details?.id || 'N/A'}
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-green-400">Live on Blockchain</span>
        </div>
      </div>
    </div>
  );
};

// Error Boundary simples para componentes
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('💥 Error Boundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

// Fallback para erro no Timeline
const TimelineErrorFallback = () => (
  <section className="relative py-32 px-6 bg-black">
    <div className="max-w-5xl mx-auto relative text-center">
      <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-stone-200 to-stone-500 mb-4">
        Journey Timeline
      </h2>
      <p className="text-xl text-red-400 mb-4">
        Error loading timeline
      </p>
      <p className="text-stone-400">
        Please try refreshing the page
      </p>
    </div>
  </section>
);

export default BatchPage;