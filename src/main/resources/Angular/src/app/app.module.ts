import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { UniversityDetailsComponent } from './university-details/university-details.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { UserDetailsComponent } from './user-details/user-details.component';

//
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from  '@angular/material/toolbar'; 
import { UsersListComponent } from './users-list/users-list.component';
import { UniversityListComponent } from './university-list/university-list.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TopBarComponent,
    UniversityDetailsComponent,
    UserDetailsComponent,
    SideBarComponent,
    UsersListComponent,
    UniversityListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule.forRoot([
      { path: '', component: MainPageComponent },
      { path: 'university', component: UniversityListComponent },
      { path: 'university/:universityId', component: UniversityDetailsComponent },
      { path: 'account', component: UsersListComponent },
      { path: 'account/:userId', component: UserDetailsComponent },
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
