import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import {
  Users,
  Folder,
  UserPlus,
  Activity,
  TrendingUp,
  ArrowUpRight,
  Terminal,
  Clock,
  Server,
  Database,
  Globe,
  Zap,
} from 'lucide-react';
import { Button, Card, Badge } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';

// Time range options
const timeRanges = [
  { label: '7d', value: 7 },
  { label: '30d', value: 30 },
  { label: '90d', value: 90 },
  { label: '1y', value: 365 },
];

// KPI Stats
const kpiStats = [
  {
    label: 'Total Usuarios',
    value: '12,847',
    change: '+12.5%',
    trend: 'up' as const,
    icon: Users,
  },
  {
    label: 'Portafolios Activos',
    value: '8,234',
    change: '+8.2%',
    trend: 'up' as const,
    icon: Folder,
  },
  {
    label: 'Nuevos (24h)',
    value: '156',
    change: '+24.3%',
    trend: 'up' as const,
    icon: UserPlus,
  },
  {
    label: 'Salud del Sistema',
    value: '99.9%',
    change: '+0.1%',
    trend: 'up' as const,
    icon: Activity,
  },
];

// User growth data (30 days)
const generateGrowthData = (days: number) => {
  const data = [];
  const baseUsers = 10000;
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      usuarios: Math.floor(baseUsers + (days - i) * 95 + Math.random() * 50),
      activos: Math.floor((baseUsers + (days - i) * 95) * 0.75 + Math.random() * 30),
    });
  }
  return data;
};

// Role distribution data
const roleDistribution = [
  { name: 'Estandar', value: 9850, color: '#8B5CF6' },
  { name: 'Reclutador', value: 2847, color: '#D8B4FE' },
  { name: 'Admin', value: 150, color: '#A78BFA' },
];

// Top skills data
const topSkills = [
  { name: 'React', count: 4523 },
  { name: 'TypeScript', count: 3987 },
  { name: 'Python', count: 3654 },
  { name: 'Node.js', count: 3421 },
  { name: 'AWS', count: 2987 },
];

// System logs mock
const systemLogMessages = [
  { type: 'info', message: '[AUTH] Usuario profesional@ethoshub.com inició sesión' },
  { type: 'success', message: '[PORTFOLIO] Nuevo portafolio creado por @anamartinez' },
  { type: 'info', message: '[SKILL] Skill "GraphQL" añadido por 3 usuarios' },
  { type: 'warning', message: '[RATE_LIMIT] IP 192.168.1.45 alcanzó límite de requests' },
  { type: 'success', message: '[PROJECT] Proyecto "E-commerce App" publicado' },
  { type: 'info', message: '[SEARCH] Query "React developer Madrid" ejecutada' },
  { type: 'error', message: '[DB] Conexión timeout - reconectando...' },
  { type: 'success', message: '[DB] Conexión restablecida exitosamente' },
  { type: 'info', message: '[AUTH] Usuario reclutador@ethoshub.com inició sesión' },
  { type: 'success', message: '[MATCH] 5 candidatos encontrados para vacante #1234' },
];

