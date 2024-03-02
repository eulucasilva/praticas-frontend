import { Component, Output, EventEmitter } from '@angular/core';
import { WikipediaService } from '../../services/wikipedia.service';
import { WikipediaResult } from '../../interfaces/wikipediaResult';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchTerm!: string;

  @Output() searchEvent = new EventEmitter<string>();
  @Output() resultsEvent = new EventEmitter<WikipediaResult[]>();

  constructor(private wikipediaService: WikipediaService) { }

  search() {
    this.wikipediaService.getResults(this.searchTerm).subscribe((results: any) => {
      this.searchEvent.emit(this.searchTerm);
      this.resultsEvent.emit(results);
    });
  }
}
