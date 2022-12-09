// 31.0 wpisuję export, żeby interfejs był publiczny (wszystko będzie wyeksportowane)
export interface Product { // interfejs służy za klasę data, dzięki niemu będzie można zwracać typ product np z serwisu
   // 21.X usuwam id i dodaję sluga zamiast niego:
   // id: number;
   name: string;
   category: string;
   description: string;
   price: number;
   currency: string;
   image: string;
   slug: string;
}