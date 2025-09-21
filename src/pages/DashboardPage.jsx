import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import ChartComponent from '../components/ChartComponent';
import { getSimulationHistory } from '../services/simulationService.js';

const DashboardPage = () => {
  const [simulationData, setSimulationData] = useState({
    totalProfit: 0,
    totalDeliveries: 0,
    onTimeDeliveries: 0,
    totalFuelCost: 0,
    lateDeliveries: 0,
  });

  const fetchSimulationData = async () => {
    try {
      const res = await getSimulationHistory();

      // Check if API returned success
      const history = res?.data?.data || [];
      if (history.length > 0) {
        const latest = history[history.length - 1];
        const onTime = latest.onTimeDeliveries || 0;
        const total = latest.totalDeliveries || 0;

        setSimulationData({
          totalProfit: latest.totalProfit || 0,
          totalDeliveries: total,
          onTimeDeliveries: onTime,
          totalFuelCost: latest.totalFuelCost || 0,
          lateDeliveries: total - onTime,
        });
      }
    } catch (err) {
      console.error('Failed to fetch simulation data:', err);
      setSimulationData({
        totalProfit: 0,
        totalDeliveries: 0,
        onTimeDeliveries: 0,
        totalFuelCost: 0,
        lateDeliveries: 0,
      });
    }
  };

  useEffect(() => {
    fetchSimulationData();
  }, []);

  const cardData = [
    {
      title: "Total Profit",
      value: `$${(simulationData.totalProfit || 0).toLocaleString()}`,
      icon: "💰",
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
      change: "+12.5%",
      changeType: "positive"
    },
    {
      title: "Total Deliveries",
      value: (simulationData.totalDeliveries || 0).toLocaleString(),
      icon: "📦",
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
      change: "+8.2%",
      changeType: "positive"
    },
    {
      title: "On-time Deliveries",
      value: (simulationData.onTimeDeliveries || 0).toLocaleString(),
      icon: "⚡",
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      change: "+15.1%",
      changeType: "positive"
    },
    {
      title: "Fuel Cost",
      value: `$${(simulationData.totalFuelCost || 0).toLocaleString()}`,
      icon: "⛽",
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-50",
      change: "-5.3%",
      changeType: "negative"
    }
  ];

  const successRate =
    simulationData.totalDeliveries > 0
      ? Math.round((simulationData.onTimeDeliveries / simulationData.totalDeliveries) * 100)
      : 0;

  const profitPerDelivery =
    simulationData.totalDeliveries > 0
      ? Math.round(simulationData.totalProfit / simulationData.totalDeliveries)
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Real-time insights into your logistics operations and performance metrics
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cardData.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Delivery Performance</h2>
              <p className="text-gray-600">Track your delivery success rates and identify trends</p>
            </div>
          </div>

          <ChartComponent
            labels={['On-Time Deliveries', 'Late Deliveries']}
            data={[simulationData.onTimeDeliveries, simulationData.lateDeliveries]}
            title="Delivery Status Analysis"
          />
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div className="text-2xl font-bold text-green-600 mb-1">{successRate}%</div>
                <div className="text-sm text-green-700">Success Rate</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                <div className="text-2xl font-bold text-blue-600 mb-1">${profitPerDelivery}</div>
                <div className="text-sm text-blue-700">Profit per Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
