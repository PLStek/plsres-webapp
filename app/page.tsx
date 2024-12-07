import WelcomeBanner from "./components/welcomeBanner/WelcomeBanner";
import CharbonMine from "./components/charbonMine/CharbonMine";
import Sidebar from "./components/sidebar/Sidebar";
import InvitationModal from "./components/invitationModal/InvitationModal";
import Toolbar from "./components/toolbar/Toolbar";
import EditCharbonModalWrapper from "./components/editCharbonModal/EditCharbonModalWrapper";

export default function Home() {
    return (
        <div className="mx-auto w-full lg:max-w-[90%] 2xl:max-w-[80%] 3xl:max-w-[1536px]">
            <InvitationModal />
            <EditCharbonModalWrapper />
            <div className="flex justify-center items-center mt-10">
                <WelcomeBanner />
            </div>
            {/* <Toolbar /> */}
            <div className="flex flex-col-reverse xl:flex-row mt-10 space-y-4 xl:space-y-0 xl:space-x-10 items-start  ">
                <CharbonMine />
                <Sidebar />
            </div>
        </div>
    );
}
