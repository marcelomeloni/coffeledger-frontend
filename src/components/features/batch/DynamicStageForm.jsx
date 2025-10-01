// src/components/features/batch/DynamicStageForm.jsx
import { useState } from 'react';
import { addStageToBatch } from '../../../api/batchService';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';
import { useAuth } from '../../../contexts/AuthContext';
import { STAGE_FORM_SCHEMAS } from '../../../constants/stageFormSchemas';
import toast from 'react-hot-toast';

export function DynamicStageForm({ batchId, onStageAdded, partnerType }) {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { publicKey } = useAuth();

  // Get schema based on partner type
  const formSchema = STAGE_FORM_SCHEMAS[partnerType];

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // New function for handling nested field changes (like coordinates)
  const handleNestedInputChange = (parentField, nestedFieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [nestedFieldName]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!publicKey) {
      return toast.error("Você precisa estar conectado.");
    }

    // Validate required fields
    const missingFields = formSchema.fields.filter(field => {
      if (!field.required) return false;
      
      if (field.type === 'group') {
        // For group fields, check if all required nested fields are filled
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
    
    // Add all form fields as JSON
    submissionData.append('formData', JSON.stringify(formData));
    
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
        return (
          <div>
            <select 
              {...commonProps}
              multiple
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 h-32"
              value={formData[field.name] || []}
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
          {formSchema.fields.map(field => (
            <div key={field.name}>
              {field.type !== 'group' && (
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
              )}
              {renderField(field)}
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
          <div className="text-sm text-gray-500">
            {formSchema.fields.filter(f => f.required).length} campos obrigatórios
          </div>
          <Button 
            type="submit" 
            className="min-w-32" 
            disabled={loading}
          >
            {loading ? 'Registrando...' : `Registrar ${formSchema.title}`}
          </Button>
        </Card.Footer>
      </form>
    </Card>
  );
}