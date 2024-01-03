import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validateEmail(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value)
            return null

        const email: string = control.value

        return (!(email.indexOf('@') > 0 && email.indexOf('@') < email.length - 2)) ? {
            incorrectEmailFormat: {
                msg:
                    'Email format is incorrect.'
            }
        } : null
    }

}