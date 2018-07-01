$(() => {
  const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    this.get('#/home', renderHomePage);
    this.get('index.html', renderHomePage);

    this.get('#/register', (ctx) => {
      ctx.isAuth = auth.isAuth();

      ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        registerForm: './templates/forms/registerForm.hbs',
      }).then(function () {
        this.partial('./templates/registerPage.hbs');
      });
    });
    this.post('#/register', (ctx) => {
      let username = String(ctx.params['username']);
      let password = ctx.params['pass'];
      let repeatPass = ctx.params['checkPass'];

      if (!/^\w{5,}$/.test(username)) {
        notify.showError(
          'Username should be at least 5 characters long and contain only english alphabet letters.');
      } else if (!/^[A-Za-z\d]{3,}$/.test(password)) {
        notify.showError(
          'Password should be at least 3 characters long and contain only english alphabet letters.');
      } else if (repeatPass !== password) {
        notify.showError('Passwords must match!');
      } else {
        auth.register(username, password)
          .then((userData) => {
            auth.saveSession(userData);
            notify.showInfo('User registration successful.');
            ctx.redirect('#/home');
          })
          .catch(notify.handleError);
      }
    });

    this.post('#/login', (ctx) => {
      let username = ctx.params['username'];
      let password = ctx.params['pass'];

      if (username === '' || password === '') {
        notify.showError('All fields should be non-empty!');
      } else {
        auth.login(username, password)
          .then((userData) => {
            auth.saveSession(userData);
            notify.showInfo('Login successful.');
            ctx.redirect('#/home');
          })
          .catch(notify.handleError);
      }
    });

    this.get('#/logout', (ctx) => {
      auth.logout()
        .then(() => {
          sessionStorage.clear();
          ctx.redirect('#/home');
        })
        .catch(notify.handleError);
    });

    this.get('#/flightsCatalog', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/home');
        return;
      }

      flights.getAllFlights().then((flights) => {

        flights.forEach((f) => {
          f.departure = formatDate(f.departureDate);
        });

        ctx.isAuth = auth.isAuth();
        ctx.username = sessionStorage.getItem('username');
        ctx.flights = flights;

        ctx.loadPartials({
          header: './templates/common/header.hbs',
          footer: './templates/common/footer.hbs',
          flight: './templates/flights/flight.hbs',
        }).then(function () {
          this.partial('./templates/flights/flightsCatalog.hbs');
        });
      }).catch(notify.handleError);
    });

    this.get('#/addFlight', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/home');
        return;
      }
      ctx.isAuth = auth.isAuth();
      ctx.username = sessionStorage.getItem('username');

      ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
      }).then(function () {
        this.partial('./templates/flights/addFlightPage.hbs');
      });
    });

    this.post('#/addFlight', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/home');
        return;
      }

      let destination = ctx.params.destination;
      let origin = ctx.params.origin;
      let departureDate = ctx.params.departureDate;
      let departureTime = ctx.params.departureTime;
      let seats = Number(ctx.params.seats);
      let cost = Number(ctx.params.cost);
      let image = ctx.params.img;
      let isPublished = setCheckBoxBool(ctx.params.public);

      if (isInputValid(destination, origin, seats, cost)) {
        flights.createFlight(destination, origin, departureDate, departureTime,
          seats, cost, image, isPublished).then(() => {
          notify.showInfo('Created flight.');
          ctx.redirect('#/flightsCatalog');
        }).catch(notify.handleError);
      }
    });

    this.get('#/details/:flightId', (ctx) => {
      let flightId = ctx.params.flightId;

      ctx.username = sessionStorage.getItem('username');

      flights.flightDetails(flightId).then((flight) => {

        ctx.isAuth = auth.isAuth();

        ctx.isCreator = sessionStorage.getItem('userId') ===
          flight._acl.creator;

        flight.departure = formatDate(flight.departureDate);

        ctx.flight = flight;
        ctx.loadPartials({
          header: './templates/common/header.hbs',
          footer: './templates/common/footer.hbs',
        }).then(function () {
          this.partial('./templates/flights/flightDetails.hbs');
        });
      }).catch(notify.handleError);

    });

    this.get('#/editFlight/:flightId', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/home');
        return;
      }

      let flightId = ctx.params.flightId;

      ctx.username = sessionStorage.getItem('username');

      flights.flightDetails(flightId).then((flight) => {
        ctx.isAuth = auth.isAuth();

        ctx.flight = flight;
        ctx.loadPartials({
          header: './templates/common/header.hbs',
          footer: './templates/common/footer.hbs',
        }).then(function () {
          this.partial('./templates/flights/editFlightPage.hbs');
        });
      }).catch(notify.handleError);

    });
    this.post('#/editFlight/:flightId', (ctx) => {
      let flightId = ctx.params.flightId;

      let destination = ctx.params.destination;
      let origin = ctx.params.origin;
      let departureDate = ctx.params.departureDate;
      let departureTime = ctx.params.departureTime;
      let seats = Number(ctx.params.seats);
      let cost = Number(ctx.params.cost);
      let image = ctx.params.img;
      let isPublished = setCheckBoxBool(ctx.params.public);

      if (isInputValid(destination, origin, seats, cost)) {
        flights.editFlight(flightId, destination, origin, departureDate,
          departureTime, seats, cost, image, isPublished).then(() => {
          notify.showInfo('Successfully edited flight.');
          ctx.redirect(`#/details/${flightId}`);
        }).catch(notify.handleError);
      }
    });

    this.get('#/flights', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/home');
        return;
      }
      let userId = sessionStorage.getItem('userId');

      flights.getMyFlights(userId).then((flights) => {
        flights.forEach((f) => {
          f.departure = formatDate(f.departureDate);
        });

        ctx.isAuth = auth.isAuth();
        ctx.username = sessionStorage.getItem('username');
        ctx.flights = flights;

        ctx.loadPartials({
          header: './templates/common/header.hbs',
          footer: './templates/common/footer.hbs',
          myFlight: './templates/flights/myFlight.hbs',
        }).then(function () {
          this.partial('./templates/flights/myFlightsPage.hbs');
        });

      });
    });

    this.get('#/deleteFlight/:flightId', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/home');
        return;
      }

      let flightId = ctx.params.flightId;

      flights.deleteFlight(flightId).then(() => {
        notify.showInfo('Flight deleted.');
        ctx.redirect('#/flights');
      }).catch(notify.handleError);
    });

    function renderHomePage (ctx) {
      ctx.isAuth = auth.isAuth();

      if (!auth.isAuth()) {
        ctx.loadPartials({
          header: './templates/common/header.hbs',
          footer: './templates/common/footer.hbs',
          loginForm: './templates/forms/loginForm.hbs',
        }).then(function () {
          this.partial('./templates/welcomePage.hbs');
        });
      } else {
        ctx.redirect('#/flightsCatalog');
      }
    }

    function formatDate (date) {
      let dateStr = new Date(date);
      let locale = 'en-us';
      let month = dateStr.toLocaleString(locale, {month: 'long'});
      return `${dateStr.getDate()} ${month}`;
    }

    function setCheckBoxBool (str) {
      return str === 'on';
    }

    function isInputValid (destination, origin, seats, cost) {
      if (destination === '') {
        notify.showError('Destination is required!');
      } else if (origin === '') {
        notify.showError('Origin is required!');
      } else if (seats <= 0) {
        notify.showError('There must be at least one seat available.');
      } else if (cost < 0) {
        notify.showError('The cost must be positive number.');
      } else {
        return true;
      }

      return false;
    }

  });
  app.run();
});