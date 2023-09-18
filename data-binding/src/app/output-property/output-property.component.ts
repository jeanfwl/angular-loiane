import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'contador',
  templateUrl: './output-property.component.html',
  styleUrls: ['./output-property.component.css']
})
export class OutputPropertyComponent {
  @Input() contador: number = 0;
  @Output() mudouValor = new EventEmitter();
  @ViewChild('inputContador') inputContador: ElementRef = new ElementRef(null);

  incrementar() {
    this.inputContador.nativeElement.value++;
    this.mudouValor.emit({ valor: +this.inputContador.nativeElement.value });
  }
  
  decrementar() {
    this.inputContador.nativeElement.value--;
    this.mudouValor.emit({ valor: +this.inputContador.nativeElement.value });
  }
}
