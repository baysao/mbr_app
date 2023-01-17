const myApps = [
	{
		name: "spreadsheet",
		icon: "../common/imgs/spreadsheet.png",
		pin: ["bar", "desktop"],
		launch: sParams => {
			const skin = webix.skin.$name;
			webix.require(
				"//cdn.webix.com/pro/edge/spreadsheet/skins/" + skin + ".css"
			);
			return webix
				.require("//cdn.webix.com/site/spreadsheet/spreadsheet.js")
				.then(() => launchers.spreadsheet(sParams));
		},
	},
	{
		name: "filemanager",
		icon: "../common/imgs/filemanager.png",
		launch: () => {
			const skin = webix.skin.$name;
			webix.require(
				"//cdn.webix.com/pro/edge/filemanager/skins/" + skin + ".css"
			);
			return webix
				.require("//cdn.webix.com/site/filemanager/filemanager.js")
				.then(launchers.filemanager);
		},
		pin: ["bar", "desktop"],
	},
	{
		name: "pivot",
		icon: "../common/imgs/pivot.png",
		pin: ["desktop"],
		launch: () => {
			const skin = webix.skin.$name;
			webix.require("//cdn.webix.com/pro/edge/pivot/skins/" + skin + ".css");
			return webix
				.require("//cdn.webix.com/site/pivot/pivot.js")
				.then(launchers.pivot);
		},
	},
	{
		name: "kanban",
		icon: "../common/imgs/kanban.png",
		pin: ["desktop"],
		launch: sParams => {
			const skin = webix.skin.$name;
			webix.require("//cdn.webix.com/pro/edge/kanban/skins/" + skin + ".css");
			return webix
				.require("//cdn.webix.com/site/kanban/kanban.js")
				.then(launchers.kanban);
		},
	},
	{
		name: "Webix App",
		launch: () => ({ init: () => ({ template: "My app" }) }),
	},
];
const myAppsExt = [
	{
		name: "spreadsheet",
		icon: "../common/imgs/spreadsheet.png",
		pin: ["bar", "desktop"],
		launch: sParams => {
			webix.require("//cdn.webix.com/site/spreadsheet/spreadsheet.css");
			return webix
				.require("//cdn.webix.com/site/spreadsheet/spreadsheet.js")
				.then(() => launchers.spreadsheet(sParams));
		},
	},
	{
		name: "filemanager",
		icon: "../common/imgs/filemanager.png",
		launch: () => {
			webix.require("//cdn.webix.com/site/filemanager/filemanager.css");
			return webix
				.require("//cdn.webix.com/site/filemanager/filemanager.js")
				.then(launchers.filemanager);
		},
		tooltip: function(options) {
			return `My files${options.$view.getState().path}`;
		},
		showNew: true,
		pin: ["bar", "desktop"],
	},
	{
		name: "pivot",
		icon: "../common/imgs/pivot.png",
		pin: ["desktop"],
		launch: () => {
			webix.require("//cdn.webix.com/site/pivot/pivot.css");
			return webix
				.require("//cdn.webix.com/site/pivot/pivot.js")
				.then(launchers.pivot);
		},
	},
	{
		name: "kanban",
		icon: "../common/imgs/kanban.png",
		pin: ["desktop"],
		launch: () => {
			webix.require("//cdn.webix.com/site/kanban/kanban.css");
			return webix
				.require("//cdn.webix.com/site/kanban/kanban.js")
				.then(launchers.kanban);
		},
	},
	{
		name: "TinyMCE",
		icon: "../common/imgs/app.png",
		pin: "desktop",
		launch: () => {
			return webix
				.require([
					"https://cdn.tiny.cloud/1/no-api-key/tinymce/4.9.6-54/tinymce.min.js",
				])
				.then(launchers.tinymce);
		},
	},
];

const launchers = {
	pivot: () => ({
		init: () =>
			new pivot.App({
				structure: {
					rows: ["form", "name"],
					columns: ["year"],
					values: [{ name: "oil", operation: ["min", "sum"] }],
				},
				url: "https://cdn.webix.com/demodata/pivot.json",
			}),
	}),
	filemanager: () => ({
		init: () =>
			new fileManager.App({
				url: "https://docs.webix.com/filemanager-backend/",
			}),
	}),
	kanban: () => ({
		init: () => ({
			view: "kanban",
			cols: [
				{ header: "Backlog", body: { view: "kanbanlist", status: "new" } },
				{
					header: "In Progress",
					body: { view: "kanbanlist", status: "work" },
				},
				{ header: "Testing", body: { view: "kanbanlist", status: "test" } },
				{ header: "Done", body: { view: "kanbanlist", status: "done" } },
			],
			editor: true,
			tags: [
				{ id: 1, value: "webix" },
				{ id: 2, value: "jet" },
				{ id: 3, value: "easy" },
			],
			data: [
				{ id: 1, status: "new", text: "Test service", tags: [1, 2, 3] },
				{ id: 2, status: "work", text: "Performance tests", tags: [1] },
			],
			on: {
				// disable dragging from other apps
				onListBeforeDragIn: context => {
					return !!(context.from && context.from.$kanban);
				},
			},
		}),
	}),
	spreadsheet: () => ({
		init: () => ({
			id: "ssheet",
			view: "spreadsheet",
			url: "../common/spreadsheet.json",
		}),
	}),
	tinymce: () => ({
		init: (container, appDataObj) => {
			container.innerHTML =
				"<textarea id='my_editor' style='width:100%; height:100%'></textarea>";
			tinymce.init({
				theme: "modern",
				statusbar: false,
				selector: "#my_editor",
				resize: false,
				mode: "exact",
				setup: editor => {
					editor.on("init", () => {
						const bars = container.querySelectorAll(
							".mce-toolbar, .mce-statusbar, .mce-menubar"
						);
						let height = 5;
						for (let i = 0; i < bars.length; i++) {
							height += bars[i].clientHeight;
						}
						editor.theme.resizeTo(
							container.offsetWidth,
							container.offsetHeight,
							-height
						);
						appDataObj.myEditor = editor;
						appDataObj.toolbarHeight = height;
					});
				},
			});
		},
		destroy: appDataObj => {
			appDataObj.myEditor.remove();
			appDataObj.myEditor = null;
		},
		on: (action, params, appDataObj) => {
			if (action == "resize") {
				appDataObj.myEditor.theme.resizeTo(
					params.width,
					params.height - appDataObj.toolbarHeight
				);
			}
		},
	}),
};
