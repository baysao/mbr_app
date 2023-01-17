define(["app", "model/user"], function ($app, $model_user) {
  var _form = {
    view: "form",
    responsive: true,
    borderless: true,
    elementsConfig: {
      labelPosition: "top",
    },
    elements: [
      // {
      //         cols: [
      //           {
      //             cols: [
      //               {
      //                   view: "template",
      //                   template:
      //                   '<img id="icon" src="https://cdn.kingsport.vn/image/catalog/logo/logo_kingsport_fixed.svg" alt="KingSport logo"></img>',
      // //                  '<img id="icon" src="assets/images/logo/logo.png" alt="MBR logo"></img>',
      //                 css: "icon",
      //                 gravity: 1,
      //               },
      //               {
      //                 view: "label",
      //                 label: "KingSport",
      //                 css: "no-border",
      //                 gravity: 3,
      //               },
      //             ],
      //             gravity: 1,
      //           },
      // 	    {}

      //           // {
      //           //   view: "label",
      //           //   label: "Docs",
      //           //   css: "no-border",
      //           //   align: "right",
      //           //   gravity: 2,
      //           // },
      //         ],
      //       },
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
        $model_user.login(
          {
            email: _email,
            password: _password,
          },
          function (_data) {
            console.log(_data);
            console.log(_data);
            if (_data.result) {
              var _params = $app.params();
              if (_params && _params["login"] && _params["login"].redir) {
                location.hash = decodeURIComponent(_params["login"].redir);
              } else location.hash = "!/app";
            }
          }
        );
      });
    },
  };
});
