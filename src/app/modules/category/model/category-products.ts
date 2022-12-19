// 40.0 dodaję interfejs:
import { Category } from "./category";
import { Product } from "../../product/model/product";
import { Page } from "../../../shared/model/page";

export interface CategoryProducts {
    category: Category;
    products: Page<Product>;
}