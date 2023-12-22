import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { OrderComponent } from './components/order/order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenIntercepter } from './interceptors/token.interceptor';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { DetailOrderComponent } from './components/detail-order/detail-order.component';
import { AppComponent } from './app/app.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        DetailProductComponent,
        OrderComponent,
        UserProfileComponent,
        AdminComponent,
        DetailOrderComponent,
        AppComponent
    ],
    imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenIntercepter,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
