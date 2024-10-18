import CharbonsProvider from "./context/CharbonsContext";
import ActionneursProvider from "./context/ActionneursContext";
import CoursesProvider from "./context/CoursesContext";
import ResourcesProvider from "./context/ResourcesContext";
import { getCharbonsService } from "@lib/services/charbonService";
import { getCoursesService } from "@lib/services/courseService";
import { getActionneursService } from "@lib/services/actionneurService";
import { getResourcesService } from "@lib/services/resourceService";
import WelcomeBanner from "./components/welcomeBanner/WelcomeBanner";
import CharbonMine from "./components/charbonMine/CharbonMine";
import Sidebar from "./components/sidebar/Sidebar";

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
                            <div className="mx-auto w-full lg:max-w-[90%] 2xl:max-w-[80%] 3xl:max-w-[1536px]">
                                <div className="flex justify-center items-center mt-10">
                                    <WelcomeBanner />
                                </div>
                                <div className="flex flex-col-reverse xl:flex-row mt-10 space-y-4 xl:space-y-0 xl:space-x-10 items-start  ">
                                    <CharbonMine />
                                    <Sidebar />
                                </div>
                            </div>
                        </ResourcesProvider>
                    </CoursesProvider>
                </ActionneursProvider>
            </CharbonsProvider>
        </>
    );
}
