define([app_view + "/webix/monaco"], function () {
  var _sdk_js_code_text = `
// Setup
import { Network, Massbitroute } from 'massbitroute-sdk';

const settings = {
    apiKey: "M1A6cLGaHi8We6xMk88hqPRoki6LKcYY",
    network: Network.ETH_MAINNET,
};

const massbitroute = new Massbitroute(settings);

// Get the latest block
const latestBlock = massbitroute.core.getBlockNumber();

// Get all outbound transfers for a provided address
massbitroute.core
    .getTokenBalances('0x994b342dd87fc825f66e51ffa3ef71ad818b6893')
    .then(console.log);

// Get all the NFTs owned by an address
const nfts = massbitroute.nft.getNftsForOwner("0xshah.eth");

// Listen to all new pending transactions
massbitroute.ws.on(
    { method: "massbitroute_pendingTransactions",
    fromAddress: "0xshah.eth" },
    (res) => console.log(res)
);
`;

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
    header: "Javascript",
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
            { view: "label", label: "Installation" },
            {},
            _copy_button("sdk_js_installation"),
          ],
        },
        {
          view: "text",
          id: "sdk_js_installation",
          css: "sdk_code",
          readonly: true,
          on: {
            onFocus: _copy_handler("sdk_js_installation"),
          },
          value: "npm install massbitroute-sdk",
        },
        {
          cols: [
            { view: "label", label: "Code Example" },
            {},
            _copy_button("sdk_js_code_example"),
          ],
        },
        {
          view: "monaco-editor",
          language: "javascript",
          theme: "vs-dark",
          cdn: "assets/js/monaco/",
          height: 200,
          id: "sdk_js_code_example",
          value: _sdk_js_code_text,
        },
        {
          cols: [
            { view: "label", label: "Run Code" },
            {},
            _copy_button("sdk_js_run"),
          ],
        },
        {
          view: "text",
          //              label: "Run code",
          css: "sdk_code",
          id: "sdk_js_run",
          readonly: true,
          on: {
            onFocus: _copy_handler("sdk_js_run"),
          },
          value: "node <your_filename>.js",
        },
        {
          cols: [
            {
              view: "button",
              autowidth: true,
              label: "Learn More",
		css: "webix_primary",
		click: function(){
		    window.open("https://github.com/alchemyplatform/alchemy-sdk-js")
		}
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
