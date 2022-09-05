import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialogModule } from '@angular/material/dialog';


// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from  '@angular/material/toolbar';
import { UsersListComponent } from './users-list/users-list.component';
import { PageDetailsComponent } from './page-details/page-details.component';
import { PageListComponent } from './page-list/page-list.component';
import { UniversityListComponent } from './university-list/university-list.component';
import { UniversityDetailsComponent } from './university-details/university-details.component';
import { DialogUserCreateComponent } from './dialog-user-create/dialog-user-create.component';
import { LoginComponent } from './login/login.component';
import { DialogUniversityCreateComponent } from './dialog-university-create/dialog-university-create.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TopBarComponent,
    UserDetailsComponent,
    UsersListComponent,
    PageDetailsComponent,
    PageListComponent,
    UniversityListComponent,
    UniversityDetailsComponent,
    DialogUserCreateComponent,
    LoginComponent,
    DialogUniversityCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    AgGridModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: '', component: MainPageComponent },
      { path: 'universities', component: UniversityListComponent },
      { path: 'university/:universityId', component: UniversityDetailsComponent },
      { path: 'accounts', component: UsersListComponent },
      { path: 'accounts/create', component: DialogUserCreateComponent },
      { path: 'account/:userId', component: UserDetailsComponent },
      { path: 'pages', component: PageListComponent },
      { path: 'page/:pageId', component: PageDetailsComponent },
      { path: 'login', component: LoginComponent }
    ]),
    BrowserAnimationsModule,
    BrowserModule,
        // ngx-translate and the loader module
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
