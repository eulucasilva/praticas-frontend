import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'bold'
})
export class BoldPipe implements PipeTransform {
    transform(value: string, term: string): string {
        if (!term || !value) {
            return value;
        }

        const regex = new RegExp(term, 'gi');
        return value.replace(regex, match => `<strong>${match}</strong>`);
    }
}
