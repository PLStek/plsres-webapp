import { NextUIProvider } from "@nextui-org/react";
import CharbonProvider from "./context/CharbonContext";
import ActionneurProvider from "./context/ActionneurContext";
import CourseProvider from "./context/CourseContext";
import ResourceProvider from "./context/ResourceContext";
import AuthProvider from "./context/AuthContext";
import { authenticateAction, getActionneursAction, getCharbonsGroupedByMonthAction, getCoursesAction } from "@lib/actions";

const Providers = async ({ children }: { children: React.ReactNode }) => {
    const charbons = await getCharbonsGroupedByMonthAction();
    const actionneurs = await getActionneursAction();
    const courses = await getCoursesAction();
    const authData = await authenticateAction();

    return (
        <NextUIProvider>
            <AuthProvider initialAuthData={authData}>
                <CharbonProvider initialCharbons={charbons}>
                    <ActionneurProvider initialActionneurs={actionneurs}>
                        <CourseProvider initialCourses={courses}>
                            <ResourceProvider>{children}</ResourceProvider>
                        </CourseProvider>
                    </ActionneurProvider>
                </CharbonProvider>
            </AuthProvider>
        </NextUIProvider>
    );
}

export default Providers;