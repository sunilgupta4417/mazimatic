import { React, useState, useEffect } from "react";
import HomeHeaderTags from "../components/HomeHeaderTags";
// import { Helmet } from "react-helmet";

const Paymenttest = ({ nextStep, handleChange, values }) => {
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");
  const [blockChain, setBlockChain] = useState("BNB");
  const [paymentType, setPaymentType] = useState("coin-payment");
  const user = localStorage.getItem("user");
  // console.log(user);
  const totalToken = (event) => {
    const regex = /^[0-9]*$/; // pattern to match inline numbers
    if (regex.test(event.target.value)) {
      const token = event.target.value / 0.005;
      setAmount(event.target.value);
      setToken(token);
    } else {
      alert("Please enter valid number of amount");
    }
  };

  const onChangeBlockChain = (ev) => {
    setBlockChain(ev.target.value);
  };

  const onChangePaymentType = (ev) => {
    setPaymentType(ev.target.value);
  };

  const BuyNow = () => {
    if (token == null || token == "") {
      alert("Please enter amount to make buy tokens");
      return;
    }
    if (paymentType == "coin-payment") {
      CoinPayment();
    } else if (paymentType == "e-pay") {
      ePay();
    } else if (paymentType == "pay-baba") {
      PayBaba();
    }
  };
  const CoinPayment = () => {
    console.log(paymentType);
  };
  const ePay = async () => {
    const initializeEpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://epay.me/sdk/v1/stage-websdk.js";
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };

        document.body.appendChild(script);
      });
    };

    const res = await initializeEpay();

    if (!res) {
      alert("Epay SDK Failed to load");
      return;
    }
    const options = {
      channelId: "WEB",
      customerId: "c36d44a38e4c49d1ae43d6e66f6c9646",
      merchantType: "ECOMM",
      merchantId: "63e8afebfcbda19984d1865a",
      orderID: "202303110527048234561587",
      orderDescription: blockChain,
      orderAmount: amount,
      orderCurrency: "USD",
      emailId: "T61C8KWR",
      merchantLogo: "https://mazimatic.com/assets/logo/mazimatic_logo_db.png",
      showSavedCardsFeature: true,
      successHandler: async function (response) {
        window.location.href =
          "https://mazimatic.com/epay-success.aspx?transactionid=" +
          response.response.transactionid;
      },
      failedHandler: async function (response) {
        window.location.href =
          "https://mazimatic.com/epay-failed.aspx?transactionid=";
      },
    };
    const paymentObject = new window.Epay(options);
    paymentObject.open(options);
  };
  const PayBaba = () => {
    window.open(
      `https://payments.paybaba.co/pay/63f784d54d84e1b05d5d2ee2/6000/${user}/${amount}`,
      "_child",
      "width=375,height=645"
    );
  };
  return (
    <>
      <HomeHeaderTags />
      <div id="select_gateway_form" className="cards ">
        <div className="card-title pt-3">
          <h3>Pre-Sale Price</h3>
          <h1 className="price-rate">
            $ <span id="select_gateway_form_token_rate_lbl">0.0035</span>
          </h1>
        </div>
        <div className="progress_pd">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-label="Info example"
              style={{ width: "71%" }}
              aria-valuenow={71}
              aria-valuemin={0}
              aria-valuemax={100}
            />
            <p>PRE-SALE METER</p>
          </div>
          <div className="content-card d-flex justify-content-around">
            <p className="title1">Excited</p>
            <p className="title2">Over the Moon</p>
            <p className="title3">Missed it</p>
          </div>
        </div>
        <div className="progress_pd">
          <div className="input-group mb-3">
            <button className="btns" type="button" id="button-addon1">
              AMOUNT in $
            </button>
            <input
              name="total_amt_txt"
              type="text"
              id="total_amt_txt"
              value={amount}
              onChange={totalToken}
              className="form-control dash_input"
              placeholder="eg. 1000"
            />
          </div>
          <div className="input-group mb-3">
            <button className="btns" type="button" id="button-addon1">
              TOKEN QTY
            </button>
            <input
              name="total_payable_tkn_lbl"
              type="text"
              readOnly="readonly"
              id="total_payable_tkn_lbl"
              className="form-control dash_input"
              value={token}
              placeholder={0}
            />
          </div>
        </div>
        <div className="payment">
          <p className="payment-title">Select your Blockchain</p>
        </div>
        <div className="checkbox text-center">
          <button className="btns check" type="button">
            <img src="tool_imgs/Binance.png" alt="" /> BNB{" "}
            <input
              value={"BNB"}
              name="radioCrypto"
              type="radio"
              onChange={onChangeBlockChain}
              defaultChecked="checked"
            />
          </button>
          <button className="btns check-btn" type="button" id="button-addon2">
            <img src="tool_imgs/eth.png" alt="" /> Ethereum{" "}
            <input
              value={"ETH"}
              name="radioCrypto"
              type="radio"
              id="radioEth"
              onChange={onChangeBlockChain}
            />
          </button>
        </div>
        <div className="payment-method">
          <p className="payment-titles">Select your Payment Method</p>
        </div>
        <div className="content-cards d-flex justify-content-around radio_btn_hldr">
          <div className="coin-imgs">
            <div
              id="coinpayments_div"
              className="row payment_mth_1 mb-2 text-center pl_10"
            >
              <div className="col-auto pt_7">
                <input
                  name="radioGateway"
                  type="radio"
                  id="coinpayments_rdo"
                  value={"coin-payment"}
                  onChange={onChangePaymentType}
                  defaultChecked="checked"
                />
                &nbsp;&nbsp; <img src="tool_imgs/Coin_Payments_1.svg" alt="" />
                <img src="images/eth_bnb_usdt.png" alt="" />
              </div>
            </div>
            <div
              id="epay_div"
              className="row payment_mth_1 mb-2 text-center pl_10"
            >
              <div className="col-auto pt_7">
                <input
                  name="radioGateway"
                  type="radio"
                  id="epay_rdo"
                  value={"e-pay"}
                  onChange={onChangePaymentType}
                />
                &nbsp;&nbsp; <img src="images/Epay1.png" alt="" />
              </div>
              <div className="col-auto">
                <img src="images/cards_all.png" />
              </div>
            </div>
            <div
              id="upi_div"
              className="row payment_mth_1 mb-2 text-center pl_10"
            >
              <div className="col-auto pt_7">
                <input
                  name="radioGateway"
                  type="radio"
                  id="upi_rdo"
                  value={"pay-baba"}
                  onChange={onChangePaymentType}
                />
                &nbsp;&nbsp; <img src="images/upi.svg" alt="" />
              </div>
              <div className="col-auto text-start">
                <img src="images/upi_all.png" />
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={BuyNow}
                id="loginwithpass_btn"
                type="button"
                className="buy_button"
              >
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Paymenttest;
