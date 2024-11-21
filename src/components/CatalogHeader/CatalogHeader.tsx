import './CatalogHeader.css'

export default function CatalogHeader(props: CatalogHeaderProps) {
    return (
        <>
        <div className='Header'>
            <h2 className='headerTitle'>{ props.title }</h2>
        </div>
        </>
    )
}