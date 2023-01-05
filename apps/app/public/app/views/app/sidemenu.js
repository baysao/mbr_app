define(["model/side_menu"], function (model_side_menu) {
  var scope;

  var _menu = {
    view: "menu",
    layout: "y",
    scroll: "y",
    width: 200,
    select: true,
    data: model_side_menu,
    on: {
      onMenuItemClick: function (id) {
       scope.show("./$" + id);
      },
    },
  };

  var _layout = {
    rows: [
      {
        view: "button",
        type: "icon",
        icon: "mdi mdi-plus-circle",
        label: "Create App",
          css: "webix_primary",
	  click: function(){
	      scope.show("/app/api.create")
	  }
      },
      _menu,
    ],
  };
  return {
    $ui: _layout,
    $oninit: function (_view, _scope) {
      scope = _scope;
    },
  };
});
