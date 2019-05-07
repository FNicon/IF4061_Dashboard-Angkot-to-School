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

google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawChartKecamatan);

function drawChartKecamatan() {

    var databar = google.visualization.arrayToDataTable([
        ['Kecamatan', 'Banyak angkot', 'Banyak angkot yang dibutuhkan'],
        ['New York City, NY', 8175000, 8008000],
        ['Los Angeles, CA', 3792000, 3694000],
        ['Chicago, IL', 2695000, 2896000],
        ['Houston, TX', 2099000, 1953000],
        ['Philadelphia, PA', 1526000, 1517000]
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
        text:'Kecamatan 5',
        height: 50,
        width: 50,
        hook: 'scale:name=scale-x,index=0',
 	    offsetX: -50
    },
    {
        text:'Kecamatan 4',
        height: 50,
        width: 50,
        hook: 'scale:name=scale-x,index=1',
 	    offsetX: -50
    },
    {
        text:'Kecamatan 3',
        height: 50,
        width: 50,
        hook: 'scale:name=scale-x,index=2',
 	    offsetX: -50
    },
    {
        text:'Kecamatan 2',
        height: 50,
        width: 50,
        hook: 'scale:name=scale-x,index=3',
 	    offsetX: -50
    },
    {
        text:'Kecamatan 1',
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
plotarea:{
    margin:'50 50 90 120'
},
series:[
    {
        values: [14,29,18,20,34],
        backgroundColor:'#009688',
        goals: [15,30,21,5,30],
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