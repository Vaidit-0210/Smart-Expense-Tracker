import React from 'react'
import {Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

function BarChartDashboard({budgetList}) {
  return (
    <div className='border rounded-lg p-5 shadow-md bg-white'>
      <h2 className='text-lg font-bold mb-4 text-gray-700'>Budget Overview</h2>
      <ResponsiveContainer width="80%" height={300}>
      <BarChart
        data={budgetList}
        margin={{
          top:7
        }}
      >

        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='totalSpend' stackId='a' fill='#707070' />
        <Bar dataKey='amount' stackId='a' fill='#FCA5A5' />

      </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashboard