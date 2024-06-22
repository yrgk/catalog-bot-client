// import WebApp from "@twa-dev/sdk"
import { useNavigate } from "react-router-dom"
import "./CatalogItem.css"

export default function CatalogItem(props: CatalogItemProps, onAdd: Function) {
    const navigate = useNavigate()

    const onAddHandler = () => {
        onAdd(props);
    }

    return (
        <>
        <div className="catalogItem">
            <div onClick={() => navigate('/item')} className="catalogItemCoverBox">
                <img className="catalogItemCover" src={props.coverUrl} alt="Not loaded" loading="lazy" />
            </div>

            <div onClick={() => navigate('/item')} className="catalogItemTextBox">
                <h3 id="price">{ props.price }{ props.currency }</h3>
                <h5>{ props.title }</h5>
            </div>

            <div className="addButton" onClick={() => onAddHandler()}>
                    <h5 className="addButtonText">Add</h5>
            </div>
        </div>
        </>
    )
}