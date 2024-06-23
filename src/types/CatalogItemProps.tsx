interface CatalogItemProps {
    id: number;
    title: string;
    price: number;
    coverUrl: string;
    currency: string;
    onAction: (price: number) => void;
    // onAction: (props: CatalogItemProps) => void,
}

interface CatalogListProps {
    items: {
        id: number;
        title: string;
        price: number;
        coverUrl: string;
        currency: string;
    }[];
    onAction: (price: number) => void,
}