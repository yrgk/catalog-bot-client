import React, { useState } from 'react';
import './FilterBar.css';

interface FilterBarProps {
    onFilterChange: (filters: FilterOptions) => void;
}

interface FilterOptions {
    sortBy: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
    searchQuery: string;
}

// [FILTERBAR] Компонент фильтрации и сортировки товаров
export default function FilterBar({ onFilterChange }: FilterBarProps) {
    // [FILTERBAR] Состояние фильтров
    const [filters, setFilters] = useState<FilterOptions>({
        sortBy: 'price_asc',
        searchQuery: ''
    });

    // [FILTERBAR] Обработка изменения сортировки
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newFilters = { ...filters, sortBy: e.target.value as FilterOptions['sortBy'] };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    // [FILTERBAR] Обработка поиска
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFilters = { ...filters, searchQuery: e.target.value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="filter-bar">
            {/* [FILTERBAR] Поиск по товарам */}
            <input
                type="text"
                placeholder="Поиск товаров..."
                value={filters.searchQuery}
                onChange={handleSearchChange}
                className="search-input"
            />
            {/* [FILTERBAR] Сортировка товаров */}
            <select
                value={filters.sortBy}
                onChange={handleSortChange}
                className="sort-select"
            >
                <option value="price_asc">По возрастанию цены</option>
                <option value="price_desc">По убыванию цены</option>
                <option value="name_asc">По названию (А-Я)</option>
                <option value="name_desc">По названию (Я-А)</option>
            </select>
        </div>
    );
} 