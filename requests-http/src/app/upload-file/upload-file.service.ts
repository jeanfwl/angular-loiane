import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor(private http: HttpClient) {}

  upload(files: Set<File>, url: string) {
    const formData = new FormData();
    files.forEach((file) => formData.append(file.name, file));

    // Alternativa, sem criar manual o http request.
    return this.http.post(url, formData, {
      observe: 'events',
      reportProgress: true,
    });

    const request = new HttpRequest('POST', url, formData);
    return this.http.request(request);
  }

  getFile(url: string) {
    return this.http.get(url, {
      responseType: 'blob',
    });
  }

  handleDownloadFile(blob: Blob, filename: string) {
    // Para IE
    if (window.navigator && (<any>window.navigator).msSaveOrOpenBlob) {
      (<any>window.navigator).msSaveOrOpenBlob(blob);
      return;
    }

    const fileUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = filename;
    link.click(); // só funciona no chrome e firefox mais recente.

    // Isso para funcionar em versões mais antigas do firefox
    // link.dispatchEvent(
    //   new MouseEvent('click', {
    //     bubbles: true,
    //     cancelable: true,
    //     view: window,
    //   })
    // );

    setTimeout(() => {
      window.URL.revokeObjectURL(fileUrl);
      link.remove();
    }, 100);
  }
}
