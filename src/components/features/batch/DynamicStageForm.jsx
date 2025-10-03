// src/components/features/batch/DynamicStageForm.jsx (VERSÃO COMPLETA ATUALIZADA)
import { useState, useEffect } from 'react';
import { addStageToBatch } from '../../../api/batchService';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';
import { useAuth } from '../../../contexts/AuthContext';
import { usePartnerData } from '../../../hooks/usePartnerData';
import { STAGE_FORM_SCHEMAS } from '../../../constants/stageFormSchemas';
import toast from 'react-hot-toast';

export function DynamicStageForm({ batchId, onStageAdded, partnerType }) {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { publicKey, partnerId } = useAuth();

  // Buscar dados do parceiro (incluindo metadata)
  const { metadata: partnerMetadata, isLoading: isPartnerDataLoading } = usePartnerData(partnerId);

  // Get schema based on partner type
  const formSchema = STAGE_FORM_SCHEMAS[partnerType];

  // 🆕 Preencher automaticamente com dados do parceiro - AGORA SUPORTA ESTRUTURA COMPLEXA
  useEffect(() => {
    if (partnerMetadata && !isPartnerDataLoading && formSchema) {
      console.log('📦 Metadados do parceiro carregados:', partnerMetadata);
      
      const autoFillData = {};
      
      // Mapear campos do schema para preenchimento automático
      formSchema.fields.forEach(field => {
        if (field.autoFill) {
          // 🆕 Suporte para caminhos aninhados (ex: 'coordinates.lat')
          const value = getNestedValue(partnerMetadata, field.autoFill);
          if (value !== undefined && value !== null) {
            autoFillData[field.name] = value;
            console.log(`✅ Preenchendo ${field.name} com:`, value);
          }
        }

        // 🆕 Suporte para grupos com campos aninhados
        if (field.type === 'group' && field.fields) {
          field.fields.forEach(nestedField => {
            if (nestedField.autoFill) {
              const nestedValue = getNestedValue(partnerMetadata, nestedField.autoFill);
              if (nestedValue !== undefined && nestedValue !== null) {
                // Inicializa o grupo se não existir
                if (!autoFillData[field.name]) {
                  autoFillData[field.name] = {};
                }
                autoFillData[field.name][nestedField.name] = nestedValue;
                console.log(`✅ Preenchendo ${field.name}.${nestedField.name} com:`, nestedValue);
              }
            }
          });
        }
      });

      if (Object.keys(autoFillData).length > 0) {
        setFormData(prev => ({ ...prev, ...autoFillData }));
        toast.success('Dados do parceiro carregados automaticamente!');
      }
    }
  }, [partnerMetadata, isPartnerDataLoading, formSchema]);

  // 🆕 Função auxiliar para acessar valores aninhados no objeto
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  };

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleNestedInputChange = (parentField, nestedFieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [nestedFieldName]: value
      }
    }));
  };

  // 🆕 Função para formatar coordenadas para exibição
  const formatCoordinates = (coords) => {
    if (!coords) return '';
    if (typeof coords === 'string') return coords;
    if (coords.lat && coords.lng) {
      return `${coords.lat}, ${coords.lng}`;
    }
    return JSON.stringify(coords);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!publicKey) {
      return toast.error("Você precisa estar conectado.");
    }

    // Validar campos obrigatórios
    const missingFields = formSchema.fields.filter(field => {
      if (!field.required) return false;
      
      if (field.type === 'group') {
        return field.fields.some(nestedField => 
          nestedField.required && !formData[field.name]?.[nestedField.name]
        );
      }
      
      return !formData[field.name];
    });

    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(field => field.label).join(', ');
      return toast.error(`Preencha os campos obrigatórios: ${fieldNames}`);
    }

    setLoading(true);

    const submissionData = new FormData();
    submissionData.append('stageName', formSchema.title);
    submissionData.append('partnerType', partnerType);
    submissionData.append('userKey', publicKey.toBase58());
    
    // 🆕 Incluir metadata completo do parceiro no envio
    if (partnerMetadata) {
      submissionData.append('partnerMetadata', JSON.stringify(partnerMetadata));
    }
    
    // Add all form fields as JSON
    submissionData.append('formData', JSON.stringify({
      ...formData,
      // 🆕 Incluir metadados relevantes diretamente no formData para fácil acesso
      _partnerMetadata: {
        farmName: partnerMetadata?.farmName,
        address: partnerMetadata?.address,
        certifications: partnerMetadata?.certifications,
        altitude: partnerMetadata?.altitude
      }
    }));
    
    if (file) {
      submissionData.append('attachment', file);
    }

    try {
      await addStageToBatch(batchId, submissionData);
      toast.success('Etapa registrada com sucesso!');
      setFormData({});
      setFile(null);
      onStageAdded();
    } catch (error) {
      toast.error(error.message || 'Falha ao registrar etapa.');
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field) => {
    const commonProps = {
      value: formData[field.name] || '',
      onChange: (e) => handleInputChange(field.name, e.target.value),
      required: field.required,
      className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500",
      placeholder: field.placeholder
    };

    switch (field.type) {
      case 'textarea':
        return <textarea {...commonProps} rows={3} />;
      
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Selecione...</option>
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      
      case 'number':
        return (
          <input 
            type="number" 
            {...commonProps}
            min={field.min}
            max={field.max}
            step={field.step}
          />
        );
      
      case 'datetime-local':
        return <input type="datetime-local" {...commonProps} />;
      
      case 'date':
        return <input type="date" {...commonProps} />;
      
      case 'group':
        return (
          <div className="space-y-3 p-4 border border-gray-200 rounded-md bg-gray-50">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {field.description && (
              <p className="text-sm text-gray-500 mb-3">{field.description}</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {field.fields.map(nestedField => (
                <div key={nestedField.name}>
                  <label htmlFor={nestedField.name} className="block text-xs font-medium text-gray-600">
                    {nestedField.label}
                    {nestedField.required && <span className="text-red-500 ml-1">*</span>}
                    {nestedField.autoFill && partnerMetadata && (
                      <span className="text-green-500 ml-2 text-xs">(Auto)</span>
                    )}
                  </label>
                  <input
                    type={nestedField.type}
                    step={nestedField.step || "any"}
                    value={formData[field.name]?.[nestedField.name] || ''}
                    onChange={(e) => handleNestedInputChange(field.name, nestedField.name, e.target.value)}
                    required={nestedField.required}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-sm"
                    placeholder={nestedField.placeholder}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'multiselect':
        // 🆕 Tratamento especial para certificações
        const currentValue = formData[field.name] || [];
        return (
          <div>
            <select 
              {...commonProps}
              multiple
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 h-32"
              value={currentValue}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, option => option.value);
                handleInputChange(field.name, selected);
              }}
            >
              <option value="">Selecione uma ou mais opções...</option>
              {field.options?.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Mantenha Ctrl pressionado para selecionar múltiplas opções</p>
            {currentValue.length > 0 && (
              <p className="text-xs text-green-600 mt-1">
                Selecionadas: {currentValue.length} certificação(ões)
              </p>
            )}
          </div>
        );
      
      case 'coordinates':
        // 🆕 Campo especial para coordenadas
        return (
          <div>
            <input 
              type="text" 
              {...commonProps}
              value={formatCoordinates(formData[field.name])}
              placeholder="Latitude, Longitude ou objeto JSON"
            />
            {partnerMetadata?.coordinates && (
              <p className="text-xs text-gray-500 mt-1">
                Coordenadas da fazenda: {formatCoordinates(partnerMetadata.coordinates)}
              </p>
            )}
          </div>
        );
      
      default:
        return <input type="text" {...commonProps} />;
    }
  };

  if (!formSchema) {
    return (
      <Card>
        <Card.Content>
          <div className="text-center text-red-500 py-4">
            Schema de formulário não encontrado para: {partnerType}
          </div>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title className="flex items-center gap-2">
          <span className="text-2xl">{formSchema.icon}</span>
          <div>
            <div>{formSchema.title}</div>
            {formSchema.description && (
              <div className="text-sm text-gray-600 font-normal mt-1">
                {formSchema.description}
              </div>
            )}
          </div>
        </Card.Title>
      </Card.Header>
      
      <form onSubmit={handleSubmit}>
        <Card.Content className="space-y-6">
          {/* 🆕 Indicador de dados carregados automaticamente */}
          {partnerMetadata && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <div className="flex items-start">
                <span className="text-blue-500 mr-2 mt-0.5">✅</span>
                <div>
                  <span className="text-sm font-medium text-blue-700">
                    Dados da Fazenda Santa Maria carregados automaticamente
                  </span>
                  <div className="text-xs text-blue-600 mt-1">
                    {partnerMetadata.farmName} • {partnerMetadata.altitude}m • {partnerMetadata.certifications?.length || 0} certificações
                  </div>
                </div>
              </div>
            </div>
          )}

          {formSchema.fields.map(field => (
            <div key={field.name}>
              {field.type !== 'group' && (
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                  {field.autoFill && partnerMetadata && getNestedValue(partnerMetadata, field.autoFill) && (
                    <span className="text-green-500 ml-2 text-xs">(Preenchido automaticamente)</span>
                  )}
                </label>
              )}
              {renderField(field)}
              {field.description && field.type !== 'group' && (
                <p className="text-xs text-gray-500 mt-1">{field.description}</p>
              )}
            </div>
          ))}
          
          <div className="border-t pt-4">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
              Anexo (Foto, PDF, Laudo)
            </label>
            <input
              id="file"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
            />
            <p className="text-xs text-gray-500 mt-1">
              Formatos aceitos: JPG, PNG, PDF, DOC (Tamanho máximo: 10MB)
            </p>
          </div>
        </Card.Content>
        
        <Card.Footer className="flex justify-between items-center">
          <div className="flex flex-col">
            <div className="text-sm text-gray-500">
              {formSchema.fields.filter(f => f.required).length} campos obrigatórios
            </div>
            {partnerMetadata && (
              <div className="text-xs text-green-600 mt-1">
                ✓ Dados do perfil disponíveis
              </div>
            )}
          </div>
          <Button 
            type="submit" 
            className="min-w-32" 
            disabled={loading || isPartnerDataLoading}
          >
            {loading ? 'Registrando...' : 
             isPartnerDataLoading ? 'Carregando...' : 
             `Registrar ${formSchema.title}`}
          </Button>
        </Card.Footer>
      </form>
    </Card>
  );
}