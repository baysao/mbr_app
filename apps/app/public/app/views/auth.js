define([], function () {
	var scope;
	var _layout = {
		rows: [
			{
				cols: [{ $subview: true }],
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
