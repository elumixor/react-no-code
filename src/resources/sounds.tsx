import { Audio, AVPlaybackSource, AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
import { Sound } from "expo-av/build/Audio/Sound";

interface ISoundOptions {
    volume?: number;
    loop?: boolean;
}

const isStatusSuccess = (status: AVPlaybackStatus): status is AVPlaybackStatusSuccess => status.isLoaded;
export function sound(data: AVPlaybackSource, defaultOptions?: ISoundOptions) {
    return {
        play: (options?: ISoundOptions) => {
            let s: Sound;
            void Audio.Sound.createAsync(
                data,
                {
                    shouldPlay: true,
                    volume: options?.volume ?? defaultOptions?.volume ?? 1,
                    isLooping: options?.loop ?? defaultOptions?.loop ?? false,
                },
                status => {
                    if (isStatusSuccess(status) && status.didJustFinish) void s?.unloadAsync();
                },
            ).then(({ sound }) => (s = sound));
        },
    };
}
