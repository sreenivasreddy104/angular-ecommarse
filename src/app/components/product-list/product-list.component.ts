import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  correntCategoryId: number = 1;
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      // this.listProducts();
      this.getListProductsByCategoryId();
    });
  }

  listProducts() {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
      }
    );
  }

  getListProductsByCategoryId() {

    // Check if 'id' parameter is available in the route
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      // Get the 'id' parameter from the route
      this.correntCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }

    this.productService.getProductsByCategoryId(this.correntCategoryId).subscribe(
      data => {
        this.products = data;
      }
    );
  }
}
