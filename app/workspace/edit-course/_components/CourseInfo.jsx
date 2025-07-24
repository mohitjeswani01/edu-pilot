import { Book, Clock, PlayCircle, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

function CourseInfo({ course, viewCourse }) {
    const courseLayout = course?.courseJson?.course;
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const GenerateCourseContent = async () => {
        setLoading(true);
        try {
            const result = await axios.post('/api/generate-course-content', {
                course: courseLayout,
                courseTitle: course?.name,
                courseId: course?.cid
            });
            console.log(result.data);
            router.replace('/workspace')
            toast.success('course generated successfully')
        } catch (error) {
            console.log(error);
            toast.error("server side error, please Try again later!")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='md:flex gap-5 justify-between p-5 rounded-2xl shadow'>
            <div className='flex flex-col gap-3'>
                <h2 className='font-bold text-3xl'>{courseLayout?.name || course?.name}</h2>
                <p className='line-clamp-2 text-gray-500'>{courseLayout?.description || course?.description}</p>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    <div className='flex gap-5 items-center p-3 rounded-lg shadow aspect-auto'>
                        <Clock className='text-blue-500' />
                        <section>
                            <h2 className='font-bold'>Duration</h2>
                            <h2>{courseLayout?.duration || 'N/A'}</h2>
                        </section>
                    </div>
                    <div className='flex gap-5 items-center p-3 rounded-lg shadow aspect-auto'>
                        <Book className='text-green-500' />
                        <section>
                            <h2 className='font-bold'>Chapters</h2>
                            <h2>{courseLayout?.chapters?.length ?? 0}</h2>
                        </section>
                    </div>
                    <div className='flex gap-5 items-center p-3 rounded-lg shadow aspect-auto'>
                        <TrendingUp className='text-red-500' />
                        <section>
                            <h2 className='font-bold'>Difficulty Level</h2>
                            <h2>{course?.level || 'N/A'}</h2>
                        </section>
                    </div>
                </div>
                {!viewCourse?.cid ? (
                    <Button onClick={GenerateCourseContent} disabled={loading}>
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="animate-spin h-5 w-5" />
                                Generating Content
                            </span>
                        ) : (
                            'Generate Content'
                        )}
                    </Button>
                ) : (
                    <Link href={`/course/${viewCourse.cid}`}>
                        <Button>
                            <PlayCircle /> Continue Learning
                        </Button>
                    </Link>
                )}
            </div>
            <Image
                src={course?.bannerImageUrl && course.bannerImageUrl.trim() !== ""
                    ? course.bannerImageUrl
                    : '/default_image.jpg'}
                alt="Course banner"
                width={400}
                height={400}
                className="w-full h-[280px] mt-5 md:mt-0 object-cover rounded-2xl aspect-auto"
            />
        </div>
    );
}

export default CourseInfo;
