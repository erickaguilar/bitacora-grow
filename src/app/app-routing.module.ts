import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@modules/auth/pages/guard/auth.guard';

import { EMPTY_STRING, INTERNAL_PATHS } from '@data/constants/routes';
import { SkeletonComponent } from '@layout/skeleton/skeleton.component';
import { HomeModule } from '@modules/home/home.module';
import { AuthModule } from '@modules/auth/auth.module';

const routes: Routes = [
  {
   path: EMPTY_STRING,
   component: SkeletonComponent,
   children: [
    {
     path: INTERNAL_PATHS.HOME_DEFAULT,
     loadChildren: () => import('@modules/home/home.module').then((m): typeof HomeModule => m.HomeModule),
     canActivate: [AuthGuard]
    },
    {
      path: INTERNAL_PATHS.AUTH_DEFAULT,
      loadChildren: () => import('@modules/auth/auth.module').then((m): typeof AuthModule => m.AuthModule),
    },
    { path: '**', redirectTo: 'auth', pathMatch: 'full' },
   ],
  },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
