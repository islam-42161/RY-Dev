export function validateRegistration(email, password, confirmPassword) {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email address");
      return {
        status:true,
        message: 'Invalid email address'
      };
    }
  
    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      console.log(
        "Password must be at least 8 characters long and include at least one letter and one number"
      );
      return {
        status:true,
        message: 'Password must be at least 8 characters long and include at least one letter and one number'
      };;
    }
  
    // Repeat password validation
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return {
        status:true,
        message: 'Passwords do not match'
      };
    }
  
    // If all validations pass
    return {
        status:true,
        message: 'Looks good... Swipe right'
      };
  }