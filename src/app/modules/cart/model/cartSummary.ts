// 10.2 muszę odwzorować strukturę, którą mam na backendzie
import { CartSummaryItem } from "./cartSummaryItem";
import { Summary } from "./summary";

export interface CartSummary {
	id: number;
	items: Array<CartSummaryItem>;
	summary: Summary;
}