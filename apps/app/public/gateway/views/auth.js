define([], function () {
  var scope;

  var _toolbar = {
    view: "toolbar",
    padding: 3,
    elements: [
      {
        view: "icon",
        icon: "mdi mdi-menu",
        click: function () {
          $$("main_sidebar").toggle();
        },
      },
      { view: "label", label: "MassbitRoute" },
      {},
      {
        view: "button",
        value: "App",
        width: 100,
        css: "webix_primary",
        click: function () {
          console.log(scope.show("/app"));
        },
      },
      { view: "button", value: "Node", width: 100, css: "webix_primary" },
      { view: "button", value: "Gateway", width: 100, css: "webix_primary" },
    ],
  };
  var _layout = {
    rows: [
      _toolbar,
      {
        cols: [{ $subview: true }],
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
