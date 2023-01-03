define([], function () {
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
								template: "<h1 id='register-header'>Login</h1>",
								align: "center",
								height: 70,
								borderless: true,
							},
							{
								view: "button",
								id: "register",
								css: "no-bg webix_transparent",
								value: "Don’t have an account? Sign Up",
								align: "center",
								borderless: true,
							},
							{ view: "text", id: "email", label: "Email" },
							{
								view: "text",
								id: "password",
								type: "password",
								label: "Password",
							},
							{
								cols: [
									{ gravity: 2 },
									{
										view: "button",
										id: "reset-password",
										value: "Forgot Password",
										css: "webix_transparent",
										align: "right",
										gravity: 1,
									},
								],
							},
							{
								cols: [
									{
										view: "button",
										id: "login",
										value: "Login",
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
	var panel = {
		view: "template",
		template: "<div id='login-bg'></div>",
		css: "login-bg",
		id: "panel",
	};
	webix.ui({
		master: "panel",
		view: "template",
		css: "popup",
		id: "my-popup",

		template: `<h5>Questions or Feedbacks?</h5>
	         <div>
	             If you have any questions about the test, look it up in our
	             guide.
	         </div>
	         <a
	             href="https://docs.massbit.io/about/massbit-intro"
	             target="_blank"
	         >
	             See guide to test
	         </a>
	         <div id="or">
	             Or
	         </div>
	         <h6>
	             Any feedback? Feel free to reach out to us
	         </h6>`,
	});

	webix.ui({
		master: "panel",
		view: "button",
		css: "popup-button",
		id: "popup-button",
		value: "Popup",
		// template:
		// 	"<button id='popup-button'><img src='assets/images/icons/LoginPopupIcon.png' alt='popup button'></img></button>",
		width: 80,
		height: 80,
	});

	var _layout = {
		cols: [_form, panel],
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
			$$("register").attachEvent("onItemClick", function () {
				window.location.href =
					"https://dev.massbitroute.com/app/#!/auth/register";
			});
			$$("reset-password").attachEvent("onItemClick", function () {
				window.location.href =
					"https://dev.massbitroute.com/app/#!/auth/reset-password";
			});
			$$("login").attachEvent("onItemClick", function () {
				var _email = $$("email").getValue();
				var _password = $$("password").getValue();
				webix
					.ajax()
					.post("/api/app/v1?action=user.register", {
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
								});
						}
					});
			});
			$$("popup-button").attachEvent("onItemClick", function () {
				console.log("clicked");
				let item = document.getElementById("my-popup");
				item.style.display = "none";
			});
		},
	};
});
