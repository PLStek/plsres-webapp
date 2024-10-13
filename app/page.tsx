import CharbonForm from "@app/components/charbons/CharbonForm";
import CharbonsProvider from "./context/CharbonsContext";
import ActionneursProvider from "./context/ActionneursContext";
import CoursesProvider from "./context/CoursesContext";
import ResourcesProvider from "./context/ResourcesContext";
import CharbonList from "@app/components/charbons/CharbonList";
import { getCharbonsService } from "@lib/services/charbonService";
import { getCoursesService } from "@lib/services/courseService";
import { getActionneursService } from "@lib/services/actionneurService";
import { getResourcesService } from "@lib/services/resourceService";
import WelcomeBanner from "./components/WelcomeBanner";

export default async function Home() {
    const charbons = await getCharbonsService();
    const actionneurs = await getActionneursService();
    const courses = await getCoursesService();
    const resources = await getResourcesService();

    return (
        <>
            <CharbonsProvider initialCharbons={charbons}>
                <ActionneursProvider initialActionneurs={actionneurs}>
                    <CoursesProvider initialCourses={courses}>
                        <ResourcesProvider initialResources={resources}>
                            <div className="flex justify-center items-center">
                                <WelcomeBanner />
                            </div>
                            <CharbonForm />
                            <CharbonList />
                        </ResourcesProvider>
                    </CoursesProvider>
                </ActionneursProvider>
            </CharbonsProvider>
        </>
    );
}
