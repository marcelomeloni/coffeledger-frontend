import React from 'react';
import { Coffee, Warehouse, Eye, CheckCircle, Flame, Package, Truck, Users, Leaf } from 'lucide-react';

// Função para detectar o tipo de etapa baseado nos metadados
const detectStageType = (metadata) => {
  if (!metadata || typeof metadata !== 'object') {
    return 'unknown';
  }

  // Verifica campos específicos de cada tipo de etapa
  if (metadata.farmName || metadata.producerStory) return 'producer';
  if (metadata.warehouseName || metadata.storageType) return 'warehouse';
  if (metadata.millingFacilityName || metadata.processingSteps) return 'beneficiamento';
  if (metadata.evaluatorName || metadata.scaScore) return 'grader';
  if (metadata.roasteryName || metadata.roastProfile) return 'roaster';
  if (metadata.packagingCompany || metadata.packagingType) return 'packager';
  if (metadata.trackingId || metadata.vehicleType) return 'logistics';
  if (metadata.distributorName || metadata.destinationMarket) return 'distributor';
  if (metadata.preparationNotes || metadata.consumerExperience) return 'end_consumer';
  if (metadata.carbonFootprint || metadata.renewableEnergy) return 'sustainability';

  return 'unknown';
};

// Mapeamento de ícones por tipo detectado
const stageIcons = {
  producer: Coffee,
  warehouse: Warehouse,
  beneficiamento: Eye,
  grader: CheckCircle,
  roaster: Flame,
  packager: Package,
  logistics: Truck,
  distributor: Users,
  sustainability: Leaf,
  end_consumer: Users,
  unknown: CheckCircle
};

// Mapeamento de nomes amigáveis
const stageDisplayNames = {
  producer: 'Coffee Origin',
  warehouse: 'Warehouse Storage',
  beneficiamento: 'Dry Mill Processing',
  grader: 'Quality Grading',
  roaster: 'Roasting Process',
  packager: 'Packaging',
  logistics: 'Transport & Logistics',
  distributor: 'Distribution',
  sustainability: 'Sustainability',
  end_consumer: 'Brewing Experience',
  unknown: 'Processing Step'
};