export default function AdminDashboardPage() {
  const [selectedRange, setSelectedRange] = useState(30);
  const [growthData, setGrowthData] = useState(generateGrowthData(30));
  const [logs, setLogs] = useState<typeof systemLogMessages>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Update growth data when range changes
  useEffect(() => {
    setGrowthData(generateGrowthData(selectedRange));
  }, [selectedRange]);

  // Simulate live system logs
  useEffect(() => {
    const interval = setInterval(() => {
      const randomLog = systemLogMessages[Math.floor(Math.random() * systemLogMessages.length)];
      const timestamp = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLogs(prev => [...prev.slice(-19), { ...randomLog, message: `[${timestamp}] ${randomLog.message}` }]);
    }, 2000);

    // Initial logs
    setLogs(systemLogMessages.slice(0, 5).map(log => ({
      ...log,
      message: `[${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}] ${log.message}`
    })));

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-sora text-2xl font-bold text-foreground">Metricas Globales</h1>
          <p className="text-muted-foreground mt-1">Centro de control de EthosHub</p>
        </div>
        <div className="flex items-center gap-2">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              variant={selectedRange === range.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedRange(range.value)}
              className={cn(
                selectedRange === range.value && 'bg-violet-600 hover:bg-violet-700 text-white'
              )}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>

      {/* KPI Stats - Bento Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden border border-violet-500/20 bg-black/40 p-6 dark:bg-black">
              {/* Lilac glow effect */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/20 blur-2xl" />
              
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-violet-500/10 text-violet-400"
                >
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  {stat.change}
                </Badge>
              </div>
              <div className="mt-4">
                <p className="font-sora text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* User Growth Area Chart */}
        <Card className="border border-violet-500/20 bg-black/40 p-6 lg:col-span-2 dark:bg-black">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-sora text-lg font-semibold text-foreground">Crecimiento de Usuarios</h2>
              <p className="text-sm text-muted-foreground">Ultimos {selectedRange} dias</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-violet-500" />
                <span className="text-muted-foreground">Total</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-purple-300" />
                <span className="text-muted-foreground">Activos</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorUsuarios" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorActivos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D8B4FE" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#D8B4FE" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis 
                  dataKey="date" 
                  stroke="#71717a" 
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#71717a" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#8B5CF6',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="usuarios"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorUsuarios)"
                  name="Total Usuarios"
                />
                <Area
                  type="monotone"
                  dataKey="activos"
                  stroke="#D8B4FE"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorActivos)"
                  name="Usuarios Activos"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Role Distribution Pie Chart */}
        <Card className="border border-violet-500/20 bg-black/40 p-6 dark:bg-black">
          <div className="mb-6">
            <h2 className="font-sora text-lg font-semibold text-foreground">Distribucion por Rol</h2>
            <p className="text-sm text-muted-foreground">Segmentacion de usuarios</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {roleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#8B5CF6',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value: number) => [value.toLocaleString(), 'Usuarios']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {roleDistribution.map((role) => (
              <div key={role.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: role.color }} />
                  <span className="text-muted-foreground">{role.name}</span>
                </div>
                <span className="font-medium text-foreground">{role.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top Skills Bar Chart */}
        <Card className="border border-violet-500/20 bg-black/40 p-6 dark:bg-black">
          <div className="mb-6">
            <h2 className="font-sora text-lg font-semibold text-foreground">Top 5 Skills</h2>
            <p className="text-sm text-muted-foreground">Habilidades mas agregadas</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSkills} layout="vertical">
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#D8B4FE" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                <XAxis type="number" stroke="#71717a" fontSize={12} tickLine={false} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="#71717a" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={false}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#8B5CF6',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value: number) => [value.toLocaleString(), 'Usuarios']}
                />
                <Bar 
                  dataKey="count" 
                  fill="url(#barGradient)" 
                  radius={[0, 4, 4, 0]}
                  name="Usuarios"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Live System Logs */}
        <Card className="border border-violet-500/20 bg-black/40 p-6 dark:bg-black">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-violet-400" />
              <h2 className="font-sora text-lg font-semibold text-foreground">System Logs</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-xs text-green-500">LIVE</span>
            </div>
          </div>
          <div 
            ref={logContainerRef}
            className="h-64 overflow-y-auto rounded-lg bg-black p-4 font-mono text-xs"
            style={{ scrollBehavior: 'smooth' }}
          >
            <AnimatePresence>
              {logs.map((log, index) => (
                <motion.div
                  key={`${index}-${log.message}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    'mb-1 leading-relaxed',
                    log.type === 'info' && 'text-violet-300',
                    log.type === 'success' && 'text-green-400',
                    log.type === 'warning' && 'text-amber-400',
                    log.type === 'error' && 'text-red-400'
                  )}
                >
                  {log.message}
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="animate-pulse text-violet-400">_</div>
          </div>
        </Card>
      </div>

      {/* System Health Grid */}
      <Card className="border border-violet-500/20 bg-black/40 p-6 dark:bg-black">
        <div className="mb-6">
          <h2 className="font-sora text-lg font-semibold text-foreground">Estado del Sistema</h2>
          <p className="text-sm text-muted-foreground">Monitoreo en tiempo real</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { name: 'API Server', icon: Server, status: 'healthy', latency: '45ms' },
            { name: 'Database', icon: Database, status: 'healthy', latency: '12ms' },
            { name: 'CDN', icon: Globe, status: 'healthy', latency: '8ms' },
            { name: 'Auth Service', icon: Zap, status: 'healthy', latency: '23ms' },
          ].map((service) => (
            <div
              key={service.name}
              className="flex flex-col items-center gap-3 rounded-xl border border-violet-500/20 bg-black/60 p-4"
            >
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/20">
                  <service.icon className="h-6 w-6 text-violet-400" />
                </div>
                <span className="absolute -right-1 -top-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                </span>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">{service.name}</p>
                <p className="text-xs text-muted-foreground">{service.latency}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
