// import WebApp from "@twa-dev/sdk"
import { useNavigate } from "react-router-dom"
import "./CatalogItem.css"
// import { useState } from "react"
// import WebApp from "@twa-dev/sdk"

// const CatalogItem = ({id, title, price, coverUrl, currency, onAction}) => {
// const CatalogItem = ({props, onAction}) => {
function CatalogItem(props: CatalogItemProps) {
    const navigate = useNavigate()

    const onItemClicked = () => {
        navigate(`/item/${props.id}`, { state: {
            id: props.id,
            title: props.title,
            price: props.price,
            cover_url: props.cover_url,
            currency: props.currency,
            description: props.description
        } });
    };

    const onAddHandler = () => {
        props.onAdd(props.price);
    }

    return (
        <>
        <div className="catalogItem">
            <div onClick={onItemClicked} className="catalogItemCoverBox">
                <img className="catalogItemCover" src={props.cover_url} alt="Not loaded" loading="lazy" />
            </div>

            <div onClick={onItemClicked} className="catalogItemTextBox">
                <h3 id="price">{ props.price }{ props.currency }</h3>
                <h5 className="title">{ props.title }</h5>
            </div>
            <div className="addButton" onClick={onAddHandler}>
                <h5 className="addButtonText">В корзину</h5>
            </div>
        </div>
        </>
    )
}

export default CatalogItem;