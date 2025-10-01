import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBatchById } from '../api/batchService';

// Componentes de UI por etapa
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
  if (!ipfsCid) return null;
  const url = `https://ipfs.io/ipfs/${ipfsCid}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar metadados: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Falha ao buscar metadados do IPFS:", error);
    return null;
  }
};

const BatchPage = () => {
  const { id } = useParams();

  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const data = await getBatchById(id);

        const stagesWithMetadata = await Promise.all(
          data.stages.map(async (stage) => {
            const metadata = await fetchMetadata(stage.ipfsCid);
            return { ...stage, metadata };
          })
        );

        const completeBatchData = {
          ...data,
          stages: stagesWithMetadata,
        };

        setBatch(completeBatchData);
        setError(null);
      } catch (err) {
        console.error("Falha ao carregar os dados do lote:", err);
        setError("Não foi possível carregar os dados do lote.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <p className="text-lg text-gray-300">Construindo a história do seu café...</p>
      </div>
    );
  }

  if (error || !batch) {
    return (
      <div className="p-8 text-center text-red-500 min-h-screen flex items-center justify-center bg-black">
        <p className="text-gray-300">{error || "Nenhum dado de lote encontrado."}</p>
      </div>
    );
  }

  const { details, stages } = batch;

  // Helper para pegar metadata de cada etapa
  const getStageMetadata = (stepName) => {
    const stage = stages.find((s) => s.step_name === stepName);
    return stage?.metadata || null;
  };

  return (
    <div className="font-sans text-gray-800 bg-black">
      <BatchHero producerName={details.producer_name} onchainId={details.onchain_id} />

    

      {/* Etapas detalhadas */}
      <ProductionDetails producerMetadata={getStageMetadata('producer')} />
      <WarehouseDetails warehouseMetadata={getStageMetadata('warehouse')} />
      <BeneficiamentoDetails beneficiamentoMetadata={getStageMetadata('beneficiamento')} />
      <GraderDetails graderMetadata={getStageMetadata('grader')} />
      <RoasterDetails roasterMetadata={getStageMetadata('roaster')} />
      <PackagerDetails packagerMetadata={getStageMetadata('packager')} />
      <LogisticsDetails logisticsMetadata={getStageMetadata('logistics')} />
      <DistributorDetails distributorMetadata={getStageMetadata('distributor')} />
      <EndConsumerDetails endConsumerMetadata={getStageMetadata('end_consumer')} />
      <SustainabilityDetails sustainabilityMetadata={getStageMetadata('sustainability')} />
  {/* Timeline geral do lote */}
  <BatchTimeline stages={stages} />
      {/* Rodapé */}
      <div className="bg-gray-900 text-gray-400 p-8 text-center mt-12">
        <p className="text-sm">
          Este registro é mantido de forma segura e imutável na blockchain de Solana.
        </p>
        <p className="text-xs mt-2 break-all">
          Endereço On-chain do Lote: {details.id}
        </p>
      </div>
    </div>
  );
};

export default BatchPage;
