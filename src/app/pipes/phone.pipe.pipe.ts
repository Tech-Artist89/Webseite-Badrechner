import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  standalone: true
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    
    // Format German phone number
    if (cleaned.startsWith('49')) {
      // International format
      return `+${cleaned.substring(0, 2)} (0) ${cleaned.substring(2, 5)} ${cleaned.substring(5)}`;
    } else if (cleaned.startsWith('0')) {
      // National format
      return `${cleaned.substring(0, 4)} ${cleaned.substring(4)}`;
    }
    
    return value;
  }
}