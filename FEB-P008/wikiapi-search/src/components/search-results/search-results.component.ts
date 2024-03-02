import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input() results: any[] = [];
  @Input() term: string = "";
  @Output() selectEvent = new EventEmitter<any>();

  selectResult(result: any) {
    this.selectEvent.emit(result);
  }

  constructor() { }

  ngOnInit() {
  }

}
