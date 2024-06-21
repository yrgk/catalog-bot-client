import './OneCatalogItem.css'

export default function OneCatalogItem(props: OneCatalogItemProps) {
    return (
        <>
            <div className="OneCatalogItem">
            <div className="OneCatalogItemCoverBox">
                <img className="catalogItemCover" src={props.coverUrl} alt="Not loaded" loading="lazy" />
            </div>
            <div className="OneCatalogItemTextBox">
                <h1 id="price">{ String(props.price) }{ props.currency }</h1>
                <h2>{ props.title }</h2>
                {/* <div className="cart">
                    <h2 style={{margin: 10}}>Add to cart</h2>
                </div> */}

                <h3>{ props.description }</h3>
            </div>

        </div>
        </>
    )
}