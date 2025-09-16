import React from 'react'
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

function PieChartDashboard({budgetList}) {

  const COLORS = ['#8884d8', '#D9D9D9', '#ff6b6b', '#3b3b98', '#F2F2F2', '#2186A4' , '#f7b731', '#20bf6b', '#eb3b5a', '#8854d0', '#4b7bec', '#a55eea', '#fc5c65', '#fd9644', '#2bcbba', '#26de81', '#eb3b5a', '#45aaf2', '#a55eea', '#d1d8e0'];

  return (
    <div className='border rounded-lg p-5 shadow-md bg-white w-full mt-4'>
        <h2 className='font-bold text-lg mb-4 text-gray-700'>Your Budget Distribution</h2>
        <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie data={budgetList} dataKey="totalSpend" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
            {budgetList.map((entry, index) => (
               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
        </ResponsiveContainer>
    </div>
  )
}

export default PieChartDashboard