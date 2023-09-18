import {
  Directive,
  HostListener,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective implements OnInit {
  @HostListener('mouseenter') onMouseEnter() {
    this.backgroundColor = this.highlight;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = this.defaultColor;
  }

  @HostBinding('style.backgroundColor') backgroundColor: string = 'white';
  @Input() defaultColor: string = 'white';
  @Input() highlight: string = 'yellow';

  constructor() {}

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }
}
