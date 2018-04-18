handlers.homeHandler = function (ctx) {
  ctx.isAuth = auth.isAuth();

  ctx.loadPartials({
    header: './templates/common/header.hbs',
    footer: './templates/common/footer.hbs',
    contactPage: './templates/contactPage.hbs',
    contact: './templates/contact.hbs',
    contactDetails: './templates/contactDetails.hbs',
    contactsList: './templates/contactList.hbs',
    loginForm: './templates/forms/loginForm.hbs',
    navigation: './templates/common/navigation.hbs',
  }).then(function () {
    this.partial('./templates/home.hbs');
  });
}