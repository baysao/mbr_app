define(["app"], function ($app) {
  return {
    $ui: {
      template: "Login OK",
    },
      $oninit: function (_view, _scope) {
	  console.log(_scope);
	  console.log($app);
    },
  };
});
