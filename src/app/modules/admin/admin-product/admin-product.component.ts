import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AdminProductService } from "./admin-product.service";
import { MatPaginator } from "@angular/material/paginator";
import { startWith, switchMap } from "rxjs";
import { AdminProduct } from "./model/adminProduct";
import { AdminConfirmDialogService } from "../common/service/admin-confirm-dialog.service";
import { MatTable } from "@angular/material/table";

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-product.component.html',
    styleUrls: ['./admin-product.component.scss']
})
export class AdminProductsComponent implements AfterViewInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatTable) table!: MatTable<any>;
    displayedColumns: string[] = ["image", "id", "name", "price", "salePrice", "actions"];
    totalElements: number = 0;
    dataSource: AdminProduct[] = [];

    constructor(private adminProductService: AdminProductService,
                private dialogService: AdminConfirmDialogService
    ) {

    }

    ngAfterViewInit(): void {
        this.paginator.page.pipe(
                startWith({}),
                switchMap(() => {
                    return this.adminProductService.getProducts(this.paginator.pageIndex, this.paginator.pageSize);
                }),
        ).subscribe(data => {
            this.totalElements = data.totalElements;
            this.dataSource = data.content;
        })
    }

    confirmDelete(element: AdminProduct) {
        this.dialogService.openConfirmDialog("Czy na pewno chcesz usunąć produkt?")
                .afterClosed()
                .subscribe(result => {
                    if (result) {
                        this.adminProductService.delete(element.id)
                                .subscribe(() => {
                                    this.dataSource.forEach((value, index) => {
                                        if (element == value) {
                                            this.dataSource.splice(index, 1)
                                            this.table.renderRows();
                                        }
                                    })
                                })
                        ;
                    }
                })
        ;
    }
}