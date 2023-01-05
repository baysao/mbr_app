define(["model/menu_profile"], function (model_menu_profile) {
  var scope;

  var _layout = {
    view: "menu",
    id: "settings_sidemenu",
    layout: "y",
    width: 200,
    select: true,
    data: model_menu_profile,
  };

  return {
    $ui: _layout,
    $oninit: function (_view, _scope) {
      $$("settings_sidemenu").attachEvent("onMenuItemClick", function (id) {
        console.log(id);
        if (id === "signout") {
          webix.ajax().get("/api/app/v1?action=user.signout", function (_res) {
            location.hash = "#!/auth/login";
          });
        } else scope.show("/settings/$" + id);
      });
      scope = _scope;
    },
  };
});
