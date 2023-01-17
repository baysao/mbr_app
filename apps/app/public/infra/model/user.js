define(["model/config"], function ($config) {
  var _login = function (_payload, _cb) {
    webix
      .ajax()
      .post($config.api_prefix + "?action=user.login", _payload)
      .then(function (_ret) {
        _ret && _cb(_ret.json());
      });
  };
  var _register = function (_payload, _cb) {
    webix
      .ajax()
      .post($config.api_prefix + "?action=user.register", _payload)
      .then(function (_ret) {
        _ret && _cb(_ret.json());
      });
  };
  var _signout = function (_payload, _cb) {
    webix
      .ajax()
      .get($config.api_prefix + "?action=user.signout")
      .then(function (_ret) {
        _ret && _cb(_ret.json());
      });
  };

  return {
    login: _login,
    register: _register,
    signout: _signout,
  };
});
