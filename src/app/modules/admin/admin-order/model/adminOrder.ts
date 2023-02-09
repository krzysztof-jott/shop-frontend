import { AdminOrderRow } from "./adminOrderRow";
import { AdminPayment } from "./adminPayment";
import { AdminOrderLog } from "./adminOrderLog";

export interface AdminOrder {
	id: number,
	placeDate: Date,
	orderStatus: string,
	orderRows: Array<AdminOrderRow>
	grossValue: number,
	firstname: string,
	lastname: string,
	street: string,
	zipcode: string,
	city: string,
	email: string,
	phone: string,
	payment: AdminPayment,
// 	11.0 dodaję pole:
	orderLogs: Array<AdminOrderLog>;
}