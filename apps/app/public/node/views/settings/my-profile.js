define([], function () {
  var _elements = [
    {
      view: "fieldset",
      label: "General",
      body: {
        rows: [
          {
            cols: [
              { view: "text", label: "First Name" },
              { view: "text", label: "Last Name" },
            ],
          },
          { view: "text", label: "Email" },
        ],
      },
    },
    {
      view: "fieldset",
      label: "Password",
      body: {
        rows: [
          { view: "text", type: "password", label: "Old Password" },
          {
            cols: [
              { view: "text", type: "password", label: "New Password" },
              { view: "text", type: "password", label: "Confirm New Password" },
            ],
          },
        ],
      },
    },
    {},
    {
      cols: [
        {
          view: "button",
          label: "Save",
          css: "webix_primary",
          autowidth: true,
        },
        {},
      ],
    },
  ];

  var _form = {
    view: "form",
    scroll: "y",
    elements: _elements,
    elementsConfig: {
      labelPosition: "top",
    },
  };
  var _layout = {
    rows: [
      {
        height: 49,
        id: "title",
        css: "title",
        template:
          "<div class='header'>My Profile</div><div class='details'>( Manage your profile )</div>",
      },
      _form,
    ],
  };

  return {
    $ui: _layout,
  };
});
