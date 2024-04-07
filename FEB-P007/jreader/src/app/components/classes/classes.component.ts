import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent {

  @Input()
  categorias: string[] = [];

  @Input()
  title = '';

  @Output() buscaCategoriaRealizada = new EventEmitter<any>();


  buscaCategoria(categoria: string): void {
    this.buscaCategoriaRealizada.emit(categoria);
  }

}
