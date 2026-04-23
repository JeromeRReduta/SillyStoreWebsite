import { createContext, type Context } from "react";
import type { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse";

export interface JustAddedValues {
    readonly product: IProductResponse | null;
    emit(proudct: IProductResponse | null): void;
    readonly serialKey: number;
}

const JustAddedContext: Context<JustAddedValues | null> =
    createContext<JustAddedValues | null>(null);

export default JustAddedContext;
