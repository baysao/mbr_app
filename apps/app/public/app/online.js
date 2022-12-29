define([], function () {
  var State = {
    IDLE: 0,
    SIGNIN: 1,
    CONNECTING: 2,
    CONNECTED: 3,
  };

  var f2num = function (n, l) {
    if (typeof l === "undefined") l = 2;
    while (n.length < l) {
      n = "0" + n;
    }
    return n;
  };

  var HTTP_ENTRY = "api/app/v1";
  var WEBSOCKET_ENTRY = "api/app/v1";

  var Online = function () {
    var self = this;

    self._state = State.IDLE;
    self._socket = null;

    // self._apphtml  = apphtml;
  };

  Online.prototype.init = function () {
    var self = this;
    var serverAddr = "massbitroute.com";
    self._httpServerAddr = "https://" + serverAddr + "/" + HTTP_ENTRY;
    self._websocketServerAddr = "wss://" + serverAddr + "/" + WEBSOCKET_ENTRY;

    self._state = State.SIGNIN;
  };

  Online.prototype.signIn = function (username) {
    var self = this;

    if (username === "") {
      self._showError("PLEASE ENTER username");
      return;
    }

    var values = { username: username };
    self._sendHttpRequest("user.signin", values, function (res) {
      console.log(res);
      if (!self._validateResult(res, ["sid", "count"])) {
        self._state = State.IDLE;
        self._showError("Get invalid result");
        self._appendLog(res.toString());
      } else {
        self._state = State.CONNECTING;
        self._sid = res["sid"];
        self._appendLog("GET SESSION ID: " + self._sid);

        var count = parseInt(res["count"]);
        self._appendLog("count = " + count.toString());
        //     self._counterValueInput.val(count);

        self._connectWebSocket(self._sid);
      }
    });
  };

  Online.prototype.signOut = function () {
    var self = this;

    // self._appendLogMark();
    self._appendLog("SIGN OUT");

    self._sendHttpRequest("user.signout", { sid: self._sid }, function (res) {
      if (self._socket) {
        // will call cleanup() and updateUI()
        self._socket.close();
      } else {
        self._cleanup();
        // self._updateUI();
      }
    });
  };

  Online.prototype.addCounter = function () {
    var self = this;

    self._sendHttpRequest("user.count", { sid: self._sid }, function (res) {
      if (!self._validateResult(res, ["count"])) return;

      var count = parseInt(res["count"]).toString();
      self._appendLog("count = " + count);
      //    self._counterValueInput.val(count);
    });
  };

  Online.prototype.sendJobMessage = function (delay, message) {
    var self = this;

    if (message === "") {
      self._showError("Please enter message.");
    }

    self._sendHttpRequest("user.addjob", {
      sid: self._sid,
      delay: delay,
      message: message,
    });
  };

  Online.prototype.sendMessage = function (recipient, message) {
    var self = this;

    if (recipient === "" || recipient === null) {
      self._showError("Please choose user from online users list.");
      return;
    }

    if (message === "") {
      self._showError("Please enter message.");
    }

    var data = {
      action: "chat.sendmessage",
      recipient: recipient,
      message: message,
    };
    self._sendWebSocketMessage(data);
  };

  Online.prototype.sendMessageToAll = function (message) {
    var self = this;

    if (message === "") {
      self._showError("Please enter message.");
    }

    var data = {
      action: "chat.sendmessagetoall",
      message: message,
    };
    self._sendWebSocketMessage(data);
  };

  Online.prototype._cleanup = function () {
    self._state = State.IDLE;
    self._socket = null;
    self._sid = null;
    self._httpServerAddr = null;
    self._websocketServerAddr = null;
  };

  Online.prototype._validateResult = function (res, fields) {
    var err = res["err"];
    if (typeof err !== "undefined") {
      return false;
    }

    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      var v = res[field];
      if (typeof v === "undefined") {
        return false;
      }
    }
    return true;
  };

  Online.prototype._sendHttpRequest = function (
    action,
    values,
    callback,
    fail
  ) {
    var self = this;

    var url = self._httpServerAddr + "?action=" + action;
    // self._appendLog("HTTP: " + url);

    webix.ajax().post(url, values, function (_text, _res) {
      var res = _res.json();
      if (res.err) {
        var err = "ERR: " + res.err;
        self._showError(err);
        self._appendLog(err);
      }
      if (callback) {
        callback(res);
      } else {
        if (res.ok) {
          self._appendLog("OK");
        } else {
          self._appendLog("ERR, " + res.err);
        }
      }
    });
  };

  Online.prototype._sendWebSocketMessage = function (data) {
    var self = this;

    var str = JSON.stringify(data);
    self._socket.send(str);
    self._appendLog("WEBSOCKET SEND: " + str);
  };

  Online.prototype._connectWebSocket = function (sid) {
    var self = this;

    var protocol = "gbc-auth-" + sid;
    self._appendLog("CONNECT WEBSOCKET with PROTOCOL: " + protocol);

    var socket = new WebSocket(self._websocketServerAddr, protocol);
    socket.onopen = function () {
      self._appendLog("WEBSOCKET CONNECTED");
      self._state = State.CONNECTED;
      //        self._updateUI();
    };

    socket.onerror = function (error) {
      if (!(error instanceof Event)) {
        self._appendLog("ERR: " + error.toString());
      }
    };

    socket.onmessage = function (event) {
      self._appendLog("WEBSOCKET RECV: " + event.data.toString());

      var msg = JSON.parse(event.data);
      console.log(msg);
      if (typeof msg == "object" && msg.name) {
        var handler = self._messageHandlers[msg.name];
        if (handler) {
          handler(self, msg);
        }
      } else {
        self._appendLog("INVALID MSG: " + event.data.toString());
      }
    };

    socket.onclose = function () {
      self._state = State.IDLE;
      self._appendLog("WEBSOCKET DISCONNECTED");
      self._cleanup();
      //        self._updateUI();
    };

    self._socket = socket;
  };

  Online.prototype._messageHandlers = {
    LIST_ALL_USERS: function (self, data) {
      var users = data["users"];
      if (!users) {
        return;
      }

      console.log(users);
    },

    ADD_USER: function (self, data) {
      var username = data.username;
      console.log("add user:" + username);
    },

    REMOVE_USER: function (self, data) {
      var username = data.username;
      console.log("remove user:" + username);
    },

    MESSAGE: function (self, data) {
      var username = data.sender;
      var message = data.body;
      console.log({ username, message });
    },
  };

  Online.prototype._showError = function (message) {
    console.log(message);
  };

  Online.prototype._appendLogMark = function () {
    var self = this;
  };

  Online.prototype._appendLog = function (message) {
    console.log(message);
  };

  Online.prototype._clearLogs = function () {};
  return Online;
});
