import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Observable,
  tap,
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss'],
})
export class LibSearchComponent implements OnInit {
  constructor(private http: HttpClient) {}

  private readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  private FIELDS = 'name, description';
  queryControl = new FormControl();
  results$!: Observable<any>;
  total = 0;

  ngOnInit(): void {
    this.results$ = this.queryControl.valueChanges.pipe(
      map((value) => value.trim()),
      filter((value) => value.length >= 2),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((value) =>
        this.http.get(this.SEARCH_URL, {
          params: {
            search: value,
            fields: this.FIELDS,
          },
        })
      ),
      tap((res: any) => (this.total = res.total)),
      map((res) => res.results)
    );
  }

  onSearch() {
    let searchValue = this.queryControl.value?.trim();

    if (searchValue && searchValue !== '') {
      let params = new HttpParams();
      params = params.set('fields', this.FIELDS);
      params = params.set('search', searchValue);

      this.results$ = this.http.get(this.SEARCH_URL, { params }).pipe(
        tap((res: any) => (this.total = res.total)),
        map((res) => res.results)
      );
    }
  }
}
