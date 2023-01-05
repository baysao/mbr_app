define(["model/config"], function ($config) {
  var _create = function (_payload, _cb) {
    webix
      .ajax()
      .post($config.api_prefix + "?action=app.create", _payload)
      .then(function (_ret) {
        _ret && _cb(_ret.json());
      });
  };
  var _list = function (_cb) {
    webix
      .ajax()
      .get($config.api_prefix + "?action=app.list")
      .then(function (_ret) {
        _ret && _cb(_ret.json());
      });
  };
  return {
    create: _create,
    list: _list,
  };
});
