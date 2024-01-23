import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { OrderAdminComponent } from './order/order.admin.component';
import { ProductAdminComponent } from './product/product.admin.component';
import { CategoryAdminComponent } from './category/category.admin.component';
import { DetailOrderAdminComponent } from './detail-order/detail.order.admin.component';
import { UpdateProductAdminComponent } from './product/update/update.product.admin.component';
import { UpdateCategoryAdminComponent } from './category/update/update.category.component';
import { InsertCategoryAdminComponent } from './category/insert/insert.category.admin.component';
import { NgModule } from '@angular/core';
import { TestComponent } from './test/test.component';
import { InsertProductAdminComponent } from './product/insert/insert.product.admin.component';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: 'orders',
                component: OrderAdminComponent
            },
            {
                path: 'products',
                component: ProductAdminComponent
            },
            {
                path: 'categories',
                component: CategoryAdminComponent
            },
            {
                path: 'orders/:id',
                component: DetailOrderAdminComponent
            },
            {
                path: 'products/update/:id',
                component: UpdateProductAdminComponent
            },
            {
                path: 'products/insert',
                component: InsertProductAdminComponent
            },
            {
                path: 'categories/update/:id',
                component: UpdateCategoryAdminComponent
            },
            {
                path: 'categories/insert',
                component: InsertCategoryAdminComponent
            },
            {
                path: 'test',
                component: TestComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
