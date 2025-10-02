import React, { useState, useEffect } from 'react';
import { 
  MapPin, Truck, TrendingUp, ThermometerSun, Droplets, 
  Clock, Package, Mountain, Waves, Factory, Store,
  Navigation, Zap, Shield, Leaf
} from 'lucide-react';

// Componente para métricas de transporte
const TransportMetric = ({ icon, label, value, subtitle }) => (
  <div className="p-6 bg-stone-950/50 border border-stone-800/50 rounded-2xl hover:border-blue-500/30 transition-all duration-300">
    <div className="flex items-center gap-3 mb-3">
      {React.cloneElement(icon, { className: 'w-6 h-6 text-blue-400' })}
    </div>
    <div className="text-sm text-stone-500 uppercase tracking-wider mb-2">{label}</div>
    <div className="text-lg font-semibold text-stone-200">{value}</div>
    {subtitle && <div className="text-xs text-stone-400 mt-1">{subtitle}</div>}
  </div>
);

// Componente para etapas da jornada
const JourneyStep = ({ stage, location, distance, time, status, icon, description, isActive, isCompleted }) => (
  <div className={`relative flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
    isActive ? 'bg-blue-500/10 border border-blue-500/30' : 
    isCompleted ? 'bg-green-500/5 border border-green-500/20' : 'bg-stone-800/20 border border-stone-700/20'
  }`}>
    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
      isActive ? 'bg-blue-500 animate-pulse' : 
      isCompleted ? 'bg-green-500' : 'bg-stone-600'
    }`}>
      {icon}
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-3 mb-1">
        <h3 className={`font-semibold ${
          isActive ? 'text-blue-300' : 
          isCompleted ? 'text-green-300' : 'text-stone-300'
        }`}>
          {stage}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full ${
          isActive ? 'bg-blue-500/20 text-blue-300' : 
          isCompleted ? 'bg-green-500/20 text-green-300' : 'bg-stone-600/50 text-stone-400'
        }`}>
          {status}
        </span>
      </div>
      <p className="text-stone-200 mb-2">{location}</p>
      {description && <p className="text-sm text-stone-400 mb-2">{description}</p>}
      <div className="flex items-center gap-4 text-xs text-stone-500">
        {distance && <span>📏 {distance} km</span>}
        {time && <span>🕒 {time}</span>}
      </div>
    </div>
  </div>
);

// Componente para estatísticas criativas
const CreativeStat = ({ icon, value, label, description }) => (
  <div className="text-center p-4 bg-stone-900/30 rounded-xl border border-stone-700/30">
    <div className="text-blue-400 mb-2 flex justify-center">{icon}</div>
    <div className="text-2xl font-bold text-stone-200 mb-1">{value}</div>
    <div className="text-sm text-stone-400 mb-2">{label}</div>
    <div className="text-xs text-stone-500">{description}</div>
  </div>
);

