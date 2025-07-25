import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface PostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface TagType {
  slug: string;
  name: string;
  url: string;
}
@Injectable({ providedIn: 'root' })

export class ApiGetList {
  private http = inject(HttpClient);
  //private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  //ワード検索
  searchWord(keyword: string): Observable<PostType[]> {
    return this.http
      .get<{ posts: PostType[] }>(`https://dummyjson.com/posts/search?q=${keyword}`)
      .pipe(map(res => res.posts));
  }

  //タグ検索
  searchTag(tag: string): Observable<PostType[]> {
    return this.http
      .get<{ posts: PostType[] }>(`https://dummyjson.com/posts/tag/${tag}`)
      .pipe(map(res => res.posts));
  }

  // 全件取得
  getAll(): Observable<PostType[]> {
    return this.http
      .get<{ posts: PostType[] }>(`https://dummyjson.com/posts?limit=0`)
      .pipe(map(res => res.posts));
  }

  // タグ一覧取得
  getTagList(): Observable<TagType[]> {
    return this.http.get<TagType[]>(`https://dummyjson.com/posts/tags`);
  }

  // 投稿取得（ページング + ワード検索）
getPostsByPage(page: number, limit: number, keyword = ''): Observable<PostType[]> {
  const skip = (page - 1) * limit;
  const url = keyword
    ? `https://dummyjson.com/posts/search?q=${keyword}&limit=${limit}&skip=${skip}`
    : `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`;
  return this.http.get<{ posts: PostType[] }>(url).pipe(map(res => res.posts));
}

// タグ検索（ページング対応）
getPostsByTag(tag: string, page: number, limit: number): Observable<PostType[]> {
  const skip = (page - 1) * limit;
  return this.http
    .get<{ posts: PostType[] }>(`https://dummyjson.com/posts/tag/${tag}?limit=${limit}&skip=${skip}`)
    .pipe(map(res => res.posts));
}

}
