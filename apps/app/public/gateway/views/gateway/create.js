define([], function () {
  var scope;

  var _layout = {
    rows: [
      {
        height: 49,
        css: "title",
        template:
          "<div class='header'>Add Gateway</div><div class='details'>( Define your new gateway )</div>",
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
