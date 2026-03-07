export const routeOptions = {
  'BSL-BOM': [
    {
      id: 'route-1',
      carrier: 'FedEx',
      mode: 'air',
      transitDays: 2,
      cost: 4850,
      riskScore: 8,
      carbonKg: 142,
      recommended: true,
      confidence: 96,
      reason: 'Optimal balance of speed, cost, and temperature control reliability',
      segments: [
        { from: 'Basel', to: 'Frankfurt Hub', duration: 2, mode: 'road' },
        { from: 'Frankfurt Hub', to: 'Mumbai', duration: 8, mode: 'air' }
      ]
    },
    {
      id: 'route-2',
      carrier: 'DHL',
      mode: 'air',
      transitDays: 2.5,
      cost: 4620,
      riskScore: 12,
      carbonKg: 138,
      recommended: false,
      confidence: 89,
      reason: 'Lower cost but requires additional hub transfer',
      segments: [
        { from: 'Basel', to: 'Leipzig Hub', duration: 3, mode: 'road' },
        { from: 'Leipzig Hub', to: 'Dubai Hub', duration: 6, mode: 'air' },
        { from: 'Dubai Hub', to: 'Mumbai', duration: 3, mode: 'air' }
      ]
    },
    {
      id: 'route-3',
      carrier: 'Marken',
      mode: 'air',
      transitDays: 3,
      cost: 5200,
      riskScore: 6,
      carbonKg: 145,
      recommended: false,
      confidence: 94,
      reason: 'Highest reliability but premium pricing',
      segments: [
        { from: 'Basel', to: 'Zurich', duration: 2, mode: 'road' },
        { from: 'Zurich', to: 'Mumbai', duration: 9, mode: 'air' }
      ]
    }
  ],
  'FRA-SIN': [
    {
      id: 'route-4',
      carrier: 'FedEx',
      mode: 'air',
      transitDays: 1.5,
      cost: 6200,
      riskScore: 5,
      carbonKg: 256,
      recommended: true,
      confidence: 98,
      reason: 'Direct route with proven ultra-cold chain handling',
      segments: [
        { from: 'Frankfurt', to: 'Singapore', duration: 11, mode: 'air' }
      ]
    },
    {
      id: 'route-5',
      carrier: 'DHL',
      mode: 'air',
      transitDays: 2,
      cost: 5880,
      riskScore: 9,
      carbonKg: 248,
      recommended: false,
      confidence: 92,
      reason: 'Slight delay due to Hong Kong connection',
      segments: [
        { from: 'Frankfurt', to: 'Hong Kong', duration: 10, mode: 'air' },
        { from: 'Hong Kong', to: 'Singapore', duration: 4, mode: 'air' }
      ]
    },
    {
      id: 'route-6',
      carrier: 'World Courier',
      mode: 'air',
      transitDays: 1.5,
      cost: 6850,
      riskScore: 4,
      carbonKg: 262,
      recommended: false,
      confidence: 97,
      reason: 'Premium white-glove service at higher cost',
      segments: [
        { from: 'Frankfurt', to: 'Singapore', duration: 11, mode: 'air' }
      ]
    }
  ],
  'JFK-DXB': [
    {
      id: 'route-7',
      carrier: 'FedEx',
      mode: 'air',
      transitDays: 1.5,
      cost: 5450,
      riskScore: 7,
      carbonKg: 312,
      recommended: true,
      confidence: 95,
      reason: 'Fastest route with excellent customs clearance record',
      segments: [
        { from: 'New York JFK', to: 'Dubai', duration: 12, mode: 'air' }
      ]
    },
    {
      id: 'route-8',
      carrier: 'DHL',
      mode: 'air',
      transitDays: 2,
      cost: 5120,
      riskScore: 11,
      carbonKg: 298,
      recommended: false,
      confidence: 88,
      reason: 'Lower cost but European connection adds risk',
      segments: [
        { from: 'New York JFK', to: 'Frankfurt', duration: 8, mode: 'air' },
        { from: 'Frankfurt', to: 'Dubai', duration: 6, mode: 'air' }
      ]
    },
    {
      id: 'route-9',
      carrier: 'UPS Healthcare',
      mode: 'air',
      transitDays: 2,
      cost: 5680,
      riskScore: 8,
      carbonKg: 305,
      recommended: false,
      confidence: 91,
      reason: 'Reliable but no significant advantage over FedEx direct',
      segments: [
        { from: 'New York JFK', to: 'Cologne Hub', duration: 8, mode: 'air' },
        { from: 'Cologne Hub', to: 'Dubai', duration: 6, mode: 'air' }
      ]
    }
  ]
};
