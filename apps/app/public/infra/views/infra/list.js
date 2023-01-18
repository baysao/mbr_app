define(["model/infra"], function ($model_infra) {
  var scope;
  var _type = "infra";
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
  function _update_list() {
    $model_infra.list(function (_res) {
      console.log(_res);
      if (_res.result) {
        var _data = _res.data;
          $$(_type + "_table").parse(_data, "json", true);
      }
    });
  }
  var _app_table = {
    view: "datatable",
    minHeight: 100,
    id: _type + "_table",
    scroll: true,
    columns: [
      { id: "name", editor: "text", header: "Name", fillspace: 1 },

      {
        id: _type + "_action_detail",
        header: "&nbsp;",
        width: 150,
        template:
          "<span style='cursor:pointer;' class='webix_icon mdi mdi-page-next'></span> View Detail",
      },
      {
        id: _type + "_action_update",
        header: "&nbsp;",
        width: 150,
        template:
          "<span style='cursor:pointer;' class='webix_icon mdi mdi-pencil'></span> Update",
      },
      {
        id: _type + "_action_delete",
        header: "&nbsp;",
        width: 150,
        template:
          "<span style='cursor:pointer;' class='webix_icon mdi mdi-delete'></span> Delete",
      },
    ],
    pager: _type + "_paging",

    onClick: {
      "mdi-page-next": function (e, id, node) {
        location.hash = "#!/app/infra/$detail:id=" + id;
      },
      "mdi-pencil": function (e, id, node) {
        location.hash = "#!/app/infra/$update:id=" + id;
      },
      "mdi-delete": function (e, id, node) {
        var _item = this.getItem(id);
        console.log(_item);
        $model_infra.delete(_item, function (_res) {
          console.log(_res);
          if (_res.result) {
            _update_list();
          }
        });
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
        css: "title",
        template:
          "<div class='header'>All Infrastructure</div><div class='details'>( Overview all infrastructure )</div>",
      },
      _app_list,
    ],
  };
  return {
    $ui: _layout,
    $oninit: function (_view, _scope) {
      scope = _scope;
      _update_list();
    },
  };
});
