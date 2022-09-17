import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import "reflect-metadata";
import { ContextMenu } from "./context-menu";
import { createNavigation, NavContext } from "./navigation";
import { Projects } from "./projects";
import { Resources } from "./resources";
import "./utils";

const projects = [
    { name: "MM5", location: "C:\\work\\webx.slots.mm5" },
    { name: "MM3", location: "C:\\work\\webx.slots.mm3" },
    { name: "Core", location: "C:\\work\\webx.libs.slots.core" },
];

export function MainComponent() {
    const resources = useContext(Resources);

    const Navigation = createNavigation();

    return (
        <View>
            <Resources.Provider value={resources}>
                <ContextMenu>
                    <Navigation.Navigator initial={"projects"}>
                        <Navigation.Screen path={"projects"} Component={Projects} props={{ projects }} />
                        <Navigation.Screen path={"projects/:name"} Component={ProjectDetail} props={{}} />
                    </Navigation.Navigator>
                </ContextMenu>
            </Resources.Provider>

            <StatusBar style="auto" />
        </View>
    );
}

export function ProjectDetail() {
    const { colors, texts } = useContext(Resources);
    const {
        goto,
        params: { name },
    } = useContext(NavContext);

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
            backgroundColor: colors.greyProjects,
            alignItems: "center",
            paddingTop: "25%",
        },
        title: { ...texts.section, margin: 30 },
    });

    return (
        <View style={styles.container}>
            <Text onPress={() => goto("projects")}>{name}</Text>
        </View>
    );
}
