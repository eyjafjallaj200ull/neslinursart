import { LoaderCircle } from 'lucide-react';

export default function Loading() {
    return (
        <div className='flex justify-center mt-10'>
            <LoaderCircle className='size-10 animate-spin' />
        </div>
    )
}