import { showError } from "./helperFunctions";
import isEmpty from 'lodash'
const emptyRegex: RegExp = /^$/;
const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validator = () => {
    return {
        empty: (val: string): boolean => {
            return emptyRegex.test(val);
        },
        email: (val: string): boolean => {
            return emailRegex.test(val);
        }
    }    
}

const checkEmpty = (val: string, key: string): string => {
    if (validator().empty(val.trim())) {
        return `Please enter ${key}`;
    } else {
        return '';
    }
}

const checkMinLength = (val: string, minLength: number, key: string): string => {
    if (val.trim().length < minLength) {
        return `Please enter valid ${key}`;
    } else {
        return '';
    }
}

export default function validate(data: { [key: string]: any }): string | boolean {
    const { 
        name,
        email, 
        password,
        otp,
        phoneNumber,
        confirmPassword,
        vendorLogo,
        vendorName,
        vendorDesc,
        vendorTitle
    } = data;
    if (name !== undefined) {
        let emptyValidationText = checkEmpty(name, "User name");
        if (emptyValidationText !== '') {
            showError(emptyValidationText)
            return emptyValidationText;
        } else {
            let minLengthValidation = checkMinLength(name, 3, "User name");
            if (minLengthValidation !== '') {
                return minLengthValidation;
            }
        }
    }

    if (email !== undefined) {
        let emptyValidationText = checkEmpty(email, "email");
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            if (!validator().email(email)) {
                return "Please enter valid email";
            }
        }
    }

    if (phoneNumber !== undefined) {
        const emptyValidationText = checkEmpty(phoneNumber, "phone number");
        if (emptyValidationText) { return emptyValidationText };

        const minLengthValidation = checkMinLength(phoneNumber, 7, "phone number");
        if (minLengthValidation) { return minLengthValidation };
    }
    
    if (password !== undefined) {
        let emptyValidationText = checkEmpty(password, "password");
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            let minLengthValidation = checkMinLength(password, 6, "password");
            if (minLengthValidation !== '') {
                return minLengthValidation;
            }
        }
    }
    if (confirmPassword !== undefined) {
        let emptyValidationText = checkEmpty(
          confirmPassword,
          'Confirm Password',
        );
        if (emptyValidationText !== '') {
          return emptyValidationText;
        }
        if (confirmPassword != password) {
          return 'Password does not match';
        }
      }
    

    if (otp !== undefined) {
        let emptyValidationText = checkEmpty(otp, "Otp");
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            let minLengthValidation = checkMinLength(otp, 4, "Otp");
            if (minLengthValidation !== '') {
                return minLengthValidation;
            }
        }
    }
    if (vendorLogo !== undefined) {
        if (!vendorLogo?.fileName) {
          return 'Please upload resturant logo';
        }
      }

      if (vendorName !== undefined) {
        let emptyValidationText = checkEmpty(
          vendorName,
          'Please enter resturant name',
        );
        if (emptyValidationText !== '') {
          return emptyValidationText;
        }
      }
      if (vendorDesc !== undefined) {
        let emptyValidationText = checkEmpty(vendorDesc, 'description');
        if (emptyValidationText !== '') {
          return emptyValidationText;
        }
      }

      if (vendorTitle !== undefined) {
        let emptyValidationText = checkEmpty(vendorTitle, 'title');
        if (emptyValidationText !== '') {
          return emptyValidationText;
        }
      }
    return true;
}
