define([], function () {
  var _copy_handler = function (_id) {
    return function () {
      var _el = $$(_id);

      if (_el) {
        if (_el.getInputNode) {
          _el.getInputNode().select();
          document.execCommand("copy");
        }
        if (_el.getEditor) {
          var _v = _el.getValue();
          navigator.clipboard.writeText(_v);
        }
      }
    };
  };
  var _copy_button = function (_id) {
    return {
      view: "icon",
      type: "icon",
      icon: "mdi mdi-content-copy",
      align: "right",
      autowidth: true,
      click: _copy_handler(_id),
    };
  };
  var _layout = {
    header: "CLI",
    body: {
      view: "form",
      scroll: "y",
      minHeight: 400,
      elementsConfig: {
        labelPosition: "top",
      },
      elements: [
        {
          cols: [
            { view: "label", label: "GET THE LATEST BLOCK" },
            //            {},
            _copy_button("sdk_cli_1"),
          ],
        },
        {
          view: "text",
          id: "sdk_cli_1",
          css: "sdk_code",
          readonly: true,
          on: {
            onFocus: _copy_handler("sdk_cli_1"),
          },
          value: `curl https://eth-mainnet.g.massbitroute.com/v2/M1A6cLGaHi8We6xMk88hqPRoki6LKcYY -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":0}'`,
        },
        {
          cols: [
            {
              view: "label",
              label: "GET ALL OUTBOUND TRANSFERS FOR A PROVIDED ADDRESS",
            },
            //            {},
            _copy_button("sdk_cli_2"),
          ],
        },
        {
          view: "text",
          id: "sdk_cli_2",
          css: "sdk_code",
          readonly: true,
          on: {
            onFocus: _copy_handler("sdk_cli_2"),
          },
          value: `curl https://eth-mainnet.g.massbitroute.com/v2/M1A6cLGaHi8We6xMk88hqPRoki6LKcYY -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"massbitroute_getTokenBalances","params": ["0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be", ["0x607f4c5bb672230e8672085532f7e901544a7375", "0x618e75ac90b12c6049ba3b27f5d5f8651b0037f6", "0x63b992e6246d88f07fc35a056d2c365e6d441a3d", "0x6467882316dc6e206feef05fba6deaa69277f155", "0x647f274b3a7248d6cf51b35f08e7e7fd6edfb271"]],"id":"42"}'`,
        },
        {
          cols: [
            { view: "label", label: "GET ALL THE NFTS OWNED BY AN ADDRESS" },
            //            {},
            _copy_button("sdk_cli_3"),
          ],
        },
        {
          view: "text",
          css: "sdk_code",
          //              label: "Run code",
          id: "sdk_cli_3",
          readonly: true,
          on: {
            onFocus: _copy_handler("sdk_cli_3"),
          },
          value: `curl 'https://eth-mainnet.g.massbitroute.com/v2/M1A6cLGaHi8We6xMk88hqPRoki6LKcYY/getNFTs/?owner=vitalik.eth'`,
        },
        {
          cols: [
            {
              view: "button",
              autowidth: true,
              label: "Learn More",
              css: "webix_primary",
              click: function () {
                window.open("https://docs.ethers.org/v5/");
              },
            },
            {},
          ],
        },
      ],
    },
  };

  return {
    $ui: _layout,
  };
});
