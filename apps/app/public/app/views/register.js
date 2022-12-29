define([], function () {
  var _form = {
    view: "form",
    elements: [
      { view: "label", label: "Register", align: "center" },
      { view: "text", id: "email", label: "Email" },
      { view: "text", id: "password", type: "password", label: "Password" },
      {
        cols: [
          {
            view: "button",
            id: "register",
            value: "Register",
            css: "webix_primary",
          },
          { view: "button", value: "Cancel" },
        ],
      },
      {
        cols: [
          {
            view: "button",
            id: "with_google",
            value: "Google",
            css: "webix_primary",
          },
          {
            view: "button",
            id: "with_github",
            value: "Github",
            css: "webix_primary",
          },
          {},
        ],
      },
    ],
  };
  var _layout = {
    cols: [{}, _form, {}],
  };

  return {
    $ui: _layout,
    $oninit: function (_view, _scope) {
      scope = _scope;
      $$("with_google").attachEvent("onItemClick", function () {
        window.open("/sso/google/app?redirect_uri=/app");
      });
      $$("with_github").attachEvent("onItemClick", function () {
        window.open("/sso/github/app?redirect_uri=/app");
      });
      $$("register").attachEvent("onItemClick", function () {
        var _email = $$("email").getValue();
        var _password = $$("password").getValue();
        webix
          .ajax()
          .post("/api/app/v1?action=user.register", {
            email: _email,
            password: _password,
          })
          .then(function (_res) {
            var _data = _res.json();
            console.log(_data);
            if (_data.result) {
              webix
                .ajax()
                .post("/api/app/v1?action=user.login", {
                  email: _email,
                  password: _password,
                })
                .then(function (_res1) {
                  console.log(_res1.json());
                });
            }
          });
      });
    },
  };
});
