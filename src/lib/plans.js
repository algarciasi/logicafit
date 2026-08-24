export const PLANS = [
  {
    icon: '🏃',
    name: 'Despegue',
    tagline: 'Empieza solo, con buenas bases',
    audience: 'Para quien quiere estructura y aún no necesita acompañamiento diario.',
    basePrice: 20,
    ctaLabel: 'Empezar a mi ritmo',
    features: [
      'Entra al gimnasio sabiendo exactamente qué hacer, sin perder tiempo',
      'Pautas de alimentación adaptables a tu día a día',
      'Videoteca completa de ejercicios con técnica',
      'Calculadora de macros premium',
      'Acceso inmediato, sin entrevista',
    ],
  },
  {
    icon: '🎯',
    name: 'Método Lógica',
    tagline: 'Mi sistema completo, hecho para ti',
    audience: 'Para quien quiere resultados serios con seguimiento real cada mes.',
    basePrice: 60,
    featured: true,
    badge: 'Más popular',
    ctaLabel: 'Quiero mi plan a medida',
    features: [
      'Aprende a entrenar y comer sin renunciar a tu vida social',
      'Adaptado a fuerza, running, recomposición o combinación',
      'Entrevista inicial 1:1 para diseñar tu plan',
      'Ajustes mensuales de cargas y macros',
      'Soporte prioritario por WhatsApp',
      'Recetario Lógica Fit incluido',
    ],
  },
  {
    icon: '⭐',
    name: 'Lógica 360',
    tagline: 'A mi lado, cada semana',
    audience: 'Para quien quiere la máxima cercanía y ajustes constantes.',
    basePrice: 60,
    badge: 'Acceso reducido',
    ctaLabel: 'Solicitar plaza VIP',
    features: [
      'Todo lo del Método Lógica',
      'Videollamada semanal 1:1',
      'Análisis de salud y progreso continuo',
      'Ajustes ilimitados 24/7',
      'Entrena con total seguridad: reviso tu técnica para evitar lesiones y asegurar que progresas',
      'Plazas estrictamente limitadas',
    ],
  },
]

export const QUARTERLY_DISCOUNT = 0.17

export function getPricing(basePrice, billing) {
  if (billing === 'monthly') {
    return { price: basePrice, billingNote: null }
  }
  const monthlyEquivalent = Math.round(basePrice * (1 - QUARTERLY_DISCOUNT))
  const quarterlyTotal = Math.round(basePrice * 3 * (1 - QUARTERLY_DISCOUNT))
  return {
    price: monthlyEquivalent,
    billingNote: `Facturado trimestralmente · ${quarterlyTotal}€ cada 3 meses`,
  }
}