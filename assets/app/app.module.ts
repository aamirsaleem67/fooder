import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from "./app.component";
import { HttpModule } from '@angular/http';
@NgModule({
    declarations: [
        AppComponent,
        SignupComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
    ],
    bootstrap: [AppComponent],
    providers: [AppService]
})
export class AppModule {

}