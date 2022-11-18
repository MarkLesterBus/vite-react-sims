
import Chart from 'react-apexcharts'

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
        data: tx
    }, {
        name: 'Download',
        data: rx
    }];


    const options = {
        chart: {
            id: "realtime",
            height: 350,
            type: 'area',
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
            categories: timeline
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
    };
    return (
        <div className="card bg-light mb-3" >
            <div className="card-body text-white" id="chart">
                <Chart className="text-dark" options={options} series={series} type="area" height={475} />

            </div>
        </div>

    );
}

export default SystemTraffic;