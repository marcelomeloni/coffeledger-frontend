// src/components/features/partner/BusinessPreview.jsx

import React from 'react';
import { Card } from '../../common/Card';
import { PARTNER_PROFILES } from '../../../constants/BusinessData';

export function BusinessPreview({ partnerRole, metadata }) {
  const profileSchema = PARTNER_PROFILES[partnerRole];

  if (!profileSchema) {
    return (
      <Card>
        <Card.Content>
          <div className="text-center text-red-500 py-4">
            Schema de dados não encontrado para o seu tipo de parceiro.
          </div>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title className="text-xl font-bold">
          Dados Cadastrados
        </Card.Title>
      </Card.Header>
      <Card.Content className="space-y-4">
        {profileSchema.fields.map(field => (
          <div key={field.name} className="border-b pb-2">
            <h3 className="text-sm font-semibold text-gray-500">{field.label}</h3>
            {field.type === 'group' ? (
              <div className="mt-1 space-y-2">
                {field.fields.map(nestedField => (
                  <div key={nestedField.name}>
                    <p className="text-sm font-medium text-gray-700">{nestedField.label}:</p>
                    <p className="text-gray-900 ml-2">{metadata?.[field.name]?.[nestedField.name] || 'Não informado'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-1 text-gray-900">
                {Array.isArray(metadata?.[field.name]) 
                  ? metadata?.[field.name].join(', ')
                  : metadata?.[field.name] || 'Não informado'}
              </p>
            )}
          </div>
        ))}
      </Card.Content>
    </Card>
  );
}