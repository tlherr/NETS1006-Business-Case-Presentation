(function(reveal, chartjs) {


    chartjs.pluginService.register({
        beforeDraw: function (chart, easing) {
            if (chart.config.type === "scatter") {
                var ctx = chart.chart.ctx;
                var chartArea = chart.chartArea;

                var chartWidth = chartArea.right - chartArea.left;
                var chartHeight = chartArea.bottom - chartArea.top;

                var pixels = 10;

                var xpos = chartArea.left;
                var ypos = chartArea.bottom-(chartHeight/pixels);


                //Step up each y line
                for (var i = 0; i < pixels; i++) {

                    //Make each x "cell"
                    for (var j = 0; j < pixels; j++) {

                        //The further right we are, the more red we want
                        //The further top we are, the more red we want

                        //Need to start at 100 and end at 255 in pixel steps
                        var red = (140 + (pixels) * i);
                        var green = (225 - (pixels) * j);

                        ctx.fillStyle = 'rgb(' + red + ', ' + green + ', 0)';

                        ctx.fillRect(xpos, ypos, (chartWidth/pixels), (chartHeight/pixels));
                        xpos+=(chartWidth/pixels);
                    }

                    xpos = chartArea.left;
                    //Advance to next row
                    ypos-=(chartHeight/pixels);
                }

                ctx.save();
            }
        }
    });




    reveal.addEventListener( 'slidechanged', function( event ) {
        if(event.currentSlide.dataset.hasChart==="true") {
            buildChart(event.currentSlide.dataset.canvasId, event.currentSlide.dataset.setName);
        }
    });

    function loadJSON(filename, callback) {

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', filename, true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    function randomColor(brightness){
        function randomChannel(brightness){
            var r = 255-brightness;
            var n = 0|((Math.random() * r) + brightness);
            var s = n.toString(16);
            return (s.length==1) ? '0'+s : s;
        }
        return '#' + randomChannel(brightness) + randomChannel(brightness) + randomChannel(brightness);
    }


    function buildChart(elementId, dataSetName) {

        var ctx = document.getElementById(elementId).getContext('2d');

        loadJSON(dataSetName, function(response) {

            var dataSet = JSON.parse(response);
            //Iterate over datasets, set backgroundColor of each to randomColor

            for (var index in dataSet.datasets) {
                //dataSet.datasets[index].backgroundColor = randomColor(100);
                dataSet.datasets[index].borderColor = "#000000";
                dataSet.datasets[index].pointRadius = 20;
                dataSet.datasets[index].pointHoverRadius = 20;
            }


            chart = Chart.Scatter(ctx, {
                data: dataSet,
                options: {
                    legend: {
                        position: 'right'
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Likelihood',
                                fontSize: 20,
                                fontStyle: 'bold'
                            },
                            ticks: {
                                min: 0,
                                max: 5,
                                stepsize: 1
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Impact',
                                fontSize: 20,
                                fontStyle: 'bold'
                            },
                            ticks: {
                                min: 0,
                                max: 5,
                                stepsize: 1
                            }
                        }]
                    },
                    title: {
                        display: false
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var label = data.datasets[tooltipItem.datasetIndex].label;
                                return label + ': (' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
                            }
                        }
                    }
                }
            });
        });


    }


})(Reveal, Chart);

