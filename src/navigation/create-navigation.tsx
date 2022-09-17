import { ComponentType, PropsWithChildren, useContext, useState } from "react";
import { zip } from "../utils";
import { NavContext } from "./nav-context";

export function createNavigation() {
    function Navigator(props: PropsWithChildren<{ initial: string }>) {
        const { children, initial } = props;
        const [current, setCurrent] = useState(initial);

        const nav = { current, goto: setCurrent, params: {} };

        return <NavContext.Provider value={nav}>{children}</NavContext.Provider>;
    }

    function Screen<T>(props: { path: string; Component: ComponentType<T>; props: T & JSX.IntrinsicAttributes }) {
        const { path, Component, props: passedProps } = props;
        const location = useContext(NavContext);

        const [matched, params] = matches(location.current, path);
        if (matched) {
            location.params = params;
            return <Component {...passedProps} />;
        }

        return null;
    }

    return {
        Navigator,
        Screen,
    };
}

function matches(current: string, path: string) {
    const currentParts = current.split("/");
    const pathParts = path.split("/");

    if (currentParts.length !== pathParts.length) return [false, {}] as const;

    const params = {} as Record<string, string>;
    for (const [pathPart, currentPart] of zip(pathParts, currentParts)) {
        if (pathPart.startsWith(":")) params[pathPart.slice(1)] = currentPart;
        else if (pathPart !== currentPart) return [false, {}] as const;
    }

    return [true, params] as const;
}
