import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";

class App extends Component {
  state = {
    selectedItem: false,
    baseUrl: "https://node-api-muxu.onrender.com",
    priceLists: [],
    product: 0,
  };

  selectProduct(itemIndex) {
    this.setState({ product: itemIndex });
  }

  autoLogin = () => {
    window.handleinitDataCallback = (token) => {
      // alert(token);
      this.handleAuthData(token);
    };
    // let loading = weui.loading("loading", {});
    let obj = JSON.stringify({
      functionName: "js_fun_h5GetAccessToken",
      params: {
        appid: "930231098009602",
        functionCallBackName: "handleinitDataCallback",
      },
    });
    window.consumerapp.evaluate(obj);
  };

  handleAuthData = (token) => {
    window
      .fetch(this.state.baseUrl + "/apply/h5Token", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken: token,
        }),
      })
      .then((res) => {
        res
          .text()
          .then((response) => {
            if (!response) return;
            if (!window.consumerapp) {
              console.log("this page is not open in app");
              return;
            }
            alert(response.biz_content.nickName);
          })
          .catch((error) => {
            console.log("error found");
            alert("ERROR", error);
          })
          .finally(() => {});
      })
      .catch((ex) => {
        alert(ex);
      })
      .finally(() => {
        // loading.hide();
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.product !== prevState.product) {
      console.log(this.state.product);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="home">
          <button
            className="b"
            type="button"
            id="buy"
            onClick={() => this.autoLogin()}
          >
            Login with Telebirr
          </button>

          <div className="content">
            <p>Amount</p>
            <div className="amount" id="product_list">
              <div onClick={() => this.selectProduct(10)} class="per perb">
                <div class="tips">
                  <img src="img/diamonds_1.png" />
                </div>
                <div className="dscription">
                  <div className="bg1">diamond_1</div>
                  <div className="bg2 fn2">10 USD</div>
                </div>
              </div>
              <div onClick={() => this.selectProduct(20)} className="per perb">
                <div className="tips">
                  <img src="img/diamonds_1.png" />
                </div>
                <div className="dscription">
                  <div className="bg1">diamond_2</div>
                  <div className="bg2 fn2">20 USD</div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer" id="foot">
            <button className="b" type="button" id="buy" onClick="startPay();">
              Pay Super App
            </button>
            <div className="p">www.mobilelegends.com</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
