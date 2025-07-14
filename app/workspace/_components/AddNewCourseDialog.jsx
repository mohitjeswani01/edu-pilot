"use client";
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Loader2Icon, Sparkle } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

function AddNewCourseDialog({ children }) {

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        noOfChapters: 1,
        includeVideo: false,
        level: '',
        category: ''
    });

    const onHandleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        console.log(formData)
    }

    const onGenerate = async () => {
        console.log(formData);
        try {
            setLoading(true);
            const result = await axios.post('/api/generate_course-layout', {
                ...formData
            });
            console.log(result.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Course Using AI</DialogTitle>
                    <DialogDescription asChild>
                        <div className='flex flex-col gap-4 mt-3'>
                            <div>
                                <label> Course Name</label>
                                <Input placeholder="Course Name" onChange={(event) => onHandleInputChange('name', event?.target.value)} />
                            </div>
                            <div>
                                <label> Course Description (Optional)</label>
                                <Textarea placeholder="Course Description" onChange={(event) => onHandleInputChange('description', event?.target.value)} />
                            </div>
                            <div>
                                <label>No. Of Chapters</label>
                                <Input placeholder="No. of Chapters" type='number' onChange={(event) => onHandleInputChange('noOfChapters', event?.target.value)} />
                            </div>
                            <div className='flex gap-3 items-center'>
                                <label> Include Videos</label>
                                <Switch onCheckedChange={() => onHandleInputChange('includeVideo', !formData?.includeVideo)} />
                            </div>
                            <div>
                                <label className=' '> Difficulty level</label>
                                <Select onValueChange={(value) => onHandleInputChange('level', value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Difficulty level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Moderate">Moderate</SelectItem>
                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label>Category</label>
                                <Textarea placeholder="Category (Separated by Comma)" onChange={(event) => onHandleInputChange('category', event?.target.value)} />
                            </div>
                            <div className='mt-5'>
                                <Button className="w-full" onClick={onGenerate} disabled={loading}>
                                    {loading ? <Loader2Icon className='animate-spin' /> :
                                        <Sparkle />} Generate Course</Button>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddNewCourseDialog
