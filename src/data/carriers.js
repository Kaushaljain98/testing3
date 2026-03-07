export const carriers = [
  {
    id: 'carrier-1',
    name: 'FedEx',
    modes: ['air'],
    tempClasses: ['2-8°C', '-20°C', '-70°C'],
    capacity: {
      total: 500,
      used: 387,
      available: 113,
      utilization: 77.4
    },
    rating: 4.8,
    onTimeRate: 96.2,
    countries: 45,
    avgTransitTime: 36
  },
  {
    id: 'carrier-2',
    name: 'DHL',
    modes: ['air', 'road'],
    tempClasses: ['2-8°C', '-20°C', '-70°C'],
    capacity: {
      total: 450,
      used: 298,
      available: 152,
      utilization: 66.2
    },
    rating: 4.7,
    onTimeRate: 94.8,
    countries: 52,
    avgTransitTime: 42
  },
  {
    id: 'carrier-3',
    name: 'Marken',
    modes: ['air', 'road'],
    tempClasses: ['2-8°C', '-20°C'],
    capacity: {
      total: 320,
      used: 245,
      available: 75,
      utilization: 76.6
    },
    rating: 4.9,
    onTimeRate: 97.5,
    countries: 38,
    avgTransitTime: 48
  },
  {
    id: 'carrier-4',
    name: 'Maersk',
    modes: ['sea'],
    tempClasses: ['2-8°C', '-20°C'],
    capacity: {
      total: 800,
      used: 512,
      available: 288,
      utilization: 64.0
    },
    rating: 4.5,
    onTimeRate: 89.3,
    countries: 65,
    avgTransitTime: 28
  },
  {
    id: 'carrier-5',
    name: 'World Courier',
    modes: ['air', 'road'],
    tempClasses: ['2-8°C', '-20°C', '-70°C'],
    capacity: {
      total: 280,
      used: 198,
      available: 82,
      utilization: 70.7
    },
    rating: 4.6,
    onTimeRate: 93.1,
    countries: 42,
    avgTransitTime: 40
  },
  {
    id: 'carrier-6',
    name: 'UPS Healthcare',
    modes: ['air', 'road'],
    tempClasses: ['2-8°C', '-20°C'],
    capacity: {
      total: 400,
      used: 356,
      available: 44,
      utilization: 89.0
    },
    rating: 4.7,
    onTimeRate: 95.4,
    countries: 48,
    avgTransitTime: 38
  }
];
