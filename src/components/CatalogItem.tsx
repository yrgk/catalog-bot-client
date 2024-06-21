// import WebApp from "@twa-dev/sdk"
import "./CatalogItem.css"

export default function CatalogItem(props: CatalogItemProps) {

    return (
        <>
        <div className="catalogItem">
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