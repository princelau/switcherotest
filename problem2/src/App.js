import { useForm, Controller } from "react-hook-form";
import OTPInput from "otp-input-react";
import "./App.scss";
import { useState } from "react";
import { ethers } from "ethers";
import bigDecimal from "js-big-decimal";
import { ReactComponent as IconPaste } from "./assets/icons/paste.svg";

function App() {
  const [walletBalance, setWalletBalance] = useState(10);
  const [otpFromBackend, setOtpFrombackend] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const submitForm = (data) => {
    // simulating otp validation from backend
    if (data.inputOtp !== otpFromBackend) {
      setError("inputOtp", { type: "custom", message: "Invalid OTP" });
      return;
    }
    if (bigDecimal.compareTo(walletBalance, data.inputAmount) !== -1) {
      setWalletBalance(bigDecimal.subtract(walletBalance, data.inputAmount));
      alert(
        `Transaction submitted! \nETH Address: ${data.inputAddress} \nAmount: ${data.inputAmount} ETH`
      );
      reset();
    } else {
      setError("inputAmount", { type: "custom", message: "Insufficient ETH" });
      return;
    }
  };

  const generateOTP = () => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    alert(`OTP: ${randomNumber}`);
    setOtpFrombackend(randomNumber.toString());
  };

  const pasteAddress = async () => {
    const text = await navigator.clipboard.readText();
    setValue("inputAddress", text);
  };

  const checkIfValidEthAddress = (ethAddress) => {
    return ethers.utils.isAddress(ethAddress);
  };

  const maxButton = () => {
    setValue("inputAmount", walletBalance);
  };

  return (
    <div className="overall-container">
      <div className="wallet-balance">Wallet Balance: {walletBalance} ETH</div>
      <div className="form-container">
        <form
          onSubmit={handleSubmit((data) => {
            submitForm(data);
          })}
        >
          <div className="input-container">
            <label htmlFor="inputAddress">Recipient ETH Address</label>
            <div className="input-content">
              {" "}
              <input
                className="input-text"
                {...register("inputAddress", {
                  required: "ETH Address Required",
                  validate: {
                    checkIfValidEthAddress: (address) =>
                      checkIfValidEthAddress(address) || "Invalid ETH Address",
                  },
                })}
                placeholder="Enter ETH address..."
              />
              <IconPaste
                className="input-icon"
                type="button"
                onClick={pasteAddress}
              />
            </div>
            <p className="input-error">{errors.inputAddress?.message}</p>
          </div>
          <div className="input-container">
            <label htmlFor="inputAmount">Amount</label>
            <div className="input-content">
              <input
                className="input-text"
                {...register("inputAmount", {
                  required: "Amount Required",
                  min: { value: 0.001, message: "Minimum Value: 0.001 ETH" },
                })}
                placeholder="Enter amount..."
                type="number"
                step="0.001"
              />{" "}
              <div className="input-currency">ETH</div>
              <button type="button" onClick={maxButton} className="button max">
                MAX
              </button>
            </div>
            <p className="input-error">{errors.inputAmount?.message}</p>
          </div>
          <div className="input-container">
            <label htmlFor="inputOtp">OTP Authentication</label>
            <div className="input-otp-container">
              <Controller
                name="inputOtp"
                control={control}
                rules={{
                  required: "OTP Required",
                  minLength: { value: 4, message: "Invalid OTP" },
                }}
                render={({ field: { onChange, value } }) => (
                  <OTPInput
                    value={value}
                    onChange={onChange}
                    autoFocus
                    OTPLength={4}
                    otpType="number"
                    disabled={false}
                    secure
                  />
                )}
              />
              <button
                className="button otp"
                type="button"
                onClick={generateOTP}
              >
                Generate OTP
              </button>
            </div>
            <p className="input-error">{errors.inputOtp?.message}</p>
          </div>
          <input
            className="button submit"
            type="submit"
            value="Send Tokens"
          ></input>
        </form>
      </div>
    </div>
  );
}

export default App;
