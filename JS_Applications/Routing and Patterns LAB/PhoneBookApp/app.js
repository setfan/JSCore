const handlers = {};
$(() => {
  let app = Sammy('#main', function () {
    this.use('Handlebars', 'hbs');

    this.get('#/index.html', handlers.homeHandler);

    this.get('#/register', (ctx) => {
      ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        navigation: './templates/common/navigation.hbs',
      }).then(function () {
        this.partial('./templates/forms/registrationForm.hbs');
      });
    });

    this.post('#/register', (ctx) => {
      let username = ctx.params.username;
      let password = ctx.params.password;
      let repeatPass = ctx.params.repeatPass;

      if (password !== repeatPass) {
        alert('Passwords don not match.');
      } else {
        auth.register(username, password).then(auth.saveSession)
          .catch(console.error);
        ctx.redirect('#/index.html');
      }
    });

    this.post('#/login', (ctx) => {
      let username = ctx.params.username;
      let password = ctx.params.password;

      auth.login(username, password).then((userData) => {
        auth.saveSession(userData);
        ctx.redirect('#/index.html');
      }).catch(console.error);

    });

    this.post('#/logout', (ctx) => {
      console.log('attempt to logout')
      auth.logout().then(function () {
        sessionStorage.clear();
        ctx.redirect('#/index.html');
      }).catch(console.error);
    })

  });

  app.run();
});