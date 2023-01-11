import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

export function StockChart({ labels, values }) {
   function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Toys',
                data: values,
                backgroundColor: labels.map(label => getRandomColor()),
                borderColor: 'white',
                borderWidth: 1,
            },
        ],
    }

    return <Doughnut data={data} />;

}

