import React, { useMemo } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

const DynamicChart = ({ type, data }) => {
  if (!data || data.length === 0) return <div>No data available</div>;

  // Auto-detect Keys for X and Y axes
  // Assume first string column is Category, first number column is Value
  const keys = Object.keys(data[0]);
  
  const categoryKey = keys.find(k => typeof data[0][k] === 'string') || keys[0];
  const valueKey = keys.find(k => typeof data[0][k] === 'number') || keys[1];

  const commonProps = {
    data: data,
    margin: { top: 20, right: 30, left: 20, bottom: 20 },
  };

  const EmptyState = () => (
    <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--text-secondary)' }}>No supported chart for this data distribution.</p>
    </div>
  );

  const customTooltipStyle = {
    backgroundColor: 'var(--bg-glass)',
    backdropFilter: 'blur(12px)',
    border: '1px solid var(--border)',
    borderRadius: '0.5rem',
    color: 'var(--text-main)',
  };

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey={categoryKey} stroke="var(--text-muted)" />
          <YAxis stroke="var(--text-muted)" />
          <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={customTooltipStyle} />
          <Bar dataKey={valueKey} fill="var(--accent-primary)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey={categoryKey} stroke="var(--text-muted)" />
          <YAxis stroke="var(--text-muted)" />
          <Tooltip contentStyle={customTooltipStyle} />
          <Line type="monotone" dataKey={valueKey} stroke="var(--success)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'pie') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip contentStyle={customTooltipStyle} />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey={valueKey}
            nameKey={categoryKey}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return <EmptyState />;
};

export default DynamicChart;
