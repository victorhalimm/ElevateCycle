import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainTemplate from "@/templates/main-template";
import { GrDocumentText } from "react-icons/gr";

const JournalPage = () => {
    return (
        <MainTemplate>
            <div className="bg-pageBlack w-full p-6 flex gap-3 h-screen">
                <div className="flex-col flex gap-3 h-full w-[20%]">
                    <div className="bg-darkBlue gap-1 w-full h-[80%] px-4 py-6 flex-col flex">
                        <p className="font-chakra text-pageCream text-sm mb-4">JOURNALS</p>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1" className="border-none font-chakra text-pageCream">
                                <AccordionTrigger className="h-10">Daily</AccordionTrigger>
                                <AccordionContent className="">
                                    <ScrollArea className="flex flex-col max-h-[30vh]">
                                        {
                                            Array.from({length: 10}).map((_, index) => (
                                                <div className="py-2 flex items-center gap-2">
                                                    <GrDocumentText className="opacity-30"/>
                                                    <p>10th February 2024</p>
                                                </div>
                                            ))
                                        }
                                    </ScrollArea>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2" className="border-none font-chakra text-pageCream">
                                <AccordionTrigger className="h-10">Weekly</AccordionTrigger>
                                <AccordionContent className="">
                                    <ScrollArea className="flex flex-col max-h-[30vh]">
                                        {
                                            Array.from({length: 10}).map((_, index) => (
                                                <div className="py-2 flex items-center gap-2">
                                                    <GrDocumentText className="opacity-30"/>
                                                    <p>10th February 2024</p>
                                                </div>
                                            ))
                                        }
                                    </ScrollArea>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div className="bg-darkBlue w-full h-[20%] px-4 py-6 flex-col flex justify-between">
                        <p className="font-chakra text-pageCream text-sm">ALERTS</p>
                        <p className="font-chakra text-pageCream text-5xl font-medium">20.0</p>
                    </div>
                </div>
                <div className="flex-col flex gap-3 h-fill w-[80%]">
                    <div className="bg-darkBlue gap-1 w-full h-full px-4 py-6 flex-col flex">

                    </div>
                </div>
            </div>
        </MainTemplate>
    )
}

export default JournalPage;