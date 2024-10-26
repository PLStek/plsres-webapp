import WelcomeBanner from "./components/welcomeBanner/WelcomeBanner";
import CharbonMine from "./components/charbonMine/CharbonMine";
import Sidebar from "./components/sidebar/Sidebar";

export default async function Home() {
    return (
        <div className="mx-auto w-full lg:max-w-[90%] 2xl:max-w-[80%] 3xl:max-w-[1536px]">
            <div className="flex justify-center items-center mt-10">
                <WelcomeBanner />
            </div>
            <div className="flex flex-col-reverse xl:flex-row mt-10 space-y-4 xl:space-y-0 xl:space-x-10 items-start  ">
                <CharbonMine />
                <Sidebar />
            </div>
        </div>
    );
}
