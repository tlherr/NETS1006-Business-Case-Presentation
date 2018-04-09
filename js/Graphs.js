(function(reveal) {

    //Data



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

        loadJSON("data/" + dataSetName + ".json", function(response) {

            var dataSet = JSON.parse(response);
            //Iterate over datasets, set backgroundColor of each to randomColor

            for (var index in dataSet.datasets) {
                dataSet.datasets[index].backgroundColor = randomColor(100);
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
                            ticks: {
                                min: 0,
                                max: 5,
                                stepsize: 1
                            }
                        }],
                        xAxes: [{
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


})(Reveal);

