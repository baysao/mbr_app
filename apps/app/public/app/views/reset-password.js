define([], function () {
  var scope;
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
        template:
          '<img id="lock-icon" src="assets/images/icons/ForgotPasswordIcon.svg" alt="Forgot password icon"></img>',
        css: "icon",
        gravity: 1,
      },
      {
        view: "template",
        template: "<h1 id='register-header'>Forgot Your Password?</h1>",
        align: "center",
        height: 80,
        borderless: true,
      },
      {
        view: "template",
        template:
          "<p id='reset-hint'>Please enter the email address associated with your account.<br> We'll email you a link to reset your password.</p>",
        align: "center",
        borderless: true,
        height: 80,
      },
      {
        view: "form",
        borderless: true,
        elementsConfig: {
          labelPosition: "top",
        },
        elements: [{ view: "text", id: "email", label: "Email" }],
        css: "reset-hint",
      },
      {
        view: "button",
        id: "reset-button",
        value: "Send",
        css: "webix_primary",
      },
      {
        cols: [
          {
            view: "button",
            id: "back-to-login",
            value: "Back to Login",
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
      $$("reset-button").attachEvent("onItemClick", function () {
        var _email = $$("email").getValue();
        webix
          .ajax()
          .post("/api/app/v1?action=user.reset_password", {
            email: _email,
          })
          .then(function (_res) {
            var _data = _res.json();
            console.log(_data);
            if (_data.result) {
              window.location.href =
                "https://dev.massbitroute.com/app/#!/auth/check-email";
            }
          });
      });
      $$("back-to-login").attachEvent("onItemClick", function () {
        window.location.href = "https://dev.massbitroute.com/app/#!/auth/login";
      });
    },
  };
});
