define([], function () {

  var _form = {
    view: "form",
    responsive: true,
    borderless: true,
    elementsConfig: {
      labelPosition: "top",
    },
    elements: [
      {
        cols: [
          {
            cols: [
              {
                view: "template",
                template:
                  '<img id="icon" src="assets/images/logo/logo.png" alt="MBR logo"></img>',
                css: "icon",
                gravity: 1,
              },
              {
                view: "label",
                label: "MassbitRoute",
                css: "no-border",
                gravity: 3,
              },
            ],
            gravity: 1,
          },

          {
            view: "label",
            label: "Docs",
            css: "no-border",
            align: "right",
            gravity: 2,
          },
        ],
      },
      {
        view: "template",
        template: "<h1 id='register-header'>Login</h1>",
        align: "center",
        height: 80,
        borderless: true,
      },
      { view: "text", id: "email", label: "Email" },
      {
        view: "text",
        id: "password",
        type: "password",
        label: "Password",
      },
      {
        cols: [
          {
            view: "button",
            id: "login",
            value: "Login",
            css: "webix_primary",
            align: "center",
          },
        ],
      },
      // {
      //   cols: [
      //     { gravity: 0.5 },
      //     {
      //       view: "button",
      //       id: "with_google",
      //       value: "Google",
      //       css: "webix_primary",
      //       gravity: 1,
      //       css: "center",
      //       autowidth: true,
      //     },
      //     { gravity: 1.5 },
      //     {
      //       view: "button",
      //       id: "with_github",
      //       value: "Github",
      //       css: "webix_primary",
      //       align: "center",
      //       gravity: 1,
      //       autowidth: true,
      //     },
      //     { gravity: 0.5 },
      //   ],
      // },
    ],
  };
  var _layout = {
    cols: [{}, _form, {}],
  };

  return {
    $ui: _layout,
    $oninit: function (_view, _scope) {
      scope = _scope;

      $$("login").attachEvent("onItemClick", function () {
        var _email = $$("email").getValue();
        var _password = $$("password").getValue();
        webix
          .ajax()
          .post("/api/app/v1?action=user.login", {
            email: _email,
            password: _password,
          })
          .then(function (_res) {
            var _data = _res.json();
            console.log(_data);
              if(_data.result) {
		  location.hash = "!/app";
	      }
          });
      });
    },
  };

});
