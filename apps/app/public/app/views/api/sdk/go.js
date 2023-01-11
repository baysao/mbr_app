define([app_view + "/webix/monaco"], function () {
  var _sdk_go_code_text2 = `
package main

  import (
    "context"
    "fmt"
    "log"

    "github.com/ethereum/go-ethereum/core/types"
    "github.com/ethereum/go-ethereum/ethclient"
  )

  func main() {
      client, err := ethclient.Dial("wss://eth-mainnet.g.alchemy.com/v2/M1A6cLGaHi8We6xMk88hqPRoki6LKcYY")
      if err != nil {
          log.Fatal(err)
      }

      headers := make(chan *types.Header)
      sub, err := client.SubscribeNewHead(context.Background(), headers)
      if err != nil {
          log.Fatal(err)
      }

      for {
          select {
          case err := <-sub.Err():
              log.Fatal(err)
          case header := <-headers:
              block, err := client.BlockByHash(context.Background(), header.Hash())
              if err != nil {
                  log.Fatal(err)
              }
              fmt.Println("New block:", block.Number().Uint64())
          }
      }
  }
`;
  var _sdk_go_code_text1 = `
package main

import (
  "context"
  "fmt"
  "log"

  "github.com/ethereum/go-ethereum/common"
  "github.com/ethereum/go-ethereum/ethclient"
)

func main() {
    client, err := ethclient.Dial("https://eth-mainnet.g.alchemy.com/v2/M1A6cLGaHi8We6xMk88hqPRoki6LKcYY")
    if err != nil {
        log.Fatal(err)
    }

    // Get the balance of an account
    account := common.HexToAddress("0x71c7656ec7ab88b098defb751b7401b5f6d8976f")
    balance, err := client.BalanceAt(context.Background(), account, nil)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("Account balance:", balance) // 25893180161173005034

    // Get the latest known block
    block, err := client.BlockByNumber(context.Background(), nil)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("Latest block:", block.Number().Uint64())
}
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
    header: "Go",
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
            { view: "label", label: "HTTPS Example" },
            {},
            _copy_button("sdk_go_code_example1"),
          ],
        },
        {
          view: "monaco-editor",
          language: "go",
          theme: "vs-dark",
          cdn: "assets/js/monaco/",
          height: 200,
          id: "sdk_go_code_example1",
          value: _sdk_go_code_text1,
        },
        {
          cols: [
            { view: "label", label: "Websocket Example" },
            {},
            _copy_button("sdk_go_code_example2"),
          ],
        },
        {
          view: "monaco-editor",
          language: "go",
          theme: "vs-dark",
          cdn: "assets/js/monaco/",
          height: 200,
          id: "sdk_go_code_example2",
          value: _sdk_go_code_text2,
        },
        {
          cols: [
            { view: "label", label: "Run Code" },
            {},
            _copy_button("sdk_go_run"),
          ],
        },
        {
          view: "text",
          //              label: "Run code",
          css: "sdk_code",
          id: "sdk_go_run",
          readonly: true,
          on: {
            onFocus: _copy_handler("sdk_go_run"),
          },
          value: "go run <your_filename>.go",
        },
        {
          cols: [
            {
              view: "button",
              autowidth: true,
              label: "Learn More",
              css: "webix_primary",
              click: function () {
                window.open("https://goethereumbook.org/en/");
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
