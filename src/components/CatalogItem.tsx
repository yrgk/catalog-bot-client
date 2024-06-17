import "./CatalogItem.css"

export default function CatalogItem(props: CatalogItemProps) {
    return (
        <>
        <div className="catalogItem">
            {/* <img className="catalogItemCover" src={props.coverUrl} alt="Not loaded" loading="lazy" /> */}
            <div className="catalogItemCoverBox"></div>
            <div className="catalogItemTextBox">
                <h3 id="price">{ props.price }{ props.currency }</h3>
                <h3>{ props.title.slice(0, 1) }...</h3>
            </div>

        </div>
        </>
    )
}