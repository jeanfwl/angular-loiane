import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  @Input() title!: string;
  @Input() message!: string;
  @Input() cancelButtonText = 'Não';
  @Input() okButtonText = 'Sim';

  @Input() confirmResult?: Subject<boolean>;

  constructor(public _bsModalRef: BsModalRef) {}

  onCancel() {
    this.setResultAndClose(false);
  }

  onConfirm() {
    this.setResultAndClose(true);
  }

  private setResultAndClose(result: boolean) {
    this.confirmResult?.next(result);
    this._bsModalRef.hide();
  }
}
