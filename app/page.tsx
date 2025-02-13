import WelcomeBanner from "./home/welcomeBanner/WelcomeBanner";
import CharbonMine from "./home/charbonMine/CharbonMine";
import Sidebar from "./home/sidebar/Sidebar";
import InvitationModal from "./home/modals/invitationModal/InvitationModal";
import EditCharbonModalWrapper from "./home/modals/editCharbonModal/EditCharbonModalWrapper";
import Providers from "./Providers";
import AdminModal from "./home/modals/AdminModal";
import EditCharbonModal from "./home/modals/editCharbonModal/EditCharbonModal";
import VerificationModal from "./home/modals/VerificationModal";
import ActionneurConnectionModal from "./home/modals/ActionneurConnectionModal";

export default function Home() {
    return (
        <div className="mx-auto w-full lg:max-w-[80%] xl:max-w-[90%] 2xl:max-w-[80%] 3xl:max-w-[1536px]">
            <Providers>
                <InvitationModal />
                <VerificationModal>
                    <ActionneurConnectionModal>
                        <div className="flex justify-center items-center mt-10">
                            <AdminModal>
                                <WelcomeBanner />
                            </AdminModal>
                        </div>
                        <div className="flex flex-row mt-10 space-x-10 items-start">
                            <EditCharbonModal>
                                <EditCharbonModalWrapper />
                                <CharbonMine />
                            </EditCharbonModal>
                            <div className="hidden xl:block w-[520px] sticky top-[50px]">
                                <Sidebar />
                            </div>
                        </div>
                    </ActionneurConnectionModal>
                </VerificationModal>
            </Providers>
        </div>
    );
}
