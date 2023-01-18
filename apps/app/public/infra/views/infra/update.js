define(["app", "model/infra"], function ($app, $model_infra) {
  var scope;
  var _type = "infra";
  var _elements = [
    { view: "text", label: "Name", name: "name" },
    { view: "textarea", name: "desc", label: "Desc", height: 100 },
    { view: "text", label: "Domain", name: "domain" },
    {
      view: "select",
      name: "type",
      label: "Type",
      value: "private",
      options: [
        { id: "private", value: "Private" },
        { id: "public", value: "Public" },
      ],
    },
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
        cols: [
          {
            view: "button",
            autowidth: true,
            css: "webix_primary",
            label: "Back",
            type: "icon",
            icon: "mdi mdi-arrow-left",
            click: function () {
              location.hash = "#!/app/infra/$list";
            },
          },
          {
            height: 49,
            id: _type + "_sub_title",
            css: "title",
            template:
              "<div class='header'>Update Infrastructure </div><div class='details'>( Update your infrastructure )</div>",
          },
        ],
      },

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

  return {
    $ui: _layout,
    $oninit: function (_view, _scope) {
      scope = _scope;
      var _params = $app.params();
      if (_params && _params["$update"] && _params["$update"].id) {
        $model_infra.get({ id: _params["$update"].id }, function (_res) {
          console.log(_res);
          if (_res && _res.result) {
            $$(_type + "_form").setValues(_res.data);
          }
        });
      }

      $$(_type + "_submit").attachEvent("onItemClick", function () {
        var _values = $$(_type + "_form").getValues();
        console.log(_values);
        $model_infra.update(_values, function (_res) {
          console.log(_res);
          if (_res && _res.result) {
            webix.message("Create successful!");
          }
        });
      });
    },
  };
});
