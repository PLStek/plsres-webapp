import { HeroUIProvider } from "@heroui/react";
import CharbonProvider from "./context/CharbonContext";
import ActionneurProvider from "./context/ActionneurContext";
import CourseProvider from "./context/CourseContext";
import ResourceProvider from "./context/ResourceContext";
import AuthProvider from "./context/AuthContext";
import {
    authenticateAction,
    getActionneursAction,
    getCharbonsGroupedByMonthAction,
    getCoursesAction,
} from "@lib/actions";
import { ReactNode } from "react";

const Providers = async ({ children }: { children: ReactNode }) => {
    const { data: charbons } = await getCharbonsGroupedByMonthAction();
    const { data: actionneurs } = await getActionneursAction();
    const { data: courses } = await getCoursesAction();
    const { data: authData } = await authenticateAction();

    if (!charbons || !actionneurs || !courses || !authData) {
        return null; //TODO: check errors and add error page
    }

    return (
        <HeroUIProvider>
            <AuthProvider initialAuthData={authData}>
                <CharbonProvider initialCharbons={charbons}>
                    <ActionneurProvider initialActionneurs={actionneurs}>
                        <CourseProvider initialCourses={courses}>
                            <ResourceProvider>{children}</ResourceProvider>
                        </CourseProvider>
                    </ActionneurProvider>
                </CharbonProvider>
            </AuthProvider>
        </HeroUIProvider>
    );
};

export default Providers;
