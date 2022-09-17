import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ContextMenuProvider } from "../context-menu";
import { Resources } from "../resources/resources";

export interface IProject {
    name: string;
    location: string;
}

export function Project({ name, location }: IProject) {
    const { colors, images } = useContext(Resources);

    const styles = StyleSheet.create({
        projectContainer: { margin: 15, alignItems: "center" },
        projectName: { fontWeight: "700", margin: 5, color: colors.black },
        projectPath: { color: colors.hint },
    });

    const contextMenuItems = [
        {
            label: `Rename "${name}"`,
            action: () => console.log(`Renaming "${name}"`),
            icon: images.icons.block,
        },
    ];

    return (
        <ContextMenuProvider items={contextMenuItems}>
            <View key={name} style={styles.projectContainer}>
                <Text style={styles.projectName}>{name}</Text>
                <Text style={styles.projectPath}>{location}</Text>
            </View>
        </ContextMenuProvider>
    );
}
