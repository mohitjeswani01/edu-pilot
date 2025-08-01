"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { UserDetailContext } from '@/context/UserDetailContext';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';

function Provider({ children }) {

    const { user } = useUser();
    const [userDetail, setUserDetail] = useState();
    const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

    useEffect(() => {
        if (user) createNewUser();
    }, [user]);

    const createNewUser = async () => {
        const name = user?.fullName || user?.firstName || "Anonymous User";
        const email = user?.primaryEmailAddress?.emailAddress;

        console.log("Creating user with:", name, email);

        try {
            const result = await axios.post('/api/user', { name, email });
            console.log("Server returned:", result.data);
            setUserDetail(result.data);
        } catch (err) {
            console.error("API Error:", err);
        }
    }

    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <SelectedChapterIndexContext.Provider value={{ selectedChapterIndex, setSelectedChapterIndex }}>
                <div>{children}</div>
            </SelectedChapterIndexContext.Provider>
        </UserDetailContext.Provider>
    )
}

export default Provider;
