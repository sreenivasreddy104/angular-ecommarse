import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previowsCategoryId: number = 1;
  currentCategoryName: string = '';
  searchMode: boolean = false;
  previousSearchKeyword: string = '';

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  constructor(private productService: ProductService,
     private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      // this.listProducts();
      this.getListProductsByCategoryId();
    });
  }

  // listProducts() {
  //   this.productService.getProducts().subscribe(
  //     data => {
  //       this.products = data;
  //     }
  //   );
  // }

  getListProductsByCategoryId() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
        const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    const hasCategoryName: boolean = this.route.snapshot.paramMap.has('name');
    console.log('hasCategoryName: ' + hasCategoryName);
    if (hasCategoryId && hasCategoryName) {
      // Get the 'id' parameter from the route
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }


    if (this.previowsCategoryId != this.currentCategoryId) {
        this.thePageNumber = 1;
    }

    this.previowsCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId: ${this.currentCategoryId}, pageNumber: ${this.thePageNumber}`);
    this.productService.getProductsListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId).subscribe(
      data => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1; // Convert to 1-based index
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      })
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // if the keyword is different than previous
    // then set thePageNumber to 1
    if (this.previousSearchKeyword != keyword) {
      this.thePageNumber = 1;
    }

    this.previousSearchKeyword = keyword;

    this.productService.getSearchProductsPaginate(this.thePageNumber - 1, this.thePageSize, keyword).subscribe(
      this.processResults())
  }

  processResults() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1; // Convert to 1-based index
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;

      // Log the results for debugging
      console.log(`Products: ${JSON.stringify(this.products)}`);
      console.log(`Page Number: ${this.thePageNumber}, Page Size: ${this.thePageSize}, Total Elements: ${this.theTotalElements}`);
    }
  }

    updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.handleListProducts();
  }

  addToCart(product: Product) {
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }
}
