"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { use } from 'react'
import { useState, useEffect } from 'react';
import CourseInfo from '../_components/CourseInfo';
import ChapterTopicList from '../_components/ChapterTopicList';
import CourseCard from '../../_components/CourseCard';

function EditCourse(viewCourse = false) {
    const { courseId } = useParams();
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState();

    useEffect(() => {
        GetCourseInfo();
    }, []);

    const GetCourseInfo = async () => {
        setLoading(true);
        const result = await axios.get('/api/courses?courseId=' + courseId)
        console.log(result.data);
        setLoading(false);
        setCourse(result.data);
    }
    return (
        <div>
            <CourseInfo course={course} viewCourse={viewCourse} />
            <ChapterTopicList course={course} />
        </div>
    )
}

export default EditCourse
