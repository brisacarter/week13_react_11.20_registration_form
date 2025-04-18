import React, { useState } from "react";

function RegistrationForm() {
   // Step 1: Create state variables
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [usernameReqs, setUsernameReqs] = useState({
      longEnough: true,
      onlyLettersDigits: true,
   });
   const [passwordReqs, setPasswordReqs] = useState({
      longEnough: true,
      upperCaseChar: true,
      specialChar: true,
   });

   function handleSubmit(event) {
      let usernameValid = true;
      let passwordValid = true;

      // Step 2: Validate username
      const isUsernameLongEnough = username.length >= 4;
      const isUsernameValidFormat = /^[a-z0-9]+$/.test(username);

      if (!isUsernameLongEnough || !isUsernameValidFormat) {
         usernameValid = false;
         setUsernameReqs({
            longEnough: isUsernameLongEnough,
            onlyLettersDigits: isUsernameValidFormat,
         });
         event.preventDefault();
      } else {
         setUsernameReqs({
            longEnough: true,
            onlyLettersDigits: true,
         });
      }

      // Step 3: Validate password
      const isPasswordLongEnough = password.length >= 6;
      const hasUppercaseChar = /[A-Z]/.test(password);
      const hasSpecialChar = /[!@#$]/.test(password);

      if (!isPasswordLongEnough || !hasUppercaseChar || !hasSpecialChar) {
         passwordValid = false;
         setPasswordReqs({
            longEnough: isPasswordLongEnough,
            upperCaseChar: hasUppercaseChar,
            specialChar: hasSpecialChar,
         });
         event.preventDefault();
      } else {
         setPasswordReqs({
            longEnough: true,
            upperCaseChar: true,
            specialChar: true,
         });
      }
   }

   return (
      <form onSubmit={handleSubmit} target="_blank" method="post" 
         action="https://wp.zybooks.com/form-viewer.php">
         <p>
            <label htmlFor="username">Username:</label>
            <input type="text"
               id="username"
               name="username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
            />
            {/* Step 4: Add username error messages */}
            {!usernameReqs.longEnough &&
               <span className="error">Must be at least four characters.</span>}
            {!usernameReqs.onlyLettersDigits &&
               <span className="error">Only lowercase letters and digits acceptable.</span>}
         </p>
         <p>
            <label htmlFor="password">Password:</label>
            <input type="text"
               id="password"
               name="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            {/* Step 4: Add password error messages */}
            {!passwordReqs.longEnough &&
               <span className="error">Must be at least six characters.</span>}
            {!passwordReqs.upperCaseChar &&
               <span className="error">Must contain an uppercase character.</span>}
            {!passwordReqs.specialChar &&
               <span className="error">Must contain one of: ! @ # $</span>}
         </p>
         <p>
            <button>Register</button>
         </p>
      </form>
   );
}

export default RegistrationForm;
