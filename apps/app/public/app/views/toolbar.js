define([], function () {
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
          data: [
            { id: "settings.profile", value: "Profile" },
            { id: "settings.team", value: "Team" },
            { id: "settings.billing", value: "Billing" },
            { id: "settings.cost", value: "Cost Estimator" },
            { id: "settings.logout", value: "Sign Out" },
          ],
          on: {
            onMenuItemClick(id) {
              if (id === "logout") webix.message("Loging out...");
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
