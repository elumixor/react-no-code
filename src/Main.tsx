import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import "reflect-metadata";
import { Tracker } from "./Tracker";

export function MainComponent() {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
        },
    });

    return (
        <View style={styles.container}>
            <Tracker name="a" initialValue={0} />

            <View style={{ height: 50 }}></View>

            <Tracker name="b" initialValue={10} />

            <StatusBar style="auto" />
        </View>
    );
}
