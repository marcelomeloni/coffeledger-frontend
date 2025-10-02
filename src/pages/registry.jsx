import React from 'react';
import { FileText, PlusCircle } from 'lucide-react';

/**
 * RegistryPage: Componente para o registro de dados de uma nova etapa de lote.
 * Este é o ponto de entrada para Parceiros registrarem dados de rastreabilidade.
 */
export default function RegistryPage() {
  // Simulação de metadados da etapa para determinar o que será registrado
  const stageName = "Etapa de Torra"; // Exemplo: poderia vir de um parâmetro de rota ou da Workstation
  const batchId = "LT-2025-0042"; 

  return (
    <div className="min-h-full bg-gray-50 p-4 md:p-8">
      {/* Header da Página */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <FileText className="w-7 h-7 text-green-600" />
          Registro de Etapa
        </h1>
        <p className="mt-2 text-gray-500">
          Utilize este formulário para registrar os dados de rastreabilidade da sua etapa.
        </p>
      </div>

      {/* Cartão Principal do Formulário */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
        <div className="p-6 md:p-8 border-b bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">
            Dados para: <span className="text-green-600">{stageName}</span>
          </h2>
          <p className="text-sm text-gray-500">
            Lote ID: <span className="font-medium text-gray-600">{batchId}</span>
          </p>
        </div>

        {/* Placeholder do Formulário */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
            <PlusCircle className="w-10 h-10 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">
              O formulário dinâmico será construído aqui.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              (Campos de texto, data, seleção múltipla e números aparecerão com base na etapa atual.)
            </p>
          </div>
          
          {/* Ação (Botão de Registro) */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150 flex items-center gap-2"
            >
              Registrar Dados
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
