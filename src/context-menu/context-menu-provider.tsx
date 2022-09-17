import { PropsWithChildren, useContext } from "react";
import { GestureResponderEvent, Pressable } from "react-native";
import { IContextItem } from "./context-item";
import { ContextMenuContext } from "./context-menu-context";

interface Props extends PropsWithChildren {
    items: IContextItem[];
    onPress?: (event: GestureResponderEvent) => void;
}

/**
 * Wrap a component in it to provide values to the context menu
 */
export function ContextMenuProvider(props: Props) {
    const { children, items, onPress } = props;
    const contextMenu = useContext(ContextMenuContext);
    const augmentedContextItems = contextMenu.augmentWith(items);

    return (
        <Pressable onPress={onPress} onLongPress={e => augmentedContextItems.show(e)}>
            <ContextMenuContext.Provider value={augmentedContextItems}>{children}</ContextMenuContext.Provider>
        </Pressable>
    );
}
