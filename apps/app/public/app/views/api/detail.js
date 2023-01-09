define(["app", "model/app"], function ($app, $model_app) {
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
      "<div class='header'>App #name#</div><div class='details'>( All info about your app )</div>",
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
            id: "app_delete",
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
      var _id = _params && _params["api.detail"] && _params["api.detail"].id;
      if (_id) {
        $$("app_delete").attachEvent("onItemClick", function () {
          $model_app.delete({ id: _id }, function (_res) {
            console.log(_res);
            if (_res && _res.result) {
            }
          });
        });
        $model_app.get({ id: _id }, function (_res) {
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
