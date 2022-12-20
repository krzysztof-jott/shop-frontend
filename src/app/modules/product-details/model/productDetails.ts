import {Review} from "./review";

export interface ProductDetails {
	id: number;
	name: string;
	description: string;
	fullDescription: string;
	category: string;
	price: number;
	currency: string;
	image: string;
	slug: string;
	// 47.1 dodaję pole:
	reviews: Array<Review>;
}