import { createContext } from "react";

export const NavContext = createContext({
    current: "",
    goto: (value: string) => undefined as void,
    params: {} as Record<string, string>,
});
