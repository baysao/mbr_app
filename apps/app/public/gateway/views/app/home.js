define(["model/gateway"], function ($model_gateway) {
  var _type = "gateway";
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
        id: _type + "_paging",
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
    id: _type + "_table",

    scroll: true,
    columns: [
      { id: "name", editor: "text", header: "Nodes", fillspace: 1 },
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
        id: "action_update",
        header: "&nbsp;",
        width: 150,
        template:
          "<span style='cursor:pointer;' class='webix_icon mdi mdi-pencil'></span> Update",
      },
      // {
      //   id: "action_key",
      //   header: "&nbsp;",
      //   width: 150,
      //   template:
      //     "<span style='cursor:pointer;' class='webix_icon mdi mdi-key'></span> View Key",
      // },
    ],
    pager: _type + "_paging",

    onClick: {
      "mdi-page-next": function (e, id, node) {
        location.hash = "#!/app/" + _type + ".detail:id=" + id;
      },
      "mdi-pencil": function (e, id, node) {
        location.hash = "#!/app/" + _type + ".update:id=" + id;
      },
      // "mdi-key": function (e, id, node) {
      //   var _detail = this.getItem(id);
      //   console.log(_detail);

      //   scope.ui(app_key_ui.$ui).show();
      //   $$("app_key_form").setValues(_detail);
      //   $$("http_url").setValue(
      //     "https://" +
      //       _detail.blockchain +
      //       "-" +
      //       _detail.network +
      //       ".massbitroute.com/" +
      //       _detail.api_key
      //   );
      //   $$("ws_url").setValue(
      //     "wss://" +
      //       _detail.blockchain +
      //       "-" +
      //       _detail.network +
      //       ".massbitroute.com/" +
      //       _detail.api_key
      //   );
      // },
    },
  };
  var _app_list = {
    rows: [_app_table, _paging],
  };
  var _layout = {
    rows: [
      {
        height: 49,
        css: "title",
        template:
          "<div class='header'>Home</div><div class='details'>( Overview all nodes )</div>",
      },
      _app_list,
    ],
  };
  return {
    $ui: _layout,
    $oninit: function (_view, _scope) {
      scope = _scope;
      $model_gateway.list(function (_res) {
        console.log(_res);
        if (_res.result) {
          var _data = _res.data;
          console.log(_data);
          $$(_type + "_table").parse(
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
