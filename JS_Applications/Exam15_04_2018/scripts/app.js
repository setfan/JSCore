$(() => {
  const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    this.get('#/home', renderHomePage);
    this.get('index.html', renderHomePage);

    this.post('#/register', (ctx) => {
      let username = ctx.params['username-register'];
      let password = ctx.params['password-register'];
      let repeatPass = ctx.params['password-register-check'];

      if (!/^\w{5,}$/.test(username)) {
        notify.showError(
          'Username should be at least 5 characters long and contain only english alphabet letters');
      } else if (!/^[A-Za-z\d]{3,}$/.test(password)) {
        notify.showError(
          'Password should be at least 3 characters long and contain only english alphabet letters');
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
      let username = ctx.params['username-login'];
      let password = ctx.params['password-login'];

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

    this.get('#/editor', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/home');
        return;
      }

      let userId = sessionStorage.getItem('userId');
      ctx.username = sessionStorage.getItem('username');

      receipts.getActiveReceipt(userId).then((res) => {

        if (res.length === 0) {
          receipts.createReceipt().then((emptyReceipt) => {
            ctx.receipt = emptyReceipt;

          }).catch(notify.handleError);
        } else {
          ctx.receipt = res[0];

          let receiptId = ctx.receipt['_id'];

          ctx.receiptId = receiptId;
          let total = 0;
          ctx.total = total.toFixed(2);

          entries.getEntriesByReceiptId(receiptId)
            .then((entriesData) => {
              entriesData.forEach(e => {
                let subtotal = e.qty * e.price;
                total += subtotal;
                e.subtotal = subtotal.toFixed(2);
              });

              ctx.entries = entriesData;
              ctx.total = total.toFixed(2);
              let count = entriesData.length;
              ctx.productCount = count;

              receipts.updateReceipt(count, total, receiptId).then(function () {
                ctx.redirect('#/editor');
              }).catch(notify.handleError);

              ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createEntryForm: './templates/forms/createEntryForm.hbs',
                checkoutForm: './templates/forms/checkoutForm.hbs',
                entry: './templates/editorPage/entry.hbs',
              }).then(function () {
                this.partial('./templates/editorPage/editorPage.hbs');
              });
            }).catch(notify.handleError);
        }
      }).catch(notify.handleError);
    });

    this.post('#/addEntry', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/home');
        return;
      }

      let type = ctx.params.type;
      let qty = ctx.params.qty;
      let price = ctx.params.price;

      let receiptId = ctx.params.receiptId;

      entries.addEntry(type, qty, price, receiptId).then((res) => {
        notify.showInfo('Entry added');
        ctx.redirect('#/editor');
      });

    });

    this.get('#/entry/remove/:entityId', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/home');
        return;
      }

      let entityId = ctx.params.entityId;

      entries.deleteEntry(entityId)
        .then(() => {
          notify.showInfo('Entity deleted.');
          ctx.redirect('#/editor');
        })
        .catch(notify.handleError);
    });

    this.post('#/checkout', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/home');
        return;
      }

      let userId = sessionStorage.getItem('userId');

      let receiptId = ctx.params.receiptId;
      let productCount = ctx.params.productCount;
      let total = ctx.params.total;

      if (productCount > 0) {
        receipts.commitReceipt(productCount, total, receiptId)
          .then(function () {
            ctx.redirect('#/editor');
            notify.showInfo('Receipt checked out');
          })
          .catch(notify.handleError);
      } else {
        notify.showInfo('Unable to check out an empty receipt');
      }

    });

    this.get('#/overview', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/home');
        return;
      }

      let userId = sessionStorage.getItem('userId');
      ctx.username = sessionStorage.getItem('username');

      let total = 0;

      receipts.getMyReceipts(userId).then((res) => {

        res.forEach(e => {
          let date = new Date(e._kmd.ect);
          let num = e.total.toFixed(2);
          total += +num;
          e.total = num;
          e.date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        });

        ctx.receipts = res;
        ctx.total = total.toFixed(2);

        ctx.loadPartials({
          header: './templates/common/header.hbs',
          footer: './templates/common/footer.hbs',
          receipt: './templates/overview/receipt.hbs',
        }).then(function () {
          this.partial('./templates/overview/overviewPage.hbs');
        });
      });
    });

    this.get('#/details/:receiptId', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/home');
        return;
      }
      let receiptId = ctx.params.receiptId;
      ctx.username = sessionStorage.getItem('username');

      entries.getEntriesByReceiptId(receiptId).then((res) => {
        res.forEach(e => {
          let num = e.qty + e.price;
          e.price = e.price.toFixed(2);
          e.subtotal = num.toFixed(2);
        });
        ctx.entries = res;

        ctx.loadPartials({
          header: './templates/common/header.hbs',
          footer: './templates/common/footer.hbs',
          line: './templates/details/tableLine.hbs',
        }).then(function () {
          this.partial('./templates/details/detailsView.hbs');
        });
      });
    });

    function renderHomePage (ctx) {
      ctx.isAuth = auth.isAuth();

      if (auth.isAuth()) {
        ctx.username = sessionStorage.getItem('username');
      }

      ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        welcomePage: './templates/welcomePage.hbs',
        loginForm: './templates/forms/loginForm.hbs',
        registerForm: './templates/forms/registerForm.hbs',
      }).then(function () {
        this.partial('./templates/home.hbs');
      });
    }

  });

  app.run();
});