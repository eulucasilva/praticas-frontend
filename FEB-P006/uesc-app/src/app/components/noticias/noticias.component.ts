import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})

export class NoticiasComponent implements OnInit {

  url = 'https://v2.jokeapi.dev/joke/Any?lang=pt&amount=10';
  noticias: INoticias[] = []

  ngOnInit() {
    this.insereNoticias();
  }

  insereNoticias() {
    fetch(this.url)
      .then(response => response.json())
      .then(data => {
        if (data.jokes) {
          this.noticias = data.jokes;
          console.log(this.noticias[0].delivery);
        }
      });
  }
}

interface INoticias {
  setup: string;
  delivery: string;
}