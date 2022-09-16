import { View } from "react-native";
import { IPoint, Point, useMultiple } from "../utils";
import { IContextItem } from "./context-item";
import { ContextMenuItem } from "./context-menu-item";

export function ContextMenuItems(props: {
    touchStart: [IPoint, IContextItem[]];
    touchCurrent: IPoint;
    maxDistance?: number;
    setSelected?: (value: number) => void;
}) {
    const {
        touchStart: [{ x: sx, y: sy }, items],
        touchCurrent: { x: cx, y: cy },
        maxDistance = 100,
        setSelected,
    } = props;

    const x = sx + 50;
    const y = sy - 10;

    const [positions, setPosition] = useMultiple(items.map(() => new Point()));

    const dx = cx - x;
    const dy = cy - y;

    let selected = -1;
    let minD = Number.MAX_VALUE;

    for (let i = 0; i < positions.length; i++) {
        const { x: px, y: py } = positions[i];

        const distance = Math.sqrt((dx - px) ** 2 + (dy - py) ** 2);

        if (distance < maxDistance && distance < minD) {
            selected = i;
            minD = distance;
        }
    }

    setSelected?.(selected);

    return (
        <View
            style={{
                position: "absolute",
                left: x,
                top: y,
            }}
        >
            {items.map((item, i) => (
                <ContextMenuItem key={i} onLayout={e => setPosition(i, e.nativeEvent.layout)} selected={selected === i} {...item} />
            ))}
        </View>
    );
}
