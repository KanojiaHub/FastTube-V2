export const checkValidData = (Email, Password) => {

  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    Email
  );

  if (!isEmailValid) return "Email is not valid";
  
  const reg1 = /[A-Z]/
  if(!reg1.test(Password)) return "Uppercase letter is not present"
  const reg2 = /[a-z]/
  if(!reg2.test(Password)) return "Lowercase letter is not present"
  const reg3 = /[\d]/
  if(!reg3.test(Password)) return "Digit is not present"
  const reg4 = /[!@#$%^&*.?]/
  if(!reg4.test(Password)) return "Special character is not present"

  const regex9 = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
  const isValid = regex9.test(Password);
  if (!isValid) return "Password is not valid";


  return null;
};


  
export const validateName = (name) => {
  // Add your name validation logic here
  // Example: Name must be at least 3 characters long
  if (name.trim().length < 3) {
    return "Name must be at least 3 characters long.";
  }
  return null;
};