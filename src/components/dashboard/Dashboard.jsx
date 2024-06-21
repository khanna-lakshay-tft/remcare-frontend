import React, { useEffect, useState } from 'react';
import { API_URL } from '../../utils/constants';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
  } from 'chart.js';
  import { Bar, Pie } from 'react-chartjs-2';
  import './Dashboard.css';
  
  ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
      ArcElement
    );

export const options = {
  maintainAspectRatio: false, 
  aspectRatio: 1,
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'June Month Data',
    },
  },
};

const Dashboard = () => {
    const [patients, setPatients] = useState([]);
    const [patientsBarDataset, setPatientsBarDataset] = useState([]);

    const patientsApiCall = async() => {
      try {
        const response = await fetch(`${API_URL}/api/patients-chart-data`,{
          method:"POST",
          headers:{
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json"
        },
        });
        const data = await response.json();
        if (data.error) {
          throw new Error(JSON.stringify(data.error));
        }
        setPatients(data);
      } catch (error) {
        alert(error.message);
      }
    }

    const patientsBarApiCall = async() => {
      try {
        const response = await fetch(`${API_URL}/api/patients-bar-data`,{
          method:"POST",
          headers:{
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json"
        },
        });
        const barData = await response.json();
        if (barData.error) {
          throw new Error(JSON.stringify(barData.error));
        }
        setPatientsBarDataset(barData.datasets);
      } catch (error) {
        alert(error.message);
      }
    }

    useEffect(() => {
        patientsApiCall();
        patientsBarApiCall();
    }, []);

    const groupCounts = patients.reduce((acc, patient) => {
      const group = patient.risk_category;
      if (acc[group]) {
          acc[group]++;
      } else {
          acc[group] = 1;
      }
      return acc;
  }, {});

    const pieData = {
      labels: Object.entries(groupCounts).sort().map((data)=> data[0]),
      datasets: [
          {
              data: Object.entries(groupCounts).sort().map((data)=> data[1]),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          },
      ],
  };

    return (
        <div className='dashboard-wrapper'>
            <div className='chart'>
                <h2>Patient Distribution by Risk Category</h2>
                <div>
                  <Pie options={{ maintainAspectRatio: false, aspectRatio: 1 }} data={pieData} />
                </div>
            </div>
            <div className='chart'>
                <h2>Patients Waiting by Risk Category</h2>
                <div>
                  <Bar options={options} data={{labels:['Week 1','Week 2','Week 3','Week 4'],datasets:patientsBarDataset}} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;