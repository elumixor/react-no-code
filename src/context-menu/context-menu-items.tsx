import { useEffect } from "react";
import { View } from "react-native";
import { IPoint, rectDistance, useMultiple } from "../utils";
import { IContextItem } from "./context-item";
import { ContextMenuItem } from "./context-menu-item";

export function ContextMenuItems(props: {
    touchStart: [IPoint, IContextItem[]];
    touchCurrent: IPoint;
    maxDistance?: number;
    selected: number;
    setSelected?: (value: number) => void;
}) {
    const {
        touchStart: [{ x: sx, y: sy }, items],
        touchCurrent: { x: cx, y: cy },
        maxDistance = 100,
        setSelected,
        selected,
    } = props;

    const x = sx + 50;
    const y = sy - 10;

    const [rects, setRect] = useMultiple(
        items.map(() => ({ x: 0, y: 0, width: 0, height: 0 })),
        "once",
    );

    useEffect(() => {
        const dx = cx - x;
        const dy = cy - y;

        let selected = -1;
        let minD = Number.MAX_VALUE;

        for (let i = 0; i < rects.length; i++) {
            const distance = rectDistance({ x: dx, y: dy }, rects[i]);

            if (distance === 0) {
                selected = i;
                break;
            }

            if (distance < maxDistance && distance < minD) {
                selected = i;
                minD = distance;
            }
        }

        setSelected?.(selected);
    }, [selected, rects, cx, cy]);

    return (
        <View style={{ position: "absolute", left: x, top: y }}>
            {items.map((item, i) => (
                <ContextMenuItem key={i} onLayout={e => setRect(i, e.nativeEvent.layout)} selected={selected === i} {...item} />
            ))}
        </View>
    );
}
