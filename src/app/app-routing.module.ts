import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = 
[  {
  path: '',
  loadComponent: () => import('./components/frontpage/frontpage.component').then(m => m.FrontpageComponent)
  },
  {
    path: 'room/:id',
    loadComponent: () => import('./components/room/room.component').then(m => m.RoomComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
