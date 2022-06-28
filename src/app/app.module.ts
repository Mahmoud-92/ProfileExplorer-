import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { FollowersComponent } from './user/followers/followers.component';
import { FollowingComponent } from './user/following/following.component';
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import { ListCardComponent } from './user/list-card/list-card.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'user', component: UserComponent, children: [
      { path: 'followers', component: FollowersComponent },
      { path: 'following', component: FollowingComponent }
    ]
  }

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    FollowersComponent,
    FollowingComponent,
    ListCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
