interface CatalogItemProps {
    id: number;
    title: string;
    description: string;
    price: number;
    cover_url: string;
    currency: string;
    shop_id: number;
    onAdd: (price: number) => void;
}

type CatalogItem = {
    id: number;
    title: string;
    description: string;
    price: number;
    cover_url: string;
    currency: string;
    shop_id: number;
}

interface CatalogListProps {
    items: CatalogItem[];
    onAdd: (price: number) => void,
}