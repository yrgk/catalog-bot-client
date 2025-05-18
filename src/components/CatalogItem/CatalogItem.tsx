
import { useNavigate } from "react-router-dom"
import "./CatalogItem.css"

// interface CatalogItemProps {
//     id: number;
//     title: string;
//     description: string;
//     price: number;
//     discountPrice: number;
//     cover_url: string;
//     currency: string;
//     shop_id: number;
//     onAdd: (price: number) => void;
//     discountPercentage: number;
// }


function CatalogItem(props: CatalogItemProps) {
    const navigate = useNavigate()

    const onItemClicked = () => {
        navigate(`/item/${props.id}`);
    };


    // const onAddHandler = () => {
    //     props.onAdd(props.price);
    // }

    // const calculateDiscountPercentage = (price: number, discountPrice: number) => {
    //     if (price && discountPrice) {
    //         return Math.round(((price - discountPrice) / price) * 100); // Вычисляем процент скидки
    //     }
    //     return 0;
    // };

    return (
        <>
            <div className="catalogItem">
                <div onClick={onItemClicked} className="catalogItemCoverBox">
                    <img className="catalogItemCover" src={props.cover_url} alt="Not loaded" loading="lazy" />
                </div>
    
                <div onClick={onItemClicked} className="catalogItemTextBox">
                    {/* Отображение цены */}
                    {props.discountPrice > 0 ? (
                        <>
                            <h3 id="price" style={{ textDecoration: 'line-through' }}>
                                {props.price} {props.currency}
                            </h3>
                            <h3 className="discountPrice">
                                {/* {props.discountPrice} {props.currency} */}
                            </h3>
                            {/* <h5 className="discountPercentage">(-{props.discountPercentage}%)</h5> */}
                        </>
                    ) : (
                        <h3 id="price">{props.price} {props.currency}</h3>
                    )}
    
                    <h5 className="title">{props.title}</h5>
                </div>
    
                {/* <div className="addButton" onClick={onAddHandler}>
                    <h5 className="addButtonText">В корзину</h5>
                </div> */}
            </div>
        </>
    )
}

export default CatalogItem;