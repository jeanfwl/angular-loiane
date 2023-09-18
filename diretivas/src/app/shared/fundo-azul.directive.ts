import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[fundoAzul]',
})
export class FundoAzulDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    // Não seguro.
    // const ref = this.elementRef.nativeElement as HTMLElement;
    // ref.classList.add('bg-primary');

    // Seguro
    renderer.addClass(elementRef.nativeElement, 'bg-primary');
  }
}
