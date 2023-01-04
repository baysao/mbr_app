define([
  app_view + "/settings/billing/past-invoice",
  app_view + "/settings/billing/plan",
], function (past_invoice, plan) {
  var _layout = {
    rows: [
      {
        height: 49,
        id: "title",
        css: "title",
        template:
          "<div class='header'>Billing</div><div class='details'>( Manage your plan )</div>",
      },
      {
        view: "fieldset",
        label: "Plan & Pricing",
        body: plan,
      },
      {
        cols: [
          {
            view: "fieldset",
            label: "Payment Method",
            height: 130,
            body: {
              rows: [
                {
                  cols: [
                    {},
                    {
                      view: "button",
                      css: "webix_primary",
                      autowidth: true,
                      label: "Change Payment",
                      align: "right",
                    },
                  ],
                },
                {
                  cols: [
                    { view: "label", label: "Card information", align: "left" },
                    { view: "label", label: "Mastercard xxxx", align: "right" },
                  ],
                },
              ],
            },
          },
          {
            view: "fieldset",
            label: "Billing Detail",
            height: 130,
            body: {
              rows: [
                {
                  cols: [
                    {},
                    {
                      view: "button",
                      css: "webix_primary",
                      autowidth: true,
                      label: "Cancel Plan",
                      align: "right",
                    },
                  ],
                },
                {
                  cols: [
                    { view: "label", label: "Next invoice", align: "left" },
                    { view: "label", label: "Jun 13, 2022", align: "right" },
                  ],
                },
                {
                  cols: [
                    { view: "label", label: "Invoice total", align: "left" },
                    { view: "label", label: "$100", align: "right" },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        view: "fieldset",
        label: "Past Invoice",
        body: past_invoice,
      },
    ],
  };
  return {
    $ui: _layout,
  };
});
