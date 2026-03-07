const generateTempLog = (shipmentId, baseTemp, variance, hours, excursion = null) => {
  const logs = [];
  const startTime = new Date('2026-03-05T00:00:00Z');

  for (let i = 0; i < hours; i++) {
    const timestamp = new Date(startTime.getTime() + i * 60 * 60 * 1000);
    let temp = baseTemp + (Math.random() * variance * 2 - variance);

    if (excursion && i >= excursion.start && i <= excursion.end) {
      temp += excursion.delta;
    }

    logs.push({
      shipmentId,
      timestamp: timestamp.toISOString(),
      temperature: parseFloat(temp.toFixed(2)),
      humidity: parseFloat((45 + Math.random() * 10).toFixed(1)),
      battery: parseFloat((100 - (i / hours) * 20).toFixed(1)),
      location: i % 6 === 0 ? 'Hub Transfer' : 'In Transit'
    });
  }

  return logs;
};

export const temperatureLogs = {
  'PX-2024-0891': generateTempLog('PX-2024-0891', 4.0, 0.8, 48),
  'PX-2024-0887': generateTempLog('PX-2024-0887', -70.0, 2.0, 48),
  'PX-2024-0876': generateTempLog('PX-2024-0876', -20.0, 1.5, 48, {
    start: 28,
    end: 35,
    delta: 3.5
  }),
  'PX-2024-0892': generateTempLog('PX-2024-0892', 4.5, 0.6, 48),
  'PX-2024-0885': generateTempLog('PX-2024-0885', -21.0, 1.2, 48)
};
