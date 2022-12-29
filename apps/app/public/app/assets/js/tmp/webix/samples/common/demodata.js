var cities = [
	{id:1, value:"Berlin"}, {id:2, value:"Kiev"}, {id:3, value:"Minsk"},
	{id:4, value:"Moscow"}, {id:5, value:"Prague"}, {id:6, value:"Riga"},
	{id:7, value:"St.Petersburg"}, {id:8, value:"Tallin"}, {id:9, value:"Vilnius"},{id:10, value:"Warsaw"}
];

var hours = [];
for(var i=0; i< 24;i++){
	hours.push(i<10?("0"+i):""+i);
}

var minutes = [];
for(var i=0; i< 60;i += 15){
	minutes.push(i<10?("0"+i):""+i);
}

var offers = [
	{id:1, direction:"<span class='webix_strong'>Tallin</span> EE - <span class='webix_strong'>Berlin</span> Tegel DE", date:new Date(2014,7,25), price:"450", save:"45", places:21},
	{id:2, direction:"<span class='webix_strong'>Moscow</span> Vnukovo RU - <span class='webix_strong'>Kiev</span> Borispol UA", date: new Date(2014,7,28), price:"160", save:"65", places:5},
	{id:3, direction:"<span class='webix_strong'>Riga</span> International LV - <span class='webix_strong'>Warsaw</span> Modlin", date: new Date(2014,7,16), price:"220", save:"110", places:2},
	{id:4, direction:"<span class='webix_strong'>Vilnius</span> LT - <span class='webix_strong'>Kiev</span> Zhulhany UA", date: new Date(2014,8,1), price:"140", save:"40", places:35},
	{id:5, direction:"<span class='webix_strong'>Minsk</span> International 2 BY- <span class='webix_strong'>Berlin</span> Schoenefeld DE", date: new Date(2014,8,6), price:"378", save:"35", places:25},
	{id:6, direction:"<span class='webix_strong'>St. Petersburg</span> Pulkovo - <span class='webix_strong'>Tallin</span> Estonia", date: new Date(2014,7,31), price:"90", save:"82", places:11},
	{id:7, direction:"<span class='webix_strong'>Kiev</span> Zhulhany UA - <span class='webix_strong'>Moscow</span> Vnukovo RU", date: new Date(2014,8,15), price:"220", save:"30", places:41},
	{id:8, direction:"<span class='webix_strong'>Moscow</span> Sheremetyevo RU - <span class='webix_strong'>Vilnius</span> LT", date: new Date(2014,8,11), price:"321", save:"44", places:32},
	{id:9, direction:"<span class='webix_strong'>Warsaw</span> PL - <span class='webix_strong'>Minsk</span> International 2 BY", date: new Date(2014,8,5), price:"256", save:"32", places:55},
	{id:10, direction:"<span class='webix_strong'>Prague</span> CZ - <span class='webix_strong'>St. Petersburg</span> Pulkovo", date: new Date(2014,7,30), price:"311", save:"63", places:15},
	{id:11, direction:"<span class='webix_strong'>Tallin</span> EE - <span class='webix_strong'>Berlin</span> Tegel DE", date:new Date(2014,8,25), price:"450", save:"45", places:35},
	{id:12, direction:"<span class='webix_strong'>Moscow</span> Vnukovo RU - <span class='webix_strong'>Kiev</span> Borispol UA", date: new Date(2014,8,28), price:"160", save:"65", places:20},
	{id:13, direction:"<span class='webix_strong'>Riga</span> International LV - <span class='webix_strong'>Warsaw</span> Modlin", date: new Date(2014,8,16), price:"220", save:"110", places:22},
	{id:14, direction:"<span class='webix_strong'>Vilnius</span> LT - <span class='webix_strong'>Kiev</span> Zhulhany UA", date: new Date(2014,9,1), price:"140", save:"40", places:20},
	{id:15, direction:"<span class='webix_strong'>Minsk</span> International 2 BY- <span class='webix_strong'>Berlin</span> Schoenefeld DE", date: new Date(2014,9,6), price:"378", save:"35", places:11},
	{id:16, direction:"<span class='webix_strong'>St. Petersburg</span> Pulkovo - <span class='webix_strong'>Tallin</span> Estonia", date: new Date(2014,9,31), price:"90", save:"82", places:21},
	{id:17, direction:"<span class='webix_strong'>Kiev</span> Zhulhany UA - <span class='webix_strong'>Moscow</span> Vnukovo RU", date: new Date(2014,10,15), price:"220", save:"30", places:53},
	{id:18, direction:"<span class='webix_strong'>Moscow</span> Sheremetyevo RU - <span class='webix_strong'>Vilnius</span> LT", date: new Date(2014,11,11), price:"321", save:"44", places:42},
	{id:19, direction:"<span class='webix_strong'>Warsaw</span> PL - <span class='webix_strong'>Minsk</span> International 2 BY", date: new Date(2014,12,5), price:"256", save:"32", places:30},
	{id:20, direction:"<span class='webix_strong'>Prague</span> CZ - <span class='webix_strong'>St. Petersburg</span> Pulkovo", date: new Date(2014,12,14), price:"311", save:"63", places:2},
	{id:21, direction:"<span class='webix_strong'>Minsk</span> International 2 BY - <span class='webix_strong'>Berlin</span> Tegel DE", date: new Date(2014,12,20), price:"256", save:"32", places:10},
	{id:22, direction:"<span class='webix_strong'>Vilnius</span> LT - <span class='webix_strong'>Berlin</span> Tegel DE", date: new Date(2014,12,21), price:"311", save:"63", places:11}
];
var info = [
	{id:1, from:"Tallin", to: "Berlin", depart: "06:20", arrive: "08:35", status: "Landed"},
	{id:2, from:"Moscow", to: "Kiev", depart: "06:35", arrive: "07:40", status: "Landed"},
	{id:3, from:"Riga", to: "Warsaw", depart: "06:45", arrive: "08:05", status: "Landed"},
	{id:4, from:"Vilnius", to: "Zhulhany", depart: "06:50", arrive: "07:40", status: "Landed"},
	{id:5, from:"Prague", to: "St. Petersburg", depart: "07:20", arrive: "09:50", status: "On Time"},
	{id:6, from:"Moscow", to: "Prague", depart: "07:45", arrive: "10:05", status: "On Time"},
	{id:7, from:"Berlin", to: "Oslo", depart: "07:15", arrive: "09:45", status: "On Time"},
	{id:8, from:"Roma", to: "Stockholm", depart: "07:05", arrive: "10:25", status: "On Time"},
	{id:9, from:"Barcelona", to: "Kiev", depart: "07:10", arrive: "10:45", status: "On Time"},
	{id:10, from:"Milan", to: "Frankfurt", depart: "07:30", arrive: "09:15", status: "On Time"},
	{id:11, from:"Moscow", to: "Oslo", depart: "07:50", arrive: "10:50", status: "On Time"},
	{id:12, from:"Berlin", to: "Riga", depart: "08:05", arrive: "09:45", status: "On Time"},
	{id:13, from:"Roma", to: "Moscow", depart: "08:15", arrive: "11:25", status: "On Time"},
	{id:14, from:"Barcelona", to: "Vilnius", depart: "08:20", arrive: "11:45", status: "On Time"},
	{id:15, from:"Milan", to: "Warsaw", depart: "08:25", arrive: "10:15", status: "On Time"}
];