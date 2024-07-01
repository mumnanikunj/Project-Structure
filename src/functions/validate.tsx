import _ from 'lodash';

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i;

  return re.test(email);
};

export const validatePassword = (password: string) => {
  const re = /[A-Za-z\d@$!%*#?&]{8,}$/;
  return re.test(password);
};

export const validateName = (name: string) => {
  const re = /^([a-zA-Z ]{1,})$/;
  return re.test(name);
};

export const checkUserName = (name: string) => {
  const re = /^[a-zA-Z0-9]+$/;
  return re.test(name);
};

export const getNumberFromString = (number: string) => number.replace(/[^0-9]/g, '');

export const validateMobile = (number: string): boolean => {  
  if (!_.trim(number)) {
    return false;
  }
  const numStr = number.replace(/[^0-9]/g, '');
  const isLength = numStr.length >= 6 && numStr.length <= 14;
  if (!isLength) {
    return isLength;
  }

  const re = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
  return re.test(numStr);
};
