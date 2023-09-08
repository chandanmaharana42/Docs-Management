import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './shared/jwt.interceptor';
import { ErrorInterceptor } from './shared/error.interceptor';
import { fakeBackendProvider } from './shared/dummy-backend';
import { ToastrModule } from 'ngx-toastr';
import { DocWorkspaceComponent } from './doc-workspace/doc-workspace.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DocViewerComponent } from './doc-viewer/doc-viewer.component';
import { RouteResolver } from './shared/route.resolver';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TrashComponent } from './trash/trash.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    DocWorkspaceComponent,
    FileUploadComponent,
    DocViewerComponent,
    TrashComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 10000, 
      progressBar: true,
    }),
  ],
  providers: [
    RouteResolver,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
