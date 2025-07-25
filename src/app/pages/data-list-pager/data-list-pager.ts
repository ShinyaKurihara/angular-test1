import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ApiGetList, PostType } from '../../services/api-get-list';

@Component({
  selector: 'app-data-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './data-list-pager.html',
  styleUrl: './data-list-pager.css'
})
export class DataListPager implements OnInit {
  private apiService = inject(ApiGetList);
  posts: PostType[] = [];

  form!: FormGroup;
  currentPage = 1;
  itemsPerPage = 20;

  ngOnInit() {
    this.form = new FormGroup({
      keyword: new FormControl(''),
      tag: new FormControl(''),
    });

    // 初期ロード
    this.loadPosts();

    // 検索が変わったら1ページ目から再読み込み
    this.form.valueChanges.subscribe(() => {
      this.currentPage = 1;
      this.loadPosts();
    });
  }

  loadPosts() {
    const keyword = this.form.get('keyword')?.value;
    const tag = this.form.get('tag')?.value;

    if (tag) {
      this.apiService.getPostsByTag(tag, this.currentPage, this.itemsPerPage).subscribe(posts => {
        this.posts = posts;
      });
    } else {
      this.apiService.getPostsByPage(this.currentPage, this.itemsPerPage, keyword).subscribe(posts => {
        this.posts = posts;
      });
    }
  }

  nextPage() {
    this.currentPage++;
    this.loadPosts();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPosts();
    }
  }
}
