export interface AdminProductUpdate {
    id: number;
    name: string;
    description: string;
    fullDescription: string;
    categoryId: number; // 17.1 też tu zmieniam na Id i na number:
    price: number;
    currency: string;
    image: string;
    slug: string;
}