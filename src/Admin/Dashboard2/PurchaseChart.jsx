import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const PurchaseChart = () => {
  const chartRef = useRef(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    generateMonthlyData();
  }, []);

  const generateMonthlyData = async () => {
    const studentQuerySnapshot = await getDocs(collection(db, 'student'));
    const studentData = studentQuerySnapshot.docs.map((doc) => doc.data());

    const monthlyCounts = Array(12).fill(0);

    studentData.forEach((student) => {
      student.purchasedCourses.forEach((course) => {
        const purchaseDate = course.datePurchased.toDate();
        const month = purchaseDate.getMonth();
        monthlyCounts[month]++;
      });
    });

    // Add small data (1) for months without purchases
    for (let i = 0; i < monthlyCounts.length; i++) {
      if (monthlyCounts[i] === 0) {
        monthlyCounts[i] = 0;
      }
    }

    setMonthlyData(monthlyCounts);
  };

  useEffect(() => {
    if (monthlyData.length > 0) {
      renderChart();
    }
  }, [monthlyData]);

  const renderChart = () => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Destroy existing chart if it exists
      if (chartInstance) {
        chartInstance.destroy();
      }

      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              label: 'Monthly Purchases',
              data: monthlyData,
              backgroundColor: '#FF4703',
              borderColor: '#FF4703',
              borderRadius: 22,
              barThickness: 20,
            },
          ],
        },
        options: {
          maintainAspectRatio: false, // Adjusts chart size to container width
          scales: {
            x: {
              ticks: {
                color: '#FFF', // Customize the color of the labels
                font: {
                  size: 14, // Adjust the font size of the labels
                  weight: 400, // Apply bold font weight to the labels
                  family: 'Manrope',
                },
              },
            },
            y: {
              ticks: {
                color: '#ffffff5e', // Customize the color of the calibration
                font: {
                  size: 14, // Adjust the font size of the calibration
                  weight: 400, // Apply bold font weight to the calibration
                  family: 'Manrope',
                },
              },
              beginAtZero: true,
              precision: 0,
              grid: {
                color: '#d2d2d215', // Set the color of the horizontal grid lines
              },
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  };

  return (
    <div className="chart container mb-4 p-4">
      <canvas ref={chartRef} width={800} height={400} />
    </div>
  );
};

export default PurchaseChart;
