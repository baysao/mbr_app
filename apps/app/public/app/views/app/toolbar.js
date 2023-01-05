define(["model/menu_profile"], function (model_menu_profile) {
  var scope;

  var _layout = {
    view: "toolbar",
    height: 50,
    elements: [
      {
        view: "button",
        type: "image",
        css: "webix_transparent",
        image: "assets/images/logo/logo.png",
        width: 80,
      },
      {
        template: "<p style='font-size:large;font-weight:bold;'>Massbit</p>",
        width: 100,
        borderless: true,
      },
      {},
      {
        view: "button",
        width: 80,
        // badge: 1,
        type: "icon",
        icon: "mdi mdi-bell",
        label: "Notification",
      },

      {
        view: "icon",
        icon: "mdi mdi-account",
        popup: {
          view: "contextmenu",
          data: model_menu_profile,
          on: {
            onMenuItemClick(id) {
              if (id === "signout") {
                webix
                  .ajax()
                  .get("/api/app/v1?action=user.signout", function (_res) {
                    location.hash = "#!/auth/login";
                  });
              } else scope.show("./settings/$" + id);
            },
          },
        },
      },
    ],
  };

  return {
    $ui: _layout,
    $oninit: function (_view, _scope) {
      scope = _scope;
    },
  };
});
