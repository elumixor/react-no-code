import { createContext } from "react";

const colors = {
    white: "#fff",
    black: "#2F2F2F",
    branch: "#5a5a5a",
    hint: "#828282",
    greyProjects: "#e5e5e5",
    greyHeader: "#d9d9d9",
    greyLoop: "#e8e8e8",
    object1: "#494949",
    object2: "#5a5a5a",
    object3: "#707070",
} as const;

const images = {
    icons: {
        block: require("../assets/icons/block.png"),
    },
};

export const styles = {
    colors,
    images,
    texts: {
        section: {
            fontSize: 20,
            fontWeight: "200",
            textTransform: "uppercase",
            letterSpacing: 2,
            color: colors.branch,
        },
    },
} as const;

export type Styles = typeof styles;

export const StyleContext = createContext(styles);
