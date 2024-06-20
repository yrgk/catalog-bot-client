// import WebApp from '@twa-dev/sdk'
import './CatalogHeader.css'

export default function CatalogHeader(props: CatalogHeaderProps) {
    // WebApp.ready()
    return (
        <>
        <div className='Header'>
            <h2 className='headerTitle'>{ props.title }</h2>
        </div>
        </>
    )
}