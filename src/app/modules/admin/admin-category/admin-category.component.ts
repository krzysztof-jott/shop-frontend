import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminCategoryNameDto } from "../common/dto/AdminCategoryNameDto";
import { AdminCategoryService } from "./admin-category.service";
import { AdminConfirmDialogService } from "../common/service/admin-confirm-dialog.service";
import { MatTable } from "@angular/material/table";

@Component({
    selector: 'app-admin-category',
    templateUrl: './admin-category.component.html',
    styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

    displayedColumns: string[] = ["id", "name", "actions"];
    dataSource: Array<AdminCategoryNameDto> = [];

    @ViewChild(MatTable) table!: MatTable<any>;

    constructor(private adminCategoryService: AdminCategoryService,
                private dialogService: AdminConfirmDialogService
    ) { }

    ngOnInit(): void {
        this.getCategories();
    }

    getCategories() {
        this.adminCategoryService.getCategories()
            .subscribe(categories => this.dataSource = categories);
    }

    confirmDelete(element: AdminCategoryNameDto) {
        this.dialogService.openConfirmDialog("Czy na pewno chcesz usunąć kategorię?")
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    this.adminCategoryService.delete(element.id) // z elementu wyciągam id
                        .subscribe(() => {
                            this.dataSource.forEach((value, index) => {
                                if (element == value) {
                                    this.dataSource.splice(index, 1)
                                    this.table.renderRows(); // potrzebna referencja do tabeli, dodaję u góry
                                }
                            })
                        });
                }
            });
    }
}