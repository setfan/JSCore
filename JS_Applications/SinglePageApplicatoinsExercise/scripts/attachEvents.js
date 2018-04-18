function attachAllEvents () {
  // Bind the navigation menu links
  $('#linkHome').on('click', showHomeView);
  $('#linkLogin').on('click', showLoginView);
  $('#linkRegister').on('click', showRegisterView);
  $('#linkLogout').on('click', logoutUser);
  $('#linkCreateAd').on('click', showCreateAd);
  $('#linkListAds').on('click', listAllAdverts);
  $('#buttonLoginUser').on('click', loginUser);
  $('#buttonRegisterUser').on('click', registerUser);
  $('#buttonCreateAd').on('click', creteAdvert);
  $('#buttonEditAd').on('click', editAd);

  $('#infoBox').click((event) => $(event.target).hide());
  $('#errorBox').click((event) => $(event.target).hide());

  // Bind the info / error boxes
  $('#infoBox, #errorBox').on('click', function () {
    $(this).fadeOut();
  });

  // Attach AJAX "loading" event listener
  $(document).on({
    ajaxStart: function () { $('#loadingBox').show(); },
    ajaxStop: function () { $('#loadingBox').hide(); },
  });
}