const data = [
	{ id: "store", value: "Web Store", x: 50, y: 50, type: "myblock" },
	{
		id: "inventory",
		value: "Product Inventory",
		x: 270,
		y: 50,
		type: "myblock",
	},
	{ id: "product", value: "Product", x: 490, y: 50, type: "myblock" },
	{ id: "cart", value: "Shopping Cart", x: 490, y: 170, type: "myblock" },
	{ id: "order", value: "Order", x: 710, y: 170, type: "myblock" },
	{
		id: "history",
		value: "User Order History",
		x: 600,
		y: 290,
		type: "myblock",
	},
	{
		id: "confirmation",
		value: "Order Confirmation",
		x: 820,
		y: 290,
		type: "myblock",
	},
];

const links = [
	{ source: "store", target: "inventory", mode: "direct" },
	{ source: "inventory", target: "product", mode: "direct" },
	{ source: "product", target: "cart", mode: "direct" },
	{ source: "cart", target: "order" },
	{ source: "order", target: "history" },
	{ source: "order", target: "confirmation" },
];
