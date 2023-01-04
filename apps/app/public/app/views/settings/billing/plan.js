define(["model/settings-team"], function (model_teams) {
  var _plan = {
//      css: "plan",
    rows: [
      {
        cols: [{}, { view: "label", label: "Active", align: "right" }],
      },
      { view: "label", label: "Plan A", align: "center" },
      { view: "label", label: "$0 / month", align: "center" },
      {
        view: "button",
        label: "Choose plan",
        active: true,
        align: "center",
      },
      {
          rows: [
          {
            cols: [
              { view: "icon", icon: "mdi mdi-check" },
              { view: "label", label: "Desc1" },
              { view: "label", label: "10000", align: "right" },
            ],
          },
          {
            cols: [
              { view: "icon", icon: "mdi mdi-check" },
              { view: "label", label: "Desc1" },
              { view: "label", label: "10000", align: "right" },
            ],
          },
          {
            cols: [
              { view: "icon", icon: "mdi mdi-check" },
              { view: "label", label: "Desc1" },
              { view: "label", label: "10000", align: "right" },
            ],
          },
        ],
      },
    ],
  };

  var _layout = {
    cols: [_plan, _plan, _plan],
  };
  return {
    $ui: _layout,
  };
});
