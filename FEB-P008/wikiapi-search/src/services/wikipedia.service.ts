import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {
  private apiUrl = 'https://pt.wikipedia.org/w/api.php';

  constructor(private http: HttpClient) { }
  //this.http.get<any>(`${this.apiUrl}?action=query&list=search&format=json&origin=*&srsearch=${term}`

  getResults(term: string) {
    return this.http.get<any>(`${this.apiUrl}?action=query&list=search&format=json&origin=*&srsearch=${term}`).pipe(
      map(response => {
        return response.query.search.map((result: any) => ({
          title: result.title,
          snippet: result.snippet,
          pageid: result.pageid
        }));
      })
    );
  }
}
