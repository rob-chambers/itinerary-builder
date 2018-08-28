import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildComponent } from './build/build.component';

const routes: Routes = [
  { path: 'build', component: BuildComponent },
  { path: '', redirectTo: '/build', pathMatch: 'full' },
  //{ path: 'detail/:id', component: HeroDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
