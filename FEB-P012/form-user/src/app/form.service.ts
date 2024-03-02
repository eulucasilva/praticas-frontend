import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private formData: any = {
    values: {},
    status: null,
  };
  private formChangesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  formChanges$: Observable<any> = this.formChangesSubject.asObservable();

  constructor() { }

  updateFormChanges(form: FormGroup) {
    this.formData = {
      values: { ...form.value },
      status: form.status,
    };

    this.formChangesSubject.next(this.formData);
  }


  getFormValues(): any {
    return this.formData.values;
  }

  getFormStatus(): string {
    return this.formData.status;
  }

  getFormData(): any {
    return this.formData;
  }

  printFormData() {
    console.log('Estrutura de dados do Formulário:', this.formData);
  }
}
