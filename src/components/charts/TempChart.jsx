import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';

export default function TempChart({ data, tempClass, className = '' }) {
  const tempRanges = {
    '2-8°C': { min: 2, max: 8 },
    '-20°C': { min: -25, max: -15 },
    '-70°C': { min: -80, max: -60 }
  };

  const range = tempRanges[tempClass] || { min: 0, max: 10 };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload[0]) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
          <p className="text-xs text-secondary mb-1">
            {new Date(data.timestamp).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
          <p className="text-sm font-mono font-semibold text-primary">
            {payload[0].value.toFixed(1)}°C
          </p>
          {data.location && (
            <p className="text-xs text-muted mt-1">{data.location}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(14, 165, 233)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="rgb(14, 165, 233)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgb(var(--border))"
            opacity={0.5}
          />
          <XAxis
            dataKey="timestamp"
            stroke="rgb(var(--text-muted))"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              });
            }}
          />
          <YAxis
            stroke="rgb(var(--text-muted))"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}°C`}
            domain={[range.min - 5, range.max + 5]}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={range.max}
            stroke="rgb(239, 68, 68)"
            strokeDasharray="3 3"
            label={{ value: 'Max', position: 'right', fill: 'rgb(239, 68, 68)', fontSize: 12 }}
          />
          <ReferenceLine
            y={range.min}
            stroke="rgb(239, 68, 68)"
            strokeDasharray="3 3"
            label={{ value: 'Min', position: 'right', fill: 'rgb(239, 68, 68)', fontSize: 12 }}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="rgb(14, 165, 233)"
            strokeWidth={2}
            dot={false}
            fill="url(#tempGradient)"
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
