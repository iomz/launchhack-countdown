$(document).ready(function() {
    var countdownCont = $('#countdown');
    var countdownDate = new Date(countdownCont.attr('year'), countdownCont.attr('month')-1, countdownCont.attr('day'), countdownCont.attr('hour'), countdownCont.attr('minute'));
    $('#countdown').countdown({until: $.countdown.UTCDate(0, countdownDate)});
});
