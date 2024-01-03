import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'fname'
})
export class FirstNamePipe implements PipeTransform {
    transform(name: string): string {
        let fname = (name.trim().split(' '))[0]
        return fname
    }
}