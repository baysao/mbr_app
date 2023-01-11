define([
  "app",
  // app_view + "/node/create/zone",
  // app_view + "/node/create/country",
], function (
  $app
  //zone_ui, country_ui
) {
  var scope;

  var _layout = {
    rows: [
      {
        height: 49,
        css: "title",
        template:
          "<div class='header'>Add Node</div><div class='details'>( Define your new node )</div>",
      },
      // zone_ui,
      { $subview: true },
    ],
  };
  return {
    $ui: _layout,

    $oninit: function (_view, _scope) {
      scope = _scope;
      // var _params = $app.params();
      // console.log(_params);
      // if (_params && _params["$zone"] && _params["$zone"].id) {
      //   var _zone_id = _params["$zone"].id;
      //   _scope.show("./$country:id=" + _zone_id);
      // } else _scope.show("./$zone");
    },
  };
});
