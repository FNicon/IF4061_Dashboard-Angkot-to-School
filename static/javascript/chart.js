kecamatan = []
kebutuhanAngkot = []
jumlahAngkot = []
totalAngkot = 0
totalSiswa = 0

function setDataKecamatan(inputKecamatan, inputJmlAngkot, inputKebutuhanAngkot) {
    kecamatan = inputKecamatan;
    kebutuhanAngkot = inputKebutuhanAngkot;
    jumlahAngkot = inputJmlAngkot;
}

function getSelisih() {
    var i;
    var selisih = [];
    for (i = 0; i < kecamatan.length; i++) {
        selisih.push(jumlahAngkot[i] - kebutuhanAngkot[i]);
    }
    return selisih;
}

function getLowestSelisihIndex() {
    var selisih = getSelisih();
    var sorted = getSelisih();
    sorted.sort();
    var lowestIndex = []
    var i;
    var j;
    for (i = 0; i < 5; i++) {
        j = 0;
        while (j < selisih.length && selisih[j] != sorted[i]) {
            j = j + 1;
        }
        lowestIndex.push(j);
    }
    return lowestIndex;
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
    var lowestIndex = getLowestSelisihIndex();
    for (i = 0; i < kecamatan.length; i++) {
        data.push([
            kecamatan[lowestIndex[i]], 
            jumlahAngkot[lowestIndex[i]], 
            kebutuhanAngkot[lowestIndex[i]]
        ]);
    }

    var databar = google.visualization.arrayToDataTable([
        ['Kecamatan', 'Total Angkot', 'Total Kebutuhan Angkot', {type: 'string', role: 'tooltip'}],
        [data[0][0], parseInt(data[0][1]), parseInt(data[0][2]), parseInt(data[0][2]) + '\nKekurangan: ' + Math.round(parseInt(data[0][2])-parseInt(data[0][1])) + '\nTerpenuhi: ' + Math.round(parseInt(data[0][1])/parseInt(data[0][2])*100) + '%'],
        [data[1][0], parseInt(data[1][1]), parseInt(data[1][2]), parseInt(data[1][2]) + '\nKekurangan: ' + Math.round(parseInt(data[1][2])-parseInt(data[1][1])) + '\nTerpenuhi: ' + Math.round(parseInt(data[1][1])/parseInt(data[1][2])*100) + '%'],
        [data[2][0], parseInt(data[2][1]), parseInt(data[2][2]), parseInt(data[2][2]) + '\nKekurangan: ' + Math.round(parseInt(data[2][2])-parseInt(data[2][1])) + '\nTerpenuhi: ' + Math.round(parseInt(data[2][1])/parseInt(data[2][2])*100) + '%'],
        [data[3][0], parseInt(data[3][1]), parseInt(data[3][2]), parseInt(data[3][2]) + '\nKekurangan: ' + Math.round(parseInt(data[3][2])-parseInt(data[3][1])) + '\nTerpenuhi: ' + Math.round(parseInt(data[3][1])/parseInt(data[3][2])*100) + '%'],
        [data[4][0], parseInt(data[4][1]), parseInt(data[4][2]), parseInt(data[4][2]) + '\nKekurangan: ' + Math.round(parseInt(data[4][2])-parseInt(data[4][1])) + '\nTerpenuhi: ' + Math.round(parseInt(data[4][1])/parseInt(data[4][2])*100) + '%'],
    ]);

    var optionsbar = {
        'title': '5 Kecamatan yang Paling Kekurangan Angkot',
        'titleTextStyle': {
            color: '#FFFFFF',
            'fontSize': 13
        },
        'colors': ['#28B67C','#E12F2F'],
        backgroundColor: '#033649',
        'chartArea': {'width': '50%'},
        legend: {
            textStyle: {
                color: '#FFFFFF'
            }
        },
        'hAxis': {
            'title': 'Total Angkot',
            'minValue': 0,
            gridlines: {
                color: '#FFFFFF'
            },
            textStyle : {
                color: '#FFFFFF'
            },
            titleTextStyle: {
                color: '#FFFFFF',
                italic: false,
            }
        },
        'vAxis': {
            'title': 'Kecamatan',
            gridlines: {
                color: '#FFFFFF'
            },
            textStyle : {
                color: '#FFFFFF',
            },
            titleTextStyle: {
                color: '#FFFFFF',
                italic: false,
              }
        },
        focusTarget: 'category',
        tooltip: {
            isHtml: true
        }
    };

    var chartbar = new google.visualization.BarChart(document.getElementById('kecamatan'));
    chartbar.draw(databar, optionsbar);
}

