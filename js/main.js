$(document).ready(function() {


    var _dataArray = [];
    var _ticker = "aa,abt,abb";
    var _myTimer;
    var _url = "";



    $('#ticker-search').submit(function() {

    console.log(_ticker);
        var _symbolVal = $('#symbol').val();
        _ticker = (_symbolVal != '') ? _symbolVal : _ticker;

        _url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("' + _ticker.trim() + '")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';

        clearTimeout(_myTimer);
        callJSON(_url);

        function callJSON(_params) {
            $.getJSON(_params, function(_data) {

                var _newHTML = "";
                var _stockInfo = _data.query.results.quote;

                if (_data.query.count > 1) {
                    for (i = 0; i < _data.query.count; i++) {
                        _newHTML += updateTable(_stockInfo[i]);
                    }

                    // if ( _data.query.count == 2 ) { console.log(_stockInfo); }
                } else {
                    _newHTML = updateTable(_stockInfo);
                }

                $('#ticker-body').html(_newHTML).trigger('footable_redraw');

                // _myTimer = setTimeout(function() {
                //     callJSON(_url);
                // }, 2000);

            });
        }

        event.preventDefault();
    });

    function updateTable(_loopItems) {
        var _html = '<tr>';
        _html += '<td>' + _loopItems.Name + '</td>';
        _html += '<td>' + _loopItems.Symbol + '</td>';
        _html += '<td>' + _loopItems.Ask + '</td>';
        _html += '<td>' + _loopItems.Change + '</td>';
        _html += '<td>' + _loopItems.DaysHigh + '</td>';
        _html += '</tr>';

        return _html;
    }

    $('.footable').footable({
        breakpoints: {
            tiny: 100,
            medium: 555,
            big: 2048
        }
    });

});

var randomScalingFactor = function() {
    return Math.round(Math.random() * 100)
};

var lineChartData = {
    labels: ["9:00 a.m.", "10:00 a.m.", "11:00 a.m", "12:00 a.m.", "1:00 p.m.", "2:00 p.m.", "3:00 p.m."],
    datasets: [{
        label: "My First dataset",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "red",
        pointColor: "blue",
        pointStrokeColor: "green",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "yellow",
        data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
    }]
}

window.onload = function() {
    var ctx = document.getElementById("canvas").getContext("2d");
    window.myLine = new Chart(ctx).Line(lineChartData, {
        responsive: true,
        scaleGridLineWidth: 1,
        scaleGridLineColor: "lightgray",
        scaleShowGridLines: true,
    });
}