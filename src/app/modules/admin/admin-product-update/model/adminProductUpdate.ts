// // 23.3 tworzę interfejs:
export interface AdminProductUpdate {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    currency: string;
    // 9.11UP dodaję pole image:
    image: string;
}