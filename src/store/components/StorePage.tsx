import type { JSX } from "react";
import useGetAllProducts from "../services/useGetAllProducts";
import ProductCard from "./ProductCard";
import css from "../css/store-page.module.css";
import FlatList from "../../utils/components/FlatList";
import JustAddedBar from "../../utils/components/JustAddedBar";
import Loading from "../../utils/components/Loading";
import ErrorComponent from "../../utils/components/Error";
import MockServices from "../../../mocks/MockServices";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/productDtos";
import useMockGetAllProducts from "../../../mocks/hooks/useMockGetAllProducts";

export default function StorePage(): JSX.Element {
    const { data: products, status, error } = useMockGetAllProducts();

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
