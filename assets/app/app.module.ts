import { SigninComponent } from './signin/signin.component';
import { AuthService } from './auth/auth.service';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from "./app.component";
import { HttpModule } from '@angular/http';
import { StarRatingModule } from 'angular-star-rating';

@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        SigninComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        StarRatingModule.forRoot()
    ],
    bootstrap: [AppComponent],
    providers: [AppService, AuthService]
})
export class AppModule {

}