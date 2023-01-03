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
				css: "px-2",
				cols: [
					{ gravity: 1 },
					{
						gravity: 2,
						rows: [
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
							{ gravity: 0.5 },
							{
								view: "template",
								template:
									"<h1 id='register-header'>Register</h1>",
								align: "center",
								height: 70,
								borderless: true,
							},
							{
								view: "button",
								id: "login",
								css: "no-bg webix_transparent",
								value: "Already have an account? Login",
								align: "center",
								borderless: true,
							},
							{ view: "text", id: "username", label: "Username" },
							{ view: "text", id: "email", label: "Email" },
							{
								view: "text",
								id: "password",
								type: "password",
								label: "Password",
							},
							{
								cols: [
									{
										view: "button",
										id: "register",
										value: "Signup",
										css: "webix_primary",
										align: "center",
									},
								],
							},
							{
								cols: [
									{
										view: "button",
										id: "with_google",
										value: "Google",
										css: "webix_transparent no-bg",
										gravity: 1,
										css: "center",
									},
									{ gravity: 0.2 },
									{
										view: "button",
										id: "with_github",
										value: "Github",
										css: "webix_transparent no-bg",
										align: "center",
										gravity: 1,
									},
								],
							},
							{ gravity: 1 },
						],
					},
					{ gravity: 1 },
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
			$$("with_google").attachEvent("onItemClick", function () {
				window.open("/sso/google/app?redirect_uri=/app");
			});
			$$("with_github").attachEvent("onItemClick", function () {
				window.open("/sso/github/app?redirect_uri=/app");
			});
			$$("login").attachEvent("onItemClick", function () {
				window.location.href =
					"https://dev.massbitroute.com/app/#!/auth/login";
			});
			$$("register").attachEvent("onItemClick", function () {
				var _username = $$("username").getValue();
				var _email = $$("email").getValue();
				var _password = $$("password").getValue();
				webix
					.ajax()
					.post("/api/app/v1?action=user.register", {
						username: _username,
						email: _email,
						password: _password,
					})
					.then(function (_res) {
						var _data = _res.json();
						console.log(_data);
						if (_data.result) {
							webix
								.ajax()
								.post("/api/app/v1?action=user.login", {
									email: _email,
									password: _password,
								})
								.then(function (_res1) {
									console.log(_res1.json());
									scope.show("/app");
								});
						}
					});
			});
		},
	};

});
