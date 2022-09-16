import { LayoutChangeEvent } from "react-native";

type LayoutCallback = (event: LayoutChangeEvent) => void;
export function forwardLayout<T, Props>(component: (props: Props, onLayout?: LayoutCallback) => T) {
    return (props: Props & { onLayout?: LayoutCallback }) => component(props, props.onLayout);
}
