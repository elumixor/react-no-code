import { useState } from "react";
import { useDependent } from "./use-dependent";

export function useMultiple<T>(initial: T[], strategy: "all" | "once" = "all") {
    const [values, setValues] = useState(initial);
    const updated = useDependent(values => values.map(() => false), [values], []);
    const intermediate = [...values];

    function setValue(i: number, value: T) {
        if (strategy === "once" && updated.every(u => u)) return;

        updated[i] = true;
        intermediate[i] = value;

        if (updated.every(u => u)) setValues(intermediate);
    }

    return [values, setValue] as const;
}
