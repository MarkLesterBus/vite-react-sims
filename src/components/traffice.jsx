
import Chart from 'react-apexcharts'
import { getTraffic, reset } from "../store/devices/system/systemSlice";


const SystemTraffic = ({ tx, rx, timeline }) => {
    function bytesForHuman(bytes) {
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

        let i = 0

        for (i; bytes > 1024; i++) {
            bytes /= 1024;
        }
        return parseInt(bytes) + ' ' + units[i]
    }
    const series = [{
        name: 'Upload',
        data: Object.keys(tx).length > 10 ? tx.slice(Object.keys(tx).length - 10, Object.keys(tx).length) : tx
    }, {
        name: 'Download',
        data: Object.keys(rx).length > 10 ? rx.slice(Object.keys(rx).length - 10, Object.keys(rx).length) : rx
    }];


    const options = {
        chart: {
            id: "realtime",
            height: 350,
            type: 'line',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 5000
                }
            },
        },

        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return bytesForHuman(value);
                }
            },
        },
        xaxis: {
            type: 'time',
            categories: Object.keys(timeline).length > 10 ? timeline.slice(Object.keys(timeline).length - 10, Object.keys(timeline).length) : timeline
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
    };
    return (
        <div className="card bg-light mb-3" >
            <div className="card-body text-black" >
                <h5 className="card-title">Traffic</h5>

                <Chart id="chart" className="text-dark" options={options} series={series} height={350} />

            </div>
        </div>

    );
}

export default SystemTraffic;