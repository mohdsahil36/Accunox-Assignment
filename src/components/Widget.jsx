import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from './Widget.module.css';
import { getChartConfig } from './chartConfig'; // Import the chart configuration

const Widget = ({ widget, onRemove }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartRef.current, getChartConfig(widget.chartType, widget.data));

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [widget]);

  return (
    <div className={styles.widget}>
      <div className={styles.widgetHeader}>
        {onRemove && (
          <button className={styles.removeButton} onClick={() => onRemove(widget.id)}>
            X
          </button>
        )}
      </div>
      <div className={styles.chartContainer}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default Widget;
