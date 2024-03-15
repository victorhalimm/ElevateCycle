import { Quote } from "@/models/quote";
import { fetchQuote } from "@/services/quote-service";
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
        <div className="bg-[#101015] w-[97.5%] ml-[1.25%]">
            <div className="flex-col flex gap-3">
                <div className="bg-[#506385] w-64 h-32 px-4 py-6 flex-col flex justify-between">
                    <p className="font-chakra text-pageCream text-sm">COKIL COUNT</p>
                    <p className="font-chakra text-pageCream text-5xl font-medium">20.0</p>
                </div>
                <div className="bg-[#1f1f22] w-64 h-32 px-4 py-6 flex-col flex justify-between">
                    <p className="font-chakra text-pageCream text-sm">EDGING HIGHSCORE</p>
                    <p className="font-chakra text-pageCream text-5xl font-medium">2 MIN</p>
                </div>
                <div className="bg-[#1f1f22] gap-1 w-64 min-h-32 px-4 py-6 flex-col flex justify-between">
                    <p className="font-chakra text-pageCream text-sm">COMPLETED TASKS</p>
                    <p className="font-chakra text-gray-400 text-sm">DAILY</p>
                    <p className="font-chakra text-pageCream text-5xl font-medium">69 / 69</p>
                </div>

            </div>
        </div>
    )
}

export default HomePage;