import { useContext } from "react";
import { Image, Text, View } from "react-native";
import { StyleContext } from "../style-context";
import { forwardLayout, useDependent, useLayout } from "../utils";
import { IContextItem } from "./context-item";

export const ContextMenuItem = forwardLayout((props: IContextItem & { selected: boolean }, onLayout) => {
    const { label, action, icon, selected } = props;

    const styles = useContext(StyleContext);

    const ar = useDependent(
        icon => {
            if (!icon) return 1;

            const { width, height } = Image.resolveAssetSource(icon);
            return width / height;
        },
        [icon],
        1,
    );

    const [textLayout, onTextLayout] = useLayout();
    const textHeight = textLayout?.height ?? 0;
    const imageHeight = textHeight * 0.8;
    const imageWidth = imageHeight * ar;

    return (
        <View
            key={label}
            onLayout={onLayout}
            style={{
                borderStyle: "solid",
                borderWidth: 2,
                paddingVertical: 4,
                paddingHorizontal: 6,
                borderColor: styles.colors.black,
                backgroundColor: selected ? styles.colors.black : styles.colors.white,
                shadowColor: styles.colors.black,
                margin: 2,
                alignSelf: "flex-start",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
            }}
        >
            {icon ? (
                <Image
                    source={icon}
                    style={{
                        height: textHeight * 0.8,
                        width: imageWidth,
                        marginRight: 6,
                        tintColor: selected ? styles.colors.white : styles.colors.black,
                    }}
                />
            ) : null}
            <Text
                onLayout={onTextLayout}
                style={{
                    fontWeight: "bold",
                    color: selected ? styles.colors.white : styles.colors.black,
                    fontSize: selected ? 18 : 14,
                }}
                onPressOut={action}
            >
                {label}
            </Text>
        </View>
    );
});
