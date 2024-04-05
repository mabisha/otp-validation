import { handlePaste } from "../container/validation.utils";

test("handlePaste sets OTP when pasted text length matches number of OTPs", () => {
  const numberOfOtps = 6;
  const setOtp = jest.fn();
  const event = {
    preventDefault: jest.fn(),
    clipboardData: {
      getData: jest.fn().mockReturnValue("123456"),
    },
  };

  handlePaste(event, numberOfOtps, setOtp);

  expect(event.preventDefault).toHaveBeenCalled();
  expect(setOtp).toHaveBeenCalledWith(["1", "2", "3", "4", "5", "6"]);
});

test("handlePaste doesnot paste if pasted text length is greater than number of OTPs", () => {
  const numberOfOtps = 6;
  const setOtp = jest.fn();

  const event = {
    preventDefault: jest.fn(),
    clipboardData: {
      getData: jest.fn().mockReturnValue("1234567"), // Pasted text is longer than numberOfOtps
    },
  };

  handlePaste(event, numberOfOtps, setOtp);

  expect(event.preventDefault).toHaveBeenCalled();
  expect(setOtp).not.toHaveBeenCalled(); // Ensure setOtp is not called with the incorrect length
});
