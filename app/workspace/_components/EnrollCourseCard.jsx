import React from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import Link from 'next/link';

function EnrollCourseCard({ course, enrollCourse }) {
    const totalChapters = course?.noOfChapters;
    const completedChaptersLength = enrollCourse?.completedChapters?.length || 0;

    const progressPercentage = totalChapters > 0
        ? Math.round((completedChaptersLength / totalChapters) * 100)
        : 0;

    return (
        <div className='shadow rounded-xl flex flex-col'>
            <Image
                src={course?.bannerImageUrl || '/default_image.jpg'}
                alt={course?.name}
                width={400}
                height={300}
                className='w-full aspect-video rounded-t-xl object-cover'
            />
            <div className='p-3 flex flex-col gap-3 flex-grow'>
                <h2 className='font-bold text-lg'>{course?.name}</h2>
                <p className='line-clamp-3 text-gray-400 text-sm flex-grow'>{course?.description}</p>
                <div className='mt-auto'>
                    <div className='flex justify-between items-center text-sm mb-1'>
                        <h2 className='text-primary font-medium'>Progress</h2>
                        <span className='font-semibold'>{progressPercentage}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />

                    {/* --- THIS IS THE FIX --- */}
                    {/* The Link now correctly points to the /course/[courseId] page,
                        which is where students view the content. */}
                    <Link href={`/course/${course?.cid}`}>
                        <Button className={'w-full mt-3'}>
                            <PlayCircle className="mr-2 h-4 w-4" /> Continue Learning
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default EnrollCourseCard;