define([], function () {
  var _layout = {
    rows: [
      {
        height: 49,
        id: "title",
        css: "title",
        template:
          "<div class='header'>Cost Estimator</div><div class='details'>( Calculate your cost )</div>",
      },
      {
        cols: [
          {
            height: 150,
            rows: [
              { template: "Request per month", type: "section" },
              {
                view: "slider",
                label: "Request per month",
                value: "10",
                title: webix.template("Value #value#"),
                type: "alt",
                labelPosition: "top",
                on: {
                  onChange: function (_v) {
                    console.log(_v);
                    $$("estimator_value").setValue(_v);
                  },
                },
              },
            ],
          },
          {
            height: 150,
            rows: [
              { template: "Growth Tier", type: "section" },
              {
                cols: [
                  { view: "label", label: "$", autowidth: true },
                  {
                    view: "label",
                    id: "estimator_value",
                    autowidth: true,
                    label: "10",
                  },
                  {},
                ],
              },
              { view: "label", label: "Estimated Cost" },
            ],
          },
        ],
      },
      {},
    ],
  };
  return {
    $ui: _layout,
  };
});
