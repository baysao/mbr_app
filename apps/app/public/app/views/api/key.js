define([], function () {
  var _copy_handler = function () {
    $$("api_key").getInputNode().select();
    document.execCommand("copy");
  };
  var _elements = [
    {
      cols: [
        {
          view: "text",
          id: "api_key",
          label: "API key",
          on: {
            onFocus: _copy_handler,
          },
          name: "api_key",
        },
        {
          view: "button",
          label: "Copy",
          type: "icon",
          height: 10,
          icon: "mdi mdi-content-copy",
          align: "right",
          autowidth: true,

          click: _copy_handler,
        },
      ],
    },

    {
      cols: [
        {},
        {
          view: "button",
          css: "webix_danger",
          label: "Close",
          click: function () {
            $$("app-key").close();
          },
        },
      ],
    },
  ];
  var _form = {
    view: "form",
    id: "app_key_form",
    paddingY: 20,
    paddingX: 30,
    elementsConfig: { labelWidth: 140, labelPosition: "top" },
    elements: _elements,
  };
  var _layout = {
    view: "window",
    modal: true,
    width: 400,
    id: "app-key",
    position: "center",
    head: "Connect to Massbit App",
    body: _form,
  };
  return {
    $ui: _layout,
  };
});
