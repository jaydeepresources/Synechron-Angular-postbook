import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validatePassword(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value)
            return null

        const password: string = control.value

        if (password.length < 8)
            return null

        let lowerCount = 0
        let upperCount = 0
        let numberCount = 0
        let specialCharCount = 0

        for (let i = 0; i < password.length; i++) {
            const char = password.charAt(i)
            if (char >= 'A' && char <= 'Z')
                upperCount++
            if (char >= 'a' && char <= 'z')
                lowerCount++
            if (char >= '0' && char <= '9')
                numberCount++
            if (char === '!' || char === '@' || char === '#' || char === '%')
                specialCharCount++
        }
        return (lowerCount == 0 || upperCount == 0 || numberCount == 0 || specialCharCount == 0) ?
            {
                incorrectPasswordFormat: {
                    msg:
                        'Password must contain at least 1 lowercase, uppercase, number and a special character (! @ # %).'
                }
            } : null
    };

}