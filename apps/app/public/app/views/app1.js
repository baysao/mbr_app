define(["text!/api/app/v1?action=app.config", "online"], function (
  $_config,
  Online
) {
  var $config = $_config && JSON.parse($_config);
    var scope;

    webix.ui({
  view:"contextmenu",
  master:"areaA",  
  data:["Add","Rename","Delete",{ $template:"Separator" },"Info"],  
  on:{
    onItemClick:function(id){
      webix.message(this.getItem(id).value);
    }
  }
});

    
  var contextmenu = webix.ui({
    view: "contextmenu",
    id: "my_pop",
    data: [
      { value: "Translate...", submenu: ["English", "Slavic", "German"] },
      { value: "Info" },
    ],
  });

  var setName_popup = webix.ui({
    view: "popup",
    id: "setName_popup",
    height: 250,
    width: 300,
    body: {
      rows: [
        {
          id: "setNameValue",
          view: "text",
          label: "Name",
        },
        {
          view: "button",
          id: "signIn",
          label: "Done",
        },
      ],
    },
  });

  var sendJobMessage_popup = webix.ui({
    view: "popup",
    id: "sendJobMessage_popup",
    height: 250,
    width: 300,
    body: {
      rows: [
        {
          cols: [
            {
              id: "sendJobMessage_delay",
              view: "text",
              label: "Delay",
            },
            {
              id: "sendJobMessage_message",
              view: "text",
              label: "Message",
            },
          ],
        },
        {
          view: "button",
          id: "sendJobMessage_submit",
          label: "Done",
        },
      ],
    },
  });
  var sendMessage_popup = webix.ui({
    view: "popup",
    id: "sendMessage_popup",
    height: 250,
    width: 300,
    body: {
      rows: [
        {
          cols: [
            {
              id: "sendMessage_to",
              view: "text",
              label: "Delay",
            },
            {
              id: "sendMessage_message",
              view: "text",
              label: "Message",
            },
          ],
        },
        {
          view: "button",
          id: "sendMessage_submit",
          label: "Done",
        },
      ],
    },
  });
  var sendMessageAll_popup = webix.ui({
    view: "popup",
    id: "sendMessageAll_popup",
    height: 250,
    width: 300,
    body: {
      rows: [
        {
          cols: [
            {
              id: "sendMessageAll_message",
              view: "text",
              label: "Message",
            },
          ],
        },
        {
          view: "button",
          id: "sendMessageAll_submit",
          label: "Done",
        },
      ],
    },
  });
  var menu_data = [
    {
      id: "group",
      value: "Group",
      data: [{ id: "group.new", value: "New" }],
    },
  ];
  var _toolbar = {
    view: "toolbar",
    id: "toolbar",
    padding: 3,
    elements: [
      {
        view: "icon",
        icon: "mdi mdi-menu",
        click: function () {
          $$("main_sidebar").toggle();
        },
      },
      { view: "label", label: "MBR Apps" },
      {},
      { view: "icon", icon: "mdi mdi-comment", badge: 4 },
      {
        view: "icon",
        id: "testdi",
        icon: "mdi mdi-bell",
        badge: 10,
        popup: "my_pop",
      },
      {
        view: "button",
        label: "Add Counter",
        autowidth: true,
        id: "addCounter",
      },
      {
        view: "button",
        label: "SignIn",
        autowidth: true,
        //        id: "signIn",
        popup: "setName_popup",
      },
      {
        view: "button",
        label: "sendJobMessage",
        autowidth: true,
        popup: "sendJobMessage_popup",
      },
      {
        view: "button",
        label: "sendMessage",
        autowidth: true,
        popup: "sendMessage_popup",
      },
      {
        view: "button",
        label: "sendMessageAll",
        autowidth: true,
        popup: "sendMessageAll_popup",
      },
      {
        view: "button",
        label: "SignOut",
        autowidth: true,
        id: "signOut",
      },
    ],
  };
  var _layout = {
    rows: [
      _toolbar,
      {
        cols: [
          {
            view: "sidebar",
            id: "main_sidebar",
            scroll: "y",
            data: menu_data,
            on: {
              onAfterSelect: function (id) {
                scope.show("./" + id);
              },
            },
          },
          { $subview: true },
        ],
      },
    ],
  };

  return {
    $ui: _layout,
    $oninit: function (_view, _scope) {
      console.log($config);
      if (!$config || !$config.result) {
        return _scope.show("/auth/login");
      }
      scope = _scope;
      var online = new Online();
      online.init();
      $$("addCounter").attachEvent("onItemClick", function () {
        online.addCounter();
      });
      $$("sendJobMessage_submit").attachEvent("onItemClick", function () {
        var _delay = $$("sendJobMessage_delay").getValue();
        var _msg = $$("sendJobMessage_message").getValue();
        console.log({ _delay, _msg });
        online.sendJobMessage(_delay, _msg);
        $$("sendJobMessage_popup").hide();
      });
      $$("sendMessage_submit").attachEvent("onItemClick", function () {
        var _to = $$("sendMessage_to").getValue();
        var _msg = $$("sendMessage_message").getValue();
        console.log({ _to, _msg });
        online.sendMessage(_to, _msg);
        $$("sendMessage_popup").hide();
      });
      $$("sendMessageAll_submit").attachEvent("onItemClick", function () {
        var _msg = $$("sendMessageAll_message").getValue();
        console.log({ _msg });
        online.sendMessageToAll(_msg);
        $$("sendMessageAll_popup").hide();
      });
      $$("signIn").attachEvent("onItemClick", function () {
        var name = $$("setNameValue").getValue();
        console.log(name);
        online.signIn(name);
        $$("setName_popup").hide();
      });
      $$("signOut").attachEvent("onItemClick", function () {
        online.signOut();
      });
    },
  };
});
