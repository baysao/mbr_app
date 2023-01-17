define([], function () {
  var scope;

  var _layout = {
    rows: [
      {
        height: 49,
        css: "title",
        template:
          "<div class='header'>Add Node</div><div class='details'>( Define your new node )</div>",
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
