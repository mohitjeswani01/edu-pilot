'use client';

import React, { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import { CheckCircle, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import YouTube from 'react-youtube';
import axios from 'axios';
import { toast } from 'sonner';

function ChapterContent({ courseInfo, loading, refreshData }) {
    const { courseId } = useParams();
    const { selectedChapterIndex } = useContext(SelectedChapterIndexContext);
    const courseContent = courseInfo?.[0]?.courses?.courseContent || [];
    const enrollCourse = courseInfo?.[0]?.enrollCourse;
    const completedChapters = enrollCourse?.completedChapters || [];

    const activeChapter = courseContent[selectedChapterIndex];
    const videoData = activeChapter?.youtubeVideo || [];
    const topics = activeChapter?.courseData?.topics || [];

    const [buttonLoading, setButtonLoading] = useState(false);

    const markChapterCompleted = async () => {
        try {
            setButtonLoading(true);
            const updated = [...completedChapters, selectedChapterIndex];
            await axios.put('/api/enroll-course', {
                courseId,
                completedChapter: updated
            });
            toast.success('Chapter marked as completed!');
            refreshData();
        } catch (error) {
            toast.error('Error marking completed');
        } finally {
            setButtonLoading(false);
        }
    };

    const markChapterIncomplete = async () => {
        try {
            setButtonLoading(true);
            const updated = completedChapters.filter(i => i !== selectedChapterIndex);
            await axios.put('/api/enroll-course', {
                courseId,
                completedChapter: updated
            });
            toast.success('Chapter marked as incomplete!');
            refreshData();
        } catch (error) {
            toast.error('Error marking incomplete');
        } finally {
            setButtonLoading(false);
        }
    };

    if (loading || !activeChapter) {
        return (
            <div className='p-4 sm:p-10 flex items-center justify-center h-full'>
                <div className="text-center">
                    <h2 className="text-gray-500 text-lg">
                        {loading ? 'Loading course...' : 'Please select a chapter to view its content.'}
                    </h2>
                </div>
            </div>
        );
    }

    const isCompleted = completedChapters.includes(selectedChapterIndex);

    return (
        <div className='p-5 sm:p-8 md:p-10 max-w-screen-lg mx-auto'>
            <div className='flex justify-between items-center flex-wrap gap-2 mb-6'>
                <h2 className='font-bold text-xl sm:text-2xl'>
                    {selectedChapterIndex + 1}. {activeChapter?.courseData?.chapterName}
                </h2>

                {!isCompleted ? (
                    <Button
                        onClick={markChapterCompleted}
                        disabled={buttonLoading}
                        className='flex gap-2 items-center'
                    >
                        <CheckCircle size={20} /> Mark as Completed
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        onClick={markChapterIncomplete}
                        disabled={buttonLoading}
                        className='flex gap-2 items-center'
                    >
                        <X size={20} /> Mark as Incomplete
                    </Button>
                )}
            </div>

            {/* Related Videos */}
            <h2 className='my-4 font-bold text-lg sm:text-xl'>Related Videos 🎬</h2>
            {videoData.length === 0 ? (
                <p className="text-gray-500">No videos available for this chapter.</p>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {videoData.slice(0, 2).map((video, index) => (
                        <div key={index} className="rounded-lg overflow-hidden aspect-video w-full">
                            <YouTube
                                videoId={video?.videoId}
                                opts={{ playerVars: { modestbranding: 1 } }}
                                className='w-full h-full'
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Topics */}
            <div className='mt-10 space-y-8'>
                {topics.length === 0 ? (
                    <p className="text-gray-500">No topics available for this chapter.</p>
                ) : (
                    topics.map((topic, index) => (
                        <div key={index} className='p-5 bg-secondary rounded-2xl'>
                            <h3 className='font-bold text-2xl text-primary mb-3'>
                                {index + 1}. {topic?.topic}
                            </h3>
                            <div
                                dangerouslySetInnerHTML={{ __html: topic?.content }}
                                className='prose max-w-none text-gray-800 dark:text-gray-300 [&_pre]:bg-slate-800 [&_pre]:text-white [&_pre]:p-4 [&_pre]:rounded-md [&_pre]:overflow-x-auto'
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ChapterContent;
