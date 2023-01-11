define(["model/app", app_view + "/api/key"], function ($app, app_key_ui) {
  var scope;
  var _paging = {
    view: "toolbar",
    css: "highlighted_header header6",
    paddingX: 5,
    paddingY: 5,
    height: 40,

    cols: [
      {
        view: "pager",
        id: "app_paging",
        template: "{common.pages()}",
        autosize: true,
        height: 35,
        group: 5,
      },
    ],
  };

  var _app_table = {
    view: "datatable",
    minHeight: 100,
    id: "app_table",

    scroll: true,
    columns: [
      { id: "name", editor: "text", header: "App Name", fillspace: 1 },
      {
        id: "response_median",
        editor: "text",
        header: "Median Response(ms)",
        fillspace: 1,
      },
      {
        id: "request_24h",
        editor: "text",
        header: "Request(24h)",
        fillspace: 1,
      },
      {
        id: "throughtput_24h",
        editor: "text",
        header: "Throughtput(24h)",
        fillspace: 1,
      },

      {
        id: "action_detail",
        header: "&nbsp;",
        width: 150,
        template:
          "<span style='cursor:pointer;' class='webix_icon mdi mdi-page-next'></span> View Detail",
      },
      {
        id: "action_key",
        header: "&nbsp;",
        width: 150,
        template:
          "<span style='cursor:pointer;' class='webix_icon mdi mdi-key'></span> View Key",
      },
    ],
    pager: "app_paging",

    onClick: {
      "mdi-page-next": function (e, id, node) {
        location.hash = "#!/app/api.detail:id=" + id;
      },
      "mdi-key": function (e, id, node) {
        var _detail = this.getItem(id);
        console.log(_detail);

        scope.ui(app_key_ui.$ui).show();
        $$("app_key_form").setValues(_detail);
        $$("http_url").setValue(
          "https://" +
            _detail.blockchain +
            "-" +
            _detail.network +
            ".massbitroute.com/" +
            _detail.api_key
        );
        $$("ws_url").setValue(
          "wss://" +
            _detail.blockchain +
            "-" +
            _detail.network +
            ".massbitroute.com/" +
            _detail.api_key
        );
      },
    },
  };
  var _app_list = {
    rows: [_app_table, _paging],
  };
  var _layout = {
    rows: [
      {
        height: 49,
        id: "title",
        css: "title",
        template:
          "<div class='header'>Dashboard</div><div class='details'>( Overview all apps )</div>",
      },
      _app_list,
    ],
  };
  return {
    $ui: _layout,
    $oninit: function (_view, _scope) {
      scope = _scope;
      $app.list(function (_res) {
        console.log(_res);
        if (_res.result) {
          var _data = _res.data;
          $$("app_table").parse(
            _data.map(function (_it) {
              _it.response_median = 1;
              _it.request_24h = 1;
              _it.throughtput_24h = 1;
              return _it;
            })
          );
        }
      });
    },
  };
});
