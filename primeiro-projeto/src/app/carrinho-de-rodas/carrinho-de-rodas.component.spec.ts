import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoDeRodasComponent } from './carrinho-de-rodas.component';

describe('CarrinhoDeRodasComponent', () => {
  let component: CarrinhoDeRodasComponent;
  let fixture: ComponentFixture<CarrinhoDeRodasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarrinhoDeRodasComponent]
    });
    fixture = TestBed.createComponent(CarrinhoDeRodasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
