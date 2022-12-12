export interface AdminProductUpdate {
    id: number;
    name: string;
    description: string;
    fullDescription: string;
    // 17.1 też tu zmieniam na Id i na number:
    categoryId: number;
    price: number;
    currency: string;
    image: string;
    slug: string;
}