import {NgModule} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AgGridModule} from 'ag-grid-angular';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainPageComponent} from './main-page/main-page.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {UserDetailsComponent} from './user/user-details/user-details.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {UsersListComponent} from './user/users-list/users-list.component';
import {PageDetailsComponent} from './page/page-details/page-details.component';
import {PageListComponent} from './page/page-list/page-list.component';
import {UniversityListComponent} from './university/university-list/university-list.component';
import {UniversityDetailsComponent} from './university/university-details/university-details.component';
import {DialogUserCreateComponent} from './user/dialog-user-create/dialog-user-create.component';
import {LoginComponent} from './login/login.component';
import {UserSettingsComponent} from './user/user-settings/user-settings.component';
import {
  DialogUniversityCreateComponent
} from './university/dialog-university-create/dialog-university-create.component';
import {PageUserComponent} from './page/page-user/page-user.component';
import {MatButtonModule} from '@angular/material/button'
import {QuillModule} from 'ngx-quill';
import {QuillEditorComponent} from './page/quill-editor/quill-editor.component'
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatDividerModule} from "@angular/material/divider";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatExpansionModule} from "@angular/material/expansion";
import {PageCardComponent} from './page/page-card/page-card.component';
import {DialogPageCreateComponent} from './page/dialog-page-create/dialog-page-create.component';
import {UserCardComponent} from './user/user-card/user-card.component';

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
    UserSettingsComponent,
    DialogUniversityCreateComponent,
    PageUserComponent,
    QuillEditorComponent,
    PageCardComponent,
    DialogPageCreateComponent,
    UserCardComponent
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
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSnackBarModule,
    FlexLayoutModule,
    QuillModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: MainPageComponent},
      {path: 'universities', component: UniversityListComponent},
      {path: 'university/:universityId', component: UniversityDetailsComponent},
      {path: 'accounts', component: UsersListComponent},
      {path: 'accounts/create', component: DialogUserCreateComponent},
      {path: 'accounts/settings', component: UserSettingsComponent},
      {path: 'account/:userId', component: UserDetailsComponent},
      {path: 'pages', component: PageListComponent},
      {path: 'page/:pageId', component: PageDetailsComponent},
      {path: 'page/:pageId/edit', component: QuillEditorComponent},
      {path: 'pages/:userId', component: PageUserComponent},
      {path: 'login', component: LoginComponent}
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
    }),
    MatDividerModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
