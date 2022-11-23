export interface Page<T> { // 6.0 parametr generyczny pozwoli sparametryzować listę wyników
    content: T[], // tablica produktów
    totalElements: number // całkowita liczba elementów w bazie danych.
}