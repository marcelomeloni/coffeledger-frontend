import React, { useState } from 'react';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';
import { PARTNER_PROFILES } from '../../../constants/BusinessData';
import toast from 'react-hot-toast';

export function BusinessForm({ partnerRole, initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialData || {});
  const [loading, setLoading] = useState(false);

  const formSchema = PARTNER_PROFILES[partnerRole];

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

  // 🆕 Função para formatar data para o input type="date"
  const formatDateForInput = (dateValue) => {
    if (!dateValue) return '';
    
    // Se já estiver no formato YYYY-MM-DD, retorna como está
    if (typeof dateValue === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
      return dateValue;
    }
    
    // Se for um objeto Date ou string em outro formato, converte
    try {
      const date = new Date(dateValue);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
    } catch (e) {
      console.warn('Não foi possível formatar a data:', dateValue);
    }
    
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const missingFields = formSchema.fields.filter(field => {
      if (!field.required) return false;
      
      if (field.type === 'group') {
        return field.fields.some(nestedField => 
          nestedField.required && (!formData[field.name] || !formData[field.name][nestedField.name])
        );
      }
      
      return !formData[field.name];
    });

    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(field => field.label).join(', ');
      toast.error(`Preencha os campos obrigatórios: ${fieldNames}`);
      setLoading(false);
      return;
    }

    try {
      await onSubmit(formData);
      toast.success('Dados salvos com sucesso!');
    } catch (error) {
      toast.error(error.message || 'Falha ao salvar os dados.');
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
      
      // 🆕 CASOS PARA DATAS ADICIONADOS
      case 'date':
        return (
          <input 
            type="date" 
            {...commonProps}
            value={formatDateForInput(formData[field.name])}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        );
      
      case 'datetime-local':
        return (
          <input 
            type="datetime-local" 
            {...commonProps}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        );
      
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
                  
                  {/* 🆕 TRATAMENTO ESPECIAL PARA CAMPOS ANINHADOS COM DATAS */}
                  {nestedField.type === 'date' ? (
                    <input
                      type="date"
                      value={formatDateForInput(formData[field.name]?.[nestedField.name])}
                      onChange={(e) => handleNestedInputChange(field.name, nestedField.name, e.target.value)}
                      required={nestedField.required}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-sm"
                      placeholder={nestedField.placeholder}
                    />
                  ) : nestedField.type === 'datetime-local' ? (
                    <input
                      type="datetime-local"
                      value={formData[field.name]?.[nestedField.name] || ''}
                      onChange={(e) => handleNestedInputChange(field.name, nestedField.name, e.target.value)}
                      required={nestedField.required}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-sm"
                      placeholder={nestedField.placeholder}
                    />
                  ) : (
                    <input
                      type={nestedField.type}
                      step={nestedField.step || "any"}
                      value={formData[field.name]?.[nestedField.name] || ''}
                      onChange={(e) => handleNestedInputChange(field.name, nestedField.name, e.target.value)}
                      required={nestedField.required}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-sm"
                      placeholder={nestedField.placeholder}
                    />
                  )}
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
            Schema de formulário não encontrado para: {partnerRole}
          </div>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title className="text-2xl font-bold">{formSchema.title}</Card.Title>
        <Card.Description>{formSchema.description}</Card.Description>
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
              {field.description && field.type !== 'group' && (
                <p className="text-xs text-gray-500 mt-1">{field.description}</p>
              )}
            </div>
          ))}
        </Card.Content>
        
        <Card.Footer className="flex justify-end gap-2 mt-4">
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" className="min-w-32" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </Card.Footer>
      </form>
    </Card>
  );
}