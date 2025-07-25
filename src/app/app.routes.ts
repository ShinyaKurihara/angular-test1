import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
//import { DataList } from './pages/data-list/data-list';

export const routes: Routes = [
  { path: '', component: Home },
  //{ path: 'list', component: DataList },

  {
    path: 'list',
    loadComponent: () =>
      import('./pages/data-list/data-list').then((m) => m.DataList),
  },

 {
    path: 'list2',
    loadComponent: () =>
      import('./pages/data-list-pager/data-list-pager').then((m) => m.DataListPager),
  },

];
