import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.css'
})
export class ServicosComponent implements OnInit {
  apiKey = 'dfc6e6f95cb1b848d967fa9239a0fbae';
  cidade = 'Ilheus';
  url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cidade}&appid=${this.apiKey}`;
  previsao = '';


  ngOnInit() {
    this.insereServicos();
  }


  insereServicos() {
    fetch(this.url)
      .then(response => response.json())
      .then(data => {
        if (data.weather && data.weather.length > 0) {
          const description = data.weather[0].description;
          this.previsao = `A previsão do tempo em ${this.cidade} é: ${description}`;
        }
      });
  }
}
