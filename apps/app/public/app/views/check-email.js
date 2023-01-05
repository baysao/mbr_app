define([], function () {
	var scope;
	var _form = {
		view: "form",
		responsive: true,
		borderless: true,
		elementsConfig: {
			labelPosition: "top",
		},
		elements: [
			{
				cols: [
					{
						cols: [
							{
								view: "template",
								template:
									'<img id="icon" src="assets/images/logo/logo.png" alt="MBR logo"></img>',
								css: "icon",
								gravity: 1,
							},
							{
								view: "label",
								label: "MassbitRoute",
								css: "no-border",
								gravity: 3,
							},
						],
						gravity: 1,
					},

					{
						view: "label",
						label: "Docs",
						css: "no-border",
						align: "right",
						gravity: 2,
					},
				],
			},
			{
				view: "template",
				template:
					'<img id="lock-icon" src="assets/images/icons/EmailIcon.svg" alt="Email icon"></img>',
				css: "icon",
				gravity: 1,
			},
			{
				view: "template",
				template:
					"<h1 id='register-header'>Please check your email!</h1>",
				align: "center",
				height: 80,
				borderless: true,
			},
			{
				view: "template",
				template:
					"<p id='reset-hint'>A verification link has been sent to your email account.<br>Please click on the link to verify your account.</p>",
				align: "center",
				borderless: true,
				height: 80,
			},
			{
				cols: [
					{
						view: "button",
						id: "back-to-login",
						value: "Back to Login",
						align: "center",
					},
				],
			},
		],
	};
	var _layout = {
		cols: [{}, _form, {}],
	};

	return {
		$ui: _layout,
		$oninit: function (_view, _scope) {
			scope = _scope;
			$$("back-to-login").attachEvent("onItemClick", function () {
				window.location.href =
					"https://dev.massbitroute.com/app/#!/auth/login";
			});
		},
	};
});
