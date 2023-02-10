import { useRef, useState } from "react";

const ERROR_MESSAGE = "Please type the same password twice.";

function usePasswordValidation() {
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordConfirmationValue, setPasswordConfirmationValue] =
    useState("");
  const passwordRef = useRef(null);
  const passwordConfirmationRef = useRef(null);

  const passwordInput = passwordRef.current;
  const passwordConfirmationInput = passwordConfirmationRef.current;

  const inputsAreReady = passwordInput && passwordConfirmationInput;
  const isPasswordValid = !!(
    passwordValue &&
    passwordConfirmationValue &&
    passwordValue === passwordConfirmationValue
  );

  if (inputsAreReady) {
    if (isPasswordValid) {
      passwordInput.setCustomValidity("");
      passwordConfirmationInput.setCustomValidity("");
    } else {
      passwordInput.setCustomValidity(ERROR_MESSAGE);
      passwordConfirmationInput.setCustomValidity(ERROR_MESSAGE);
    }
  }

  return {
    setPassword: setPasswordValue,
    setPasswordConfirmation: setPasswordConfirmationValue,
    passwordRef,
    passwordConfirmationRef,
  };
}

export default usePasswordValidation;
