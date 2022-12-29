const tasks = [];
for (let i = 1; i <= 50; i++) {
	const today = new Date();
	const start_date = 1 + Math.round(i / 3);
	const end_date = start_date + 3 + Math.round(i / 10);

	tasks.push({
		id: i,
		start_date: new Date(
			today.getFullYear(),
			today.getMonth(),
			start_date,
			12,
			0
		),
		end_date: new Date(today.getFullYear(), today.getMonth(), end_date, 7, 0),
		text: "Task " + i,
		progress: Math.round((100 * i) / 50),
		parent: 0,
	});
}

tasks[3].parent = 3;
tasks[4].parent = 3;
tasks[5].parent = 3;
tasks[6].parent = 6;
tasks[7].parent = 6;
tasks[8].parent = 6;
tasks[9].parent = 9;
tasks[10].parent = 9;
tasks[11].parent = 9;

tasks[2].type = "project";
tasks[2].end_date = tasks[11].end_date;
tasks[4].type = "milestone";

const links = [
	{ id: 1, source: 3, target: 4, type: 0 },
	{ id: 2, source: 1, target: 2, type: 2 },
	{ id: 3, source: 5, target: 6, type: 3 },
	{ id: 4, source: 8, target: 6, type: 1 },
];

function quarterStart(date) {
	date = webix.Date.copy(date);
	date.setMonth(Math.floor(date.getMonth() / 3) * 3);
	date.setDate(1);
	return date;
}
const yearScale = { unit: "year", format: "%Y" };
const quarterScale = {
	unit: "quarter",
	format: function(start, end) {
		const parser = webix.Date.dateToStr("%M");
		const qstart = quarterStart(start);
		const qend = webix.Date.add(
			webix.Date.add(qstart, 3, "month", true),
			-1,
			"day",
			true
		);
		return parser(qstart) + " - " + parser(qend);
	},
};
const monthScale = { unit: "month", format: "%F %Y" };
const weekScale = {
	unit: "week",
	format: function(start) {
		const parser = webix.Date.dateToStr("%d %M");
		const wstart = webix.Date.weekStart(start);
		const wend = webix.Date.add(
			webix.Date.add(wstart, 1, "week", true),
			-1,
			"day",
			true
		);
		return parser(wstart) + " - " + parser(wend);
	},
};
const dayScale = { unit: "day", format: "%M %d" };
const hourScale = { unit: "hour", format: "%H:00" };

const cellWidths = {
	year: 400,
	quarter: 400,
	month: 400,
	week: 200,
	day: 200,
	hour: 50,
};

const scales = [monthScale, dayScale];

const simpleScales = [{ unit: "day", step: 1, format: "%d" }];

const complexScales = [
	yearScale,
	{ unit: "month", step: 2, format: "%m %Y" },
	{ unit: "day", step: 1, format: "%d" },
];

const data_color = [
	{
		id: "1",
		text: "Project A",
		start_date: "2022-06-10 00:00:00",
		duration: 5,
		progress: 24,
		parent: "0",
		opened: 1,
		type: "project",
		details: "Weekly meeting required\nRoom 508",
		position: 0,
	},
	{
		id: "1.1",
		text: "Design",
		start_date: "2022-06-10 00:00:00",
		duration: 1,
		progress: 85,
		parent: "1",
		position: 0,
	},
	{
		id: "1.2",
		text: "Approval",
		start_date: "2022-06-11 00:00:00",
		duration: 0,
		parent: "1",
		type: "milestone",
		position: 1,
	},
	{
		id: "1.3",
		text: "Coding",
		start_date: "2022-06-10 00:00:00",
		duration: 3,
		progress: 20,
		parent: "1",
		details: "Contact Rob for details",
		position: 2,
	},
	{
		id: "1.4",
		text: "Testing",
		start_date: "2022-06-13 00:00:00",
		duration: 1,
		progress: 0,
		parent: "1",
		details: "Desktop, mobile",
		position: 3,
	},
	{
		id: "1.5",
		text: "Fixing",
		start_date: "2022-06-14 00:00:00",
		duration: 1,
		progress: 0,
		parent: "1",
		position: 4,
	},
	{
		id: "1.6",
		text: "Deploy",
		start_date: "2022-06-15 00:00:00",
		duration: 0,
		parent: "1",
		type: "milestone",
		position: 5,
	},
	{
		id: "2",
		text: "Project B",
		start_date: "2022-06-10 00:00:00",
		duration: 3,
		progress: 0,
		parent: "0",
		type: "project",
		position: 1,
	},
	{
		id: "2.1",
		text: "Task 1",
		start_date: "2022-06-10 00:00:00",
		duration: 2,
		progress: 0,
		parent: "2",
		position: 0,
	},
	{
		id: "2.2",
		text: "Task 2",
		start_date: "2022-06-11 00:00:00",
		duration: 2,
		progress: 0,
		parent: "2",
		position: 1,
	},
];

