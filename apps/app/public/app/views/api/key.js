define([app_view + "/api/key/sdk"], function (sdk_ui) {
  var _copy_handler = function (_id) {
    return function () {
      var _el = $$(_id);
      if (_el) {
        _el.getInputNode().select();
        document.execCommand("copy");
      }
    };
  };
  var _copy_button = function (_id) {
    return {
      view: "icon",
      type: "icon",
      icon: "mdi mdi-content-copy",
      align: "right",
      autowidth: true,
      click: _copy_handler(_id),
    };
  };

  var _sdk = sdk_ui;

  var _elements = [
    {
      cols: [
        {
          view: "text",
          id: "api_key",
          css: "sdk_code",
          label: "API key",
          on: {
            onFocus: _copy_handler("api_key"),
          },
          readonly: true,
          name: "api_key",
        },
        _copy_button("api_key"),
      ],
    },

    {
      cols: [
        {
          view: "text",
          label: "HTTP",
          css: "sdk_code",
          on: {
            onFocus: _copy_handler("http_url"),
          },
          readonly: true,
          id: "http_url",
        },
        _copy_button("http_url"),
      ],
    },
    {
      cols: [
        {
          view: "text",
          label: "Websocket",
          css: "sdk_code",
          on: {
            onFocus: _copy_handler("ws_url"),
          },
          readonly: true,
          id: "ws_url",
        },
        _copy_button("ws_url"),
      ],
    },
  ];
  var _form = {
    view: "form",
    id: "app_key_form",
    paddingY: 20,
    paddingX: 30,
    elementsConfig: { labelPosition: "top" },
    elements: _elements,
  };
  var _layout = {
    view: "window",
    modal: true,
    minWidth: 650,
    id: "app-key",
    position: "center",
    head: "Connect to Massbit App",
    close: true,
    body: {
      rows: [_form, _sdk],
    },
  };
  return {
    $ui: _layout,
  };
});