function drawChartTotalBubble() {
    var data = google.visualization.arrayToDataTable([
        ['ID', '', '', 'Keterangan',     'Jumlah'],
        ['',    0,              0,      'Total Angkot', parseInt(totalAngkot)],
        ['',    0,              0,      'Total Siswa', parseInt(totalSiswa)],
        ['',    0,              0,      'Total Kebutuhan Angkot', parseInt(totalSiswa/10+1)],
    ]);

    var options = {
        title: 'Perbandingan Total Angkot, Siswa dan Kebutuhan Angkot',
        'titleTextStyle': {
            color: '#FFFFFF',
            'fontSize': 13
        },
        colors: ['#28B67C','#00A2FF','#E12F2F'],
        backgroundColor: '#033649',
        hAxis: {
            gridlines: {
                color: 'transparent'
            },
            textStyle : {
                color: 'transparent'
            }
        },
        legend: {
            textStyle: {
                color: '#FFFFFF'
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

// var chartKecamatan = {
//     "type":"hbullet",
//     title:{
//         text: '5 Kecamatan yang Paling Kekurangan Angkot',
//         "font-family": "Open Sans",
//         fontColor: '#212121'
//     },
//     labels:[
//         {
//             text: kecamatan[4],
//             height: 50,
//             width: 50,
//             hook: 'scale:name=scale-x,index=0',
//              offsetX: -50
//         },
//         {
//             text: kecamatan[3],
//             height: 50,
//             width: 50,
//             hook: 'scale:name=scale-x,index=1',
//              offsetX: -50
//         },
//         {
//             text: kecamatan[2],
//             height: 50,
//             width: 50,
//             hook: 'scale:name=scale-x,index=2',
//              offsetX: -50
//         },
//         {
//             text: kecamatan[1],
//             height: 50,
//             width: 50,
//             hook: 'scale:name=scale-x,index=3',
//              offsetX: -50
//         },
//         {
//             text: kecamatan[0],
//             height: 50,
//             width: 50,
//             hook: 'scale:name=scale-x,index=4',
//              offsetX: -50
//         },
//     ],
//     scaleX:{
//         label:{
//             text: 'Kecamatan',
//             offsetX: -80
//         },
//         item:{
//             visible: false
//         }
//     },
//     scaleY:{
//         label:{
//             text: 'Banyak Angkot'
//         }
//     },
//     plot:{
//         animation:{
//             "effect":"11",
//             "method":"4",
//             "sequence":"ANIMATION_BY_PLOT_AND_NODE",
//             "speed":500
//         }
//     },
//     plotarea:{
//         margin:'50 50 90 120'
//     },
//     series:[
//         {
//             values: [
//                 0,0,0,0,0
//                 //parseInt(angkot[0]),
//                 //parseInt(angkot[1]),
//                 //parseInt(angkot[2]),
//                 //parseInt(angkot[3]),
//                 //parseInt(angkot[4])
//             ],
//             backgroundColor:'#009688',
//             goals: [
//                 1,2,3,4,5
//                 //parseInt(siswa[0]),
//                 //parseInt(siswa[1]),
//                 //parseInt(siswa[2]),
//                 //parseInt(siswa[3]),
//                 //parseInt(siswa[4])
//             ],
//             "hover-state": {
//                 "visible": false
//             },
//                 "tooltip": {
//                 "text": "Actual: %v",
//                 "font-color": "black",
//                 "background-color": "white"
//             },
//             goal: {
//                 backgroundColor:'#993232',
//                 "tooltip": {
//                     "text": "Target Goal: %g",
//                     "font-color": "black",
//                     "background-color": "white"
//                 }
//             }
//         }
//     ]
//     };

//     window.onload=function(){
//       zingchart.render({
//         id:'chartKecamatan',
//         data:chartKecamatan,
//         height:300,
//         width:600
//       });
// };