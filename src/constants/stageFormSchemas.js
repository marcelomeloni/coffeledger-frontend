// src/constants/stageFormSchemas.js

export const STAGE_FORM_SCHEMAS = {
  // src/constants/stageFormSchemas.js - SCHEMA PRODUCER ATUALIZADO
producer: {
  title: "🌱 Etapa Produtor",
  description: "Cadastro das informações da fazenda e produção",
  icon: "🌱",
  fields: [
    
 
    {
      name: "farmName",
      label: "Nome da Fazenda",
      type: "text",
      required: true,
      autoFill: 'farmName',
      placeholder: "Ex: Fazenda Santa Maria"
    },
    {
      name: "address",
      label: "Endereço Completo",
      type: "text",
      required: true,
      autoFill: 'address',
      placeholder: "Ex: Rodovia MG-010, Km 45, Monte Verde-MG"
    },
    {
      name: "coordinates",
      label: "Coordenadas Geográficas",
      type: "group",
      description: "Coordenadas para mapeamento da localização exata",
      required: false,
      fields: [
        {
          name: "lat",
          label: "Latitude",
          type: "number",
          step: "any",
          autoFill: 'coordinates.lat',
          placeholder: "Ex: -22.9201"
        },
        {
          name: "lng", 
          label: "Longitude",
          type: "number",
          step: "any",
          autoFill: 'coordinates.lng',
          placeholder: "Ex: -46.7652"
        }
      ]
    },
    {
      name: "altitude",
      label: "Altitude (metros acima do nível do mar)",
      type: "number",
      required: false,
      autoFill: 'altitude',
      placeholder: "Ex: 1200"
    },
    {
      name: "plantingDate",
      label: "Data do Plantio",
      type: "date",
      required: false
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
        { value: "robusta", label: "Robusta" },
        { value: "catucai_amarelo", label: "Catucaí Amarelo" }
      ]
    },
    {
      name: "cropYear",
      label: "Safra/Ano da Colheita",
      type: "text",
      required: true,
      placeholder: "Ex: 2025/26"
    },
    {
      name: "harvestDate",
      label: "Data da Colheita",
      type: "date",
      required: true
    },
    {
      name: "cropClimate",
      label: "Condições Climáticas na Safra",
      type: "textarea",
      required: false,
      placeholder: "Ex: Seca e temperaturas elevadas em fevereiro, seguidas de chuvas irregulares"
    },
    {
      name: "shadeConsortium",
      label: "Sombra / Consórcio Agrícola",
      type: "textarea",
      required: false,
      autoFill: 'shadeConsortium',
      placeholder: "Ex: Cultivado com árvores nativas e bananeiras para sombreamento"
    },
    {
      name: "producerStory",
      label: "História da Fazenda / Produtor",
      type: "textarea",
       
      autoFill: "producerStory" ,
      required: false,
      placeholder: "Ex: Fazenda familiar há 3 gerações, dedicada à produção cafeeira desde 1882"
    },
    {
      name: "harvestMethod",
      label: "Método de Colheita",
      type: "select",
      required: true,
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
      required: false,
      placeholder: "Ex: 680"
    },
    {
      name: "moistureContent",
      label: "Teor de Umidade (%)",
      type: "number",
      required: false,
      step: 0.1,
      placeholder: "Ex: 11.5"
    },
    {
      name: "qualityScore",
      label: "Nota de Qualidade Inicial (0-100)",
      type: "number",
      required: false,
      min: 0,
      max: 100,
      placeholder: "Ex: 85"
    },
    {
      name: "certifications",
      label: "Certificações",
      type: "multiselect",
      required: false,
      autoFill: 'certifications',
      options: [
        { value: "organic", label: "Orgânico" },
        { value: "fair_trade", label: "Fair Trade" },
        { value: "rainforest", label: "Rainforest Alliance" },
        { value: "utz", label: "UTZ Certified" },
        { value: "bird_friendly", label: "Bird Friendly" },
        { value: "global_gap", label: "Global G.A.P." },
        { value: "brasil_sustentavel", label: "Brasil Sustentável" }
      ]
    },
    {
      name: "producerNotes",
      label: "Observações do Produtor",
      type: "textarea",
      required: false,
      placeholder: "Condições climáticas, técnicas de cultivo, desafios específicos, características especiais do terreno..."
    },
    {
      name: "estimatedVolume",
      label: "Volume Produzido (kg)",
      type: "number",
      required: true,
      min: 1,
      step: 0.1,
      placeholder: "Ex: 1500.5"
    },
    {
      name: "soilType",
      label: "Tipo de Solo",
      type: "select",
      required: false,
      options: [
        { value: "clay", label: "Argiloso" },
        { value: "sandy", label: "Arenoso" },
        { value: "clay_sandy", label: "Argilo-Arenoso" },
        { value: "limestone", label: "Calcário" },
        { value: "volcanic", label: "Vulcânico" },
        { value: "laterite", label: "Laterítico" }
      ]
    }
  ]
},

  logistics: {
    title: "🚚 Logística",
    description: "Controle de transporte e movimentação do lote",
    icon: "🚚",
    fields: [
   
      {
        name: "transportCertifications",
        label: "Certificações de Transporte",
        type: "multiselect",
        autoFill: "transportCertifications" ,
        options: [
          { value: "organic_certified", label: "Transporte Orgânico Certificado" },
          { value: "sustainable", label: "Transporte Sustentável" },
          { value: "carbon_neutral", label: "Carbono Neutro" }
        ]
      },
      {
        name: "origin",
        label: "Local de Origem", 
        autoFill: "origin" ,
        type: "text",
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
        autoFill: "destination" ,
        type: "text",
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
        type: "datetime-local"
      },
      {
        name: "endTime", 
        label: "Data e Hora de Chegada",
        type: "datetime-local"
      },
      {
        name: "vehicleType",
        label: "Tipo de Veículo",
        autoFill: "vehicleType" ,
        type: "select",
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
        autoFill: "vehiclePlate" ,
        type: "text",
        placeholder: "Ex: ABC1D23"
      },
      {
        name: "driverName",
        label: "Nome do Motorista",
        autoFill: "driverName" ,
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
    title: "🏭 Armazém",
    description: "Controle de estocagem e condições do armazém",
    icon: "🏭",
    fields: [
      {
        name: "warehouseName",
        label: "Nome do Armazém",
        autoFill: "warehouseName" ,
        type: "text",
        placeholder: "Ex: Armazém Central São Paulo"
      },
      {
        name: "location",
        label: "Localização",
        autoFill: "location" ,
        type: "text", 
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
            autoFill: "coordinates.lat" ,
            type: "number",
            step: "any",
            placeholder: "Ex: -23.4255"
          },
          {
            name: "lng",
            label: "Longitude", 
            autoFill: "coordinates.lng" ,
            type: "number",
            step: "any",
            placeholder: "Ex: -46.4784"
          }
        ]
      },
      {
        name: "storageCapacity",
        label: "Capacidade de Armazenagem (kg/ton)",
        autoFill: "storageCapacity" ,
        type: "text",
        placeholder: "Ex: 50 toneladas"
      },
      {
        name: "internalBatching",
        label: "Loteamento Interno",
        type: "textarea",
        placeholder: "Ex: Separado por microlotes, lote A1-A5 para cafés especiais"
      },
      {
        name: "batchPhotos",
        label: "Fotos do Lote / Bag",
        type: "file",
        description: "Fotos para storytelling e documentação visual"
      },
      {
        name: "storageType",
        label: "Tipo de Armazenamento",
        type: "select",
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
        placeholder: "Ex: 20"
      },
      {
        name: "humidity",
        label: "Umidade Relativa (%)",
        type: "number",
        placeholder: "Ex: 60"
      },
      {
        name: "stockEntryDate",
        label: "Data de Entrada no Armazém",
        type: "date"
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
        autoFill: "inspectionDate" ,
        type: "date"
      },
      {
        name: "pestControl",
        label: "Controle de Pragas",
        autoFill: "pestControl" ,
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
    title: "🔍 Classificação",
    description: "Análise técnica e sensorial do café",
    icon: "🔍",
    fields: [
      {
        name: "evaluatorName",
        autoFill: "evaluatorName" ,
        label: "Nome do Classificador",
        type: "text",
        placeholder: "Ex: Maria Santos - Q-Grader"
      },
      {
        name: "evaluationDate",
        label: "Data da Avaliação", 
        type: "date"
      },
      {
        name: "sensoryNotes",
        label: "Notas Sensoriais Detalhadas (SCA)",
        type: "textarea",
        placeholder: "Ex: Formulário SCA completo com fragrância, sabor, aftertaste, acidez, corpo, balance, uniformidade, xícara limpa, doçura, geral"
      },
      {
        name: "cupsNumber",
        label: "Número de Xícaras no Cupping",
        type: "number",
        placeholder: "Ex: 5"
      },
      {
        name: "officialReport",
        label: "Laudo Oficial (Imagem/Upload)",
        type: "file",
        description: "Upload do laudo oficial de classificação"
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
        placeholder: "Ex: 3.2"
      },
      {
        name: "screenSize",
        label: "Peneira",
        type: "select",
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
    title: "🔥 Torra",
    description: "Registro do processo de torrefação",
    icon: "🔥",
    fields: [
      {
        name: "roasteryName",
        autoFill: "roasteryName" ,
        label: "Nome da Torrefação",
        type: "text",
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
            autoFill: "roasteryLocation.lat" ,
            type: "number", 
            step: "any",
            placeholder: "Ex: -23.5505"
          },
          {
            name: "lng",
            label: "Longitude",
            autoFill: "roasteryLocation.lng" ,
            type: "number",
            step: "any", 
            placeholder: "Ex: -46.6333"
          }
        ]
      },
      {
        name: "roastNumber",
        label: "Número da Torra",
        type: "select",
        options: [
          { value: "test_roast", label: "1ª Torra Teste" },
          { value: "final_roast", label: "Torra Final" },
          { value: "production", label: "Produção" }
        ]
      },
      {
        name: "roastDestination",
        label: "Destino da Torra",
        type: "select",
        options: [
          { value: "espresso", label: "Espresso" },
          { value: "filter", label: "Filtro" },
          { value: "microlot", label: "Microlote Exclusivo" },
          { value: "blend", label: "Blend" }
        ]
      },
      {
        name: "postRoastProtocol",
        label: "Protocolo de Prova Pós-Torra",
        type: "textarea",
        placeholder: "Ex: Cupping de validação realizado 24h após torra com equipe de Q-Graders"
      },
      {
        name: "roastProfile",
        label: "Perfil de Torra",
        type: "select",
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
        type: "date"
      },
      {
        name: "batchSize",
        label: "Tamanho do Lote (kg)",
        type: "number",
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
    "title": "📦 Embalagem",
    "description": "Detalhes sobre o acondicionamento do café, garantindo frescor e qualidade até o consumidor final.",
    "icon": "📦",
    "fields": [
    
      {
        "name": "packagingCompany",
        "label": "Empresa de Embalagem",
        autoFill: "packagingCompany" ,
        "type": "text",
        "placeholder": "Ex: Embalagens Café Premium Ltda.",
        "required": true
      },
      {
        "name": "packagingImage",
        "label": "Link da Imagem da Embalagem",
        "type": "text",
        "placeholder": "Ex: https://link-para-a-imagem.com/embalagem.jpg",
        "optional": true
      },
      {
        "name": "packagingDesign",
        "label": "Design e Descrição da Embalagem",
        "type": "textarea",
        "placeholder": "Ex: Embalagem em design 'Edição Especial', com informações de preparo e arte personalizada.",
        "optional": true
      },
      // Detalhes da Embalagem
      {
        "name": "packagingType",
        "label": "Tipo de Embalagem",
        "type": "select",
        "required": true,
        "options": [
          { "value": "pouch_bag", "label": "Stand-up Pouch Bag" },
          { "value": "block_bottom_bag", "label": "Block Bottom Bag" },
          { "value": "tin_can", "label": "Lata Metálica" },
          { "value": "degassing_valve_bag", "label": "Saco com Válvula de Degaseificação" },
          { "value": "doypack", "label": "Doypack" },
          { "value": "grain_pro", "label": "Saco GrainPro" }
        ]
      },
      {
        "name": "packageSize",
        "label": "Tamanho da Embalagem",
        "type": "select",
        "required": true,
        "options": [
          { "value": "250g", "label": "250g" },
          { "value": "500g", "label": "500g" },
          { "value": "1kg", "label": "1kg" },
          { "value": "2kg", "label": "2kg" },
          { "value": "5kg", "label": "5kg" },
          { "value": "60kg", "label": "60kg (Saco)" }
        ]
      },
      {
        "name": "freshnessSeal",
        "label": "Tecnologia de Frescor",
        "type": "multiselect",
        "options": [
          { "value": "degassing_valve", "label": "Válvula de Degaseificação" },
          { "value": "zip_seal", "label": "Zíper de Vedação (Zip-lock)" },
          { "value": "gas_flushing", "label": "Pulsão de Gás (Flushing)" },
          { "value": "hermetic_seal", "label": "Vedação Hermética" }
        ]
      },
      {
        "name": "packagingDate",
        "label": "Data da Embalagem",
        "type": "date",
        "required": true
      },
      {
        "name": "bestBeforeDate",
        "label": "Data de Validade (Melhor antes de)",
        "type": "date",
        "optional": true
      },
     
      {
        "name": "preparationMessage",
        "label": "Recomendações de Preparo",
        "type": "textarea",
        "placeholder": "Ex: 'Ideal para V60, com 25g de café e 350ml de água, 92°C.'",
        "optional": true
      }
    ]
  },

    distributor: 
    {
      "title": "🚛 Distribuição e Venda",
      "description": "Etapa final de logística que leva o café do torrador ao ponto de venda ou consumidor final.",
      "icon": "🚛",
      "fields": [
        // Identificação e Dados Gerais
        {
          "name": "distributorName",
          "label": "Nome da Empresa de Logística/Distribuidora",
          "type": "text",
          autoFill: "distributorName" ,
          "placeholder": "Ex: Distribuidora Café Brasil Ltda."
        },
        {
          "name": "distributionDate",
          "label": "Data do Envio",
          "type": "date",
          "required": true
        },
        {
          "name": "transportMode",
          "label": "Modo de Transporte",
          "type": "select",
          "options": [
            { "value": "ground", "label": "Terrestre (Caminhão)" },
            { "value": "air", "label": "Aéreo" },
            { "value": "sea", "label": "Marítimo" },
            { "value": "other", "label": "Outro" }
          ]
        },
        // Detalhes da Venda
        {
          "name": "destinationAddress",
          "label": "Endereço de Destino",
          "type": "group",
          "description": "Local de entrega do lote.",
          "fields": [
            {
              "name": "street",
              "label": "Rua e Número",
              "type": "text",
              "placeholder": "Ex: Rua das Flores, 123"
            },
            {
              "name": "city",
              "label": "Cidade",
              "type": "text",
              "placeholder": "Ex: São Paulo"
            },
            {
              "name": "state",
              "label": "Estado/Província",
              "type": "text",
              "placeholder": "Ex: SP"
            },
            {
              "name": "country",
              "label": "País",
              "type": "text",
              "placeholder": "Ex: Brasil"
            }
          ]
        },
        {
          "name": "salesChannel",
          "label": "Canal de Venda",
          "description": "Onde o consumidor irá encontrar o produto.",
          "type": "multiselect",
          "options": [
            { "value": "e-commerce", "label": "E-commerce" },
            { "value": "specialty_coffee_shop", "label": "Cafeteria Especializada" },
            { "value": "retail_store", "label": "Loja de Varejo" },
            { "value": "supermarket", "label": "Supermercado" },
            { "value": "horeca", "label": "HORECA (Hotéis, Restaurantes e Cafés)" }
          ]
        },
        {
          "name": "clientType",
          "label": "Tipo de Cliente (se aplicável)",
          "type": "select",
          "options": [
            { "value": "cafe", "label": "Cafeteria" },
            { "value": "roaster", "label": "Torrefação" },
            { "value": "wholesaler", "label": "Atacadista" },
            { "value": "retailer", "label": "Varejista" },
            { "value": "final_consumer", "label": "Consumidor Final" }
          ]
        },
        // Rastreabilidade e Notas
        {
          "name": "distributionNotes",
          "label": "Observações sobre a Distribuição",
          "type": "textarea",
          "placeholder": "Ex: Lote enviado em paletes selados. Entregue com temperatura controlada."
        }
      ]
    },

  
  end_consumer: {
    title: "Barista & Final Preparation",
    description: "Record the brewing parameters and sensory experience",
    icon: "💡",
    fields: [
      {
        name: "preparationMethod",
        label: "Preparation Method",
        type: "select",
        placeholder: "Select the primary brew method...",
        options: [
          { value: "espresso", label: "Espresso" },
          { value: "v60", label: "Hario V60" },
          { value: "aeropress", label: "AeroPress" },
          { value: "french_press", label: "French Press" },
          { value: "chemex", label: "Chemex" },
          { value: "kalita_wave", label: "Kalita Wave" },
          { value: "cold_brew", label: "Cold Brew" },
          { value: "batch_brew", label: "Batch Brew (Percolator)" }
        ]
      },
      {
        name: "baristaName",
        label: "Barista or Cafeteria Name",
        autoFill: "baristaName" ,
        type: "text",
        placeholder: "e.g., Jane Doe at The Daily Grind"
      },
      {
        name: "grindSize",
        label: "Grind Size",
        type: "select",
        placeholder: "Select grind size...",
        options: [
            { value: "extra_fine", label: "Extra Fine (Turkish)" },
            { value: "fine", label: "Fine (Espresso)" },
            { value: "medium_fine", label: "Medium-Fine (V60, AeroPress)" },
            { value: "medium", label: "Medium (Drip, Chemex)" },
            { value: "medium_coarse", label: "Medium-Coarse (Chemex)" },
            { value: "coarse", label: "Coarse (French Press)" },
            { value: "extra_coarse", label: "Extra Coarse (Cold Brew)" }
        ]
      },
      {
        name: "doseIn",
        label: "Dose (grams)",
        type: "number",
        placeholder: "e.g., 18.5"
      },
      {
        name: "doseOut",
        label: "Yield (grams)",
        type: "number",
        placeholder: "e.g., 38"
      },
      {
        name: "extractionTime",
        label: "Extraction Time (seconds)",
        type: "number",
        placeholder: "e.g., 28"
      },
      {
        name: "waterTemperature",
        label: "Water Temperature (°C)",
        type: "number",
        placeholder: "e.g., 94"
      },
      {
        name: "tastingNotes",
        label: "Perceived Tasting Notes",
        type: "multiselect",
        placeholder: "Select perceived notes...",
        options: [
          { value: "floral", label: "Floral" },
          { value: "fruity", label: "Fruity" },
          { value: "citrus", label: "Citrus" },
          { value: "chocolate", label: "Chocolate" },
          { value: "caramel", label: "Caramel" },
          { value: "nutty", label: "Nutty" },
          { value: "spicy", label: "Spicy" },
          { value: "winy", label: "Winy / Alcoholic" },
          { value: "herbaceous", label: "Herbaceous" }
        ]
      },
      {
        name: "consumerFeedback",
        label: "General Notes & Consumer Feedback",
        type: "textarea",
        placeholder: "e.g., Used in the 2025 Barista Championship, customers noted high sweetness..."
      }
    ]
  },

  sustainability: {
    title: "🌿 Sustainability & Social Impact",
    description: "Environmental and social practices of the batch",
    icon: "🌿",
    fields: [
      {
        name: "certifications",
        label: "Sustainability Certifications",
        autoFill: "certifications" ,
        type: "multiselect",
        options: [
          { value: "carbon_neutral", label: "Carbon Neutral" },
          { value: "b_corp", label: "B Corp" },
          { value: "rainforest_alliance", label: "Rainforest Alliance" },
          { value: "fair_trade", label: "Fair Trade" },
          { value: "organic", label: "Organic" },
          { value: "bird_friendly", label: "Bird Friendly" }
        ]
      },
      {
          name: "carbonFootprint",
          label: "Carbon Footprint (kg CO₂ per kg)",
          type: "number",
          placeholder: "e.g., 2.5"
      },
      {
        name: "waterManagement",
        label: "Water Management",
        autoFill: "waterManagement" ,
        type: "select",
        placeholder: "Select the primary water practice...",
        options: [
          { value: "low_consumption", label: "Low Consumption (Natural/Honey Process)" },
          { value: "recirculation_system", label: "Recirculation/Reuse System" },
          { value: "efficient_irrigation", label: "Efficient Irrigation" },
          { value: "standard_washed", label: "Standard Washed Process" }
        ]
      },
      {
          name: "biodiversityPractices",
          label: "Biodiversity Practices",
          autoFill: "biodiversityPractices" ,
          type: "multiselect",
          options: [
            { value: "shade_grown", label: "Shade-Grown" },
            { value: "native_species_corridors", label: "Native Species Corridors" },
            { value: "reforestation_projects", label: "Reforestation Projects" },
            { value: "organic_soil_management", label: "Organic Soil Management" },
            { value: "wildlife_protection", label: "Wildlife Protection Areas" }
          ]
      },
      {
          name: "renewableEnergyPractices",
          label: "Renewable Energy Usage",
          autoFill: "renewableEnergyPractices" ,
          type: "multiselect",
          options: [
              { value: "solar_processing", label: "Solar (Processing)" },
              { value: "solar_roasting", label: "Solar (Roasting)" },
              { value: "biofuel_transport", label: "Biofuel (Transport)" },
              { value: "biomass_energy", label: "Biomass Energy" }
          ]
      },
      {
        name: "socialImpact",
        label: "Social Impact Initiatives",
        autoFill: "socialImpact" ,
        type: "textarea",
        placeholder: "Describe community projects, fair labor conditions, worker benefits, etc."
      }
    ]
  },
  beneficiamento: {
    "title": "Beneficiamento / Dry Mill",
    "description": "Etapa de processamento do café cereja ou pergaminho, onde ele é limpo, classificado e preparado para o próximo passo na cadeia.",
    "icon": "⚙️",
    "fields": [
      // Dados de Entrada/Saída
      {
        "name": "millingFacilityName",
        "label": "Nome da Unidade de Beneficiamento",
        autoFill: "millingFacilityName" ,
        "type": "text",
        "required": true,
        "placeholder": "Ex: Beneficiamento Serra Azul"
      },
      {
        "name": "operationDate",
        "label": "Data do Beneficiamento",
        "type": "date",
        "required": true
      },
      {
        "name": "incomingWeightKg",
        "label": "Peso de Entrada (kg)",
        "type": "number",
        "required": true,
        "placeholder": "Ex: 1500"
      },
      {
        "name": "finalGreenWeightKg",
        "label": "Peso Final Café Verde (kg)",
        "type": "number",
        "required": true,
        "placeholder": "Ex: 1250"
      },
      {
        "name": "moistureAfterProcessing",
        "label": "Umidade Final (%)",
        "type": "number",
        "step": 0.1,
        "required": true,
        "placeholder": "Ex: 11.5"
      },
  
      // Detalhes da Qualidade e Classificação
      {
        "name": "processingSteps",
        "label": "Etapas de Classificação Executadas",
        "type": "multiselect",
        "options": [
          { "value": "hulling", "label": "Descascamento" },
          { "value": "sieving", "label": "Peneiramento" },
          { "value": "density_separation", "label": "Separação por Densidade" },
          { "value": "color_sorting", "label": "Classificação por Cor" }
        ]
      },
      {
        "name": "mainSieveSize",
        "label": "Tamanho da Peneira Principal",
        "description": "Tamanho do grão que corresponde à maior parte do lote.",
        "type": "select",
        "options": [
          { "value": "18+", "label": "Peneira 18+" },
          { "value": "17/18", "label": "Peneira 17/18" },
          { "value": "16/17", "label": "Peneira 16/17" },
          { "value": "15/16", "label": "Peneira 15/16" },
          { "value": "14/15", "label": "Peneira 14/15" }
        ]
      },
      {
        "name": "defectTypes",
        "label": "Principais Defeitos Encontrados",
        "description": "Tipos de grãos defeituosos que afetam a qualidade do lote.",
        "type": "multiselect",
        "options": [
          { "value": "black", "label": "Pretos" },
          { "value": "sour", "label": "Verdes / Ardidos" },
          { "value": "broken", "label": "Quebrados" },
          { "value": "insect_damage", "label": "Dano por Inseto" },
          { "value": "immature", "label": "Imaturos" },
          { "value": "foreign_material", "label": "Material Estranho" }
        ]
      },
  
      // Armazenamento
      {
        "name": "storageType",
        "label": "Tipo de Embalagem para Armazenamento",
        "type": "select",
        "required": true,
        "options": [
          { "value": "jute_bag", "label": "Saco de Juta Tradicional" },
          { "value": "grain_pro", "label": "Saco Hermético (GrainPro)" },
          { "value": "big_bag", "label": "Big Bag (a granel)" },
          { "value": "other", "label": "Outro" }
        ]
      },
      {
        "name": "storageNotes",
        "label": "Observações sobre Armazenamento",
        "type": "textarea",
        "placeholder": "Ex: Lote armazenado em ambiente com controle de umidade."
      },
  
      // Rastreabilidade e Notas
      {
        "name": "isMicrolot",
        "label": "Este Lote é um Microlote?",
        "type": "select",
        "options": [{ "value": "yes", "label": "Sim" }, { "value": "no", "label": "Não" }]
      },
      {
        "name": "beneficiamentoNotes",
        "label": "Observações Finais sobre o Lote",
        "type": "textarea",
        "placeholder": "Ex: Este lote foi separado por seu perfil sensorial único. "
      }
    ]
  },

};

export const roles = [
  { value: 'producer', label: '🌱 Produtor' },
  { value: 'logistics', label: '🚚 Logística' },
  { value: 'warehouse', label: '🏭 Armazém' },
  { value: 'grader', label: '🔍 Classificador' },
  { value: 'roaster', label: '🔥 Torrefador' },
  { value: 'packager', label: '📦 Embalador' },
  { value: 'distributor', label: '🚛 Distribuidor' },
  { value: 'end_consumer', label: '💡 Consumidor Final / Barista' },
  { value: 'sustainability', label: '🌿 Sustentabilidade' },
  { value: 'beneficiamento', label: '⚙️ Beneficiamento' }
];