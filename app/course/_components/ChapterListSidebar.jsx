import React, { useContext } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import { ChevronsRightLeft, CheckCircle } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

function ChapterListSidebar({ courseInfo, loading, isSidebarOpen, toggleSidebar }) {
    const courseContent = courseInfo?.[0]?.courses?.courseContent;
    const enrollCourse = courseInfo?.[0]?.enrollCourse;
    const completedChapters = enrollCourse?.completedChapters || [];
    const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);

    if (loading) {
        return (
            <div className='bg-secondary h-screen p-4 border-r flex flex-col'>
                <div className="flex items-center justify-between mb-4">
                    <div className="h-8 bg-gray-200 rounded-md w-32 animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
                <div className="space-y-4 mt-4">
                    <div className="h-12 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="h-12 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="h-12 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (!Array.isArray(courseContent) || courseContent.length === 0) {
        return (
            <div className='bg-secondary h-screen p-4 border-r flex flex-col'>
                <div className="flex items-center justify-between mb-4">
                    {isSidebarOpen && <h2 className='font-bold text-xl truncate'>Chapters</h2>}
                    <button onClick={toggleSidebar} className="p-2 hover:bg-gray-200 rounded-md ml-auto">
                        <ChevronsRightLeft className="h-5 w-5" />
                    </button>
                </div>
                {isSidebarOpen && <p className="mt-4 text-gray-500 text-sm">No chapters are available for this course.</p>}
            </div>
        );
    }

    return (
        <div className={`bg-secondary h-screen border-r overflow-y-auto transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-96 p-4' : 'w-16 p-2'} flex flex-col`}>
            <div className="sticky top-0 z-10 bg-secondary pb-2 flex items-center justify-between">
                {isSidebarOpen && (
                    <h2 className='font-bold text-xl truncate'>Chapters ({courseContent.length})</h2>
                )}
                <button onClick={toggleSidebar} className="p-2 hover:bg-gray-200 rounded-md ml-auto">
                    <ChevronsRightLeft className="h-5 w-5" />
                </button>
            </div>

            {isSidebarOpen ? (
                <Accordion type="single" collapsible className="w-full mt-2">
                    {courseContent.map((chapter, index) => {
                        const isCompleted = completedChapters.includes(index);
                        const isActive = selectedChapterIndex === index;

                        return (
                            <AccordionItem value={chapter?.courseData?.chapterName} key={index}>
                                <AccordionTrigger
                                    onClick={() => setSelectedChapterIndex(index)}
                                    className={`text-left text-base font-medium p-3 rounded-md flex items-center justify-between transition-colors
                                        ${isActive ? 'bg-primary text-white hover:bg-primary/90' : 'hover:bg-primary/10'}
                                    `}
                                >
                                    <div className="truncate w-full">
                                        {index + 1}. {chapter?.courseData?.chapterName}
                                    </div>
                                    {isCompleted && <CheckCircle className="text-green-500 ml-2 w-5 h-5" />}
                                </AccordionTrigger>
                                <AccordionContent className="pt-2">
                                    <div className="flex flex-col gap-2">
                                        {chapter?.courseData?.topics.map((topic, topicIndex) => (
                                            <div
                                                key={topicIndex}
                                                className={`p-3 text-sm rounded-lg cursor-pointer border transition-colors
                                                    ${isCompleted
                                                        ? 'bg-green-100 text-green-800 border-green-200'
                                                        : 'bg-white hover:bg-gray-100 border-gray-200'
                                                    }`}
                                            >
                                                {topic?.topic}
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            ) : (
                <div className="flex flex-col items-center gap-4 mt-4">
                    {courseContent.map((chapter, index) => {
                        const isCompleted = completedChapters.includes(index);
                        return (
                            <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => setSelectedChapterIndex(index)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors
                                            ${selectedChapterIndex === index
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-100 hover:bg-gray-200'
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="text-xs max-w-xs">
                                    {chapter?.courseData?.chapterName}
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default ChapterListSidebar;
