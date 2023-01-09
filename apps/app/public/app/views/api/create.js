define(["model/app"], function ($model_app) {
    var scope;
  var _elements = [
    { view: "text", label: "Name", name: "name" },
      { view: "textarea", name: "desc", label: "Desc", height: 100 },
    {
      view: "select",
      value: "eth",
      name: "blockchain",
      label: "Blockchain",
      options: [
        { value: "Ethereum", id: "eth" },
        { value: "Polkadot", id: "dot" },
      ],
    },
    {
      view: "select",
      value: "mainnet",
      name: "network",
      label: "Network",
      options: [
        { value: "Mainnet", id: "mainnet" },
        { value: "Testnet", id: "testnet" },
      ],
    },
  ];

  var _form = {
      view: "form",
      id:"api_form",
    scroll: "y",
    elements: _elements,
    elementsConfig: {
      labelPosition: "top",
    },
  };

  var _layout = {
    rows: [
      {
        height: 49,
        id: "title",
        css: "title",
        template:
          "<div class='header'>Create App</div><div class='details'>( Define your new app )</div>",
      },
      _form,
      {
        cols: [
            { view: "button", autowidth: true,id: "api_submit", label: "Save", css: "webix_primary" },
	    {}
        ],
      },
    ],
  };

  return {
      $ui: _layout,
      $oninit: function(_view, _scope){
	  scope = _scope;
	  $$("api_submit").attachEvent("onItemClick", function(){
	      var _values = $$("api_form").getValues();
	      console.log(_values);
	      $model_app.create(_values, function(_res){
		  console.log(_res);
		  if(_res && _res.result) {
		      webix.message("Submit successful!")
		  }
	      })
	  })
      }
  };
});
