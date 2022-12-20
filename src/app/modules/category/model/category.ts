// 33.4 tworzę interfejs:
import { Product } from "../../common/model/product";

export interface Category {
    name: string;
    description: string;
    slug: string;
    product: Array<Product>;
}