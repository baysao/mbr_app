define([], function () {
    var scope;
    var _type = "infra";

  var _layout = {
    rows: [
      {
        cols: [
          {
            height: 49,
            css: "title",
            template:
              "<div class='header'>Nodes</div><div class='details'>( Manage your node )</div>",
          },
          {
            view: "button",
            autowidth: true,
            css: "webix_primary",
            label: "Create Node",
            type: "icon",
            icon: "mdi mdi-plus",
            click: function () {
              location.hash = "#!/node/" + _type + "/$create";
            },
          },
        ],
      },
      { $subview: true },
    ],
  };
  return {
    $ui: _layout,
    $oninit: function (_view, _scope) {
      scope = _scope;
    },
  };
});
