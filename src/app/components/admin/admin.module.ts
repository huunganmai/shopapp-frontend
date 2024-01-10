import { NgModule } from '@angular/core';
import { OrderAdminComponent } from './order/order.admin.component';
import { CategoryAdminComponent } from './category/category.admin.component';
import { ProductAdminComponent } from './product/product.admin.component';
import { DetailOrderAdminComponent } from './detail-order/detail.order.admin.component';
import { AdminComponent } from './admin.component';
import { UpdateCategoryAdminComponent } from './category/update/update.category.component';
import { InsertCategoryAdminComponent } from './category/insert/insert.category.admin.component';
import { UpdateProductAdminComponent } from './product/update/update.product.admin.component';
import { InsertProductAdminComponent } from './product/insert/insert.product.admin.component';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { TestComponent } from './test/test.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AdminComponent,
        OrderAdminComponent,
        CategoryAdminComponent,
        ProductAdminComponent,
        DetailOrderAdminComponent,
        UpdateCategoryAdminComponent,
        InsertCategoryAdminComponent,
        UpdateProductAdminComponent,
        InsertProductAdminComponent,
        TestComponent
    ],
    imports: [AdminRoutingModule, CommonModule, FormsModule]
})
export class AdminModule {}
