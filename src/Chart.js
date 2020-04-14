//google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.load("visualization", "1", {packages:["corechart"], "callback": makeChart});
google.charts.setOnLoadCallback(makeChart);
var chart;
var data;

var chartDiv;
var chartParent;

function setSummary(pts) {
    document.getElementById("lastDay").innerText = pts.length;
    var peakInfectedDay = 0;

    pts.forEach(function(pt){
        if (pt[3] > pts[peakInfectedDay][3]) {
            peakInfectedDay = pt[0];
            console.log(peakInfectedDay)
        }
    });

    document.getElementById("peakInfectionDay").innerText = peakInfectedDay;
    document.getElementById("peakInfectionNumber").innerText = pts[peakInfectedDay][3];
    document.getElementById("uninfected").innerText = pts[pts.length-1][1];





}

function addColumns(data) {
    data.addColumn('number', "Day");    // 0
    data.addColumn('number', 'S');      // 1
    data.addColumn('number', 'E');      // 2
    data.addColumn('number', 'I');      // 3
    data.addColumn('number', 'R');      //4
    return data;
}

function getFloatFromElementID(elementId) {
    var element = document.getElementById(elementId);
    return parseFloat(element.innerText);
}

function getFloatFromInput(elementId) {
    var element = document.getElementById(elementId);
    return parseFloat(element.value);
}

function makeChart() {
    data = new google.visualization.DataTable();
    data = addColumns(data);

    const beta = getFloatFromElementID("betaValue");
    const sigma = 1.0 / getFloatFromElementID("incubationDurationValue");
    const gamma = 1.0 / getFloatFromElementID("recoveryRateValue");

    const S0 = getFloatFromInput("S0")
    const E0 = getFloatFromInput("E0")
    const I0 = getFloatFromInput("I0")
    const R0 = getFloatFromInput("R0")

    const pts = generateDataPoints(beta, sigma, gamma, S0, E0, I0, R0);

    setSummary(pts);


    data.addRows(pts);

    if (chartDiv == null) {
        chartDiv = document.getElementById("chart_div");
        chartParent = chartDiv.parentNode;
    }

    if (!chart) {
        chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    }

    chart.draw(data, {
        title: 'The SEIR Model of Virus Transmission',
        hAxis: { title: 'Days', minValue: 0, maxValue: pts[pts.length-1][0] },
        vAxis: { title: 'Population', minValue: 0, maxValue: 1.0 },
        width: chartParent.offsetWidth * 0.98,
        height: chartParent.offsetHeight * 0.98,
    });
}
