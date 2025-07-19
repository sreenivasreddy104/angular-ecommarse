import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map, tap } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import { get } from 'http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/products";
  private categoryUrl = "http://localhost:8080/product-category";

  constructor(private httpClient: HttpClient) { }

  // getProducts(): Observable<Product[]> {
  //   return this.httpClient.get<GetResponseProducts>(this.baseUrl).pipe(
  //     map(response => response._embedded.products));
  // }

  getProductsByCategoryId(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.getProducts(searchUrl);
  }

  getProductsListPaginate(thePage: number,
    thePageSize: number, categoryId: number): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
      + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductsCategory>(this.categoryUrl).pipe(
      tap(response => console.log('Raw Response: ', response)),
      map(response => response._embedded.productCategory));
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    return this.getProducts(searchUrl);
  }

  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  getSearchProductsPaginate(thePage: number,
                            thePageSize: number,
                            theSearchKeyword: string): Observable<GetResponseProducts> {

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theSearchKeyword}`
                    + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products));
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  }
};

interface GetResponseProductsCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
};