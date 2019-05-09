kecamatan = []
angkot = []
siswa = []
totalAngkot = 0
totalSiswa = 0

function setDataKecamatan(inputKecamatan, inputAngkot, inputSiswa) {
    kecamatan = inputKecamatan;
    angkot = inputAngkot;
    siswa = inputSiswa;
}

function setDataTotal(inputAngkot, inputSiswa) {
    totalAngkot = inputAngkot;
    totalSiswa = inputSiswa;
}

google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawChartKecamatan);
google.charts.setOnLoadCallback(drawChartTotalBubble);

function drawChartKecamatan() {
    var data = [];
    for (i = 0; i < kecamatan.length; i++) {
        data.push([kecamatan[i], angkot[i], siswa[i]]);
    }

    var databar = google.visualization.arrayToDataTable([
        ['Kecamatan', 'Banyak angkot', 'Banyak angkot yang dibutuhkan'],
        [data[0][0], parseInt(data[0][1]), parseInt(data[0][2])],
        [data[1][0], parseInt(data[1][1]), parseInt(data[1][2])],
        [data[2][0], parseInt(data[2][1]), parseInt(data[2][2])],
        [data[3][0], parseInt(data[3][1]), parseInt(data[3][2])],
        [data[4][0], parseInt(data[4][1]), parseInt(data[4][2])]
    ]);

    var optionsbar = {
        'title': '5 Kecamatan yang Paling Kekurangan Angkot',
        'colors': ['#28B67C','#FF9900'],
        'chartArea': {'width': '50%'},
        'hAxis': {
            'title': 'Banyak Angkot',
            'minValue': 0
        },
        'vAxis': {
            'title': 'Kecamatan'
        }
    };

    var chartbar = new google.visualization.BarChart(document.getElementById('kecamatan'));
    chartbar.draw(databar, optionsbar);
}

function drawChartTotalBubble() {
    var data = google.visualization.arrayToDataTable([
        ['ID', '', '', 'Region',     'Population'],
        ['',    0,              0,      'Total Angkot', parseInt(totalAngkot)],
        ['',    0,              0,      'Total Siswa', parseInt(totalSiswa)],
        ['',    0,              0,      'Total Kebutuhan Angkot', parseInt(totalSiswa/10+1)],
    ]);

    var options = {
        title: 'Perbandingan Total Angkot, Siswa dan Kebutuhan Angkot',
        colors: ['#28B67C','#00A2FF','#FF9900'],
        hAxis: {
            gridlines: {
                color: 'transparent'
            },
            textStyle : {
                color: 'transparent'
            }
        },
        vAxis: {
            gridlines: {
                color: 'transparent'
            },
            textStyle : {
                color: 'transparent'
            }
        },
        sizeAxis: {
            minSize: 15,
            maxSize: 150
        }
    };

    var chart = new google.visualization.BubbleChart(document.getElementById('total_bubble'));
    chart.draw(data, options);
}

var chartKecamatan = {
    "type":"hbullet",
    title:{
        text: '5 Kecamatan yang Paling Kekurangan Angkot',
        "font-family": "Open Sans",
        fontColor: '#212121'
    },
    labels:[
        {
            text: kecamatan[4],
            height: 50,
            width: 50,
            hook: 'scale:name=scale-x,index=0',
             offsetX: -50
        },
        {
            text: kecamatan[3],
            height: 50,
            width: 50,
            hook: 'scale:name=scale-x,index=1',
             offsetX: -50
        },
        {
            text: kecamatan[2],
            height: 50,
            width: 50,
            hook: 'scale:name=scale-x,index=2',
             offsetX: -50
        },
        {
            text: kecamatan[1],
            height: 50,
            width: 50,
            hook: 'scale:name=scale-x,index=3',
             offsetX: -50
        },
        {
            text: kecamatan[0],
            height: 50,
            width: 50,
            hook: 'scale:name=scale-x,index=4',
             offsetX: -50
        },
    ],
    scaleX:{
        label:{
            text: 'Kecamatan',
            offsetX: -80
        },
        item:{
            visible: false
        }
    },
    scaleY:{
        label:{
            text: 'Banyak Angkot'
        }
    },
    plot:{
        animation:{
            "effect":"11",
            "method":"4",
            "sequence":"ANIMATION_BY_PLOT_AND_NODE",
            "speed":500
        }
    },
    plotarea:{
        margin:'50 50 90 120'
    },
    series:[
        {
            values: [
                0,0,0,0,0
                //parseInt(angkot[0]),
                //parseInt(angkot[1]),
                //parseInt(angkot[2]),
                //parseInt(angkot[3]),
                //parseInt(angkot[4])
            ],
            backgroundColor:'#009688',
            goals: [
                1,2,3,4,5
                //parseInt(siswa[0]),
                //parseInt(siswa[1]),
                //parseInt(siswa[2]),
                //parseInt(siswa[3]),
                //parseInt(siswa[4])
            ],
            "hover-state": {
                "visible": false
            },
                "tooltip": {
                "text": "Actual: %v",
                "font-color": "black",
                "background-color": "white"
            },
            goal: {
                backgroundColor:'#993232',
                "tooltip": {
                    "text": "Target Goal: %g",
                    "font-color": "black",
                    "background-color": "white"
                }
            }
        }
    ]
    };

    window.onload=function(){
      zingchart.render({
        id:'chartKecamatan',
        data:chartKecamatan,
        height:300,
        width:600
      });
    };

    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });