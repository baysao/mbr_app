define([], function () {
  var scope;

 
  var _layout = {
    view: "menu",
    // id: "m1",
    layout: "y",
    width: 200,
    select: true,
    data: [
      {
        id: "dashboard",
        value: "Dashboard",
        icon: "mdi mdi-home",
      },
      { id: "app", value: "App Detail", icon: "mdi mdi-code-json" },
      { id: "explorer", value: "Explorer", icon: "mdi mdi-math-log" },
      { id: "composer", value: "Composer", icon: "mdi mdi-pencil" },
      { id: "mempool", value: "Mempool", icon: "mdi mdi-lan-connect" },
      { id: "notify", value: "Notify", icon: "mdi mdi-map-marker-alert" },
      {
        id: "developer",
        value: "Developer",
        icon: "mdi mdi-file-code-outline",
      },
    ],
    on: {
      onMenuItemClick: function (id) {
        scope.show("./app." + id);
      },
    },
  };

  return {
    $ui: _layout,
    $oninit: function (_view, _scope) {
      scope = _scope;
    },
  };
});
