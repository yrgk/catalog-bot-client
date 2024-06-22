// import WebApp from "@twa-dev/sdk"
import { useNavigate } from "react-router-dom"
import "./CatalogItem.css"
import { useState } from "react"
import WebApp from "@twa-dev/sdk"

export default function CatalogItem(props: CatalogItemProps) {
    const navigate = useNavigate()
    const [itemCount, setItemCount] = useState(0)
    const [totalCost, setTotalCost] = useState(0)
    const tg = WebApp

    // onAdd(props);
    const onAdd = () => {
        setItemCount(itemCount => itemCount + 1)
        setTotalCost(totalCost => totalCost += props.price)
        tg.HapticFeedback.selectionChanged()

        if (itemCount === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.HapticFeedback.impactOccurred('medium')
            tg.MainButton.setParams({
                text: `Buy ${itemCount} items | ${totalCost}RUB`
            })
        }
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
                {/* <h5>{ itemCount }</h5>
                <h5>{ totalCost }</h5> */}
            </div>

            <div className="addButton" onClick={() => onAdd()}>
                    <h5 className="addButtonText">Add</h5>
            </div>
        </div>
        </>
    )
}