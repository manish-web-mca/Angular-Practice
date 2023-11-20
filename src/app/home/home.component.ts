import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private blogService : BlogService) { }

  ngOnInit(): void {
    this.blogService.getPostList().subscribe((data) => {
      console.log('data=>', data);
    })

    this.blogService.getAllPost().then(data => {
      console.log('manish=>', data);
    }).catch((error) => {
      console.log('Error...', error);
    }).finally(() =>{
      console.log('The promise is completed...');
    });
  }

}
