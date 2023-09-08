import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthguardGuard } from './shared/authguard.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DocViewerComponent } from './doc-viewer/doc-viewer.component';
import { RouteResolver } from './shared/route.resolver';

const routes: Routes = [
  // { path: '', redirectTo:'/dashboard' },
  { path: 'dashboard',
    component:DashboardComponent,
    canActivate:[AuthguardGuard],
  },
  { path: 'dashboard/docDetails/:id',
    component:DocViewerComponent,
    canActivate:[AuthguardGuard],
    resolve: {
      routeResolver: RouteResolver
    },
  },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  {
    path:'**' , redirectTo:'/dashboard'
  }
 
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
