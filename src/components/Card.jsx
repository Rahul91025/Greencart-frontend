import React from 'react';

const Card = ({ title, value, icon, gradient, bgGradient, change, changeType }) => {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${bgGradient} backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 transform hover:scale-105 transition-all duration-300 group`}>
      
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
    
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-2xl">{icon}</span>
          </div>
          {change && (
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              changeType === 'positive' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {change}
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-gray-600 text-sm font-medium uppercase tracking-wide">{title}</h3>
          <p className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            {value}
          </p>
        </div>
      </div>

      
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}></div>
    </div>
  );
};

export default Card;