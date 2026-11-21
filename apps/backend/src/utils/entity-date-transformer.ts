import { ValueTransformer } from "typeorm";
import { sqlToUtc, utcToSql } from "./utc-to-sql";
import { localToUtc } from "./local-to-utc";
// [TODO]: Унифицировать работу с датами и временем
export const dateTransformer: ValueTransformer = {
    to: (value: string | null): string | null =>
        value === null ? null : utcToSql(localToUtc(value)),
    from: (value: string | null): string | null =>
        value === null ? null : sqlToUtc(value),
};