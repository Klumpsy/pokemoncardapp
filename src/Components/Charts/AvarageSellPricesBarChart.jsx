import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const AvarageSellPricesBarChart = ({ day1Regular, day7Regular, day30Regular, day1Holo, day7Holo, day30Holo }) => {
  const data = [
    { name: 'Day 1', Regular: day1Regular, reverseHolo: day1Holo },
    { name: 'Day 7', Regular: day7Regular, reverseHolo: day7Holo },
    { name: 'Day 30', Regular: day30Regular, reverseHolo: day30Holo },
  ];

  return (
    <div style={{ width: '50%', height: 100 }}>
      <BarChart width={300} height={150} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" /> 
        <YAxis label={{ value: 'Price', angle: -90, position: 'insideLeft' }} />  
        <Tooltip />
        <Bar dataKey="Regular" fill="#8884d8" name='Regular' />
        <Bar dataKey="reverseHolo" fill="#82ca9d" name='Reverse Holo' />
      </BarChart>
    </div>
  );
}

export default AvarageSellPricesBarChart;