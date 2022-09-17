import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { GestureResponderEvent, Pressable, StyleSheet, View } from "react-native";
import { Resources } from "../resources";
import { Point } from "../utils";
import { IContextItem } from "./context-item";
import { ContextMenuContext, ContextMenuProvidedValue } from "./context-menu-context";
import { ContextMenuItems } from "./context-menu-items";

export function ContextMenu({ children }: PropsWithChildren) {
    const [touchStart, setTouchStart] = useState<[Point, IContextItem[]]>();
    const [touchCurrent, setTouchCurrent] = useState(new Point());
    const [selected, setSelected] = useState(-1);

    const { sounds } = useContext(Resources);

    const styles = getStyles(!!touchStart);

    const contextMenuProvidedValue = new ContextMenuProvidedValue([], (event, items) => {
        const {
            nativeEvent: { pageX: x, pageY: y },
        } = event;

        setTouchCurrent({ x, y });
        setTouchStart([{ x, y }, items]);
    });

    function onTouchEnd() {
        setTouchStart(undefined);
        touchStart?.[1][selected]?.action();
    }

    useEffect(() => {
        if (touchStart && selected !== -1) sounds.click.play({ volume: 0.2 });
    }, [selected, touchStart]);

    function onTouchMove({ nativeEvent: { pageX: x, pageY: y } }: GestureResponderEvent) {
        setTouchCurrent({ x, y });
    }

    return (
        <Pressable onTouchEnd={onTouchEnd} onTouchMove={onTouchMove}>
            <ContextMenuContext.Provider value={contextMenuProvidedValue}>{children}</ContextMenuContext.Provider>
            <View style={styles.overlay}>
                <View style={styles.bgOverlay} />
                {touchStart && (
                    <ContextMenuItems touchStart={touchStart} touchCurrent={touchCurrent} selected={selected} setSelected={setSelected} />
                )}
            </View>
        </Pressable>
    );
}
function getStyles(display: boolean) {
    const { colors } = useContext(Resources);

    return StyleSheet.create({
        overlay: {
            position: "absolute",
            width: "100%",
            height: "100%",
            display: display ? "flex" : "none",
        },
        bgOverlay: {
            position: "absolute",
            backgroundColor: colors.greyProjects,
            opacity: 0.8,
            width: "100%",
            height: "100%",
        },
    });
}
