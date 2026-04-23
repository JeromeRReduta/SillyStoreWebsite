import { useContext } from "react";
import type { JustAddedValues } from "./JustAddedContext";
import JustAddedContext from "./JustAddedContext";

export default function useJustAdded(): JustAddedValues {
    const values: JustAddedValues | null = useContext(JustAddedContext);
    if (!values) {
        throw new Error("useJustAdded requires provider!");
    }
    return values;
}
