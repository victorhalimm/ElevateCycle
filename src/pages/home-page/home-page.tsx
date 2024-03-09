import Sidebar from "@/components/side-bar/sidebar";

export const HomePage = () => {
    return (
        <div className="bg-[#101015] w-[97.5%] ml-[1.25%]">
            <div className="flex-col flex gap-3">
                <div className="bg-[#506385] w-64 h-32 px-4 py-6 flex-col flex justify-between">
                    <p className="font-chakra text-white text-sm">COKIL COUNT</p>
                    <p className="font-chakra text-white text-5xl font-medium">20.0</p>
                </div>
                <div className="bg-[#1f1f22] w-64 h-32 px-4 py-6 flex-col flex justify-between">
                    <p className="font-chakra text-white text-sm">EDGING HIGHSCORE</p>
                    <p className="font-chakra text-white text-5xl font-medium">2 MIN</p>
                </div>

            </div>
        </div>
    )
}

export default HomePage;