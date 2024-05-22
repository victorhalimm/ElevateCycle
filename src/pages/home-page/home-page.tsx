import { Quote } from "@/lib/types/quote";
import { fetchQuote } from "@/services/quote-service";
import { Checkbox } from "@/components/ui/checkbox"; 
import { useEffect, useState } from "react";
import MainTemplate from "@/templates/main-template";
import { Input } from "@/components/ui/input";
import { FaArrowRight } from "react-icons/fa";

export const HomePage = () => {

    const [quotes, setQuotes] = useState<Quote[]>([]);

    useEffect(() => {
        const getQuote = async () => {
            const category = 'inspirational';
            try {
                const fetchedQuote = await fetchQuote(category);
                setQuotes(fetchedQuote);

                console.log(fetchedQuote);
            } catch (error) {
                console.error('Error fetching quote', error);
            }
        };

        getQuote();
    }, []);

    return (
        <MainTemplate>
            <div className="bg-pageBlack w-full p-6 flex gap-3 h-screen">
                <div className="flex-col flex gap-3 h-full w-[20%]">
                    <div className="bg-lightBlue w-full h-[20%] px-4 py-6 flex-col flex justify-between">
                        <p className="font-chakra text-pageCream text-sm">TODAY'S FOCUS HOUR</p>
                        <p className="font-chakra text-pageCream text-5xl font-medium">20.0</p>
                    </div>
                    <div className="bg-darkBlue gap-1 w-full h-[20%] px-4 py-6 flex-col flex justify-between">
                        <p className="font-chakra text-pageCream text-sm">TODAY'S COMPLETED TASK</p>
                        <p className="font-chakra text-pageCream text-5xl font-medium">69 / 69</p>
                    </div>
                    <div className="bg-darkBlue gap-1 w-full h-[60%] px-4 py-6 flex-col flex">
                        <p className="font-chakra text-pageCream text-sm">TODAY'S REMAINING TASK</p>
                        <div className="flex flex-col gap-2 pt-3">
                            <div className="text-pageCream gap-2 text-sm flex items-center">
                                <Checkbox id="dummy"/>
                                <label htmlFor="dummy">Test</label>
                            </div>
                            <div className="text-pageCream gap-2 text-sm flex items-center">
                                <Checkbox id="dummy2"/>
                                <label htmlFor="dummy2">Test</label>
                            </div>
                            <div className="text-pageCream gap-2 text-sm flex items-center">
                                <Checkbox id="dummy3"/>
                                <label htmlFor="dummy3">Test</label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex-col flex gap-3 h-full w-[20%]">
                    <div className="bg-darkBlue gap-1 w-full h-[calc(40%+1.25rem)] px-4 py-6 flex-col flex justify-between">
                        <p className="font-chakra text-pageCream text-sm">TODAY'S COMPLETED TASK</p>
                        <p className="font-chakra text-pageCream text-5xl font-medium">69 / 69</p>
                    </div>
                    <div className="bg-lightBlue gap-1 w-full h-[60%] px-4 py-6 flex-col flex">
                        <p className="font-chakra text-pageCream text-sm">TODAY'S REMAINING TASK</p>
                    </div>
                </div>

                <div className="flex-col flex gap-3 h-full w-[40%]">
                    <div className="bg-darkBlue gap-1 w-full h-[80%] px-4 py-6 flex-col flex justify-between">
                        <p className="font-chakra text-pageCream text-sm">TODAY'S TASK LIST</p>
                        <div className="flex flex-col gap-2 pt-3 h-full">
                            <div className="text-pageCream gap-2 text-sm flex items-center">
                                <Checkbox id="dummy"/>
                                <label htmlFor="dummy">Test</label>
                            </div>
                            <div className="text-pageCream gap-2 text-sm flex items-center">
                                <Checkbox id="dummy2"/>
                                <label htmlFor="dummy2">Test</label>
                            </div>
                            <div className="text-pageCream gap-2 text-sm flex items-center">
                                <Checkbox id="dummy3"/>
                                <label htmlFor="dummy3">Test</label>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-darkCream gap-1 w-full h-[20%] px-4 py-6 flex-col flex justify-between">
                        <p className="font-chakra text-pageCream text-sm">ADD TASK</p>
                        <div className="w-full flex justify-between relative font-chakra">
                            <Input className="bg-transparent rounded-sm border-pageCream border-opacity-60 placeholder:text-pageCream placeholder:text-opacity-60 focus-visible:ring-0 text-white" placeholder="Add New Tasks"/>
                            <div className="absolute right-3 h-full flex items-center">
                                <FaArrowRight className="text-lg text-pageCream"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-full w-[20%] flex gap-3 flex-col">
                    <div className="bg-darkBlue w-full h-full">

                    </div>
                </div>
            </div>
        </MainTemplate>
    )
}

export default HomePage;