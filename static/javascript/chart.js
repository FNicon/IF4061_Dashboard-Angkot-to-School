// Load google charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work', 8],
        ['Friends', 2],
        ['Eat', 2],
        ['TV', 2],
        ['Gym', 2],
        ['Sleep', 8]
    ]);

    // Optional; add a title and set the width and height of the chart
    var options = {'title':'My Average Day', 'width':550, 'height':400};

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);

}

kecamatan = []
angkot = []
siswa = []

function setChartData(inputKecamatan, inputAngkot, inputSiswa) {
    kecamatan = inputKecamatan;
    angkot = inputAngkot;
    siswa = inputSiswa;
}

google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawChartKecamatan);

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

var chartKecamatan = {
    "type":"hbullet",
    title:{
        text: '5 Kecamatan yang Paling Kekurangan Angkot',
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
        }
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
            goal: {
                backgroundColor:'#993232'
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