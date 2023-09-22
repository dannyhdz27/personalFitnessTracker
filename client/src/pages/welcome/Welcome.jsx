import LoginFormComponent from "./LoginForm";
import RegisterFormComponent from "./RegisterForm";
import { useState } from "react";

const WelcomeComponent = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  let formDisplay;

  if (showRegisterForm) {
    formDisplay = <RegisterFormComponent />;
  } else {
    formDisplay = <LoginFormComponent />;
  }
  return <>{formDisplay}</>;
};

export default WelcomeComponent;
