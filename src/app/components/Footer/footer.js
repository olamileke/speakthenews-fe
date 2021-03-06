import React from 'react';

function Footer() {
    
    return (
        <div className='col-span-12 px-8 bsm:px-12 bmd:px-0 lg:px-8 py-12 relative w-screen grid grid-cols-12 bsm:py-20 text-white firefox__font font-semibold bg-black'>
            <div className='col-span-12 mb-4 bsm:mb-0 bsm:col-start-1 bmd:col-start-2 bsm:col-end-5 flex flex-col z-20'>
                <p className='m-0 mb-2 bsm:mb-3 text-xl uppercase'>speakthenews</p>
                <p className='m-0 text-lg'>
                    text to speech tool for news articles. providing ease by taking advantage of the latest technology.
                    create your news playlist today.
                </p>
            </div>
            <div className='z-20 col-span-12 mb-4 bsm:mb-0 bsm:col-start-5 bsm:pl-10 bmd:pl-20 bsm:col-end-9 lg:col-start-6 lg:pl-4 flex flex-col'>
                <p className='m-0 mb-2 bsm:mb-3 uppercase text-xl'>news sites</p>
                <p className='m-0 mb-1 text-lg'>
                    <a href='https://www.nytimes.com' target='_blank' noopener='true' noreferrer='true'>nytimes</a>
                </p>
                <p className='m-0 mb-1 text-lg'>
                    <a href='https://www.washingtonpost.com' target='_blank' noopener='true' noreferrer='true'>the washington post</a>
                </p>
                <p className='m-0 mb-1 text-lg'>
                    <a href='https://www.politico.com' target='_blank' noopener='true' noreferrer='true'>politico</a>
                </p>
                <p className='m-0 text-lg'>
                    <a href='https://www.economist.com' target='_blank' noopener='true' noreferrer='true'>the economist</a>
                </p>
            </div>
            <div className='z-20 col-span-12 bsm:col-start-9 bsm:col-end-13 bsm:pl-4 bmd:pr-20 lg:pr-0 lg:pl-6 flex flex-col'>
                <p className='m-0 mb-2 bsm:mb-3 uppercase text-xl'>contact</p>
                <div className='flex flex-row items-center mb-3'>
                    <i className='fas fa-map-marker-alt mr-3'></i>
                    <p className='m-0 text-lg break-all bmd:break-normal'>3, Bisi Awosika Street, Ologolo, Lekki</p>
                </div>
                <div className='flex flex-row items-center mb-3'>
                    <i className='fas fa-phone-alt mr-3'></i>
                    <p className='m-0 text-lg'>+2348179868840</p>
                </div>
                <div className='flex flex-row items-center pr-6 break-words'>
                    <i className='fas fa-envelope mr-3'></i>
                    <p className='m-0 text-lg'><a href='mailto:olamileke.dev@gmail.com'>olamileke.dev@gmail.com</a></p>
                </div>
            </div>
        </div>
    )
}

export default Footer;