
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';




@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {

  formUsuario: FormGroup;
  generoOpcoes: string[] = ['Masculino', 'Feminino', 'Não declarar'];
  profissoesOpcoes: string[] = ['Engenheiro', 'Médico', 'Professor', 'Analista de Sistemas', 'Autônomo', 'Advogado', 'Pedreiro', 'Costureiro', 'Vendedor']

  constructor(private fb: FormBuilder) {
    this.formUsuario = this.fb.group({
      // Defina os controles do formulário aqui
      nomeUsuario: ['', [Validators.required, Validators.maxLength(12), Validators.pattern(/^\S*$/)]],
      senha: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      nomeCompleto: ['', [Validators.required, this.nomeCompletoValidator()]],
      telefone: ['', [Validators.required, this.telefoneValidator()]],
      endereco: ['', [Validators.required, this.enderecoCompletoValidator()]],
      dataNascimento: ['', [Validators.required, this.dataNascimentoValidator()]],
      genero: ['', [Validators.required]],
      profissao: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
  }

  submitForm() {
    if (this.formUsuario.valid) {
      const formData = this.formUsuario.value;
      console.log(formData);
    }
  }

  nomeCompletoValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value as string;

      const isValid = value && value.trim().indexOf(' ') !== -1;

      return isValid ? null : { 'nomeCompletoInvalido': true };
    };
  }

  telefoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;

      const regex = /^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/;

      const isValid = regex.test(value);
      return isValid ? null : { 'telefoneInvalido': true };
    };

  }

  enderecoCompletoValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;

      if (!value || value.trim() === '') {
        return { 'enderecoVazio': true };
      }
      //adicionar mais validações?
      return null;
    };
  }

  calcularIdade(dataNascimento: Date): number {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth() + 1;
    const mesNascimento = nascimento.getMonth() + 1;

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  }

  dataNascimentoValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as Date;
      if (!value || isNaN(value.getTime())) {
        return { 'dataNascimentoInvalida': true };
      }
      if (this.calcularIdade(value) < 18) {
        return { 'idadeInsuficiente': true }
      }

      return null;
    };
  }


}
