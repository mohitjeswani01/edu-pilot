import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import React, { useContext } from 'react';
import YouTube from 'react-youtube';

function ChapterContent({ courseInfo }) {
    const course = courseInfo?.course;
    const enrollCourse = courseInfo?.enrollCourse;
    const courseContent = courseInfo?.[0]?.courses?.courseContent;
    const { selectedChapterIndex } = useContext(SelectedChapterIndexContext);
    const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
    const topics = courseContent?.[selectedChapterIndex]?.courseData?.topics;
    const activeChapter = courseContent?.[selectedChapterIndex];

    // Safety check to handle initial render before data arrives or a chapter is selected.
    if (!activeChapter) {
        return (
            // Added flex and center classes for better alignment of the placeholder text.
            <div className='p-4 sm:p-10 flex items-center justify-center h-full'>
                <h2 className="text-gray-500 text-center text-lg">Please click a Chapter to see the Content</h2>
            </div>
        );
    }

    return (
        // ✅ Overall padding adjusted for different screen sizes for better spacing.
        <div className='p-4 sm:p-6 md:p-10 w-full'>
            {/* ✅ Responsive typography for the main chapter title. */}
            <h2 className='font-bold text-xl sm:text-2xl mb-4'>{selectedChapterIndex + 1}. {activeChapter?.courseData?.chapterName}</h2>

            <h2 className='my-2 font-bold text-base sm:text-lg'>Related Videos🎬</h2>

            {/* ✅ Grid layout now has more responsive breakpoints for better stacking. */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mb-8'>
                {videoData?.map((video, index) => index < 2 && (
                    <div key={index} className='my-4'>
                        {/* ✅ --- THE MAGIC FOR RESPONSIVE VIDEOS ---
                          1. Outer div: `relative pt-[56.25%]` creates a 16:9 aspect ratio box.
                             (56.25% is 9 / 16).
                          2. YouTube opts: We remove fixed height/width and tell it to be 100% of its container.
                          3. YouTube className: We make the video iframe fill the aspect ratio box absolutely.
                        */}
                        <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-xl">
                            <YouTube
                                videoId={video?.videoId}
                                className='absolute top-0 left-0 w-full h-full'
                                opts={{
                                    height: '100%',
                                    width: '100%',
                                    playerVars: {
                                        autoplay: 0,
                                        modestbranding: 1,
                                    },
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className='mt-7'>
                {topics.map((topic, index) => (
                    // ✅ Padding and margins adjusted for responsiveness.
                    <div key={index} className='mt-6 md:mt-10 p-4 sm:p-5 bg-secondary rounded-2xl'>
                        {/* ✅ Responsive typography for topic titles. */}
                        <h2 className='font-bold text-lg sm:text-xl md:text-2xl text-primary'>{topic?.topic}</h2>

                        {/* This part remains the same as it's about content, not styling. */}
                        <div dangerouslySetInnerHTML={{ __html: topic?.content }}
                            style={{
                                lineHeight: '2.5'
                            }}>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChapterContent;
