define([
  app_view + "/api/sdk/javascript",
  app_view + "/api/sdk/cli",
  app_view + "/api/sdk/python",
  app_view + "/api/sdk/go",
], function (sdk_js_ui, sdk_cli_ui, sdk_py_ui, sdk_go_ui) {
  var _layout = {
    view: "tabview",
    cells: [sdk_js_ui, sdk_cli_ui, sdk_py_ui, sdk_go_ui],
  };
 

  return {
    $ui: _layout,
  };
});
