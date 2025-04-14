"use client";

import { charbonsAtom } from "./atoms/charbonAtoms";
import { useHydrateAtoms } from "jotai/utils";
import { Charbon } from "@lib/models/charbon";
import { ReactNode } from "react";
import { coursesAtom } from "./atoms/courseAtoms";
import { Course } from "@lib/models/course";
import { AuthData } from "@lib/models/auth";
import { authAtom } from "./atoms/authAtoms";
import { Actionneur } from "@lib/models/actionneur";
import { actionneursAtom } from "./atoms/actionneurAtoms";

const HydrateAtoms = ({
    initialCharbons,
    initialCourses,
    initialActionneurs,
    initialAuthData,
    children,
}: {
    initialCharbons: Record<string, Charbon[]>;
    initialCourses: Course[];
    initialActionneurs: Actionneur[];
    initialAuthData: AuthData;
    children: ReactNode;
}) => {
    useHydrateAtoms([
        [charbonsAtom, initialCharbons],
        [coursesAtom, initialCourses],
        [actionneursAtom, initialActionneurs],
        [authAtom, initialAuthData],
    ]);
    return <>{children}</>;
};

export default HydrateAtoms;
