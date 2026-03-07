import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Globe, CheckCircle, Thermometer, Package, Leaf, AlertTriangle, Clock, Database, FileX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ThemeToggle from '../../components/shared/ThemeToggle';
import { ComposableMap, Geographies, Geography, Line, Marker } from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function LandingPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ shipments: 0, compliance: 0, countries: 0 });

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = { shipments: 247, compliance: 99.8, countries: 14 };
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        shipments: Math.floor(targets.shipments * progress),
        compliance: (targets.compliance * progress).toFixed(1),
        countries: Math.floor(targets.countries * progress)
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'Multitenant Security',
      description: 'Enterprise-grade data isolation with role-based access control'
    },
    {
      icon: Zap,
      title: 'AI Route Intelligence',
      description: 'Machine learning powered route optimization and delay prediction'
    },
    {
      icon: Thermometer,
      title: 'Real-Time Telemetry',
      description: '24/7 temperature monitoring with instant excursion alerts'
    },
    {
      icon: CheckCircle,
      title: 'Compliance-Ready',
      description: 'Automated documentation and audit trails for regulatory requirements'
    },
    {
      icon: Package,
      title: 'Emergency Mode',
      description: 'Priority routing and capacity reservation for critical shipments'
    },
    {
      icon: Leaf,
      title: 'Carbon Tracking',
      description: 'Real-time CO₂ monitoring and sustainability recommendations'
    }
  ];

  const tempClasses = [
    { range: '2-8°C', use: 'Vaccines, Biologics, Proteins', color: 'from-blue-500 to-cyan-500' },
    { range: '-20°C', use: 'Plasma, Enzymes, Reagents', color: 'from-purple-500 to-blue-500' },
    { range: '-70°C', use: 'mRNA, Gene Therapy, CAR-T', color: 'from-indigo-600 to-purple-600' }
  ];

  const pricing = [
    {
      name: 'Starter',
      price: '$2,499',
      period: '/month',
      features: ['Up to 50 shipments/month', '2-8°C temperature class', 'Basic analytics', 'Email support', 'Standard documentation']
    },
    {
      name: 'Professional',
      price: '$7,999',
      period: '/month',
      features: ['Up to 200 shipments/month', 'All temperature classes', 'Advanced analytics', 'Priority support', 'Compliance dossiers', 'API access'],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: ['Unlimited shipments', 'Dedicated infrastructure', 'White-glove support', 'Custom integrations', 'SLA guarantees', 'On-site training']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-black dark:via-blue-950 dark:to-black">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Temperature-Certain.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
                Globally Delivered.
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Enterprise cold-chain logistics platform for pharmaceutical companies.
              Real-time monitoring, AI-powered routing, and compliance automation.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold flex items-center gap-2 transition-colors shadow-xl shadow-sky-500/50"
              >
                Sign In
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold backdrop-blur-sm border border-white/20 transition-colors"
              >
                Request Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-surface border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent mb-2 font-mono">{stats.shipments}</div>
              <div className="text-secondary text-sm">Active Shipments</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2 font-mono">{stats.compliance}%</div>
              <div className="text-secondary text-sm">Temp Compliance</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2 font-mono">{stats.countries}</div>
              <div className="text-secondary text-sm">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">3</div>
              <div className="text-secondary text-sm">Temperature Classes</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-primary">Cold-Chain Risks</h2>
          <p className="text-center text-secondary mb-16">Why pharmaceutical logistics needs specialized control</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Thermometer,
                title: 'Temperature Excursions',
                stat: '$35B',
                description: 'Annual losses from temperature deviations',
                color: 'from-red-500 to-orange-500'
              },
              {
                icon: Clock,
                title: 'Customs Delays',
                stat: '47%',
                description: 'Of shipments face unexpected delays',
                color: 'from-amber-500 to-yellow-500'
              },
              {
                icon: Database,
                title: 'Disconnected Systems',
                stat: '12+',
                description: 'Average systems per supply chain',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: FileX,
                title: 'Compliance Failures',
                stat: '1 in 5',
                description: 'Shipments lack proper documentation',
                color: 'from-purple-500 to-pink-500'
              }
            ].map((risk, i) => (
              <motion.div
                key={risk.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-background border border-border rounded-xl p-6 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${risk.color}`} />
                <risk.icon className="w-8 h-8 text-danger mb-4" />
                <div className="text-3xl font-bold mb-2 text-primary">{risk.stat}</div>
                <h3 className="text-sm font-semibold mb-2 text-primary">{risk.title}</h3>
                <p className="text-xs text-secondary">{risk.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-primary">How PolarAxis Works</h2>
          <p className="text-center text-secondary mb-16">End-to-end cold chain management in four steps</p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Procure Materials',
                description: 'Browse certified suppliers and request pharmaceutical materials with guaranteed quality',
                icon: Package,
                color: 'from-sky-500 to-blue-600'
              },
              {
                step: '02',
                title: 'Plan Logistics',
                description: 'AI-powered route optimization comparing cost, risk, transit time, and carbon footprint',
                icon: Zap,
                color: 'from-blue-500 to-indigo-600'
              },
              {
                step: '03',
                title: 'Monitor Shipment',
                description: 'Real-time temperature telemetry and GPS tracking with instant excursion alerts',
                icon: Thermometer,
                color: 'from-indigo-500 to-purple-600'
              },
              {
                step: '04',
                title: 'Verify Compliance',
                description: 'Automated documentation generation and regulatory audit trail management',
                icon: CheckCircle,
                color: 'from-purple-500 to-pink-600'
              }
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-xs font-mono font-bold text-accent mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-bold mb-3 text-primary">{item.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{item.description}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 -right-3 w-6">
                    <ArrowRight className="w-6 h-6 text-muted" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-black dark:via-blue-950 dark:to-black text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Global Logistics Network</h2>
          <p className="text-center text-blue-200 mb-12">Real-time visibility across all transport modes</p>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="h-[500px] rounded-lg overflow-hidden">
              <ComposableMap projection="geoMercator" projectionConfig={{ scale: 140 }}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="rgba(255, 255, 255, 0.05)"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth={0.5}
                      />
                    ))
                  }
                </Geographies>
                {[
                  { from: [-74, 40.7], to: [2.35, 48.86], color: 'rgb(14, 165, 233)' },
                  { from: [2.35, 48.86], to: [139.69, 35.68], color: 'rgb(245, 158, 11)' },
                  { from: [-122, 37.77], to: [151.2, -33.86], color: 'rgb(16, 185, 129)' },
                  { from: [139.69, 35.68], to: [103.85, 1.35], color: 'rgb(168, 85, 247)' },
                  { from: [103.85, 1.35], to: [77.1, 28.7], color: 'rgb(14, 165, 233)' }
                ].map((route, i) => (
                  <motion.g
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.2, duration: 1 }}
                  >
                    <Line
                      from={route.from}
                      to={route.to}
                      stroke={route.color}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeDasharray="5,5"
                      opacity={0.8}
                    />
                    <Marker coordinates={route.from}>
                      <circle r={4} fill={route.color} />
                    </Marker>
                    <Marker coordinates={route.to}>
                      <circle r={4} fill={route.color} opacity={0.6} />
                    </Marker>
                  </motion.g>
                ))}
              </ComposableMap>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">Enterprise Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-surface border border-border rounded-xl p-8 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">{feature.title}</h3>
                <p className="text-secondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">Temperature Classes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {tempClasses.map((tc, i) => (
              <motion.div
                key={tc.range}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-background border border-border rounded-xl p-8 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tc.color}`} />
                <div className="text-3xl font-mono font-bold mb-2 text-primary">{tc.range}</div>
                <div className="text-sm text-secondary">{tc.use}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-primary">Simple, Transparent Pricing</h2>
          <p className="text-center text-secondary mb-16">Choose the plan that fits your scale</p>
          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`bg-surface border rounded-2xl p-8 ${
                  plan.highlighted
                    ? 'border-accent shadow-xl scale-105'
                    : 'border-border'
                }`}
              >
                <h3 className="text-2xl font-bold mb-2 text-primary">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-secondary">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/login')}
                  className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                    plan.highlighted
                      ? 'bg-accent text-white hover:bg-accent-dark'
                      : 'bg-border text-primary hover:bg-border/80'
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 bg-surface border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-accent" />
            <span className="font-bold text-lg text-primary">PolarAxis</span>
          </div>
          <p className="text-sm text-secondary">
            Cold-chain control. Zero compromise.
          </p>
          <p className="text-xs text-muted mt-2">© 2026 PolarAxis. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
