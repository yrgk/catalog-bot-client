import "./CatalogItem.css"
import telegram-web-app from 'https://telegram.org/js/telegram-web-app.js'

export default function CatalogItem(props: CatalogItemProps) {
    telegram
    return (
        <>
        <div className="catalogItem">
            <div className="catalogItemCoverBox">
                <img className="catalogItemCover" src={props.coverUrl} alt="Not loaded" loading="lazy" />
            </div>
            <div className="catalogItemTextBox">
                <h3 id="price">{ props.price }{ props.currency }</h3>
                <h3>{ props.title.slice(0, 19) }...</h3>
            </div>

        </div>
        </>
    )
}