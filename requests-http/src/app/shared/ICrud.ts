import { HttpClient } from '@angular/common/http';
import { Observable, delay, take } from 'rxjs';

export class ICrud<T extends { id: number }> {
  constructor(protected http: HttpClient, private API_URL: string) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.API_URL).pipe(delay(500));
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  create(record: T) {
    return this.http.post(this.API_URL, record).pipe(take(1));
  }

  update(record: T) {
    return this.http.put(`${this.API_URL}/${record.id}`, record).pipe(take(1));
  }

  save(record: T) {
    if (record.id) {
      return this.update(record);
    } else {
      return this.create(record);
    }
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
