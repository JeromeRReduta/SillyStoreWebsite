import { createContext, type Context } from "react";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/productDtos";

export interface JustAddedValues {
    readonly product: IProductResponse | null;
    emit: (product: IProductResponse | null) => void;
    readonly serialKey: number;
}

const JustAddedContext: Context<JustAddedValues | null> =
    createContext<JustAddedValues | null>(null);

export default JustAddedContext;
