// src/constants/stageFormSchemas.js

export const STAGE_FORM_SCHEMAS = {
  producer: {
    title: "🌱 Etapa Produtor",
    description: "Cadastro das informações da fazenda e produção",
    icon: "🌱",
    fields: [
      {
        name: "type",
        label: "Tipo",
        type: "select",
        options: [
          { value: "arabica", label: "Arábica" },
          { value: "robusta", label: "Robusta" },
          { value: "liberica", label: "Libérica" },
          { value: "excelsa", label: "Excelsa" }
        ]
      },
      {
        name: "plantingDate",
        label: "Dia da Plantação",
        type: "date"
      },
      {
        name: "farmName",
        label: "Nome da Fazenda",
        type: "text",
        placeholder: "Ex: Fazenda Santa Maria"
      },
      {
        name: "address",
        label: "Endereço Completo",
        type: "text",
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
        name: "altitude",
        label: "Altitude (metros acima do nível do mar)",
        type: "number",
        placeholder: "Ex: 1200"
      },
      {
        name: "variety",
        label: "Variedade do Café",
        type: "select",
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
        placeholder: "Ex: 2025/26"
      },
      {
        name: "harvestDate",
        label: "Data da Colheita",
        type: "date"
      },
      {
        name: "cropClimate",
        label: "Clima na Safra",
        type: "textarea",
        placeholder: "Ex: Seca e temperaturas elevadas em fevereiro, seguidas de chuvas irregulares"
      },
      {
        name: "shadeConsortium",
        label: "Sombra / Consórcio Agrícola",
        type: "textarea",
        placeholder: "Ex: Cultivado com árvores nativas e bananeiras para sombreamento"
      },
      {
        name: "producerStory",
        label: "História da Fazenda / Produtor",
        type: "textarea",
        placeholder: "Ex: Fazenda familiar há 3 gerações, dedicada à produção cafeeira desde 1882"
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
    title: "🚚 Logística",
    description: "Controle de transporte e movimentação do lote",
    icon: "🚚",
    fields: [
      {
        name: "trackingId",
        label: "Rastreamento (Tracking ID / Blockchain Hash)",
        type: "text",
        placeholder: "Ex: TRK-2025-001-BLOCKCHAIN-HASH"
      },
      {
        name: "transportCertifications",
        label: "Certificações de Transporte",
        type: "multiselect",
        options: [
          { value: "organic_certified", label: "Transporte Orgânico Certificado" },
          { value: "sustainable", label: "Transporte Sustentável" },
          { value: "carbon_neutral", label: "Carbono Neutro" }
        ]
      },
      {
        name: "origin",
        label: "Local de Origem", 
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
    title: "🏭 Armazém",
    description: "Controle de estocagem e condições do armazém",
    icon: "🏭",
    fields: [
      {
        name: "warehouseName",
        label: "Nome do Armazém",
        type: "text",
        placeholder: "Ex: Armazém Central São Paulo"
      },
      {
        name: "location",
        label: "Localização",
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
            type: "number",
            step: "any",
            placeholder: "Ex: -23.4255"
          },
          {
            name: "lng",
            label: "Longitude", 
            type: "number",
            step: "any",
            placeholder: "Ex: -46.4784"
          }
        ]
      },
      {
        name: "storageCapacity",
        label: "Capacidade de Armazenagem (kg/ton)",
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
    title: "🔍 Classificação",
    description: "Análise técnica e sensorial do café",
    icon: "🔍",
    fields: [
      {
        name: "evaluatorName",
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
    title: "📦 Embalagem",
    description: "Controle do processo de embalagem e loteamento",
    icon: "📦",
    fields: [
      {
        name: "packagingCompany",
        label: "Nome da Empresa de Embalagem",
        type: "text",
        placeholder: "Ex: Embalagens Café Premium Ltda."
      },
      {
        name: "location",
        label: "Localização",
        type: "text",
        placeholder: "Ex: Rua das Indústrias, 500 - São Paulo, SP"
      },
      {
        name: "packagingDesign",
        label: "Design da Embalagem",
        type: "textarea",
        placeholder: "Ex: Edição especial, colaborativa, design personalizado"
      },
      {
        name: "producerSeal",
        label: "Selo/Assinatura do Produtor",
        type: "select",
        options: [
          { value: "yes", label: "Sim" },
          { value: "no", label: "Não" }
        ]
      },
      {
        name: "preparationMessage",
        label: "Mensagem de Preparo",
        type: "textarea",
        placeholder: "Ex: Recomendado para V60, espresso, prensa francesa..."
      },
      {
        name: "packagingType",
        label: "Tipo de Embalagem",
        type: "select",
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
        placeholder: "Ex: 500"
      },
      {
        name: "packagingDate",
        label: "Data da Embalagem",
        type: "date"
      },
      {
        name: "expirationDate",
        label: "Data de Validade",
        type: "date"
      },
      {
        name: "lotNumber",
        label: "Número do Lote",
        type: "text",
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
    title: "🚛 Distribuidor",
    description: "Controle da distribuição para pontos de venda",
    icon: "🚛",
    fields: [
      {
        name: "distributorName",
        label: "Nome do Distribuidor",
        type: "text",
        placeholder: "Ex: Distribuidora Café Brasil Ltda."
      },
      {
        name: "salesChannel",
        label: "Canal de Venda Online/Offline",
        type: "multiselect",
        options: [
          { value: "ecommerce", label: "E-commerce" },
          { value: "coffee_shop", label: "Cafeteria" },
          { value: "supermarket", label: "Supermercado" },
          { value: "specialty_store", label: "Loja Especializada" },
          { value: "wholesale", label: "Atacado" }
        ]
      },
      {
        name: "consumptionHistory",
        label: "História de Consumo",
        type: "textarea",
        placeholder: "Ex: Primeira vez no mercado, edição especial, lançamento exclusivo"
      },
      {
        name: "consumerTracking",
        label: "Tracking para Consumidor Final",
        type: "textarea",
        placeholder: "Ex: QR Code leva à página do lote com toda a rastreabilidade"
      },
      {
        name: "destinationMarket",
        label: "Mercado de Destino",
        type: "text",
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
        type: "date"
      },
      {
        name: "transportMode",
        label: "Modo de Transporte",
        type: "select",
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
  },

  // Novos papéis opcionais
  end_consumer: {
    title: "💡 Consumidor Final / Barista",
    description: "Notas sobre preparo e experiência de consumo",
    icon: "💡",
    fields: [
      {
        name: "preparationNotes",
        label: "Notas sobre Preparo",
        type: "textarea",
        placeholder: "Ex: Extraído no campeonato de baristas 2025, utilizado por cafeteria X, método de preparo preferido..."
      },
      {
        name: "extractionDetails",
        label: "Detalhes da Extração",
        type: "textarea",
        placeholder: "Ex: Temperatura da água, tempo de extração, moagem, receita utilizada..."
      },
      {
        name: "consumerExperience",
        label: "Experiência do Consumidor",
        type: "textarea",
        placeholder: "Ex: Feedback dos clientes, notas sensoriais percebidas, combinações sugeridas..."
      },
      {
        name: "competitionUse",
        label: "Uso em Competições",
        type: "textarea",
        placeholder: "Ex: Utilizado no Campeonato Brasileiro de Baristas 2025, premiado como melhor espresso..."
      }
    ]
  },

  sustainability: {
    title: "🌿 Sustentabilidade",
    description: "Impacto ambiental e social do lote",
    icon: "🌿",
    fields: [
      {
        name: "carbonFootprint",
        label: "Pegada de Carbono do Lote",
        type: "number",
        placeholder: "Ex: 2.5 (kg CO2 por kg de café)"
      },
      {
        name: "renewableEnergy",
        label: "Uso de Energia Renovável",
        type: "textarea",
        placeholder: "Ex: Torrefação com energia solar, transporte com biodiesel..."
      },
      {
        name: "socialImpact",
        label: "Impacto Social na Comunidade Produtora",
        type: "textarea",
        placeholder: "Ex: Projetos sociais apoiados, condições de trabalho, benefícios para comunidade local..."
      },
      {
        name: "waterUsage",
        label: "Uso de Água e Eficiência Hídrica",
        type: "textarea",
        placeholder: "Ex: Sistema de reuso de água, processamento com baixo consumo hídrico..."
      },
      {
        name: "biodiversity",
        label: "Biodiversidade e Conservação",
        type: "textarea",
        placeholder: "Ex: Áreas de preservação, corredores ecológicos, espécies nativas conservadas..."
      },
      {
        name: "certifications",
        label: "Certificações de Sustentabilidade",
        type: "multiselect",
        options: [
          { value: "carbon_neutral", label: "Carbono Neutro" },
          { value: "b_corp", label: "B Corp" },
          { value: "rainforest_alliance", label: "Rainforest Alliance" },
          { value: "fair_trade", label: "Fair Trade" },
          { value: "organic", label: "Orgânico" },
          { value: "bird_friendly", label: "Bird Friendly" }
        ]
      }
    ]
  },
  beneficiamento: {
    title: "Beneficiamento / Dry Mill",
    description: "Registro detalhado do processo de beneficiamento: descascamento, beneficiamento seco, peneiramento, separação por densidade, polimento, sorting e formação de lote final (café verde).",
    icon: "⚙️",
    fields: [
      {
        name: "millingFacilityName",
        label: "Nome da Unidade de Beneficiamento",
        type: "text",
        required: true,
        placeholder: "Ex: Beneficiamento São Pedro"
      },
      {
        name: "facilityLocation",
        label: "Endereço da Unidade",
        type: "text",
        placeholder: "Ex: Rod. BR-101, Km 120 - Zona Industrial"
      },
      {
        name: "facilityCoordinates",
        label: "Coordenadas da Unidade",
        type: "group",
        fields: [
          { name: "lat", label: "Latitude", type: "number", step: "any", placeholder: "Ex: -22.9201" },
          { name: "lng", label: "Longitude", type: "number", step: "any", placeholder: "Ex: -46.7652" }
        ]
      },
      {
        name: "operatorName",
        label: "Operador / Responsável",
        type: "text",
        placeholder: "Ex: Carlos Alberto"
      },
      {
        name: "operationDate",
        label: "Data do Beneficiamento",
        type: "date",
        required: true
      },

      // entrada e material
      {
        name: "incomingMaterial",
        label: "Material de Entrada",
        type: "select",
        required: true,
        options: [
          { value: "pergaminho", label: "Pergaminho" },
          { value: "cereja", label: "Cereja" },
          { value: "pulped_wet", label: "Pulpado Molhado" },
          { value: "other", label: "Outro" }
        ]
      },
      {
        name: "incomingWeightKg",
        label: "Peso de Entrada (kg)",
        type: "number",
        required: true,
        placeholder: "Ex: 1000"
      },
      {
        name: "incomingMoisture",
        label: "Umidade de Entrada (%)",
        type: "number",
        step: 0.1,
        placeholder: "Ex: 12.5"
      },
      {
        name: "initialQualityNotes",
        label: "Observações Iniciais da Qualidade",
        type: "textarea",
        placeholder: "Ex: Presença de casca, características visuais do pergaminho, cheiro fermentado..."
      },

      // passos do processo
      {
        name: "processingSteps",
        label: "Etapas Executadas",
        type: "multiselect",
        options: [
          { value: "dehulling", label: "Descascamento / Descasca" },
          { value: "hulling", label: "Hulling (remoção do pergaminho)" },
          { value: "polishing", label: "Polimento" },
          { value: "sieving", label: "Peneiramento / Classificação por tamanho" },
          { value: "density_separation", label: "Separação por Densidade" },
          { value: "color_sorting", label: "Classificação por Cor (Color Sorter)" },
          { value: "destoning", label: "Despedregamento (Destoner)" },
          { value: "drying", label: "Secagem / Ajuste de Umidade" },
          { value: "bagging", label: "Embalo / Enchimento de Sacos" },
          { value: "fumigation", label: "Fumigação / Tratamento Fitossanitário" }
        ]
      },

      // máquinas / parâmetros
      {
        name: "machineSettings",
        label: "Equipamentos e Parâmetros",
        type: "group",
        fields: [
          { name: "hullerModel", label: "Modelo da Descascadora / Huller", type: "text", placeholder: "Ex: Huller X-2000" },
          { name: "hullerSettings", label: "Configurações da Huller (RPM / abertura)", type: "text", placeholder: "Ex: RPM 1200, abertura 2.3 mm" },
          { name: "polisherModel", label: "Modelo do Polidor", type: "text", placeholder: "Ex: Polisher P-90" },
          { name: "colorSorterModel", label: "Modelo do Color Sorter (se usado)", type: "text", placeholder: "Ex: Sorter Z-300" },
          { name: "dryerModel", label: "Secador / Método de Secagem", type: "text", placeholder: "Ex: Secador contínuo T-500" }
        ]
      },

      // secagem
      {
        name: "dryingMethod",
        label: "Método de Secagem",
        type: "select",
        options: [
          { value: "sun", label: "Sol / Terreiro" },
          { value: "raised_beds", label: "Drying beds (terreiros elevados)" },
          { value: "mechanical", label: "Secador Mecânico / Contínuo" },
          { value: "tunnel", label: "Túnel / Estufa" },
          { value: "solar", label: "Secador Solar" }
        ]
      },
      {
        name: "dryingParameters",
        label: "Parâmetros de Secagem",
        type: "group",
        fields: [
          { name: "dryingStartMoisture", label: "Umidade Inicial (%)", type: "number", step: 0.1, placeholder: "Ex: 20.0" },
          { name: "dryingEndMoisture", label: "Umidade Final (%)", type: "number", step: 0.1, placeholder: "Ex: 11.5" },
          { name: "dryingTempC", label: "Temperatura Média (°C)", type: "number", placeholder: "Ex: 45" },
          { name: "dryingDurationHours", label: "Duração da Secagem (h)", type: "number", placeholder: "Ex: 48" }
        ]
      },

      // peneira / distribuição por tamanhos
      {
        name: "sievingProfile",
        label: "Perfil de Peneiramento (percentual retido por peneira)",
        type: "group",
        fields: [
          { name: "sieve18PlusPct", label: "18+ (%)", type: "number", step: 0.1, placeholder: "Ex: 12.5" },
          { name: "sieve17Pct", label: "17 (%)", type: "number", step: 0.1, placeholder: "Ex: 30.0" },
          { name: "sieve16Pct", label: "16 (%)", type: "number", step: 0.1, placeholder: "Ex: 25.0" },
          { name: "sieve15Pct", label: "15 (%)", type: "number", step: 0.1, placeholder: "Ex: 20.0" },
          { name: "finesPct", label: "Finos / abaixo (%)", type: "number", step: 0.1, placeholder: "Ex: 12.5" }
        ]
      },

      // densidade e separação
      {
        name: "densitySeparation",
        label: "Separação por Densidade",
        type: "group",
        fields: [
          { name: "method", label: "Método", type: "select", options: [
            { value: "gravity_table", label: "Mesa de Gravidade" },
            { value: "water_table", label: "Mesa de Água" },
            { value: "densimeter", label: "Densímetro / Flutuador" },
            { value: "other", label: "Outro" }
          ]},
          { name: "densityThreshold", label: "Limite de Densidade (g/L)", type: "number", placeholder: "Ex: 700" },
          { name: "highDensityPct", label: "% de grãos alta densidade", type: "number", step: 0.1, placeholder: "Ex: 35.0" }
        ]
      },

      // defeitos
      {
        name: "defectDistribution",
        label: "Contagem / Distribuição de Defeitos",
        type: "group",
        fields: [
          { name: "primaryDefectsCount", label: "Defeitos Primários (count)", type: "number", placeholder: "Ex: 3" },
          { name: "secondaryDefectsCount", label: "Defeitos Secundários (count)", type: "number", placeholder: "Ex: 12" },
          { name: "defectivePercentage", label: "Percentual Total de Defeitos (%)", type: "number", step: 0.1, placeholder: "Ex: 1.5" },
          { name: "defectTypes", label: "Tipos de Defeitos (marque)", type: "multiselect", options: [
            { value: "black_bean", label: "Preto" },
            { value: "insect_damage", label: "Dano de Inseto" },
            { value: "broken", label: "Quebrados" },
            { value: "fermented", label: "Fermentado" },
            { value: "mold", label: "Mofo" },
            { value: "foreign_material", label: "Material Estranho" }
          ]}
        ]
      },

      // resultados e rendimento
      {
        name: "moistureAfterProcessing",
        label: "Umidade Após Beneficiamento (%)",
        type: "number",
        step: 0.1,
        placeholder: "Ex: 11.2"
      },
      {
        name: "finalGreenWeightKg",
        label: "Peso Final Café Verde (kg)",
        type: "number",
        required: true,
        placeholder: "Ex: 720"
      },
      {
        name: "yieldPercentage",
        label: "Rendimento (%) (peso final / peso inicial)",
        type: "number",
        step: 0.1,
        placeholder: "Ex: 72.0"
      },

      // lotes e microlotes
      {
        name: "internalLotNumber",
        label: "Número do Lote Interno (unidade de beneficiamento)",
        type: "text",
        required: true,
        placeholder: "Ex: BNF-2025-001"
      },
      {
        name: "isMicrolot",
        label: "É Microlote?",
        type: "select",
        options: [{ value: "yes", label: "Sim" }, { value: "no", label: "Não" }]
      },
      {
        name: "microlotId",
        label: "ID do Microlote (se aplicável)",
        type: "text",
        placeholder: "Ex: MICRO-001"
      },

      // amostragem e laudos
      {
        name: "sampleForCupping",
        label: "Amostra para Cupping",
        type: "group",
        fields: [
          { name: "sampleId", label: "ID da Amostra", type: "text", placeholder: "Ex: SAMP-2025-01" },
          { name: "sampleDate", label: "Data da Amostragem", type: "date" },
          { name: "sampleWeightGr", label: "Peso da Amostra (g)", type: "number", placeholder: "Ex: 300" },
          { name: "sampleRoastProfile", label: "Perfil de Torra de Amostra", type: "text", placeholder: "Ex: 210°C - 12min" },
          { name: "sampleRoaster", label: "Nome do Torrador da Amostra", type: "text", placeholder: "Ex: Teste - Torrefação X" }
        ]
      },
      {
        name: "labTests",
        label: "Testes Laboratoriais / Laudos",
        type: "group",
        fields: [
          { name: "ochratoxinA_ppb", label: "Ochratoxina A (ppb)", type: "number", step: 0.01, placeholder: "Ex: 2.1" },
          { name: "pesticideScreen", label: "Triagem de Pesticidas (pass/fail)", type: "select", options: [{ value: "pass", label: "Aprovado" }, { value: "fail", label: "Não Aprovado" }, { value: "n/a", label: "Não testado" }] },
          { name: "microbialResult", label: "Resultado Microbiológico", type: "text", placeholder: "Ex: <100 cfu/g" },
          { name: "labReportFile", label: "Arquivo do Laudo (PDF)", type: "file" },
          { name: "labReportHash", label: "Hash do Laudo / Certificado (opcional)", type: "text", placeholder: "Ex: Qm..." }
        ]
      },

      // fotos, documentos e rastreabilidade
      {
        name: "photos",
        label: "Fotos do Lote / Processo",
        type: "file",
        placeholder: "Enviar imagens do pergaminho, maquinário, sacaria..."
      },
      {
        name: "documents",
        label: "Documentos (faturamento, fitossanitário, notas fiscais)",
        type: "file"
      },
      {
        name: "traceabilityHash",
        label: "Hash de Rastreabilidade / Blockchain",
        type: "text",
        placeholder: "Ex: 0xabc123..."
      },

      // QC e armazenamento pós-processo
      {
        name: "qc",
        label: "Controle de Qualidade (assinatura)",
        type: "group",
        fields: [
          { name: "qcOfficerName", label: "Responsável QC", type: "text", placeholder: "Ex: Ana Paula" },
          { name: "qcDate", label: "Data do Controle", type: "date" },
          { name: "qcNotes", label: "Observações QC", type: "textarea", placeholder: "Ex: Lote aprovado para torra" }
        ]
      },
      {
        name: "storageAfterProcessing",
        label: "Armazenamento Após Beneficiamento",
        type: "group",
        fields: [
          { name: "storageType", label: "Tipo de Armazenamento", type: "select", options: [
            { value: "silo", label: "Silo" },
            { value: "big_bag", label: "Big Bag" },
            { value: "jute_bag", label: "Saco de Juta" },
            { value: "grain_pro", label: "GrainPro" }
          ]},
          { name: "storageTemperatureC", label: "Temperatura (°C)", type: "number", placeholder: "Ex: 20" },
          { name: "storageHumidityPct", label: "Umidade Relativa (%)", type: "number", placeholder: "Ex: 60" },
          { name: "storageEntryDate", label: "Data Entrada Armazenagem", type: "date" },
          { name: "storageDurationDays", label: "Tempo de Armazenagem (dias)", type: "number", placeholder: "Ex: 30" }
        ]
      },

      // observações finais
      {
        name: "beneficiamentoNotes",
        label: "Observações Finais",
        type: "textarea",
        placeholder: "Ex: Observações sobre lotes separados, particularidades do processamento..."
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