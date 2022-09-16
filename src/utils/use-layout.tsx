import { useState } from "react";
import { LayoutChangeEvent, LayoutRectangle } from "react-native";

export function useLayout() {
    const [layout, setLayout] = useState<LayoutRectangle>();
    return [layout, (event: LayoutChangeEvent) => setLayout(event.nativeEvent.layout)] as const;
}
