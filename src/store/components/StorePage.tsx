import type { JSX } from "react";
import type { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse";
import mockProduct from "../../mocks/MockProduct";
import FlatList from "../../utils/FlatList";
import Loading from "../../utils/Loading";
import useGetAllProducts from "../services/useGetAllProducts";
import ProductCard from "./ProductCard";
import Error from "../../utils/Error";
import css from "../css/store-page.module.css";
import JustAddedBar from "../../utils/JustAddedBar";

export default function StorePage(): JSX.Element {
    const {
        data: products,
        status,
        error,
    } = useGetAllProducts(async () => {
        return Array.from({ length: 10 }, (_, i) => mockProduct(i + 1));
    });
    if (status === "error") {
        return (
            <Error message={`Sorry, something went wrong: ${error.message}`} />
        );
    }
    if (status === "pending") {
        return <Loading message={`Loading products for you...`} />;
    }
    // success case
    return (
        <>
            <JustAddedBar />
            <FlatList
                listClassName={css.product_list}
                listItemClassName={css.product_list_item}
                data={products}
                renderItem={(product: IProductResponse) => (
                    <ProductCard product={product} />
                )}
                keyExtractor={(product: IProductResponse) => product.id}
            />
        </>
    );
}
