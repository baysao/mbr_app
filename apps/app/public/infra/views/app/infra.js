define(["model/node"], function ($app) {
  var scope;

  var _layout = {
    rows: [
      {
        height: 49,
        id: "title",
        css: "title",
        template:
          "<div class='header'>Infrastructure</div><div class='details'>( Overview all infrastructure )</div>",
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
