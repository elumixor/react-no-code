import { PropsWithChildren, useContext } from "react";
import { Pressable } from "react-native";
import { IContextItem } from "./context-item";
import { ContextMenuContext } from "./context-menu-context";

/**
 * Wrap a component in it to provide values to the context menu
 * @param children The component to wrap
 * @param items The items to provide to the context menu
 */
export function ContextMenuProvider({ children, items }: PropsWithChildren<{ items: IContextItem[] }>) {
    const contextMenu = useContext(ContextMenuContext);
    const augmentedContextItems = contextMenu.augmentWith(items);

    return (
        <Pressable onLongPress={e => augmentedContextItems.show(e)}>
            <ContextMenuContext.Provider value={augmentedContextItems}>{children}</ContextMenuContext.Provider>
        </Pressable>
    );
}
