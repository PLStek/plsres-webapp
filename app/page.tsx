import WelcomeBanner from "./home/welcomeBanner/WelcomeBanner";
import CharbonMine from "./home/charbonMine/CharbonMine";
import Sidebar from "./home/sidebar/Sidebar";
import InviteModal from "./home/modals/inviteModal/InviteModal";
import EditCharbonDrawerWrapper from "./home/modals/editCharbonDrawer/EditCharbonDrawerWrapper";
import Providers from "./Providers";
import AdminDrawer from "./home/modals/AdminDrawer";
import EditCharbonDrawer from "./home/modals/editCharbonDrawer/EditCharbonDrawer";
import VerificationModal from "./home/modals/VerificationModal";
import ActionneurConnectionModal from "./home/modals/ActionneurConnectionModal";
import EditCourseModal from "./home/modals/editCourseModal/EditCourseModal";
import {
    authenticateAction,
    getActionneursAction,
    getCharbonsGroupedByMonthAction,
    getCoursesAction,
} from "@lib/actions";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { Provider } from "jotai";
import HydrateAtoms from "./HydrateAtoms";

const Home = async () => {
    const { data: charbons } = await getCharbonsGroupedByMonthAction();
    const { data: actionneurs } = await getActionneursAction();
    const { data: courses } = await getCoursesAction();
    const { data: authData } = await authenticateAction();
    if (!charbons || !actionneurs || !courses || !authData) {
        return null; //TODO: check errors and add error page
    }

    return (
        <div className="mx-auto w-full lg:max-w-[80%] xl:max-w-[90%] 2xl:max-w-[80%] 3xl:max-w-[1536px]">
            <HeroUIProvider>
                <Provider>
                    <HydrateAtoms
                        initialCharbons={charbons}
                        initialCourses={courses}
                        initialActionneurs={actionneurs}
                        initialAuthData={authData}
                    >
                        <ToastProvider />
                        <InviteModal />
                        <VerificationModal>
                            <ActionneurConnectionModal>
                                <div className="flex justify-center items-center mt-10">
                                    <EditCourseModal>
                                        <AdminDrawer>
                                            <WelcomeBanner />
                                        </AdminDrawer>
                                    </EditCourseModal>
                                </div>
                                <div className="flex flex-row mt-10 space-x-10 items-start">
                                    <EditCharbonDrawer>
                                        <EditCharbonDrawerWrapper />
                                        <CharbonMine />
                                    </EditCharbonDrawer>
                                    <div className="hidden xl:block w-[520px] sticky top-[50px]">
                                        <Sidebar />
                                    </div>
                                </div>
                            </ActionneurConnectionModal>
                        </VerificationModal>
                    </HydrateAtoms>
                </Provider>
            </HeroUIProvider>
        </div>
    );
};

export default Home;
