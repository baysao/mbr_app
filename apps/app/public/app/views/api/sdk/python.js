define([app_view + "/webix/monaco"], function () {
  var _sdk_py_code_text = `
# Setup
from web3 import Web3

alchemy_url = "https://eth-mainnet.g.alchemy.com/v2/M1A6cLGaHi8We6xMk88hqPRoki6LKcYY"
w3 = Web3(Web3.HTTPProvider(alchemy_url))

# Print if web3 is successfully connected
print(w3.isConnected())

# Get the latest block number
latest_block = w3.eth.block_number
print(latest_block)

# Get the balance of an account
balance = w3.eth.get_balance('0x742d35Cc6634C0532925a3b844Bc454e4438f44e')
print(balance)

# Get the information of a transaction
tx = w3.eth.get_transaction('0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060')
print(tx)
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
    header: "Python",
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
            _copy_button("sdk_py_installation"),
          ],
        },
        {
          view: "text",
          id: "sdk_py_installation",
          css: "sdk_code",
          readonly: true,
          on: {
            onFocus: _copy_handler("sdk_py_installation"),
          },
          value: "pip install web3",
        },
        {
          cols: [
            { view: "label", label: "Code Example" },
            {},
            _copy_button("sdk_py_code_example"),
          ],
        },
        {
          view: "monaco-editor",
          language: "python",
          theme: "vs-dark",
          cdn: "assets/js/monaco/",
          height: 200,
          id: "sdk_py_code_example",
          value: _sdk_py_code_text,
        },
        {
          cols: [
            { view: "label", label: "Run Code" },
            {},
            _copy_button("sdk_py_run"),
          ],
        },
        {
          view: "text",
          //              label: "Run code",
          css: "sdk_code",
          id: "sdk_py_run",
          readonly: true,
          on: {
            onFocus: _copy_handler("sdk_py_run"),
          },
          value: "python <your_filename>.py",
        },
        {
          cols: [
            {
              view: "button",
              autowidth: true,
              label: "Learn More",
              css: "webix_primary",
              click: function () {
                window.open("https://web3py.readthedocs.io/en/stable/");
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
