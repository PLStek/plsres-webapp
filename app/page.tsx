import WelcomeBanner from "./components/welcomeBanner/WelcomeBanner";
import CharbonMine from "./components/charbonMine/CharbonMine";
import Sidebar from "./components/sidebar/Sidebar";
import InvitationModal from "./components/invitationModal/InvitationModal";
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
            <div className="flex flex-row mt-10 space-x-10 items-start  ">
                <CharbonMine />
                <div className="hidden xl:block w-[520px] sticky top-[50px]">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}
