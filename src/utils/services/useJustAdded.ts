import { useContext } from "react";
import JustAddedContext, {
    JustAddedValues,
} from "../components/JustAddedContext";

export default function useJustAdded(): JustAddedValues {
    const values: JustAddedValues | null = useContext(JustAddedContext);
    if (!values) {
        throw new Error("useJustAdded requires provider!");
    }
    return values;
}
