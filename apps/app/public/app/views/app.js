define([
  "text!/api/app/v1?action=app.config",
  app_view + "/app/toolbar",
  app_view + "/app/sidemenu",
  "online",
], function ($_config, toolbar, sidemenu, Online) {
  var $config = $_config && JSON.parse($_config);
  var scope;

  var _toolbar = toolbar;
  var _sidemenu = sidemenu;

  var _body = {
    view: "scrollview",
    scroll: "native-y",
    body: { cols: [{ $subview: true }] },
  };
  var _layout = {
    rows: [
      _toolbar,
      {
        cols: [_sidemenu, _body],
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
