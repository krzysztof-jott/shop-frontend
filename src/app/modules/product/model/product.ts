export interface Product { // interfejs służy za klasę data, dzięki niemu będzie można zwracać typ product np z serwisu
   name: string;
   category: string;
   description: string;
   fullDescription: string;
   price: number;
   currency: string;
   image: string;
   slug: string;
}