export const BatchTimeline = ({ stages }) => {
  console.log('📊 BatchTimeline received stages:', stages);

  // Processamento seguro dos stages baseado nos metadados
  const processedStages = React.useMemo(() => {
    if (!stages || !Array.isArray(stages)) {
      console.log('📭 No stages array provided');
      return [];
    }

    return stages
      .filter(stage => {
        const isValid = stage && typeof stage === 'object';
        if (!isValid) {
          console.warn('⚠️ Invalid stage filtered out:', stage);
        }
        return isValid;
      })
      .map((stage, index) => {
        try {
          // Detecta o tipo de etapa baseado nos metadados
          const stageType = detectStageType(stage.metadata);
          const displayName = stageDisplayNames[stageType] || 'Processing Step';
          const Icon = stageIcons[stageType] || stageIcons.unknown;

          // Extrai nome do metadata de forma segura
          const getMetadataName = () => {
            if (!stage.metadata || typeof stage.metadata !== 'object') {
              return 'Processing in progress';
            }

            const metadata = stage.metadata;
            
            // Tenta encontrar um nome baseado no tipo de etapa
            switch (stageType) {
              case 'producer':
                return metadata.farmName || 'Coffee Farm';
              case 'warehouse':
                return metadata.warehouseName || 'Storage Facility';
              case 'beneficiamento':
                return metadata.millingFacilityName || 'Processing Facility';
              case 'grader':
                return metadata.evaluatorName ? `Evaluated by ${metadata.evaluatorName}` : 'Quality Evaluation';
              case 'roaster':
                return metadata.roasteryName || 'Roasting Facility';
              case 'packager':
                return metadata.packagingCompany || 'Packaging Facility';
              case 'logistics':
                return metadata.origin ? `From ${metadata.origin}` : 'Transport';
              case 'distributor':
                return metadata.distributorName || 'Distribution Center';
              case 'sustainability':
                return 'Environmental Impact';
              case 'end_consumer':
                return 'Consumer Experience';
              default:
                return (
                  metadata.name || 
                  metadata.farmName || 
                  metadata.warehouseName || 
                  metadata.roasteryName || 
                  metadata.packagingCompany || 
                  metadata.distributorName ||
                  metadata.millingFacilityName ||
                  metadata.evaluatorName ||
                  'Processing complete'
                );
            }
          };

          const metadataName = getMetadataName();

          return {
            ...stage,
            processedStageType: stageType,
            processedDisplayName: displayName,
            processedMetadataName: metadataName,
            Icon
          };
        } catch (error) {
          console.error(`❌ Error processing stage ${index}:`, error);
          return {
            processedStageType: 'unknown',
            processedDisplayName: 'Processing Step',
            processedMetadataName: 'Data processing',
            Icon: stageIcons.unknown,
            isError: true
          };
        }
      });
  }, [stages]);

  console.log('✅ Processed stages for timeline:', processedStages);

  if (processedStages.length === 0) {
    return (
      <section className="relative py-32 px-6 bg-black">
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-stone-200 to-stone-500 mb-4">
              Journey Timeline
            </h2>
            <p className="text-xl text-stone-400">
              Timeline data will appear as the coffee journey progresses
            </p>
            <div className="mt-8 p-6 bg-stone-900/30 rounded-2xl max-w-md mx-auto">
              <p className="text-stone-500 text-sm">
                The coffee is still making its way through the supply chain. 
                Check back later to see the complete journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-32 px-6 bg-black">
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl pb-3 md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-stone-200 to-stone-500 mb-4">
            Journey Timeline
          </h2>
          <p className="text-xl text-stone-400">
            {processedStages.length} step{processedStages.length !== 1 ? 's' : ''} recorded on blockchain
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-600 via-stone-600 to-emerald-600" />
          
          <div className="space-y-12">
            {processedStages.map((stage, i) => (
              <div key={i} className="relative pl-20">
                <div className={`absolute left-0 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm border-2 ${
                  stage.isError 
                    ? 'bg-red-900/20 border-red-600/40' 
                    : 'bg-gradient-to-br from-amber-600/20 to-stone-950 border-amber-600/40'
                }`}>
                  <stage.Icon className={`w-8 h-8 ${
                    stage.isError ? 'text-red-400' : 'text-amber-400'
                  }`} />
                </div>

                <div className={`p-6 rounded-2xl border transition-all ${
                  stage.isError
                    ? 'bg-red-950/10 border-red-800/30'
                    : 'bg-stone-950/50 border-stone-800/50 hover:border-amber-600/30'
                }`}>
                  <h3 className="text-2xl font-bold text-amber-100 mb-2">
                    {stage.processedDisplayName}
                  </h3>
                  
                  <p className="text-stone-400 mb-3">
                    {stage.processedMetadataName}
                  </p>

                  {/* Mostra informações específicas baseadas no tipo */}
                  {stage.metadata && (
                    <div className="mb-3 text-sm text-stone-500">
                      {stage.processedStageType === 'producer' && stage.metadata.variety && (
                        <div>Variety: {stage.metadata.variety}</div>
                      )}
                      {stage.processedStageType === 'grader' && stage.metadata.scaScore && (
                        <div>SCA Score: {stage.metadata.scaScore}</div>
                      )}
                      {stage.processedStageType === 'roaster' && stage.metadata.roastProfile && (
                        <div>Roast: {stage.metadata.roastProfile}</div>
                      )}
                      {stage.processedStageType === 'logistics' && stage.metadata.distance && (
                        <div>Distance: {stage.metadata.distance} km</div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 text-xs">
                    {stage.ipfsCid && stage.ipfsCid !== 'Qm...' && (
                      <div className="font-mono text-stone-500">
                        IPFS: {stage.ipfsCid.substring(0, 20)}...
                      </div>
                    )}
                    
                    {stage.txSignature && (
                      <div className="font-mono text-stone-500">
                        TX: {stage.txSignature.substring(0, 20)}...
                      </div>
                    )}

                    {stage.isError && (
                      <div className="text-red-400 flex items-center gap-1">
                        <span>⚠️ Data incomplete</span>
                      </div>
                    )}

                    {!stage.metadata && (
                      <div className="text-amber-400 flex items-center gap-1">
                        <span>⏳ Awaiting details</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
};