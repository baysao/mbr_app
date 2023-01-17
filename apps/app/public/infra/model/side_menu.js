define([], function () {
  var _data = [
    {
      id: "infra",
      value: "Infrastructure",
      icon: "mdi mdi-lan",
      data: [
        {
          id: "infra/$create",
          value: "New Infrastructure",
          icon: "mdi mdi-plus",
        },
        {
          id: "infra/$list",
          value: "Infrastructures",
          icon: "mdi mdi-view-list",
        },
      ],
    },
    {
      id: "node",
      value: "Node",
      icon: "mdi mdi-crowd",
    },
    {
      id: "gateway",
      value: "Gateway",
      icon: "mdi mdi-source-branch",
    },
  ];
  return _data;
});
