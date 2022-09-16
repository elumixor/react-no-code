import { useEffect, useState } from "react";

export function useDependent<T, Args extends unknown[]>(callback: (...args: Args) => T, args: Args, defaultValue: T): T {
    const [value, setValue] = useState<T>(defaultValue);

    useEffect(() => setValue(callback(...args)), args);

    return value;
}
