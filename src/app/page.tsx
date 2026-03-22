'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type Metric = 'mvrv' | 'realized_price' | 'sopr' | 'lt_vs_st_holder' | 'active_addresses';

interface MetricData {
  name: string;
  value: number | { lt: number; st: number };
  change24h: string;
  interpretation: string;
}

interface DataPoint {
  timestamp: string;
  value?: number;
  [key: string]: number | string | undefined;
}

export default function Home() {
  const [selectedMetric, setSelectedMetric] = useState<Metric>('mvrv');
  const [autoUpdate, setAutoUpdate] = useState(true);

  // Simulated on-chain data
  const mvrvData: DataPoint[] = [
    { timestamp: 'Jan 2026', value: 1.8, signal: 'Greed' },
    { timestamp: 'Feb 2026', value: 2.2, signal: 'Greed' },
    { timestamp: 'Mar 2026', value: 1.5, signal: 'Neutral' },
    { timestamp: 'Apr 2026', value: 1.7, signal: 'Greed' },
    { timestamp: 'May 2026', value: 1.3, signal: 'Fear' },
    { timestamp: 'Jun 2026', value: 1.6, signal: 'Fear' },
    { timestamp: 'Jul 2026', value: 1.9, signal: 'Greed' },
  ];

  const supplyData: DataPoint[] = [
    { timestamp: 'Jan 2026', lt_supply: 45, st_supply: 55, distribution: 50 },
    { timestamp: 'Feb 2026', lt_supply: 47, st_supply: 53, distribution: 48 },
    { timestamp: 'Mar 2026', lt_supply: 48, st_supply: 52, distribution: 47 },
    { timestamp: 'Apr 2026', lt_supply: 49, st_supply: 51, distribution: 46 },
    { timestamp: 'May 2026', lt_supply: 50, st_supply: 50, distribution: 45 },
    { timestamp: 'Jun 2026', lt_supply: 51, st_supply: 49, distribution: 44 },
    { timestamp: 'Jul 2026', lt_supply: 52, st_supply: 48, distribution: 43 },
  ];

  const activeAddressesData: DataPoint[] = [
    { timestamp: 'Jan 2026', addresses: 500000, tx_volume: 3000000 },
    { timestamp: 'Feb 2026', addresses: 650000, tx_volume: 4200000 },
    { timestamp: 'Mar 2026', addresses: 580000, tx_volume: 3800000 },
    { timestamp: 'Apr 2026', addresses: 720000, tx_volume: 4800000 },
    { timestamp: 'May 2026', addresses: 600000, tx_volume: 3900000 },
    { timestamp: 'Jun 2026', addresses: 850000, tx_volume: 5500000 },
    { timestamp: 'Jul 2026', addresses: 920000, tx_volume: 6000000 },
  ];

  const miningData: DataPoint[] = [
    { timestamp: 'Jan 2026', hashrate: 620, hashprice: 45, difficulty: 75, revenue: 280 },
    { timestamp: 'Feb 2026', hashrate: 680, hashprice: 52, difficulty: 80, revenue: 354 },
    { timestamp: 'Mar 2026', hashrate: 650, hashprice: 48, difficulty: 78, revenue: 312 },
    { timestamp: 'Apr 2026', hashrate: 710, hashprice: 55, difficulty: 82, revenue: 390 },
    { timestamp: 'May 2026', hashrate: 680, hashprice: 50, difficulty: 80, revenue: 340 },
    { timestamp: 'Jun 2026', hashrate: 760, hashprice: 58, difficulty: 85, revenue: 441 },
    { timestamp: 'Jul 2026', hashrate: 820, hashprice: 62, difficulty: 90, revenue: 508 },
  ];

  const metrics: Record<Metric, { data: any; value: MetricData; color: string }> = {
    mvrv: {
      data: mvrvData,
      value: {
        name: 'MVRV Ratio',
        value: 1.5,
        change24h: '+2.3%',
        interpretation: 'Neutral. Market price is below realized value, suggesting potential buying opportunity.',
      },
      color: '#F59E0B',
    },
    realized_price: {
      data: [...mvrvData].map((d) => ({ ...d, value: (d.value as number) * 45000 })),
      value: {
        name: 'Realized Price',
        value: 67500,
        change24h: '+1.1%',
        interpretation: 'All coins sold above this price would result in total profit. Below this = aggregate loss.',
      },
      color: '#10B981',
    },
    sopr: {
      data: [
        { timestamp: 'Jan 2026', value: 1.05 },
        { timestamp: 'Feb 2026', value: 1.12 },
        { timestamp: 'Mar 2026', value: 0.98 },
        { timestamp: 'Apr 2026', value: 1.08 },
        { timestamp: 'May 2026', value: 0.95 },
        { timestamp: 'Jun 2026', value: 1.15 },
        { timestamp: 'Jul 2026', value: 1.20 },
      ],
      value: {
        name: 'SOPR',
        value: 1.20,
        change24h: '+5.2%',
        interpretation: 'Spending profit ratio > 1.0. Coins selling at profit. Above 1.05 = strong bullish signal.',
      },
      color: '#8B5CF6',
    },
    lt_vs_st_holder: {
      data: supplyData,
      value: {
        name: 'Long-Term vs Short-Term Holder Supply',
        value: { lt: 52, st: 48 },
        change24h: '-2.1%',
        interpretation: 'Long-term holders (holders of >155 days) holding 52% of supply. Distribution increasing.',
      },
      color: '#EC4899',
    },
    active_addresses: {
      data: activeAddressesData,
      value: {
        name: 'Active Addresses',
        value: 920000,
        change24h: '+8.7%',
        interpretation: 'Daily active addresses. Network adoption measure. High volume = strong participation.',
      },
      color: '#06B6D4',
    },
  };

  const getChartData = () => {
    switch (selectedMetric) {
      case 'mvrv':
      case 'realized_price':
      case 'sopr':
        return metrics[selectedMetric].data;
      case 'lt_vs_st_holder':
        return metrics[selectedMetric].data;
      case 'active_addresses':
        return metrics[selectedMetric].data;
      default:
        return [];
    }
  };

  useEffect(() => {
    if (!autoUpdate) return;

    const interval = setInterval(() => {
      setSelectedMetric((prev) => {
        const keys = ['mvrv', 'realized_price', 'sopr', 'lt_vs_st_holder', 'active_addresses'] as Metric[];
        const currentIndex = keys.indexOf(prev);
        return keys[(currentIndex + 1) % keys.length];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [autoUpdate]);

  const chartConfig = {
    mvrv: { stroke: '#F59E0B', fill: '#F59E0B', name: 'MVRV' },
    realized_price: { stroke: '#10B981', fill: '#10B981', name: 'Realized Price' },
    sopr: { stroke: '#8B5CF6', fill: '#8B5CF6', name: 'SOPR' },
    lt_vs_st_holder: { stroke: '#EC4899', fill: '#EC4899', name: 'Supply' },
    active_addresses: { stroke: '#06B6D4', fill: '#06B6D4', name: 'Addresses' },
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b-4 border-yellow-400 bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black">On-Chain Bitcoin Analytics</h1>
          <p className="text-gray-400 mt-2">Structured metrics for market intelligence</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Controls */}
        <section className="bg-gray-900 border-4 border-gray-700 p-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {(['mvrv', 'realized_price', 'sopr', 'lt_vs_st_holder', 'active_addresses'] as Metric[]).map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-4 py-2 font-bold border-4 transition-all ${
                    selectedMetric === metric
                      ? 'bg-yellow-400 text-black border-yellow-400'
                      : 'bg-gray-800 text-white border-gray-600 hover:border-gray-500'
                  }`}
                >
                  {metrics[metric].value.name}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoUpdate}
                onChange={(e) => setAutoUpdate(e.target.checked)}
                className="w-5 h-5"
              />
              <span className="font-bold">Auto-cycle metrics</span>
            </label>
          </div>
        </section>

        {/* Current Value Card */}
        <section className="bg-gray-900 border-4 border-yellow-400 p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-sm font-bold text-gray-400 mb-2">CURRENT VALUE</h2>
              <div className="text-4xl font-black" style={{ color: metrics[selectedMetric].color }}>
                {selectedMetric === 'lt_vs_st_holder' ? (
                  <span>
                    LT: {(metrics[selectedMetric].value.value as { lt: number; st: number }).lt}%<br />
                    ST: {(metrics[selectedMetric].value.value as { lt: number; st: number }).st}%
                  </span>
                ) : selectedMetric === 'active_addresses' ? (
                  <span>{(metrics[selectedMetric].value.value as number).toLocaleString()}</span>
                ) : (
                  (metrics[selectedMetric].value.value as number).toFixed(2)
                )}
              </div>
              <div className={`text-sm font-bold mt-2 ${
                metrics[selectedMetric].value.change24h.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {metrics[selectedMetric].value.change24h} (24h)
              </div>
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-400 mb-2">INTERPRETATION</h2>
              <p className="text-gray-300">{metrics[selectedMetric].value.interpretation}</p>
            </div>
          </div>
        </section>

        {/* Chart */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-sm font-bold text-gray-400 mb-4">TREND OVER TIME</h2>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={getChartData()}>
              <defs>
                <linearGradient id={selectedMetric} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartConfig[selectedMetric].stroke} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={chartConfig[selectedMetric].stroke} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="timestamp" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '2px solid #F59E0B',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#F59E0B', fontWeight: 'bold' }}
              />
              {selectedMetric === 'lt_vs_st_holder' ? (
                <>
                  <Area type="monotone" dataKey="lt_supply" stroke={chartConfig[selectedMetric].stroke} fill={`url(#${selectedMetric})`} />
                  <Area type="monotone" dataKey="st_supply" stroke="#10B981" fill="#10B981" opacity={0.3} />
                </>
              ) : (
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={chartConfig[selectedMetric].stroke}
                  fill={`url(#${selectedMetric})`}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </section>

        {/* Breakdown Section */}
        {selectedMetric === 'lt_vs_st_holder' && (
          <section className="bg-gray-900 border-4 border-gray-700 p-6">
            <h2 className="text-sm font-bold text-gray-400 mb-4">HOLDER SUPPLY BREAKDOWN</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-800 border-2 border-purple-500">
                <div className="text-xs text-purple-400 mb-2">Long-Term Holders (&gt;155 days)</div>
                <div className="text-2xl font-bold">{supplyData[supplyData.length - 1].lt_supply}%</div>
                <div className="text-xs text-gray-400 mt-1">Accumulating</div>
              </div>
              <div className="p-4 bg-gray-800 border-2 border-green-500">
                <div className="text-xs text-green-400 mb-2">Short-Term Holders (0-155 days)</div>
                <div className="text-2xl font-bold">{supplyData[supplyData.length - 1].st_supply}%</div>
                <div className="text-xs text-gray-400 mt-1">Distributing</div>
              </div>
              <div className="p-4 bg-gray-800 border-2 border-gray-500">
                <div className="text-xs text-gray-400 mb-2">Coin Age Distribution</div>
                <div className="text-2xl font-bold">{supplyData[supplyData.length - 1].distribution} days</div>
                <div className="text-xs text-gray-400 mt-1">Median age</div>
              </div>
            </div>
          </section>
        )}

        {/* MVRV vs Price */}
        {selectedMetric === 'mvrv' && (
          <section className="bg-gray-900 border-4 border-gray-700 p-6">
            <h2 className="text-sm font-bold text-gray-400 mb-4">MVRV VS MARKET PRICE</h2>
            <p className="text-gray-300 mb-4">
              MVRV = Market Value / Realized Value
              <br />
              <span className="text-xs text-gray-400">Historical benchmarks:</span>
              <br />
              <span className="text-xs text-green-400">MVRV &lt; 1.0</span> - Fear/Buying opportunity
              <br />
              <span className="text-xs text-yellow-400">MVRV 1.0-2.0</span> - Neutral
              <br />
              <span className="text-xs text-red-400">MVRV &gt; 2.5</span> - Greed/Risk of correction
            </p>
          </section>
        )}

        {/* SOPR Explainer */}
        {selectedMetric === 'sopr' && (
          <section className="bg-gray-900 border-4 border-gray-700 p-6">
            <h2 className="text-sm font-bold text-gray-400 mb-4">SOPR EXPLAINED</h2>
            <p className="text-gray-300 mb-4">
              SOPR (Spent Output Profit Ratio) = Average Selling Price / Average Buying Price
              <br />
              <br />
              <span className="text-green-400">SOPR &gt; 1.0</span> - Coins selling at profit
              <br />
              <span className="text-yellow-400">SOPR &gt; 1.05</span> - Strong bullish signal (profit-taking)
              <br />
              <span className="text-red-400">SOPR &lt; 1.0</span> - Total market in loss
            </p>
          </section>
        )}

        {/* Newhedge API */}
        <section className="bg-gray-900 border-4 border-yellow-400 p-6">
          <h2 className="text-xl font-black text-yellow-400 mb-4">About This Dashboard</h2>
          <p className="text-gray-300 mb-4">
            This dashboard demonstrates on-chain Bitcoin analytics — the same type of structured data now
            available through the <span className="text-blue-400">Newhedge API</span> (launched March 18, 2026).
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-blue-400 mb-2">Key Metrics</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• MVRV Ratio - Market valuation</li>
                <li>• Realized Price - Average acquisition cost</li>
                <li>• SOPR - Profit-taking signal</li>
                <li>• Holder Distribution - Accumulation vs distribution</li>
                <li>• Active Addresses - Network adoption</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-blue-400 mb-2">What This Reveals</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Market cycles & valuations</li>
                <li>• Whale behavior</li>
                <li>• Network health</li>
                <li>• Long-term trends</li>
                <li>• Institutional participation</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800">
            <a
              href="https://newhedge.io/api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline font-bold"
            >
              Try Newhedge API →
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-8 border-t border-gray-800">
          <p>
            Built by <a href="https://x.com/samdevrel" className="text-yellow-400 hover:underline">@samdevrel</a>
            {' • '}
            <a href="https://newhedge.io" className="text-blue-400 hover:underline">Newhedge API</a>
            {' • '}
            <a href="https://github.com/Samdevrel/on-chain-analytics" className="text-gray-400 hover:underline">Source Code</a>
          <button
            onClick={() => window.location.href = '/docs/overview'}
            className="w-full py-4 bg-purple-500 text-white font-bold border-4 border-purple-400 hover:bg-purple-400 mb-4"
          >
            {buttonText}
          </button>
                    </p>
        </footer>
      </div>
    </main>
  );
}
