import { useState } from "react";

export function useMultiple<T>(initial: T[]) {
    const [values, setValues] = useState(initial);

    const updated = initial.map(() => false);
    const intermediate = [...values];

    function setValue(i: number, value: T) {
        updated[i] = true;
        intermediate[i] = value;

        if (updated.every(u => u)) setValues(intermediate);
    }

    return [values, setValue] as const;
}
