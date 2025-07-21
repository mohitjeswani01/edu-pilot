import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";


function ChapterListSidebar({ courseInfo }) {

    const course = courseInfo?.[0]?.courses;
    const enrollCourse = courseInfo?.[0]?.enrollCourse;

    // This path remains the same for the chapter list.
    const courseContent = courseInfo?.[0]?.courses?.courseContent;

    if (!Array.isArray(courseContent) || courseContent.length === 0) {
        return (
            <div className='w-80 bg-secondary h-screen p-5'>
                <h2 className='my-3 font-bold text-xl'>Chapters</h2>
                <p className="mt-4 text-gray-500">No chapters are available for this course.</p>
            </div>
        );
    }

    return (
        <div className='w-80 bg-secondary h-screen p-5'>
            <h2 className='my-3 font-bold text-xl'> Chapters</h2>
            <Accordion type="single" collapsible className="w-full">
                {courseContent.map((chapter, index) => (
                    <AccordionItem
                        value={chapter.cid || chapter.chapterName || `item-${index}`}
                        key={chapter.cid || index}>
                        <AccordionTrigger>{index + 1}. {chapter.chapterName}</AccordionTrigger>
                        <AccordionContent asChild>
                            <div>
                                {chapter?.courseData?.topics.map((topic, index) => (
                                    <h2 key={index}>{topic?.topic}</h2>
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
