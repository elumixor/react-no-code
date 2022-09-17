import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { View } from "react-native";
import "reflect-metadata";
import { ContextMenu } from "./context-menu";
import { Projects } from "./projects";
import { Resources } from "./resources/resources";
import "./utils";

const projects = [
    { name: "MM5", location: "C:\\work\\webx.slots.mm5" },
    { name: "MM3", location: "C:\\work\\webx.slots.mm3" },
    { name: "Core", location: "C:\\work\\webx.libs.slots.core" },
];

export function MainComponent() {
    const style = useContext(Resources);

    return (
        <View>
            <Resources.Provider value={style}>
                <ContextMenu>
                    <Projects projects={projects} />
                </ContextMenu>
            </Resources.Provider>

            <StatusBar style="auto" />
        </View>
    );
}