export const LogisticsDetails = ({ logisticsMetadata }) => {
  const [currentStage, setCurrentStage] = useState(2); // Estágio atual da jornada
  const [animatedDistance, setAnimatedDistance] = useState(0);

  if (!logisticsMetadata) return null;

  // Animação da distância
  useEffect(() => {
    if (logisticsMetadata.distance) {
      const targetDistance = logisticsMetadata.distance;
      const duration = 2000; // 2 segundos
      const steps = 60;
      const increment = targetDistance / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetDistance) {
          current = targetDistance;
          clearInterval(timer);
        }
        setAnimatedDistance(Math.floor(current));
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [logisticsMetadata.distance]);

  // Mapeamento de tipos de veículos
  const vehicleTypeLabels = {
    truck_refrigerated: "Refrigerated Truck",
    truck_dry: "Dry Truck", 
    van: "Van",
    container_ship: "Container Ship",
    air_cargo: "Air Cargo",
  };

  // Jornada completa do café
  const journeyStages = [
    {
      stage: "🌱 Colheita na Fazenda",
      location: logisticsMetadata.origin,
      distance: "0",
      time: "Início da jornada",
      status: "Concluído",
      icon: <Leaf className="w-5 h-5 text-white" />,
      description: "Grãos selecionados manualmente nas montanhas de Minas Gerais",
      isCompleted: true
    },
    {
      stage: "🚚 Transporte Inicial", 
      location: "Estrada para processamento",
      distance: "45",
      time: "2 horas",
      status: "Concluído",
      icon: <Truck className="w-5 h-5 text-white" />,
      description: "Viagem pelas estradas montanhosas em veículo climatizado",
      isCompleted: true
    },
    {
      stage: "⚡ Processamento",
      location: "Beneficiamento Central",
      distance: "0", 
      time: "Processando",
      status: "Em Andamento",
      icon: <Factory className="w-5 h-5 text-white" />,
      description: "Secagem e seleção dos melhores grãos",
      isActive: true
    },
    {
      stage: "🌄 Travessia Montanhosa",
      location: "Serra da Mantiqueira",
      distance: "180",
      time: "Próxima etapa", 
      status: "Pendente",
      icon: <Mountain className="w-5 h-5 text-white" />,
      description: "Atravessando altitudes de até 1500m com controle especial"
    },
    {
      stage: "🏭 Armazém Central",
      location: logisticsMetadata.destination,
      distance: "125",
      time: "Final",
      status: "Pendente",
      icon: <Store className="w-5 h-5 text-white" />,
      description: "Chegada ao centro de distribuição para torrefação"
    }
  ];

  // Estatísticas criativas
  const creativeStats = [
    {
      icon: <Navigation className="w-6 h-6" />,
      value: `${animatedDistance} km`,
      label: "Jornada Total",
      description: "Do campo à xícara"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      value: `${logisticsMetadata.temperatureControl}°C`,
      label: "Temperatura Ideal", 
      description: "Mantendo o sabor"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      value: "3",
      label: "Certificações",
      description: "Transporte sustentável"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      value: "98%",
      label: "No Prazo",
      description: "Entrega confiável"
    }
  ];

  // Mensagens emocionais baseadas no progresso
  const journeyMessages = [
    "Seu café começou sua jornada nas montanhas verdejantes...",
    "Percorrendo estradas cênicas rumo ao processamento...", 
    "Grãos sendo preparados com cuidado artesanal...",
    "Em breve: aventura pela serra mantiqueira!",
    "Quase chegando - o aroma se aproxima!"
  ];

  const vehicleLabel = vehicleTypeLabels[logisticsMetadata.vehicleType] || logisticsMetadata.vehicleType;

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-black via-blue-950 to-black">
      <div className="max-w-6xl mx-auto relative">
        
        {/* Cabeçalho Emocional */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-600" />
            <span className="text-blue-600 text-sm font-medium tracking-[0.3em] uppercase">
              Jornada do Café
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-600" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-500 mb-6 leading-normal">
            Aventura Logística
          </h2>
          <p className="text-xl text-stone-300 max-w-2xl mx-auto mb-4">
            {journeyMessages[currentStage - 1]}
          </p>
          <p className="text-stone-400">
            Tracking ID: <span className="font-mono text-blue-400">{logisticsMetadata.trackingId}</span>
          </p>
        </div>

        {/* Estatísticas Criativas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {creativeStats.map((stat, index) => (
            <CreativeStat key={index} {...stat} />
          ))}
        </div>

        {/* Linha do Tempo da Jornada */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-blue-100 mb-8 flex items-center gap-3">
            <Package className="w-6 h-6" />
            Rota da Aventura
          </h3>
          <div className="space-y-4">
            {journeyStages.map((stage, index) => (
              <JourneyStep
                key={index}
                {...stage}
                isActive={index === currentStage - 1}
                isCompleted={index < currentStage - 1}
              />
            ))}
          </div>
        </div>

        {/* Métricas de Transporte */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <TransportMetric 
            icon={<Truck />} 
            label="Veículo" 
            value={vehicleLabel}
            subtitle="Com controle climático"
          />
          <TransportMetric 
            icon={<TrendingUp />} 
            label="Distância Percorrida" 
            value={`${animatedDistance} km`}
            subtitle="Desde a colheita"
          />
          <TransportMetric 
            icon={<ThermometerSun />} 
            label="Temperatura" 
            value={`${logisticsMetadata.temperatureControl}°C`}
            subtitle="Perfeita para o café"
          />
          <TransportMetric 
            icon={<Droplets />} 
            label="Umidade Controlada" 
            value={`${logisticsMetadata.humidityControl}%`}
            subtitle="Preservando o aroma"
          />
        </div>

        {/* Certificações */}
        {logisticsMetadata.transportCertifications && logisticsMetadata.transportCertifications.length > 0 && (
          <div className="text-center">
            <h4 className="text-lg font-semibold text-stone-300 mb-4">Certificações do Transporte</h4>
            <div className="flex flex-wrap gap-3 justify-center">
              {logisticsMetadata.transportCertifications.map((cert) => (
                <div key={cert} className="px-4 py-2 bg-green-950/30 border border-green-800/30 rounded-full hover:bg-green-900/40 transition-colors">
                  <span className="text-green-400 text-sm font-medium capitalize">
                    {cert.replace(/_/g, ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progresso Visual */}
        <div className="mt-12 p-6 bg-stone-900/20 rounded-2xl border border-stone-700/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-stone-300">Progresso da Jornada</span>
            <span className="text-blue-400 font-semibold">{Math.round((currentStage / journeyStages.length) * 100)}%</span>
          </div>
          <div className="w-full bg-stone-700/30 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(currentStage / journeyStages.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-stone-500 mt-2">
            <span>Colheita</span>
            <span>Em trânsito</span>
            <span>Destino</span>
          </div>
        </div>

      </div>
    </section>
  );
};
