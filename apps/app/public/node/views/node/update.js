define([
  "app",
  "model/node",
  "model/infra",
  "text!model/geo/continents.json",
], function ($app, $model_node, $model_infra, _continents) {
  var scope;
  var _type = "node";
  var _update_form = function () {
    var _values = $$(_type + "_form").getValues();
    console.log(_values);
    $model_node.update(_values, function (_res) {
      console.log(_res);
      if (_res && _res.result) {
        webix.message("Submit successful!");
      }
    });
  };
  var continents = JSON.parse(_continents);
  var _node_quota = {
    view: "fieldset",
    label: "Node Connection",
    body: {
      rows: [
        {
          view: "text",
          label: "Demand CU ",
          readonly: true,
          value: "100.000.000",
        },
        {
          view: "text",
          label: "Estimate your CU per month",
          name: "quota",
        },
      ],
    },
  };
  var _node_source = {
    view: "fieldset",
    label: "Node Connection",
    body: {
      rows: [
        {
          view: "text",
          label: "Address (IP or Domain)",
          name: "source_address",
        },
        { view: "text", label: "Path", name: "source_path" },
        {
          view: "checkbox",
          name: "source_ssl",
          label: "SSL Secure Connection",
        },
        {
          view: "checkbox",
          name: "source_websocket",
          label: "Websocket support",
        },
      ],
    },
  };
  var _geo_location = {
    view: "fieldset",
    label: "GEO location",
    body: {
      rows: [
        {
          view: "select",
          name: "continent",
          id: "geo_continent",
          label: "Continent",
          options: [],
        },
        {
          view: "select",
          id: "geo_country",
          name: "country",
          label: "Country",
          options: [],
        },
      ],
    },
  };
  var _host_info = {
    view: "fieldset",
    label: "Host Information",
    body: {
      rows: [
        { view: "text", label: "IP Address", name: "ip" },
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
            { value: "Devnet", id: "devnet" },
          ],
        },
      ],
    },
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
    {
      view: "select",
      id: "infrastructure",
      label: "Infrastructure",
      name: "infra",
      options: [],
    },
    { view: "text", label: "Name", name: "name" },
    { view: "textarea", name: "desc", label: "Desc", height: 100 },
    _host_info,
    _geo_location,
    _node_source,
    _node_quota,
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
        id: "sub_title",
        css: "title",
        template:
          "<div class='header'>Update Node </div><div class='details'>( Update detail of your node )</div>",
      },

      // {
      //   cols: [
      //     {
      //       view: "button",
      //       autowidth: true,
      //       css: "webix_primary",
      //       label: "Back",
      //       type: "icon",
      //       icon: "mdi mdi-arrow-left",
      //       click: function () {
      //         var _params = $app.params();
      //         //              console.log(_params);
      //         if (
      //           _params &&
      //           _params["$new"] &&
      //           _params["$new"].z &&
      //           _params["$new"].c
      //         ) {
      //           scope.show(
      //             "/$zone:z=" + _params["$new"].z + ":c=" + _params["$new"].c
      //           );
      //         }
      //       },
      //     },
      //     {
      //       height: 49,
      //       id: "sub_title",
      //       css: "title",
      //       template:
      //         "<div class='header'>Update Node </div><div class='details'>( Update detail of your node )</div>",
      //     },
      //   ],
      // },

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

  function _infrastructure_update() {
    var _ui = $$("infrastructure");
    _ui.define("options", _options);
    _ui.refresh();
  }
  return {
    $ui: _layout,
    $onurlchange: function (_params) {
      console.log(_params);
      $model_node.get(_params, function (_res) {
        console.log(_res);
        if (_res && _res.result) {
          var _data = _res.data;
          $$(_type + "_form").setValues(_data);
        }
      });
    },
    $oninit: function (_view, _scope) {
      scope = _scope;
      var id;
      var _params = $app.params();
      console.log(_params);
      // if (_params && _params["node.update"] && _params["node.update"].id) {
      //     id = _params["node.update"].id;
      // 	  console.log("id:" + id);
      // }

      var _options = [{ id: "not_defined", value: "Not defined" }];
      $model_infra.public({}, function (_res) {
        console.log(_res);
        var _data = _res.data;
        if (_res && _res.result && _data && _data.length > 0) {
          _data.map(function (_it) {
            _options.push({ id: _it.id, value: _it.name + " (Public)" });
          });
        }

        console.log(_options);
        $model_infra.list({}, function (_res1) {
          console.log(_res1);
          var _data1 = _res1.data;
          if (_res && _res.result && _data1 && _data1.length > 0) {
            _data1.map(function (_it) {
              if (_it.type == "private")
                _options.push({ id: _it.id, value: _it.name + " (Private)" });
            });
          }
          console.log(_options);
          var _ui = $$("infrastructure");
          _ui.define("options", _options);
          _ui.refresh();
        });
      });

      $$("geo_continent").define("options", continents);
      $$("geo_continent").refresh();

      $$("geo_continent").attachEvent("onChange", function (_cont) {
        console.log(_cont);
        webix
          .ajax()
          .get("/node/model/geo/continents/" + _cont + ".json")
          .then(function (_res) {
            var _countries = _res.json();
            // console.log(_countries);
            $$("geo_country").define("options", _countries);
            $$("geo_country").refresh();
            if (_params && _params["$new"]) {
              var _param = _params["$new"];
              console.log(_param);
              if (_param.c) {
                $$("geo_country").setValue(_param.c);
              }
            }
          });
      });
      if (_params && _params["$new"]) {
        var _param = _params["$new"];
        if (_params["$new"].z) {
          $$("geo_continent").setValue(_param.z);
        }
      }
      $$(_type + "_submit").attachEvent("onItemClick", _update_form);
      $$(_type + "_status").attachEvent("onItemClick", _update_form);
    },
  };
});
