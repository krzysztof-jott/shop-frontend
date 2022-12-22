export interface Page<T> { // interfejs służy do stronicowania obiektów, uniwersalny interfejs do stronicowania
    content: T[], // tablica produktów
    totalElements: number // całkowita liczba elementów w bazie danych.
}