// import WebApp from "@twa-dev/sdk"
import { useNavigate } from "react-router-dom"
import "./CatalogItem.css"

export default function CatalogItem(props: CatalogItemProps) {
    const navigate = useNavigate()
    return (
        <>
        <div onClick={() => navigate('/item')} className="catalogItem">
            <div className="catalogItemCoverBox">
                <img className="catalogItemCover" src={props.coverUrl} alt="Not loaded" loading="lazy" />
            </div>
            <div className="catalogItemTextBox">
                <h3 id="price">{ props.price }{ props.currency }</h3>
                <h5>{ props.title }</h5>
            </div>

        </div>
        </>
    )
}

/*
    /item/*ID*
    /catalog*ID*
*/