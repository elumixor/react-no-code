import { useState } from "react";
import { Button, Text, View } from "react-native";

export function Tracker({ name, initialValue = 0 }: { name: string; initialValue: number }) {
    const [value, setValue] = useState(initialValue);

    const increment = () => setValue(value + 1);

    return (
        <View style={{ alignItems: "center" }}>
            <Button title={`${name}++`} onPress={() => increment()}></Button>
            <Text onPress={() => increment()}>
                {name} = {value}
            </Text>
        </View>
    );
}
