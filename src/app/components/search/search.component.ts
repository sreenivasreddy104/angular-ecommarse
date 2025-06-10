import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  doSearch(keyword: string): void {
      this.route.navigateByUrl(`search/${keyword}`); // Navigate to the search results page with the keyword
  }
}
