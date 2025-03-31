import { useContext } from "react";
import { Context } from "./ContextData";

export function useContextData() {
    const context = useContext(Context);

    if (!context) {
        throw new Error("useContextData must be used within a ContextData Provider");
    }

    return context;
}
