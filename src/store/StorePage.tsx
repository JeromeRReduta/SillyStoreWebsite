import type { JSX } from "react";
import useGetAllProducts from "./useGetAllProducts";
import mockProduct from "../mocks/MockProduct";
import Error from "../utils/Error";
import Loading from "../utils/Loading";
import FlatList from "../utils/FlatList";
import type { IProductResponse } from "../../SillyStoreCommon/dtos/responses/IProductResponse";
import ProductCard from "./ProductCard";

export default function StorePage(): JSX.Element {
    const { data: products, status, error } = useGetAllProducts(
        async () => { return Array.from({ length: 10 }, (_, i) => mockProduct(i + 1)) }
    );
    if (status === "error") {
        return <Error message={`Sorry, something went wrong: ${error.message}`} />
    }
    if (status === "pending") {
        return <Loading message={`Loading products for you...`} />
    }
    // success case
    return <FlatList
        data={products}
        renderItem={(product: IProductResponse) => <ProductCard product={product} />}
        keyExtractor={(product: IProductResponse) => product.id} />
}

