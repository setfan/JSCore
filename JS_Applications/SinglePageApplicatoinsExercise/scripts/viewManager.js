function showView (viewName) {
  $('main > section').hide(); // Hide all views
  $('#' + viewName).show(); // Show the selected view only
  showHideMenuLinks();
}

function showHideMenuLinks () {
  $('#linkHome').show();
  if (sessionStorage.getItem('authToken') === null) {
    $('#linkLogin').show();
    $('#linkRegister').show();
    $('#linkListAds').hide();
    $('#linkCreateAd').hide();
    $('#linkLogout').hide();
  } else {
    $('#linkLogin').hide();
    $('#linkRegister').hide();
    $('#linkListAds').show();
    $('#linkCreateAd').show();
    $('#linkLogout').show();
  }
}

function showInfo (message) {
  let infoBox = $('#infoBox');
  infoBox.text(message);
  infoBox.show();
  setTimeout(function () {
    $('#infoBox').fadeOut();
  }, 3000);
}

function showError (errorMsg) {
  let errorBox = $('#errorBox');
  errorBox.text('Error: ' + errorMsg);
  errorBox.show();
}

function showHomeView () {
  showView('viewHome');
}

function showLoginView () {
  showView('viewLogin');
  $('#formLogin').trigger('reset');
}

function showRegisterView () {
  $('#formRegister').trigger('reset');
  showView('viewRegister');
}

function showCreateAd () {
  showView('viewCreateAd');
  $('#formCreateAd').trigger('reset');
}

function showViewAds () {
  showView('viewAds');
}
