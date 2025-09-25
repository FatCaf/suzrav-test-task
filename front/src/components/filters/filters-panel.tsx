'use client'
import { SearchBar } from './search-bar'
import { CategoryFilter } from './category-filter'
import { PriceRangeFilter } from './price-range-filter'
import { SortByPrice } from './sort'
import { useQueryFilters } from '@/hooks/filters/use-query-filters'

export function FiltersPanel() {
    const { setParam, getParam, clearAll, all } = useQueryFilters()

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-500 rounded-xl shadow-md w-full">
            <SearchBar setParam={setParam} getParam={getParam} />
            <CategoryFilter setParam={setParam} getParam={getParam} />
            <PriceRangeFilter
                setParam={setParam}
                getParam={getParam}
                searchParams={all}
            />
            <SortByPrice setParam={setParam} getParam={getParam} />
            <button
                onClick={() => clearAll()}
                className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
            >
                Clear
            </button>
        </div>
    )
}
