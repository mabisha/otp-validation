export const handlePaste = (event, numberOfOtps, setOtp, setError) => {
  event.preventDefault();
  const pastedText = event.clipboardData.getData("text");
  if (pastedText.length !== numberOfOtps) {
    setError("OTP must be of 6 length");
    return;
  }
  const newOtp = pastedText.split("");
  setOtp(newOtp);
};
