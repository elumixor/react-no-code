import { createContext } from "react";
import { GestureResponderEvent } from "react-native";
import { IContextItem } from "./context-item";

export class ContextMenuProvidedValue {
    constructor(readonly items: IContextItem[], readonly onShow: (event: GestureResponderEvent, items: IContextItem[]) => void) {}

    augmentWith(items: IContextItem[]) {
        return new ContextMenuProvidedValue([...items, ...this.items], this.onShow);
    }

    show(e: GestureResponderEvent) {
        this.onShow(e, this.items);
    }
}

export const ContextMenuContext = createContext(new ContextMenuProvidedValue([], () => undefined));
