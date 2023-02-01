define(["app", "model/gateway"], function ($app, $model_gateway) {
  var scope;
  var _type = "gateway";
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
    id: _type + "_title",
    css: "title",
    template:
      "<div class='header'>Gateway #name#</div><div class='details'>( All info about your gateway )</div>",
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
            id: _type + "_delete",
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
      var _id =
        _params && _params[_type + ".detail"] && _params[_type + ".detail"].id;
      if (_id) {
        $$(_type + "_delete").attachEvent("onItemClick", function () {
          webix
            .confirm({
              title: "Delete node",
              text: "Are you sure delete gateway ?",
              type: "confirm-error",
            })
            .then(function (result) {
              $model_gateway.delete({ id: _id }, function (_res) {
                console.log(_res);
                if (_res && _res.result) {
                  location.hash = "#!/app/$home";
                }
              });
            })
            .fail(function () {
              webix.message("Cancel");
            });
        });
        $model_gateway.get({ id: _id }, function (_res) {
          console.log(_res);
          if (_res && _res.result) {
            var _data = _res.data;
            $$(_type + "_title").parse(_data);
          }
        });
      }
    },
  };
});
