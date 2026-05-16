import type { JSX } from "react";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/productDtos";
import ErrorComponent from "../../utils/components/Error";
import FlatList from "../../utils/components/FlatList";
import JustAddedBar from "../../utils/components/JustAddedBar";
import Loading from "../../utils/components/Loading";
import css from "../css/store-page.module.css";
import ProductCard from "./ProductCard";
import useGetAllProducts from "../services/useGetAllProducts";

export default function StorePage(): JSX.Element {
    const { data: products, status, error } = useGetAllProducts();

    if (status === "error") {
        return (
            <ErrorComponent
                message={`Sorry, something went wrong: ${error.message}`}
            />
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
