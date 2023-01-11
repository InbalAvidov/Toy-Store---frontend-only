export function ToyPreview({ toy }) {
    return (
        <article>
            <h1>{toy.name}</h1>
            <img src={`https://robohash.org/${toy.name}?set=set3`} />
            <p>Price: <span>{toy.price.toLocaleString()}$</span></p>
        </article>
    )
}