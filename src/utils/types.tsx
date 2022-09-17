import { Context } from "react";

export type ProvidedValue<T> = T extends Context<infer R> ? R : never;
