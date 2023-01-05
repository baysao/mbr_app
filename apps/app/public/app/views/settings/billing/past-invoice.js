define(["model/settings-team"], function (model_teams) {
  var _paging = {
    view: "toolbar",
    css: "highlighted_header header6",
    paddingX: 5,
    paddingY: 5,
    height: 40,

    cols: [
      {
        view: "pager",
        id: "users_paging",
        template: "{common.pages()}",
        autosize: true,
        height: 35,
        group: 5,
      },
    ],
  };
  var _past_invoice = {
    view: "datatable",
    minHeight: 100,
    scroll: true,
    columns: [
      { id: "name", editor: "text", header: "Name", fillspace: 1 },
      { id: "email", editor: "text", header: "Email", fillspace: 1 },
      { id: "permission", editor: "text", header: "Permission", fillspace: 1 },
      { id: "last_login", editor: "text", header: "Last Login", fillspace: 1 },
      {
        id: "edit",
        header: "&nbsp;",
        width: 50,
        template:
          "<span  style=' cursor:pointer;' class='webix_icon mdi mdi-pencil'></span>",
      },
      {
        id: "delete",
        header: "&nbsp;",
        width: 50,
        template:
          "<span  style='cursor:pointer;' class='webix_icon mdi mdi-delete'></span>",
      },
    ],
    pager: "users_paging",
    select: true,
    //    autoheight: true,
    //    autowidth: true,
    data: model_teams,
    onClick: {
      "mdi-pencil": function (e, id, node) {
        console.log("edit:" + id);
      },
      "mdi-delete": function (e, id, node) {
        webix.confirm({
          text: "The product will be deleted. <br/> Are you sure?",
          ok: "Yes",
          cancel: "Cancel",
          callback: function (res) {
            // if (res) {
            //   var item = webix.$$("productsData").getItem(id);
            //   item.status = "0";
            //   item.statusName = "Deleted";
            //   webix.$$("productsData").refresh(id);
            // }
          },
        });
      },
    },
  };
  var _layout = {
    rows: [_past_invoice, _paging],
  };
  return {
    $ui: _layout,
  };
});
