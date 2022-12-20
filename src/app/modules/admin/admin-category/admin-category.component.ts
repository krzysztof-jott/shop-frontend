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

    // 28.3 dodaję referencję do tabeli:
    @ViewChild(MatTable) table!: MatTable<any>;


    // 22.1 wstrzykuję serwis:
    constructor(private adminCategoryService: AdminCategoryService,
                // 28.0 wstrzykuję serwis:
                private dialogService: AdminConfirmDialogService
    ) {
    }

    // 22.3 wywołuję metodę:
    ngOnInit(): void {
        this.getCategories();
    }

    // 22.2 tworzę metodę do pobierania:
    getCategories() {
        this.adminCategoryService.getCategories()
            .subscribe(categories => this.dataSource = categories);
    }

    confirmDelete(element: AdminCategoryNameDto) { // 28.1 kopiuję z admin-product i zmieniam:
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