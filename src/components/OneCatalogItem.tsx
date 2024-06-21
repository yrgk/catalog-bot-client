import WebApp from '@twa-dev/sdk';
import './OneCatalogItem.css'
import { useNavigate } from 'react-router-dom';

export default function OneCatalogItem(props: OneCatalogItemProps) {
    const navigate = useNavigate()
    const BackButton = WebApp.BackButton;
    BackButton.show();
    BackButton.onClick(function() {
        BackButton.hide();
    });
    WebApp.onEvent('backButtonClicked', function() {
        navigate('/')
    });
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