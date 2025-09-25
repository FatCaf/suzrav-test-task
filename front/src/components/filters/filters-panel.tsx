'use client'
import { SearchBar } from './search-bar'
import { CategoryFilter } from './category-filter'
import { PriceRangeFilter } from './price-range-filter'
import { SortByPrice } from './sort'

export function FiltersPanel() {
    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-500 rounded-xl shadow-md">
            <SearchBar />
            <CategoryFilter />
            <PriceRangeFilter />
            <SortByPrice />
        </div>
    )
}
