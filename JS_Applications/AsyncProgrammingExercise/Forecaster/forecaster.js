function attachEvents () {
  $('#submit').on('click', getForecast);
  let baseURL = 'https://judgetests.firebaseio.com/';
  let symbols = {
    'Sunny': '&#x2600;',
    'Partly sunny': '&#x26C5;',
    'Overcast': '&#x2601;',
    'Rain': '&#x2614;',
    'Degrees': '&#176;',
  };
  let code;

  function request (target) {
    return $.ajax({
      method: 'GET',
      url: baseURL + target,
    });
  }

  function getForecast () {
    let locationName = $('#location').val();

    request('locations.json').then(function (res) {
      code = res.filter(e => e.name === locationName).map(el => el.code)[0];
      if (!code) {
        handleError();
      } else {
        let todayForecastP = request(`forecast/today/${code}.json`);
        let upcomingForecastP = request(`forecast/upcoming/${code}.json`);
        Promise.all([todayForecastP, upcomingForecastP])
          .then(displayForecastInfo)
          .catch(handleError);
      }
    }).catch(handleError);

  }

  function displayForecastInfo ([todayInfo, upcomingInfo]) {
    displayForecast()

    renderTodayInfo(todayInfo);
    renderUpcomingInfo(upcomingInfo);
  }

  function renderTodayInfo (todayInfo) {
    let current = $('#current');
    current.empty();
    current.append($('<div class="label">Current conditions</div>'))
      .append($(`<span class="condition symbol">${symbols[`${todayInfo.forecast.condition}`]}</span>`))
      .append($('<span class="condition"></span>')
        .append($(`<span class="forecast-data">${todayInfo.name}</span>`))
        .append($(`<span class="forecast-data">${degStr(todayInfo.forecast)}</span>`))
        .append($(`<span class="forecast-data">${todayInfo.forecast.condition}</span>`))
      );
  }

  function renderUpcomingInfo (upcomingInfo) {
    let upcoming = $('#upcoming');
    upcoming.empty();
    upcoming.append($('<div class="label">Three-day forecast</div>'));
    for (let day of upcomingInfo.forecast) {
      upcoming.append($('<span class="upcoming"></span>').append($(`<span class="symbol">${symbols[`${day.condition}`]}</span>`))
        .append($(`<span class="forecast-data">${degStr(day)}</span>`))
        .append($(`<span class="forecast-data">${day.condition}</span>`))
      )
    }
  }

  function degStr (info) {
    return info.low + symbols.Degrees + '/' + info.high +
      symbols.Degrees;
  }

  function displayForecast () {
    let forecast = $('#forecast');
    forecast.css('display', 'block');
    return forecast;
  }

  function handleError (err) {
    displayForecast().text('Error')
  }
}