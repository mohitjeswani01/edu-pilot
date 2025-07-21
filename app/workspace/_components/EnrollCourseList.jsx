import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { enrollCourseTable } from '@/config/schema';
import EnrollCourseCard from './EnrollCourseCard';

function EnrollCourseList() {
    const [EnrollCourseList, setEnrolledCourseList] = useState([]);
    useEffect(() => {
        GetEnrolledCourse();
    }, [])

    const GetEnrolledCourse = async () => {
        const result = await axios.get('/api/enroll-course');
        console.log(result.data)
        setEnrolledCourseList(result.data)
    }
    return EnrollCourseList?.length > 0 && (
        <div className='mt-3'>
            <h2 className='font-bold text-xl'> Continue Learning Your Course </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
                {EnrollCourseList?.map((course, index) => (
                    <EnrollCourseCard course={course?.courses} enrolledCourse={course?.enrolledCourse} key={index} />

                ))}
            </div>
        </div>
    )
}

export default EnrollCourseList
