// src/utils/validation.js

export const validateEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };
  
  export const validatePassword = (password) => {
    // At least 8 chars, one letter, one number
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  
  export const validateName = (name) => {
    return name.trim().length >= 2;
  };
  
  export const validatePhone = (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  };
  
  export const validateAge = (age) => {
    return !isNaN(age) && age > 0 && age <= 120;
  };
  
  export const validateCKDForm = (data) => {
    const errors = {};
  
    if (!data.age || !validateAge(data.age)) {
      errors.age = "Valid age is required.";
    }
  
    if (!data.bp) {
      errors.bp = "Blood pressure is required.";
    }
  
    if (!data.al) {
      errors.al = "Albumin level is required.";
    }
  
    if (!data.su) {
      errors.su = "Sugar level is required.";
    }
  
    // Add more fields as needed
  
    return errors;
  };
  
  export const isFormValid = (errors) => {
    return Object.keys(errors).length === 0;
  };
  