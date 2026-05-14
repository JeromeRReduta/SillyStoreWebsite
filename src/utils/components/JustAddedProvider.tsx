import type React from "react";
import { useState } from "react";
import JustAddedContext, { type JustAddedValues } from "./JustAddedContext";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/productDtos";

export default function JustAddedProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [product, setProduct] = useState<IProductResponse | null>(null);
    const [serialKey, setSerialKey] = useState<number>(0);
    function emit(product: IProductResponse | null): void {
        setProduct(product);
        setSerialKey(serialKey + 1);
    }
    const values: JustAddedValues = {
        product,
        emit,
        serialKey,
    };

    return (
        <JustAddedContext.Provider value={values}>
            {children}
        </JustAddedContext.Provider>
    );
}
