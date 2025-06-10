import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryManuComponent } from './product-category-manu.component';

describe('ProductCategoryManuComponent', () => {
  let component: ProductCategoryManuComponent;
  let fixture: ComponentFixture<ProductCategoryManuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoryManuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCategoryManuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
