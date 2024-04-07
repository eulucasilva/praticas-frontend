import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface CampoDoForm {
  tipo: string;
  nome: string;
  rotulo: string;
}



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent implements OnInit {


  camposDoForm: CampoDoForm[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('https://restcountries.com/v3.1/all').subscribe((data) => {
      const primeiroRegistro = data[0];
      console.log(data[0])
      this.camposDoForm = Object.keys(primeiroRegistro).map((key) => ({
        tipo: this.detectarTipo(primeiroRegistro[key]),
        nome: key,
        rotulo: key,
      }));
      console.log(this.camposDoForm)
    });
  }

  private detectarTipo(valor: any): string {
    if (typeof valor === 'string') {
      return 'text';
    } else if (typeof valor === 'number') {
      return 'number';
    } else if (Array.isArray(valor)) {
      return 'array';
    } else {
      return 'text';
    }
  }

}
