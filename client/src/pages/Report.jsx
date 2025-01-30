import React from 'react';
import '../assets/Report.css'; // Import the CSS file

// Import chart images
import chart1 from '../images/chart1.png';
import chart2 from '../images/chart2.png';
import chart3 from '../images/chart3.png';
import chart4 from '../images/chart4.png';
import chart5 from '../images/chart5.png';

const Report = () => {
  return (
    <div className="report-page">
      <h1>Project Charts</h1>
      <div className="chart-container">
        <div className="chart-item">
          <img src={chart1} alt="Chart 1" />
        </div>
        <div className="chart-item">
          <img src={chart2} alt="Chart 2" />
        </div>
        <div className="chart-item">
          <img src={chart3} alt="Chart 3" />
        </div>
        <div className="chart-item">
          <img src={chart4} alt="Chart 4" />
        </div>
        <div className="chart-item">
          <img src={chart5} alt="Chart 5" />
        </div>
      </div>
    </div>
  );
};

export default Report;
