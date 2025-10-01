// src/constants/stageFormSchemas.js

export const STAGE_FORM_SCHEMAS = {
    producer: {
      title: "Registro do Produtor",
      description: "Cadastro das informações da fazenda e produção",
      icon: "🌱",
      fields: [
        {
          name: "farmName",
          label: "Nome da Fazenda",
          type: "text",
          required: true,
          placeholder: "Ex: Fazenda Santa Maria"
        },
        {
          name: "address",
          label: "Endereço Completo",
          type: "text",
          required: true,
          placeholder: "Ex: Rodovia MG-010, Km 45, Monte Verde-MG"
        },
        {
          name: "coordinates",
          label: "Coordenadas Geográficas",
          type: "group",
          description: "Coordenadas para mapeamento da localização exata",
          fields: [
            {
              name: "lat",
              label: "Latitude",
              type: "number",
              step: "any",
              required: true,
              placeholder: "Ex: -22.9201"
            },
            {
              name: "lng", 
              label: "Longitude",
              type: "number",
              step: "any",
              required: true,
              placeholder: "Ex: -46.7652"
            }
          ]
        },
        {
          name: "altitude",
          label: "Altitude (metros acima do nível do mar)",
          type: "number",
          required: true,
          placeholder: "Ex: 1200"
        },
        {
          name: "variety",
          label: "Variedade do Café",
          type: "select",
          required: true,
          options: [
            { value: "arabica", label: "Arábica" },
            { value: "bourbon", label: "Bourbon" },
            { value: "catuai", label: "Catuaí" },
            { value: "mundo_novo", label: "Mundo Novo" },
            { value: "caturra", label: "Caturra" },
            { value: "typica", label: "Typica" },
            { value: "robusta", label: "Robusta" }
          ]
        },
        {
          name: "harvestDate",
          label: "Data da Colheita",
          type: "date",
          required: true
        },
        {
          name: "harvestMethod",
          label: "Método de Colheita",
          type: "select",
          options: [
            { value: "manual", label: "Manual (Derriça)" },
            { value: "selective", label: "Seletiva" },
            { value: "mechanical", label: "Mecanizada" }
          ]
        },
        {
          name: "processingMethod",
          label: "Método de Processamento",
          type: "select",
          required: true,
          options: [
            { value: "natural", label: "Natural" },
            { value: "washed", label: "Lavado" },
            { value: "honey", label: "Honey" },
            { value: "semi-washed", label: "Semi-lavado" },
            { value: "anaerobic", label: "Anaeróbico" },
            { value: "carbonic_maceration", label: "Maceração Carbônica" }
          ]
        },
        {
          name: "beanDensity",
          label: "Densidade do Grão (g/L)",
          type: "number",
          placeholder: "Ex: 680"
        },
        {
          name: "moistureContent",
          label: "Teor de Umidade (%)",
          type: "number",
          step: 0.1,
          placeholder: "Ex: 11.5"
        },
        {
          name: "qualityScore",
          label: "Nota de Qualidade Inicial (0-100)",
          type: "number",
          min: 0,
          max: 100,
          placeholder: "Ex: 85"
        },
        {
          name: "certifications",
          label: "Certificações",
          type: "multiselect",
          options: [
            { value: "organic", label: "Orgânico" },
            { value: "fair_trade", label: "Fair Trade" },
            { value: "rainforest", label: "Rainforest Alliance" },
            { value: "utz", label: "UTZ Certified" },
            { value: "bird_friendly", label: "Bird Friendly" }
          ]
        },
        {
          name: "producerNotes",
          label: "Observações do Produtor",
          type: "textarea",
          placeholder: "Condições climáticas, técnicas de cultivo, desafios específicos, características especiais do terreno..."
        }
      ]
    },
  
    logistics: {
      title: "Registro de Logística",
      description: "Controle de transporte e movimentação do lote",
      icon: "🚚",
      fields: [
        {
          name: "origin",
          label: "Local de Origem", 
          type: "text",
          required: true,
          placeholder: "Ex: Fazenda Santa Maria, Monte Verde-MG"
        },
        {
          name: "originCoordinates",
          label: "Coordenadas de Origem",
          type: "group",
          fields: [
            {
              name: "lat",
              label: "Latitude",
              type: "number",
              step: "any",
              placeholder: "Ex: -22.9201"
            },
            {
              name: "lng",
              label: "Longitude",
              type: "number",
              step: "any",
              placeholder: "Ex: -46.7652"
            }
          ]
        },
        {
          name: "destination",
          label: "Local de Destino",
          type: "text",
          required: true, 
          placeholder: "Ex: Armazém Central, São Paulo-SP"
        },
        {
          name: "destinationCoordinates",
          label: "Coordenadas de Destino",
          type: "group", 
          fields: [
            {
              name: "lat",
              label: "Latitude",
              type: "number",
              step: "any",
              placeholder: "Ex: -23.5505"
            },
            {
              name: "lng",
              label: "Longitude",
              type: "number", 
              step: "any",
              placeholder: "Ex: -46.6333"
            }
          ]
        },
        {
          name: "startTime",
          label: "Data e Hora de Partida",
          type: "datetime-local",
          required: true
        },
        {
          name: "endTime", 
          label: "Data e Hora de Chegada",
          type: "datetime-local",
          required: true
        },
        {
          name: "vehicleType",
          label: "Tipo de Veículo",
          type: "select",
          required: true,
          options: [
            { value: "truck_refrigerated", label: "Caminhão Refrigerado" },
            { value: "truck_dry", label: "Caminhão Seco" },
            { value: "van", label: "Van" }, 
            { value: "container_ship", label: "Navio Container" },
            { value: "air_cargo", label: "Avião de Carga" }
          ]
        },
        {
          name: "vehiclePlate",
          label: "Placa do Veículo",
          type: "text",
          placeholder: "Ex: ABC1D23"
        },
        {
          name: "driverName",
          label: "Nome do Motorista",
          type: "text",
          placeholder: "Ex: João Silva"
        },
        {
          name: "temperatureControl",
          label: "Temperatura Controlada (°C)",
          type: "number",
          placeholder: "Ex: 18"
        },
        {
          name: "humidityControl",
          label: "Umidade Controlada (%)",
          type: "number",
          placeholder: "Ex: 60"
        },
        {
          name: "distance",
          label: "Distância Percorrida (km)",
          type: "number",
          placeholder: "Ex: 350"
        },
        {
          name: "transportConditions",
          label: "Condições do Transporte",
          type: "textarea",
          placeholder: "Ex: Transporte hermético, sem umidade, protegido de luz solar direta, vibração mínima, condições de estrada..."
        },
        {
          name: "incidents",
          label: "Incidentes ou Observações",
          type: "textarea",
          placeholder: "Ex: Atraso por chuva, inspeção na estrada, condições especiais..."
        }
      ]
    },
  
    warehouse: {
      title: "Registro de Armazenamento",
      description: "Controle de estocagem e condições do armazém",
      icon: "🏭",
      fields: [
        {
          name: "warehouseName",
          label: "Nome do Armazém",
          type: "text",
          required: true,
          placeholder: "Ex: Armazém Central São Paulo"
        },
        {
          name: "location",
          label: "Localização",
          type: "text", 
          required: true,
          placeholder: "Ex: Av. das Nações, 1000 - Guarulhos, SP"
        },
        {
          name: "coordinates",
          label: "Coordenadas do Armazém",
          type: "group",
          fields: [
            {
              name: "lat",
              label: "Latitude",
              type: "number",
              step: "any",
              required: true,
              placeholder: "Ex: -23.4255"
            },
            {
              name: "lng",
              label: "Longitude", 
              type: "number",
              step: "any",
              required: true,
              placeholder: "Ex: -46.4784"
            }
          ]
        },
        {
          name: "storageType",
          label: "Tipo de Armazenamento",
          type: "select",
          required: true,
          options: [
            { value: "silo", label: "Silo" },
            { value: "big_bag", label: "Big Bag" },
            { value: "jute_bag", label: "Saco de Juta" },
            { value: "grain_pro", label: "Grain Pro" },
            { value: "vacuum", label: "Vácuo" }
          ]
        },
        {
          name: "temperature",
          label: "Temperatura Média (°C)",
          type: "number",
          required: true,
          placeholder: "Ex: 20"
        },
        {
          name: "humidity",
          label: "Umidade Relativa (%)",
          type: "number",
          required: true,
          placeholder: "Ex: 60"
        },
        {
          name: "stockEntryDate",
          label: "Data de Entrada no Armazém",
          type: "date",
          required: true
        },
        {
          name: "stockExitDate",
          label: "Data de Saída do Armazém",
          type: "date"
        },
        {
          name: "storageDuration",
          label: "Tempo de Armazenamento (dias)",
          type: "number",
          placeholder: "Ex: 30"
        },
        {
          name: "inspectionDate",
          label: "Data da Última Inspeção",
          type: "date"
        },
        {
          name: "pestControl",
          label: "Controle de Pragas",
          type: "select",
          options: [
            { value: "none", label: "Nenhum" },
            { value: "preventive", label: "Preventivo" },
            { value: "corrective", label: "Corretivo" },
            { value: "biological", label: "Biológico" }
          ]
        },
        {
          name: "warehouseNotes",
          label: "Observações do Armazém",
          type: "textarea",
          placeholder: "Ex: Lotes inspecionados, embalagens verificadas, condições especiais de armazenamento..."
        }
      ]
    },
  
    grader: {
      title: "Laudo de Classificação",
      description: "Análise técnica e sensorial do café",
      icon: "🔍",
      fields: [
        {
          name: "evaluatorName",
          label: "Nome do Classificador",
          type: "text",
          required: true,
          placeholder: "Ex: Maria Santos - Q-Grader"
        },
        {
          name: "evaluationDate",
          label: "Data da Avaliação", 
          type: "date",
          required: true
        },
        {
          name: "scaScore",
          label: "Pontuação SCA (0-100)",
          type: "number",
          min: 0,
          max: 100,
          step: 0.25,
          placeholder: "Ex: 85.5"
        },
        {
          name: "defectPercentage",
          label: "Percentual de Defeitos (%)",
          type: "number", 
          step: 0.1,
          required: true,
          placeholder: "Ex: 3.2"
        },
        {
          name: "screenSize",
          label: "Peneira",
          type: "select",
          required: true,
          options: [
            { value: "18+", label: "18 acima" },
            { value: "17", label: "17" },
            { value: "16", label: "16" },
            { value: "15", label: "15" },
            { value: "14", label: "14" },
            { value: "13-", label: "13 abaixo" }
          ]
        },
        {
          name: "moistureContent",
          label: "Teor de Umidade (%)",
          type: "number",
          step: 0.1,
          required: true,
          placeholder: "Ex: 11.2"
        },
        {
          name: "waterActivity",
          label: "Atividade de Água (Aw)",
          type: "number",
          step: 0.01,
          placeholder: "Ex: 0.58"
        },
        {
          name: "beanDensity",
          label: "Densidade do Grão (g/L)",
          type: "number",
          placeholder: "Ex: 720"
        },
        {
          name: "aroma",
          label: "Aroma",
          type: "select",
          options: [
            { value: "floral", label: "Floral" },
            { value: "fruity", label: "Frutado" },
            { value: "nutty", label: "Avelã/Nozes" },
            { value: "chocolate", label: "Chocolate" },
            { value: "caramel", label: "Caramelo" },
            { value: "spicy", label: "Especiarias" },
            { value: "herbal", label: "Herbal" }
          ]
        },
        {
          name: "flavor",
          label: "Sabor",
          type: "text",
          placeholder: "Ex: Frutas vermelhas, chocolate amargo, caramelo"
        },
        {
          name: "body",
          label: "Corpo",
          type: "select", 
          options: [
            { value: "light", label: "Leve" },
            { value: "medium", label: "Médio" },
            { value: "heavy", label: "Encorpado" },
            { value: "creamy", label: "Cremoso" }
          ]
        },
        {
          name: "acidity",
          label: "Acidez",
          type: "select",
          options: [
            { value: "low", label: "Baixa" },
            { value: "medium", label: "Média" },
            { value: "high", label: "Alta" },
            { value: "bright", label: "Brilhante" },
            { value: "citric", label: "Cítrica" },
            { value: "malic", label: "Málica" }
          ]
        },
        {
          name: "aftertaste",
          label: "Finalização",
          type: "text",
          placeholder: "Ex: Persistente, limpa, adocicada, duradoura"
        },
        {
          name: "balance",
          label: "Equilíbrio",
          type: "select",
          options: [
            { value: "excellent", label: "Excelente" },
            { value: "good", label: "Bom" },
            { value: "regular", label: "Regular" },
            { value: "poor", label: "Ruim" }
          ]
        },
        {
          name: "qualityNotes",
          label: "Observações de Qualidade",
          type: "textarea", 
          placeholder: "Defeitos identificados, uniformidade, potencial de torra, características especiais..."
        }
      ]
    },
  
    roaster: {
      title: "Perfil de Torra",
      description: "Registro do processo de torrefação",
      icon: "🔥",
      fields: [
        {
          name: "roasteryName",
          label: "Nome da Torrefação",
          type: "text",
          required: true,
          placeholder: "Ex: Torrefação Arte & Sabor"
        },
        {
          name: "roasteryLocation",
          label: "Localização da Torrefação",
          type: "group",
          fields: [
            {
              name: "lat",
              label: "Latitude",
              type: "number", 
              step: "any",
              placeholder: "Ex: -23.5505"
            },
            {
              name: "lng",
              label: "Longitude",
              type: "number",
              step: "any", 
              placeholder: "Ex: -46.6333"
            }
          ]
        },
        {
          name: "roastProfile",
          label: "Perfil de Torra",
          type: "select",
          required: true,
          options: [
            { value: "light", label: "Clara" },
            { value: "medium_light", label: "Média-Clara" },
            { value: "medium", label: "Média" },
            { value: "medium_dark", label: "Média-Escura" },
            { value: "dark", label: "Escura" },
            { value: "espresso", label: "Espresso" },
            { value: "filter", label: "Filtro" },
            { value: "french", label: "Francesa" }
          ]
        },
        {
          name: "roastDate",
          label: "Data da Torra",
          type: "date",
          required: true
        },
        {
          name: "batchSize",
          label: "Tamanho do Lote (kg)",
          type: "number",
          required: true,
          placeholder: "Ex: 15"
        },
        {
          name: "chargeTemperature",
          label: "Temperatura de Carga (°C)",
          type: "number",
          placeholder: "Ex: 180"
        },
        {
          name: "temperature",
          label: "Temperatura Máxima (°C)",
          type: "number",
          required: true,
          placeholder: "Ex: 215"
        },
        {
          name: "dropTemperature",
          label: "Temperatura de Descarga (°C)", 
          type: "number",
          placeholder: "Ex: 198"
        },
        {
          name: "duration",
          label: "Duração Total (minutos)",
          type: "number",
          required: true,
          placeholder: "Ex: 12"
        },
        {
          name: "firstCrack",
          label: "Primeiro Crack (minuto)",
          type: "number",
          step: 0.1,
          placeholder: "Ex: 8.5"
        },
        {
          name: "secondCrack",
          label: "Segundo Crack (minuto)", 
          type: "number",
          step: 0.1,
          placeholder: "Ex: 11.2"
        },
        {
          name: "developmentTime",
          label: "Tempo de Desenvolvimento (min)",
          type: "number",
          step: 0.1,
          placeholder: "Ex: 2.5"
        },
        {
          name: "developmentRatio",
          label: "Taxa de Desenvolvimento (%)",
          type: "number",
          step: 0.1,
          placeholder: "Ex: 20.8"
        },
        {
          name: "roasterType",
          label: "Tipo de Torradeira",
          type: "select",
          options: [
            { value: "drum", label: "Tambor" },
            { value: "fluid_bed", label: "Leito Fluidizado" },
            { value: "hot_air", label: "Ar Quente" }
          ]
        },
        {
          name: "roastNotes",
          label: "Observações da Torra",
          type: "textarea",
          placeholder: "Notas de sabor desenvolvidas, uniformidade, aroma, desafios específicos, ajustes de perfil..."
        }
      ]
    },
  
    packager: {
      title: "Registro de Embalagem",
      description: "Controle do processo de embalagem e loteamento",
      icon: "📦",
      fields: [
        {
          name: "packagingCompany",
          label: "Nome da Empresa de Embalagem",
          type: "text",
          required: true,
          placeholder: "Ex: Embalagens Café Premium Ltda."
        },
        {
          name: "location",
          label: "Localização",
          type: "text",
          required: true,
          placeholder: "Ex: Rua das Indústrias, 500 - São Paulo, SP"
        },
        {
          name: "packagingType",
          label: "Tipo de Embalagem",
          type: "select",
          required: true,
          options: [
            { value: "vacuum_bag", label: "Vácuo" },
            { value: "valve_bag", label: "Com Válvula" },
            { value: "kraft_bag", label: "Papel Kraft" },
            { value: "tin_can", label: "Lata" },
            { value: "doypack", label: "Doypack" },
            { value: "grain_pro", label: "Grain Pro" }
          ]
        },
        {
          name: "packageSize",
          label: "Tamanho da Embalagem",
          type: "select",
          required: true,
          options: [
            { value: "250g", label: "250g" },
            { value: "500g", label: "500g" },
            { value: "1kg", label: "1kg" },
            { value: "2kg", label: "2kg" },
            { value: "5kg", label: "5kg" },
            { value: "60kg", label: "60kg (Saco)" }
          ]
        },
        {
          name: "weight",
          label: "Peso Líquido (g)",
          type: "number",
          required: true,
          placeholder: "Ex: 500"
        },
        {
          name: "packagingDate",
          label: "Data da Embalagem",
          type: "date",
          required: true
        },
        {
          name: "expirationDate",
          label: "Data de Validade",
          type: "date",
          required: true
        },
        {
          name: "lotNumber",
          label: "Número do Lote",
          type: "text",
          required: true,
          placeholder: "Ex: LOTE-2025-001-BR"
        },
        {
          name: "qrCode",
          label: "Código QR Incluído",
          type: "select",
          options: [
            { value: "yes", label: "Sim" },
            { value: "no", label: "Não" }
          ]
        },
        {
          name: "gasFlushing",
          label: "Flushing de Gás",
          type: "select",
          options: [
            { value: "none", label: "Nenhum" },
            { value: "nitrogen", label: "Nitrogênio" },
            { value: "carbon_dioxide", label: "Dióxido de Carbono" }
          ]
        },
        {
          name: "packagingNotes",
          label: "Observações da Embalagem",
          type: "textarea",
          placeholder: "Ex: Etiqueta com QR Code, instruções de preparo, loteamento específico, condições especiais..."
        }
      ]
    },
  
    distributor: {
      title: "Registro de Distribuição",
      description: "Controle da distribuição para pontos de venda",
      icon: "🚛",
      fields: [
        {
          name: "distributorName",
          label: "Nome do Distribuidor",
          type: "text",
          required: true,
          placeholder: "Ex: Distribuidora Café Brasil Ltda."
        },
        {
          name: "destinationMarket",
          label: "Mercado de Destino",
          type: "text",
          required: true,
          placeholder: "Ex: Cafeterias em São Paulo"
        },
        {
          name: "destinationAddress",
          label: "Endereço de Destino",
          type: "text",
          placeholder: "Ex: Av. Paulista, 1000 - São Paulo, SP"
        },
        {
          name: "destinationCoordinates",
          label: "Coordenadas de Destino",
          type: "group",
          fields: [
            {
              name: "lat",
              label: "Latitude",
              type: "number",
              step: "any",
              placeholder: "Ex: -23.5635"
            },
            {
              name: "lng",
              label: "Longitude",
              type: "number",
              step: "any",
              placeholder: "Ex: -46.6521"
            }
          ]
        },
        {
          name: "distributionDate",
          label: "Data de Distribuição",
          type: "date",
          required: true
        },
        {
          name: "transportMode",
          label: "Modo de Transporte",
          type: "select",
          required: true,
          options: [
            { value: "ground", label: "Terrestre" },
            { value: "air", label: "Aéreo" },
            { value: "sea", label: "Marítimo" }
          ]
        },
        {
          name: "customerType",
          label: "Tipo de Cliente",
          type: "select",
          options: [
            { value: "cafe", label: "Cafeteria" },
            { value: "restaurant", label: "Restaurante" },
            { value: "hotel", label: "Hotel" },
            { value: "retail", label: "Varejo" },
            { value: "wholesale", label: "Atacado" }
          ]
        },
        {
          name: "distributionNotes",
          label: "Observações da Distribuição",
          type: "textarea",
          placeholder: "Ex: Entregue refrigerado, entrega programada para cafeteria premium, condições especiais de entrega..."
        }
      ]
    }
  };
  
  export const roles = [
    { value: 'producer', label: 'Produtor' },
    { value: 'logistics', label: 'Logística' },
    { value: 'warehouse', label: 'Armazém' },
    { value: 'grader', label: 'Classificador' },
    { value: 'roaster', label: 'Torrefador' },
    { value: 'packager', label: 'Embalador' },
    { value: 'distributor', label: 'Distribuidor' }
  ];