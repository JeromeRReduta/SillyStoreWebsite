import type { JSX } from "react";
import type { IProductResponse } from "../../SillyStoreCommon/dtos/responses/IProductResponse";
import css from "./product-list.module.css"

export default function ProductList({ products }: { products: IProductResponse[] }) {
    return <section className={css.product_list}>
        {products.map((product: IProductResponse) => <ProductCard key={product.id} product={product} />)}
    </section>
}

function ProductCard({
    product
}: { product: IProductResponse }): JSX.Element {
    const { id, imageSrc, title, description, price } = product;
    return <div>STUB: {title}</div>
}
