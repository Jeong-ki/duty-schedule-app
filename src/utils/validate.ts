const validateEmail = (email: string): boolean => {
  const regex =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
  return regex.test(email);
};

const validatePassword = (password: string): boolean => {
  const regex = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/;
  return regex.test(password);
};

export {validateEmail, validatePassword};
