import {APP_INITIALIZER, NgModule} from '@angular/core';
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
import {DialogUserCreateComponent} from './user/dialogs/dialog-user-create/dialog-user-create.component';
import {LoginComponent} from './login/login.component';
import {UserSettingsComponent} from './user/user-settings/user-settings.component';
import {
  DialogUniversityCreateComponent
} from './university/dialog-university-create/dialog-university-create.component';
import {PageUserComponent} from './page/page-user/page-user.component';
import {MatButtonModule} from '@angular/material/button'
import {QuillModule} from 'ngx-quill';
import {QuillEditorComponent} from './quill-editor/quill-editor.component'
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatDividerModule} from "@angular/material/divider";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatExpansionModule} from "@angular/material/expansion";
import {PageCardComponent} from './page/page-card/page-card.component';
import {DialogPageCreateComponent} from './page/dialog-page-create/dialog-page-create.component';
import {UserCardComponent} from './user/user-card/user-card.component';
import {UniversityCardComponent} from './university/university-card/university-card.component';
import {ConfirmationDialogComponent} from './dialog/confirmation-dialog/confirmation-dialog.component';
import {ErrorDialogComponent} from './dialog/error-dialog/error-dialog.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {
  DialogUserEnrolledUniversitiesComponent
} from './user/dialogs/dialog-user-enrolled-universities/dialog-user-enrolled-universities.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {DialogPageCreatorComponent} from './page/dialog-page-creator/dialog-page-creator.component';
import {
  DialogUserChangePasswordComponent
} from './user/dialogs/dialog-user-change-password/dialog-user-change-password.component';
import {SuccessDialogComponent} from './dialog/success-dialog/success-dialog.component';
import {
  DialogUserChangeUsernameComponent
} from './user/dialogs/dialog-user-change-username/dialog-user-change-username.component';
import {DialogUserUpdateComponent} from './user/dialogs/dialog-user-update/dialog-user-update.component';
import {
  DialogUserChangeAccountTypeComponent
} from './user/dialogs/dialog-user-change-account-type/dialog-user-change-account-type.component';
import {SetupService} from 'src/assets/service/setup.service';
import {SearchComponent} from './search/search.component';
import {TemplatesListComponent} from './templates/templates-list/templates-list.component';
import {MatListModule} from "@angular/material/list";
import {UniversitySelectorComponent} from './university/university-selector/university-selector.component';
import {DialogTemplateCreateComponent} from './templates/dialog-template-create/dialog-template-create.component';
import {PageEditorComponent} from './page/page-editor/page-editor.component';
import {TemplateEditorComponent} from './templates/template-editor/template-editor.component';
import {
  DialogTemplateChangeNameComponent
} from './templates/dialog-template-change-name/dialog-template-change-name.component';
import {TemplateSelectorComponent} from './templates/template-selector/template-selector.component';
import {DialogTemplateLoadComponent} from './templates/dialog-template-load/dialog-template-load.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatChipsModule} from "@angular/material/chips";
import {FileCardComponent} from './file-card/file-card.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTableModule} from "@angular/material/table";

export function SetupApp(setup: SetupService) {
  return () => setup.initialize();
}

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
    UserCardComponent,
    UniversityCardComponent,
    ConfirmationDialogComponent,
    ErrorDialogComponent,
    SpinnerComponent,
    DialogUserEnrolledUniversitiesComponent,
    DialogPageCreatorComponent,
    DialogUserChangePasswordComponent,
    SuccessDialogComponent,
    DialogUserChangeUsernameComponent,
    DialogUserUpdateComponent,
    DialogUserChangeAccountTypeComponent,
    SearchComponent,
    TemplatesListComponent,
    UniversitySelectorComponent,
    DialogTemplateCreateComponent,
    PageEditorComponent,
    TemplateEditorComponent,
    DialogTemplateChangeNameComponent,
    TemplateSelectorComponent,
    DialogTemplateLoadComponent,
    FileCardComponent
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
      {path: '', component: MainPageComponent, title: 'Strona główna'},
      {path: 'universities', component: UniversityListComponent, title: 'Uniwersytety'},
      {path: 'university/:universityId', component: UniversityDetailsComponent, title: 'Szczegóły uniwersytetu'},
      {path: 'accounts', component: UsersListComponent, title: 'Użytkownicy'},
      {path: 'accounts/create', component: DialogUserCreateComponent, title: 'Stwórz użytkownika'},
      {path: 'accounts/settings', component: UserSettingsComponent, title: 'Ustawienia'},
      {path: 'account/:userId', component: UserDetailsComponent, title: 'Szczegóły użytkownika'},
      {path: 'pages', component: PageListComponent, title: 'Strony'},
      {path: 'page/:pageId', component: PageDetailsComponent, title: 'Szczegóły strony'},
      {path: 'page/:pageId/edit', component: PageEditorComponent, title: 'Edycja strony'},
      {path: 'pages/:userId', component: PageUserComponent},
      {path: 'templates', component: TemplatesListComponent, title: 'Szablony'},
      {path: 'template/:templateId/edit', component: TemplateEditorComponent, title: 'Edycja szablonu'},
      {path: 'login', component: LoginComponent, title: 'Logowanie'},
      {path: 'search', component: SearchComponent, title: 'Search',}
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
    MatExpansionModule,
    MatAutocompleteModule,
    MatListModule,
    MatGridListModule,
    MatChipsModule,
    MatProgressBarModule,
    MatTableModule
  ],
  providers: [
    SetupService,
    {
      provide: APP_INITIALIZER,
      useFactory: SetupApp,
      deps: [SetupService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
