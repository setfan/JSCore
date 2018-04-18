$(() => {
  const app = Sammy('#main', function () {

    this.use('Handlebars', 'hbs');


    this.get('index.html', displayHome);


    this.get('#/home', displayHome);


    this.get('#/about', function (ctx) {
      ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
      ctx.username = sessionStorage.getItem('username');

      this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
      }).then(function () {
        this.partial('./templates/about/about.hbs');
      });
    });


    this.get('#/login', function (ctx) {
      ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
      ctx.username = sessionStorage.getItem('username');

      this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        loginForm: './templates/login/loginForm.hbs',
      }).then(function () {
        this.partial('./templates/login/loginPage.hbs');
      });
    });


    this.post('#/login', function (ctx) {
      let username = ctx.params.username;
      let password = ctx.params.password;
      auth.login(username, password).then(function (res) {
        auth.saveSession(res);
        auth.showInfo('LOGGED IN');
        displayHome(ctx);
      }).catch(auth.handleError);
    });


    this.get('#/logout', function (ctx) {
      auth.logout().then(function () {
        sessionStorage.clear();
        auth.showInfo('LOGGED OUT');
        displayHome(ctx);
      }).catch(auth.handleError);
    });


    this.get('#/register', function (ctx) {
      ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
      ctx.username = sessionStorage.getItem('username');

      this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        registerForm: './templates/register/registerForm.hbs',
      }).then(function () {
        this.partial('./templates/register/registerPage.hbs');
      });
    });


    this.post('#/register', function (ctx) {
      let username = ctx.params.username;
      let password = ctx.params.password;
      let repeatPassword = ctx.params.repeatPassword;

      if (password !== repeatPassword) {
        auth.showInfo('PASSWORDS DO NOT MATCH');
      } else {
        auth.register(username, password).then(function (res) {
          auth.saveSession(res);
          auth.showInfo('REGISTERED');
          displayHome(ctx);
        }).catch(auth.handleError);
      }
    });


    function displayHome (ctx) {
      ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
      ctx.username = sessionStorage.getItem('username');

      ctx.hasTeam = sessionStorage.getItem('teamId') !== "undefined"
        || sessionStorage.getItem('teamId') !== null;

      if(ctx.hasTeam){
        ctx.teamId = sessionStorage.getItem('teamId');
      }

      ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
      }).then(function () {
        this.partial('./templates/home/home.hbs');
      });
    }


    this.get('#/create', function (ctx) {
      ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
      ctx.username = sessionStorage.getItem('username');

      ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        createForm: './templates/create/createForm.hbs',
      }).then(function () {
        this.partial('./templates/create/createPage.hbs');
      });
    });


    this.post('#/create', function (ctx) {
      ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
      ctx.username = sessionStorage.getItem('username');

      let name = ctx.params.name;
      let comment = ctx.params.comment;

      teamsService.createTeam(name, comment).then(function (res) {
        teamsService.joinTeam(res._id).then(function (info) {
          auth.saveSession(info);
          auth.showInfo(`TEAM ${name} CREATED`);
          displayCatalog(ctx);
        }).catch(auth.handleError);
      }).catch(auth.handleError);
    });


    this.get('#/catalog/:id', function (ctx) {
      let teamId = ctx.params.id.substr(1);
      teamsService.loadTeamDetails(teamId)
        .then(function (teamInfo) {
          ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
          ctx.username = sessionStorage.getItem('username');
          ctx.name = teamInfo.name;
          ctx.comment = teamInfo.comment;
          ctx.members = teamInfo.members;
          ctx.teamId = teamInfo._id;
          ctx.isOnTeam = teamInfo._id === sessionStorage.getItem('teamId');
          ctx.isAuthor = teamInfo._acl.creator === sessionStorage.getItem('userId');
          ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            teamMember: './templates/catalog/teamMember.hbs',
            teamControls: './templates/catalog/teamControls.hbs'
          }).then(function () {
            this.partial('./templates/catalog/details.hbs');
          })
        });
    });


    this.get('#/leave', function (ctx) {
      teamsService.leaveTeam()
        .then(function (response) {
          auth.saveSession(response);
          auth.showInfo('TEAM HAS BEEN LEFT!');
          displayCatalog(ctx);
        });
    });


    this.get('#/join/:id', function (ctx) {
      let teamId = this.params.id.substr(1);
      teamsService.joinTeam(teamId)
        .then((data) => {
          auth.saveSession(data);
          auth.showInfo('TEAM HAS BEEN JOINED!');
          displayCatalog(ctx);
        });
    });


    this.get('#/edit/:id', function (ctx) {
      ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
      ctx.username = sessionStorage.getItem('username');
      ctx.teamId = this.params.id.substr(1);
      teamsService.loadTeamDetails(ctx.teamId)
        .then((teamInfo) => {
          ctx.name = teamInfo.name;
          ctx.comment = teamInfo.comment;
          this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            editForm: './templates/edit/editForm.hbs'
          }).then(function () {
            this.partial('./templates/edit/editPage.hbs');
          })
        })
    });

    this.post('#/edit/:id', function (ctx) {
      let teamId = ctx.params.id.substr(1);
      let teamName = ctx.params.name;
      let teamComment = ctx.params.comment;

      teamsService.edit(teamId, teamName, teamComment)
        .then(function () {
          auth.showInfo(`TEAM ${teamName} EDITED!`);
          displayCatalog(ctx);
        })
    });




    this.get('#/catalog', displayCatalog);


    function displayCatalog (ctx) {
      ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
      ctx.username = sessionStorage.getItem('username');

      teamsService.loadTeams().then(function (teams) {
        ctx.hasNoTeam = sessionStorage.getItem('teamId') === null ||
          sessionStorage.getItem('teamId') === 'undefined';
        ctx.teams = teams;
        ctx.loadPartials({
          header: './templates/common/header.hbs',
          footer: './templates/common/footer.hbs',
          team: './templates/catalog/team.hbs',
        }).then(function () {
          this.partial('./templates/catalog/teamCatalog.hbs');
        });
      });
    }
  });

  app.run();
});