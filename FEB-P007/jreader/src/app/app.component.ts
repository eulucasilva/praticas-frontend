import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'jreader';
  dados: any = {};
  veiculos: string[] = [];
  categoria = '';
  atributos: string[] = [];
  veiculo = '';
  value = '';
  veiculosAdicionados: string[] = [];
  propriedade: string = '';

  buscaRealizada(event: any): void {
    this.dados = event;
  }

  getCategorias(): string[] {
    return Object.keys(this.dados);
  }

  onBuscaCategoriaRealizada(event: string): void {
    this.atributos = [];
    this.veiculos = [];
    this.value = '';
    let nameVeiculos = [];

    this.categoria = event;

    for (let veiculo of this.dados[event]) {
      nameVeiculos.push(veiculo.Name);
    }
    this.veiculos = nameVeiculos;
  }

  onBuscaObjetoRealizada(event: string): void {
    this.value = '';
    this.veiculo = event;
    for (let veiculo of this.dados[this.categoria]) {
      if (veiculo.Name == event) {
        this.atributos = Object.keys(veiculo);
        console.log(this.atributos);
      }
    }
  }
}
