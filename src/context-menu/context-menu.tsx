import { PropsWithChildren, useContext, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { StyleContext } from "../style-context";
import { Point } from "../utils";
import { IContextItem } from "./context-item";
import { ContextMenuContext, ContextMenuProvidedValue } from "./context-menu-context";
import { ContextMenuItems } from "./context-menu-items";

export function ContextMenu({ children }: PropsWithChildren) {
    const [touchStart, setTouchStart] = useState<[Point, IContextItem[]]>();
    const [touchCurrent, setTouchCurrent] = useState(new Point());

    const { colors } = useContext(StyleContext);
    const styles = StyleSheet.create({
        contextOverlay: {
            position: "absolute",
            width: "100%",
            height: "100%",
            display: touchStart ? "flex" : "none",
        },
        contextOverlayBackground: {
            position: "absolute",
            backgroundColor: colors.greyProjects,
            opacity: 0.8,
            width: "100%",
            height: "100%",
        },
    });

    const contextMenuProvidedValue = new ContextMenuProvidedValue([], (event, items) => {
        const {
            nativeEvent: { pageX: x, pageY: y },
        } = event;

        setTouchCurrent({ x, y });
        setTouchStart([{ x, y }, items]);
    });

    let selected = -1;

    function onTouchEnd() {
        setTouchStart(undefined);
        touchStart?.[1][selected]?.action();
    }

    return (
        <Pressable onTouchEnd={onTouchEnd} onTouchMove={({ nativeEvent: { pageX: x, pageY: y } }) => setTouchCurrent({ x, y })}>
            <ContextMenuContext.Provider value={contextMenuProvidedValue}>{children}</ContextMenuContext.Provider>
            <View style={styles.contextOverlay}>
                <View style={styles.contextOverlayBackground} />
                {touchStart && (
                    <ContextMenuItems touchStart={touchStart} touchCurrent={touchCurrent} setSelected={value => (selected = value)} />
                )}
            </View>
        </Pressable>
    );
}
