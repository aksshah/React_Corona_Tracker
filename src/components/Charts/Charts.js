import React, {useEffect, useState} from 'react'
import {fetchDailyData} from '../../api';
import {Line, Bar} from 'react-chartjs-2';
import styles from './Charts.module.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  } from 'chart.js';
  ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
  );
  
function Charts({stats,country}) {

  const [daily_data,setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      let response = await fetchDailyData();
      setDailyData(response);
    }
    fetchAPI();
  },[]);

  const lineChart = (
    daily_data.length
      ? (
          <Line
            data={{
              labels:daily_data.map(({ date }) => new Date(date).toDateString()),
              datasets:[{
                data: daily_data.map(({confirmed})=> confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true
              },{
                data: daily_data.map(({deaths})=> deaths),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255,0,0,0.5)',
                fill: true
              }],
            }}
          />
        )
      : null  
  )
  
  const barChart = (
    stats.confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              data: [stats.confirmed.value, stats.deaths.value],
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Current state in ${country}` 
            },
            legend: {
              display: false,
           }
          }
        }}
      />
    ) : null
  );


  if(country){
    return (
      <div className={styles.container}>
        {barChart} 
      </div>
    )
  }else{
    return (
      <div className={styles.container}>
        {lineChart}
      </div>
    )
  }
}

export default Charts