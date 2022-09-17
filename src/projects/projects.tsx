import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ContextMenuProvider } from "../context-menu";
import { Resources } from "../resources";
import { IProject, Project } from "./project";

export function Projects({ projects }: { projects: IProject[] }) {
    const { colors, texts, images } = useContext(Resources);

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

    const contextMenuItems = [
        {
            label: "Add Project",
            action: () => console.log("Add Project"),
            icon: images.icons.block,
        },
    ];

    return (
        <ContextMenuProvider items={contextMenuItems}>
            <View style={styles.container}>
                <Text style={styles.title}>Projects</Text>
                {projects.map(({ name, location }) => (
                    <Project key={name} name={name} location={location} />
                ))}
            </View>
        </ContextMenuProvider>
    );
}
