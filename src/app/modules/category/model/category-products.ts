import { Category } from "./category";
import { Product } from "../../common/model/product";
import { Page } from "../../common/model/page";

export interface CategoryProducts {
    category: Category;
    products: Page<Product>;
}