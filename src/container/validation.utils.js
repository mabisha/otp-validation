export const handlePaste = (event, numberOfOtps, setOtp) => {
  event.preventDefault();
  const pastedText = event.clipboardData.getData("text");
  if (pastedText.length !== numberOfOtps) {
    return;
  }
  const newOtp = pastedText.split("");
  setOtp(newOtp);
};
