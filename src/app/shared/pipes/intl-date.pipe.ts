import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'intlDate' })
export class IntlDatePipe implements PipeTransform {
  private readonly _formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'short',
    timeStyle: 'medium',
  });

  public transform(value: string | Date | null | undefined): string {
    if (!value) {
      return '';
    }

    return this._formatter.format(new Date(value));
  }
}
