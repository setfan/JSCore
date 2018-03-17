function attachEventsListeners() {
  document.getElementById('convert').addEventListener('click', function () {
    let valueFrom = document.getElementById('inputDistance').value;
    let valueTo = document.getElementById('outputDistance');


    let unitFrom = document.getElementById('inputUnits').value;
    let unitTo = document.getElementById('outputUnits').value;

    function convertUnit(from) {
      let result;
      switch (from) {
        case 'km':
          result  = valueFrom * 1000;
          break;
        case 'm':
          result = valueFrom;
          break;
        case 'cm':
          result  = valueFrom * 0.01;
          break;
        case 'mm':
          result  = valueFrom * 0.001;
          break;
        case 'mi':
          result  = valueFrom * 1609.34;
          break;
        case 'yrd':
          result = valueFrom * 0.9144;
          break;
        case 'ft':
          result = valueFrom * 0.3048;
          break;
        case 'in':
          result = valueFrom * 0.0254;
          break;
      }
      return result;
    }
    switch (unitTo) {
      case 'km':
        valueTo.value = convertUnit(unitFrom)/ 1000;
        break;
      case 'm':
        valueTo.value = convertUnit(unitFrom);
        break;
      case 'cm':
        valueTo.value  = convertUnit(unitFrom) / 0.01;
        break;
      case 'mm':
        valueTo.value  = convertUnit(unitFrom) / 0.001;
        break;
      case 'mi':
        valueTo.value  = convertUnit(unitFrom) / 1609.34;
        break;
      case 'yrd':
        valueTo.value = convertUnit(unitFrom) / 0.9144;
        break;
      case 'ft':
        valueTo.value = convertUnit(unitFrom) / 0.3048;
        break;
      case 'in':
        valueTo.value = convertUnit(unitFrom) / 0.0254;
        break;
    }
  })
}