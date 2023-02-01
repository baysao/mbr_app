define(["model/config"], function ($config) {
  var _create = function (_payload, _cb) {
    webix
      .ajax()
      .post($config.api_prefix + "?action=app.create", _payload)
      .then(function (_ret) {
        var _res = _ret.json();
        if (!_res.result && _res.error_code == 400) {
          location.hash =
            "#!/auth/login:redir=" + encodeURIComponent(location.hash);
        } else _cb(_res);
        //        _ret && _cb(_ret.json());
      });
  };
  var _update = function (_payload, _cb) {
    webix
      .ajax()
      .post($config.api_prefix + "?action=app.update", _payload)
      .then(function (_ret) {
        var _res = _ret.json();
        if (!_res.result && _res.error_code == 400) {
          location.hash =
            "#!/auth/login:redir=" + encodeURIComponent(location.hash);
        } else _cb(_res);
        //        _ret && _cb(_ret.json());
      });
  };
  var _get = function (_payload, _cb) {
    webix
      .ajax()
      .post($config.api_prefix + "?action=app.get", _payload)
      .then(function (_ret) {
        var _res = _ret.json();
        if (!_res.result && _res.error_code == 400) {
          location.hash =
            "#!/auth/login:redir=" + encodeURIComponent(location.hash);
        } else _cb(_res);
        //        _ret && _cb(_ret.json());
      });
  };
  var _delete = function (_payload, _cb) {
    webix
      .ajax()
      .post($config.api_prefix + "?action=app.delete", _payload)
      .then(function (_ret) {
        var _res = _ret.json();
        if (!_res.result && _res.error_code == 400) {
          location.hash =
            "#!/auth/login:redir=" + encodeURIComponent(location.hash);
        } else _cb(_res);
        //        _ret && _cb(_ret.json());
      });
  };
  var _list = function (_cb) {
    webix
      .ajax()
      .get($config.api_prefix + "?action=app.list")
      .then(function (_ret) {
        var _res = _ret.json();
        if (!_res.result && _res.error_code == 400) {
          location.hash =
            "#!/auth/login:redir=" + encodeURIComponent(location.hash);
        } else _cb(_res);
        //        _ret && _cb(_ret.json());
      });
  };
  return {
    create: _create,
    update: _update,
    list: _list,
    get: _get,
    delete: _delete,
  };
});
