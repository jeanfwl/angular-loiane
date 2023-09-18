import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[highlightMouse]',
})
export class HighlightMouseDirective {
  @HostListener('mouseenter') onMouseEnter() {
    this.backgroundColor = 'yellow';
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = 'white';
  }

  @HostBinding('style.backgroundColor') get setBgColor(): string {
    // Manipulações extra.
    return this.backgroundColor;
  }
  private backgroundColor: string = 'white';
  constructor() {}
}
