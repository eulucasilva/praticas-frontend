import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {
  @Output() veiculosBuscados = new EventEmitter<any>();

  buscarVeiculos(arquivo: string): void {

    //mostrar no console o arquivo veiculos.json que esta na pasta dados

    fetch(`assets/dados/${arquivo}.json`)
      .then((response) => response.json())
      .then((data) => {
        this.veiculosBuscados.emit(data);
        console.log(data);
      });

  }
}
