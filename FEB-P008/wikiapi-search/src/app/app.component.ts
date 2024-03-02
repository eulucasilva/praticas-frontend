import { Component } from '@angular/core';
import { WikipediaResult } from '../interfaces/wikipediaResult';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wikiapi-search';

  term: string = "";
  searchResults: WikipediaResult[] = [];

  receiveResults(results: WikipediaResult[]) {
    this.searchResults = results;
  }

  receiveTerm(term: string) {
    this.term = term;
  }
}
