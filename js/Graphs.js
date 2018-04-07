(function(reveal) {

    //Data
    var currentExposures = {
        datasets:
            [
                {
                    label: "Risk 1",
                    borderColor: '#000000',
                    backgroundColor: randomColor(100),
                    pointRadius: 20,
                    data: [{
                        "x": 2,
                        "y": 3
                    }]
                },
                {
                    label: "Risk 2",
                    borderColor: '#000000',
                    backgroundColor: randomColor(100),
                    pointRadius: 20,
                    data: [{
                        "x": 1,
                        "y": 2
                    }]
                }
            ]
    };

    reveal.addEventListener( 'slidechanged', function( event ) {

        switch (event.currentSlide.id) {
            default:
                return;
            case "current-exposures-ranking":
                buildChart(event.currentSlide.getElementsByTagName("canvas")[0], "Current Exposures", currentExposures);
                break;
        }

    } );

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


    function buildChart(element, title, dataSet) {

        var ctx = element.getContext('2d');

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
                    display: true,
                    text: title
                }
            }
        });

    }


})(Reveal);

