import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useContext } from 'react';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext'; // adjust the path

function ChapterListSidebar({ courseInfo }) {

    const course = courseInfo?.[0]?.courses;
    const enrollCourse = courseInfo?.[0]?.enrollCourse;
    const courseContent = courseInfo?.[0]?.courses?.courseContent;
    const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext)


    if (!Array.isArray(courseContent) || courseContent.length === 0) {
        return (
            <div className='w-80 bg-secondary h-screen p-5'>
                <h2 className='my-3 font-bold text-xl'>Chapters</h2>
                <p className="mt-4 text-gray-500">No chapters are available for this course.</p>
            </div>
        );
    }

    return (
        <div className='w-96 bg-secondary h-screen p-5'>
            <h2 className='my-3 font-bold text-xl'> Chapters ({courseContent?.length})</h2>
            <Accordion type="single" collapsible className="w-full">
                {courseContent.map((chapter, index) => (
                    <AccordionItem
                        value={chapter?.courseData?.chapterName}
                        key={index} onClick={() => setSelectedChapterIndex(index)}>
                        <AccordionTrigger className={'text-lg font-medium'}>{index + 1}. {chapter?.courseData?.chapterName}</AccordionTrigger>
                        <AccordionContent asChild>
                            <div className=''>
                                {chapter?.courseData?.topics.map((topic, index) => (
                                    <h2 key={index} className='p-3 bg-white my-1 rounded-lg'>{topic?.topic}</h2>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

export default ChapterListSidebar;
