import "./CatalogItem.css"

export default function CatalogItem(props: CatalogItemProps) {
    return (
        <>
        <div className="catalogItem">
            {/* <img className="catalogItemCover" src={props.coverUrl} alt="Not loaded" loading="lazy" /> */}
            {/* <div className="catalogItemCoverBox"></div> */}
            <h2>{props.price}{props.currency}</h2>
            <h2>{props.title}</h2>
        </div>
        </>
    )
}