import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { Subject } from 'rxjs';

type ALERT_TYPES = 'success' | 'danger' | 'warning' | 'primary';

@Injectable({
  providedIn: 'root',
})
export class AlertModalService {
  constructor(private bsModalService: BsModalService) {}

  showAlert(message: string, type: ALERT_TYPES, timeout?: number) {
    const bsModalRef: BsModalRef =
      this.bsModalService.show(AlertModalComponent);
    bsModalRef.content.message = message;
    bsModalRef.content.type = type;

    if (timeout) {
      setTimeout(() => {
        bsModalRef.hide();
      }, timeout);
    }
  }

  showConfirm(
    title: string,
    message: string,
    okButtonText?: string,
    cancelButtonText?: string
  ) {
    const bsModalRef: BsModalRef = this.bsModalService.show(
      ConfirmModalComponent
    );
    const refContent: ConfirmModalComponent = bsModalRef.content;
    refContent.title = title;
    refContent.message = message;
    refContent.confirmResult = new Subject<boolean>();
    if (okButtonText) refContent.okButtonText = okButtonText;
    if (cancelButtonText) refContent.cancelButtonText = cancelButtonText;

    return refContent.confirmResult;
  }
}
