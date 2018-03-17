function timer () {
  let hours = $('#hours');
  let minutes = $('#minutes');
  let seconds = $('#seconds');

  let counter = 0;

  $('#start-timer').on('click', start);
  $('#stop-timer').on('click', function () {
    clearInterval(counter);
    $('#start-timer').on('click', start);
  });

  function start () {
    counter = setInterval(step, 1000);
    $('#start-timer').off('click');
  }

  function step () {
    seconds.val(+seconds.val() + 1);

    if (seconds.val() > 59) {
      seconds.val('00');
      minutes.val(+minutes.val() + 1);
      minutes.text(timeFormat(minutes.val()));
    }

    if (minutes.val() > 59) {
      minutes.val('00');
      minutes.text(timeFormat(minutes.val()));
      hours.val(+hours.val() + 1);
      hours.text(timeFormat(hours.val()));

    }
    seconds.text(timeFormat(seconds.val()))
  }

  function timeFormat (value) {
    return `${('0' + value % 60).slice(-2)}`;
  }

}