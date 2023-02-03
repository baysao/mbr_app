define(["app", "model/app", "model/infra"], function (
  $app,
  $model_app,
  $model_infra
) {
  var _type = "api";
  var scope;
  var _update_form = function () {
    var _values = $$(_type + "_form").getValues();
    console.log(_values);
    $model_app.update(_values, function (_res) {
      console.log(_res);
      if (_res && _res.result) {
        webix.message("Submit successful!");
      }
    });
  };
  var _elements = [
    {
      cols: [
        { view: "text", label: "ID", name: "id", readonly: true },
        {},
        {
          view: "toggle",
          onLabel: "Enable",
          id: _type + "_status",
          offLabel: "Disable",
          css: "webix_primary",
          width: 100,
          name: "status",
        },
      ],
    },
    { view: "text", label: "Name", name: "name" },
    { view: "text", label: "API key", name: "api_key" },
    { view: "textarea", name: "desc", label: "Desc", height: 100 },
    {
      view: "select",
      id: _type + "_infrastructure",
      label: "Infrastructure",
      name: "infra",
      options: [],
    },
    {
      view: "select",
      value: "eth",
      name: "blockchain",
      label: "Blockchain",
      options: [
        { value: "Ethereum", id: "eth" },
        { value: "Polkadot", id: "dot" },
      ],
    },
    {
      view: "select",
      value: "mainnet",
      name: "network",
      label: "Network",
      options: [
        { value: "Mainnet", id: "mainnet" },
        { value: "Testnet", id: "testnet" },
      ],
    },
  ];

  var _form = {
    view: "form",
    id: _type + "_form",
    scroll: "y",
    elements: _elements,
    elementsConfig: {
      labelPosition: "top",
    },
  };

  var _layout = {
    rows: [
      {
        height: 49,
        id: "title",
        css: "title",
        template:
          "<div class='header'>Update App</div><div class='details'>( Define your new app )</div>",
      },
      _form,
      {
        cols: [
          {
            view: "button",
            autowidth: true,
            id: _type + "_submit",
            label: "Save",
            css: "webix_primary",
          },
          {},
        ],
      },
    ],
  };

  return {
    $ui: _layout,
    $onurlchange: function (_params) {
      console.log(_params);
      $model_app.get(_params, function (_res) {
        console.log(_res);
        if (_res && _res.result) {
          var _data = _res.data;
          $$(_type + "_form").setValues(_data);
        }
      });
    },
    $oninit: function (_view, _scope) {
      scope = _scope;
      var _params = $app.params();
      console.log(_params);
      if (_params && _params["api.update"]) {
        $model_app.get(_params["api.update"], function (_res) {
          console.log(_res);
          if (_res && _res.result) {
            var _data = _res.data;
            $$(_type + "_form").setValues(_data);
          }
        });
      }
      $model_infra.public({}, function (_res) {
        console.log(_res);
        if (_res && _res.result) {
          var _options = _res.data.map(function (_it) {
            return { id: _it.id, value: _it.name };
          });
          console.log(_options);
          _options.unshift({ id: "not_defined", value: "Not defined" });
          var _ui = $$(_type + "_infrastructure");
          _ui.define("options", _options);
          _ui.refresh();
        }
      });
      $$(_type + "_submit").attachEvent("onItemClick", _update_form);
      $$(_type + "_status").attachEvent("onItemClick", _update_form);
    },
  };
});
