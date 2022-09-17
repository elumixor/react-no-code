import { LayoutRectangle } from "react-native";
import { clamp } from "./clamp";
import { Point } from "./point";

export function rectDistance(point: Point, rect: LayoutRectangle) {
    const left = rect.x;
    const top = rect.y;
    const right = rect.x + rect.width;
    const bottom = rect.y + rect.height;

    const nearestX = clamp(point.x, left, right);
    const nearestY = clamp(point.y, top, bottom);

    const dx = point.x - nearestX;
    const dy = point.y - nearestY;

    return Math.sqrt(dx * dx + dy * dy);
}
