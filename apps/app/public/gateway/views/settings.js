define([
  app_view + "/settings/sidemenu",
], function (sidemenu) {
  var scope;

  var _sidemenu = sidemenu;

  var _layout = {
    rows: [
      {
        cols: [_sidemenu, { $subview: true }],
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
