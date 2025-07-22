import { PricingTable } from '@clerk/nextjs'
import { Sparkle } from 'lucide-react'
import React from 'react'

function Billing() {
    return (
        <div>
            <h2 className='font-bold text-2xl mb-5'> Select Plans for Edu-Pilot's🚀 subscription </h2>
            <PricingTable />
        </div>
    )
}

export default Billing
