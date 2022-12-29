define([], function () {
  var scope;
  var menu_data = [
    {
      id: "group",
      value: "Group",
      data: [{ id: "group.new", value: "New" }],
    },
  ];
  var _toolbar = {
    view: "toolbar",
    padding: 3,
    elements: [
      {
        view: "icon",
        icon: "mdi mdi-menu",
        click: function () {
          $$("main_sidebar").toggle();
        },
      },
      { view: "label", label: "MBR Apps" },
      {},
      { view: "icon", icon: "mdi mdi-comment", badge: 4 },
      { view: "icon", icon: "mdi mdi-bell", badge: 10 }
    ],
  };
  var _layout = {
    rows: [
      _toolbar,
      {
        cols: [
          {
            view: "sidebar",
            id: "main_sidebar",
            scroll: "y",
            data: menu_data,
            on: {
              onAfterSelect: function (id) {
                scope.show("./" + id);
              },
            },
          },
          { $subview: true },
        ],
      },
    ],
  };

  return {
    $ui: _layout,
    $oninit: function (_view, _scope) {
      scope = _scope;
    },
  };
});
