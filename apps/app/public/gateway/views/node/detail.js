define(["app", "model/node"], function ($app, $model_node) {
  var _app_stat = {
    //    width: 100,
    rows: [
      { view: "label", label: "Compute Units/s (last 5m)" },
      {
        cols: [
          { view: "label", label: "240.44" },
          {},
          {
            view: "button",
            type: "icon",
            icon: "mdi mdi-trending-up",
            label: "240.44",
          },
        ],
      },
    ],
  };
  var _app_overview_stat = {
    type: "space",
    margin: 10,
    padding: 10,
    rows: [
      {
        cols: [_app_stat, _app_stat, _app_stat, _app_stat],
      },
      {
        cols: [_app_stat, _app_stat, _app_stat, _app_stat],
      },
    ],
  };
  var _title = {
    height: 49,
    id: "title",
    css: "title",
    template:
      "<div class='header'>Node #name#</div><div class='details'>( All info about your node )</div>",
    data: {
      name: "Detail",
    },
  };
  var _layout = {
    rows: [
      {
        cols: [
          _title,
          {
            view: "button",
            id: "node_delete",
            label: "Delete",
            css: "webix_danger",
            autowidth: true,
          },
        ],
      },
      _app_overview_stat,
      //      {},
    ],
  };

  return {
    $ui: _layout,
    $oninit: function (_view, _scope) {
      scope = _scope;
      var _params = $app.params();
      console.log(_params);
      var _id = _params && _params["node.detail"] && _params["node.detail"].id;
      if (_id) {
        $$("node_delete").attachEvent("onItemClick", function () {
          $model_node.delete({ id: _id }, function (_res) {
            console.log(_res);
            if (_res && _res.result) {
            }
          });
        });
        $model_node.get({ id: _id }, function (_res) {
          console.log(_res);
          if (_res && _res.result) {
            var _data = _res.data;
            $$("title").parse(_data);
          }
        });
      }
    },
  };
});
