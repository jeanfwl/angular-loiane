import { environment } from 'src/environments/environment';
import { Component, OnDestroy } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnDestroy {
  constructor(private uploadFileService: UploadFileService) {}

  files!: Set<File>;
  uploadSub!: Subscription;
  progress = 0;

  ngOnDestroy() {
    this.uploadSub?.unsubscribe();
  }

  onChange(event: Event) {
    const fileInput = <HTMLInputElement>event.target;
    this.files = new Set();
    if (fileInput.files) {
      Array.from(fileInput.files).forEach((file) => this.files.add(file));
    }

    this.progress = 0;
  }

  onUpload() {
    if (this.files.size) {
      this.uploadSub = this.uploadFileService
        .upload(this.files, `${environment.BASE_URL}/upload`)
        .pipe(
          uploadProgress((progress) => (this.progress = progress)),
          filterResponse(),
          catchError((error) => {
            console.log(error);
            return EMPTY;
          })
        )
        // res é o response.body que o filterResponse() retorna.
        .subscribe((res) => console.log('Upload concluído.'));
    }
  }

  onDownloadExcel() {
    this.uploadFileService
      .getFile(`${environment.BASE_URL}/downloadExcel`)
      .subscribe((res: Blob) => {
        this.uploadFileService.handleDownloadFile(res, 'report.xlsx');
      });
  }

  onDownloadPDF() {
    this.uploadFileService
      .getFile(`${environment.BASE_URL}/downloadPDF`)
      .subscribe((res: Blob) => {
        this.uploadFileService.handleDownloadFile(res, 'report.pdf');
      });
  }
}
