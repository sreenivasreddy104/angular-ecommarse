import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-manu',
  templateUrl: './product-category-manu.component.html',
  styleUrls: ['./product-category-manu.component.css']
})
export class ProductCategoryManuComponent implements OnInit {

  productCategories: ProductCategory[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getListProductCategories();
  }

  getListProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories: ' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }
}
