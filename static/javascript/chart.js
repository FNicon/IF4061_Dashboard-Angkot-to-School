// Load google charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawMultSeries);

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
       'title': 'Total Population',
        'minValue': 0
    },
    'vAxis': {
        'title': 'City'
    }
    };

    var chartbar = new google.visualization.BarChart(document.getElementById('kecamatan'));
    chartbar.draw(databar, optionsbar);
}