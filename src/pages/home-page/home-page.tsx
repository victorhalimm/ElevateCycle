import { Quote } from "@/models/quote";
import { fetchQuote } from "@/services/quote-service";
import { Checkbox } from "@/components/ui/checkbox"; 
import { useEffect, useState } from "react";

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
        <div className="bg-[#101015] w-[97.5%] ml-[1.25%] flex gap-3 h-screen">
            <div className="flex-col flex gap-3">
                <div className="bg-[#506385] w-64 h-32 px-4 py-6 flex-col flex justify-between">
                    <p className="font-chakra text-pageCream text-sm">TODAY'S FOCUS HOUR</p>
                    <p className="font-chakra text-pageCream text-5xl font-medium">20.0</p>
                </div>
                <div className="bg-[#1f1f22] gap-1 w-64 min-h-32 px-4 py-6 flex-col flex justify-between">
                    <p className="font-chakra text-pageCream text-sm">TODAY'S COMPLETED TASK</p>
                    <p className="font-chakra text-pageCream text-5xl font-medium">69 / 69</p>
                </div>
                <div className="bg-[#1f1f22] gap-1 w-64 min-h-64 px-4 py-6 flex-col flex">
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
        </div>
    )
}

export default HomePage;