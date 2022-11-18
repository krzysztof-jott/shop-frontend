// 31.0 wpisuję export, żeby interfejs był publiczny (wszystko będzie wyeksportowane)
 export interface Product { // interfejs służy za klasę data, dzięki niemu będzie można zwracać typ product np z serwisu
    name: string;
    category: string;
    description: string;
    price: number;
    currency: string;
}