import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import styles from "./validation.module.css";
import { useDispatch } from "react-redux";
import { validateOtp } from "../../store/slices/otpSlice";
import { useNavigate } from "react-router-dom";

const OtpForm = ({ numberOfOtps, otp, setOtp }) => {
  const [otpErrors, setOtpErrors] = useState(
    new Array(numberOfOtps).fill(false)
  );
  const inputRef = useRef([]);

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  const handleChange = (event, index) => {
    const value = event.target.value;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    const isValid = value.length === 1 && !isNaN(value);
    const newOtpErrors = [...otpErrors];
    newOtpErrors[index] = !isValid;
    setOtpErrors(newOtpErrors);

    if (value && index < numberOfOtps - 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleBack = (event, index) => {
    const isCurrentInputEmpty = !inputRef.current[index].value;
    const newOtpErrors = [...otpErrors];
    newOtpErrors[index] = isCurrentInputEmpty;
    setOtpErrors(newOtpErrors);

    if (event.key === "Backspace" && !event.target.value && index > 0) {
      inputRef.current[index - 1].focus();
    }
    if (event.key === "ArrowLeft" && !event.target.value && index > 0) {
      inputRef.current[index - 1].focus();
    }
    if (
      event.key === "ArrowRight" &&
      !event.target.value &&
      index < numberOfOtps - 1
    ) {
      inputRef.current[index + 1].focus();
    }
  };
  const handlePaste = (event) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text");
    if (pastedText.length !== numberOfOtps) {
      return;
    }
    const newOtp = pastedText.split("");
    setOtp(newOtp);
  };
  return (
    <>
      {otp.map((item, index) => (
        <Grid item key={index}>
          <input
            ref={(input) => {
              inputRef.current[index] = input;
            }}
            value={item}
            type="text"
            style={{
              padding: "5px",
              width: "20px",
              height: "20px",
              borderRadius: "5px",
              textAlign: "center",
              borderColor: otpErrors[index] ? "red" : "grey",
            }}
            onChange={(event) => handleChange(event, index)}
            onKeyDown={(event) => handleBack(event, index)}
            onPaste={handlePaste}
            maxLength={1}
          />
        </Grid>
      ))}
    </>
  );
};
function Validation() {
  const numberOfOtps = 6;
  const [otp, setOtp] = useState(new Array(numberOfOtps).fill(""));
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await dispatch(
      validateOtp({ otp: otp.join("") })
    ).unwrap();
    if (response.code === 200) {
      navigate("/success");
    } else if (response.code === 403) {
      setError("OTP must be of length 6");
    } else if (response.code === 500) {
      setError("OTP should not include digit 7 at the end");
    } else {
      setError("Something went wrong");
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="90vh"
    >
      <Typography variant="h5" fontWeight="bold">
        Verification Code :
      </Typography>
      <form onSubmit={(event) => handleSubmit(event)} className={styles.form}>
        <Grid container spacing={2}>
          <OtpForm
            numberOfOtps={numberOfOtps}
            otp={otp}
            setOtp={setOtp}
          ></OtpForm>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "#100249",
              margin: "10px",
              padding: "10px",
              width: "190px",
              fontSize: "19px",
            }}
          >
            Submit
          </Button>
        </Grid>
      </form>
      {error && (
        <Typography variant="h5" style={{ fontSize: "12px", color: "red" }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
export default Validation;
