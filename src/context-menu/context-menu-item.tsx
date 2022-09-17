import { useContext } from "react";
import { Image, Text, View } from "react-native";
import { Resources } from "../resources/resources";
import { forwardLayout, useDependent, useLayout } from "../utils";
import { IContextItem } from "./context-item";

export const ContextMenuItem = forwardLayout((props: IContextItem & { selected: boolean }, onLayout) => {
    const { label, action, icon, selected } = props;

    const styles = getStyles(selected);

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
        <View key={label} onLayout={onLayout} style={styles.container}>
            {icon ? (
                <Image
                    source={icon}
                    style={{
                        height: textHeight * 0.8,
                        width: imageWidth,
                        ...styles.image,
                    }}
                />
            ) : null}
            <Text onLayout={onTextLayout} style={styles.text} onPressOut={action}>
                {label}
            </Text>
        </View>
    );
});

function getStyles(selected: boolean) {
    const { colors } = useContext(Resources);

    return {
        container: {
            borderStyle: "solid",
            borderWidth: 2,
            paddingVertical: 4,
            paddingHorizontal: 6,
            borderColor: colors.black,
            backgroundColor: selected ? colors.black : colors.white,
            shadowColor: colors.black,
            margin: 2,
            alignSelf: "flex-start",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
        },
        image: {
            marginRight: 6,
            tintColor: selected ? colors.white : colors.black,
        },
        text: {
            fontWeight: "bold",
            color: selected ? colors.white : colors.black,
            fontSize: selected ? 18 : 14,
        },
    } as const;
}
