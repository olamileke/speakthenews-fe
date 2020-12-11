import React from 'react';

function Home() {

    return (
        <div>
            <div className='relative w-screen grid grid-cols-12' style={{ height:'80vh'}}>
                <div className='absolute top-0 left-0 ml-10 mt-10 text-white z-20 font-semibold' style={{ fontFamily:'Quicksand, sans-serif' }}>speakthenews</div>
                <img src='/images/home/newspapers.jpg' className='absolute w-full h-full object-cover' />
                <div className='absolute w-full h-full z-10' style={{ background:'rgba(0,0,0,0.3)' }}></div>
                <div className='relative col-start-2 col-span-5 text-white z-20 h-full flex flex-col justify-center' style={{ top:'1vh', fontFamily:'Noto Sans TC, sans-serif'  }}>
                    <div className='flex flex-col justify-center'>
                        <p className='m-0 mb-4 text-4xl font-semibold'>LISTEN TO YOUR FAVOURITE ARTICLES TODAY</p>
                        <p className='m-0 mb-5 text-lg' >add a news url to your playlist</p>
                        <div className='mr-24 relative'>
                            {/* <i className='absolute text-black fa fa-link top-0 left-0 ml-3 mt-4 text-xl'></i> */}
                            <input type='text' className='text-black mb-5 p-4 w-full rounded' value='https://' style={{ borderRadius:'0px' }} autofocus />
                            <button className='p-4 shadow-3xl font-semibold' style={{ background:'#545454', borderRadius:'7px 0 7px 0', fontFamily:'Quicksand, sans-serif' }}>add to playlist</button>
                        </div>
                    </div>
                </div>
                <div className='col-start-7 col-span-5 px-12 z-20' style={{ height:'80vh' }}>
                    <div className='w-full h-full flex flex-row items-center relative' style={{ top:'10.67%' }}>
                        <img className='w-full h-full object-cover' src='/images/home/headphones.jpg' />
                        <div className='absolute top-0 left-0 z-10 w-full h-full' style={{ background:'rgba(0,0,0,0.2)' }}></div>
                    </div>
                </div>
            </div>
            <div className='py-32' style={{ background:'#545454' }}>

            </div>
        </div>
    )
}

export default Home;