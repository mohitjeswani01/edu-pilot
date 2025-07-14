"use client";
import React, { useState } from 'react'
import Image from 'next/image'; // If you plan to use a logo, otherwise remove this import
import { Button } from '@/components/ui/button';
import AddNewCourseDialog from './AddNewCourseDialog'; // Adjust the path if needed
function CourseList() {
    const [CourseList, setCourseList] = useState([])
    return (
        <div className='mt-10'>
            <h2 className='font-bold text-3xl'> Course List</h2>

            {CourseList?.length == 0 ?
                <div className='flex p-7 items-center justify-center flex-col border rounded-2xl mt-2 bg-secondary'>
                    <img src={'/edu-pilot.jpg'} alt='edu' width={80} height={80} />
                    <h2 className='my-2 text-xl font-bold'>Looks like you haven't created any course yet</h2>
                    <AddNewCourseDialog>
                        <Button>+ Create your first course!</Button>
                    </AddNewCourseDialog>
                </div> :
                <div>
                    List of Courses</div>}
        </div>
    )
}

export default CourseList
