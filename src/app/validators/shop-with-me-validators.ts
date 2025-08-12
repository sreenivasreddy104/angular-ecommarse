import { FormControl, ValidationErrors } from "@angular/forms";

export class ShopWithMeValidators {

    static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {
        if (control.value === 'string' && control.value.trim().length === 0) {
            return { 'notOnlyWhiteSpace': true };
        }
        return null;
    }
}
