function startApp () {
  showHideMenuLinks();
  showView('viewHome');
  attachAllEvents();

}


function handleAjaxError (res) {
  let errorMsg = JSON.stringify(res);
  if (res.readyState === 0)
    errorMsg = 'Cannot connect due to network error.';
  if (res.responseJSON && res.responseJSON.description)
    errorMsg = res.responseJSON.description;
  showError(errorMsg);
}