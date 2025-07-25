import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
//import { combineLatest, startWith, skip } from 'rxjs';
//import { map } from 'rxjs/operators';
import { ApiGetList, PostType, TagType } from '../../services/api-get-list';

@Component({
  selector: 'app-data-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './data-list.html',
  styleUrl: './data-list.css',
})
export class DataList implements OnInit {
  private apiGetListService = inject(ApiGetList);

  posts: PostType[] = [];
  tags: TagType[] = [];
  searchForm!: FormGroup;

  ngOnInit() {
    this.searchForm = new FormGroup({
      wordSearchWord: new FormControl(''),
      tagSearchWord: new FormControl(''),
    });

    // 🔍 ワード検索だけを監視
    this.searchForm.get('wordSearchWord')!.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(word => {
          if (word) {
            return this.apiGetListService.searchWord(word);
          } else {
            return this.apiGetListService.getAll(); // 何も入力がない場合は全件
          }
        })
      )
      .subscribe(posts => {
        this.posts = posts;
      });

    // 🔖 タグ検索だけを監視
    this.searchForm.get('tagSearchWord')!.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(tag => {
          if (tag) {
            console.log(tag);
            return this.apiGetListService.searchTag(tag);
          } else {
            return this.apiGetListService.getAll(); // 何も入力がない場合は全件
          }
        })
      )
      .subscribe(posts => {
        this.posts = posts;
      });

    //初期表示
    this.apiGetListService.getAll().subscribe(posts => {
      this.posts = posts;
    });

    //タグ一覧
    this.apiGetListService.getTagList().subscribe(tags => {
      this.tags = tags;
    });
/*
    // 入力値の監視
      combineLatest([
        this.searchForm.get('wordSearchWord')!.valueChanges.pipe(
          startWith(''),
          debounceTime(300),
          distinctUntilChanged()
        ),
        this.searchForm.get('tagSearchWord')!.valueChanges.pipe(
          startWith(''),
          debounceTime(300),
          distinctUntilChanged()
        )
      ])
      .pipe(
        skip(1),
        switchMap(([word, tag]) => {
          if (word) {
            console.log('→ ワード検索API呼び出し');
            return this.apiGetListService.searchWord(word);
          } else if (tag){
            console.log('→ タグ検索API呼び出し');
            return this.apiGetListService.searchTag(tag);
          } else {
            console.log('→ ALL');
            return this.apiGetListService.getAll();
          }
        })
      )
      .subscribe(posts => {
        this.posts = posts;
      });

    // 初期表示
    this.apiGetListService.getAll().subscribe(posts => {
      console.log('→ 初回ALL');
      this.posts = posts;
    });
*/
  }
}
