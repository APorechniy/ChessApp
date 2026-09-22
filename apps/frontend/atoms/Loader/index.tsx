import React from "react";
import { DarkField, LightField, LoaderAtom, LoaderWrapper } from "./styled";

export const Loader = () => (
    <LoaderWrapper>
        <LoaderAtom>
            <LightField />
            <DarkField />
            <DarkField />
            <LightField />
        </LoaderAtom>
    </LoaderWrapper>
)