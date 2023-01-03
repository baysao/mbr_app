define([
  "text!/api/app/v1?action=app.config",
  app_view + "/toolbar",
  app_view + "/sidemenu",
  "online",
], function ($_config, toolbar, sidemenu, Online) {
  var $config = $_config && JSON.parse($_config);
  var scope;

  var _toolbar = toolbar;
  var _sidemenu = sidemenu;

  var _layout = {
    rows: [
      _toolbar,
      {
        cols: [_sidemenu, { $subview: true }],
      },
    ],
  };

  return {
    $ui: _layout,
    $oninit: function (_view, _scope) {
      console.log($config);
      // if (!$config || !$config.result) {
      //   return _scope.show("/auth/login");
      // }
      scope = _scope;
    },
  };
});