const links_color = [
	{
		id: "1",
		source: "1",
		target: "2",
		type: 1,
	},
	{
		id: "2",
		source: "1.5",
		target: "1.6",
		type: 0,
	},
	{
		id: "3",
		source: "3.1",
		target: "3.2",
		type: 0,
	},
];

const tasks_baseline = [
	{
		id: "1",
		text: "Project A",
		start_date: "2022-06-10 00:00:00",
		duration: 5,
		progress: 24,
		parent: "0",
		opened: 1,
		type: "project",
		details: "Weekly meeting required\nRoom 508",
		position: 0,
		planned_start: "2022-06-10 00:00:00",
		planned_duration: 5,
	},
	{
		id: "1.1",
		text: "Design",
		start_date: "2022-06-10 00:00:00",
		duration: 1,
		progress: 85,
		parent: "1",
		position: 0,
		planned_start: "2022-06-10 00:00:00",
		planned_duration: 1,
	},
	{
		id: "1.2",
		text: "Approval",
		start_date: "2022-06-11 00:00:00",
		duration: 0,
		parent: "1",
		type: "milestone",
		position: 1,
	},
	{
		id: "1.3",
		text: "Coding",
		start_date: "2022-06-10 00:00:00",
		duration: 3,
		progress: 20,
		parent: "1",
		details: "Contact Rob for details",
		position: 2,
		planned_start: "2022-06-10 00:00:00",
		planned_duration: 3,
	},
	{
		id: "1.4",
		text: "Testing",
		start_date: "2022-06-13 00:00:00",
		duration: 1,
		progress: 0,
		parent: "1",
		details: "Desktop, mobile",
		position: 3,
		planned_start: "2022-06-13 00:00:00",
		planned_duration: 1,
	},
	{
		id: "1.5",
		text: "Fixing",
		start_date: "2022-06-14 00:00:00",
		duration: 1,
		progress: 0,
		parent: "1",
		position: 4,
		planned_start: "2022-06-14 00:00:00",
		planned_duration: 1,
	},
	{
		id: "1.6",
		text: "Deploy",
		start_date: "2022-06-15 00:00:00",
		duration: 0,
		parent: "1",
		type: "milestone",
		position: 5,
		planned_start: "2022-06-15 00:00:00",
		planned_duration: 0,
	},
	{
		id: "2",
		text: "Project B",
		start_date: "2022-06-10 00:00:00",
		duration: 3,
		progress: 0,
		parent: "0",
		type: "project",
		position: 1,
		planned_start: "2022-06-10 00:00:00",
		planned_duration: 3,
	},
	{
		id: "2.1",
		text: "Task 1",
		start_date: "2022-06-10 00:00:00",
		duration: 2,
		progress: 0,
		parent: "2",
		position: 0,
		planned_start: "2022-06-10 00:00:00",
		planned_duration: 2,
	},
	{
		id: "2.2",
		text: "Task 2",
		start_date: "2022-06-11 00:00:00",
		duration: 2,
		progress: 0,
		parent: "2",
		position: 1,
		planned_start: "2022-06-11 00:00:00",
		planned_duration: 2,
	},
];
const links_baseline = [
	{
		id: "1",
		source: "1",
		target: "2",
		type: 1,
	},
	{
		id: "2",
		source: "1.5",
		target: "1.6",
		type: 0,
	},
	{
		id: "3",
		source: "3.1",
		target: "3.2",
		type: 0,
	},
];
