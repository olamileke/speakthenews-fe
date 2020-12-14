import React, {useState, useEffect} from 'react';
import './player.css';

function Player(props) {

    const [activeUrl, setActiveUrl] = useState(props.urls[0]);
    const [viewImage, setViewImage] = useState(true);

    function displayPlaylistUrls() {
        const urls = [...props.urls];
        const slicedUrls = urls.map(url => url.slice(0, 35) + '...');
        const markup = slicedUrls.map((url, index) => {
            return <div key={index} className={url == activeUrl.slice(0, 35) + '...' ? 'cursor-pointer font-semibold flex-shrink-0 rounded-sm mr-3 w-32 h-32 p-4 flex flex-row justify-center items-center bg-black text-white' :
            'cursor-pointer flex-shrink-0 mr-3 w-32 h-32 p-4 flex flex-row justify-center items-center font-semibold'} >
                <p className='m-0 break-all'>{url}</p>
            </div>
        })

        return markup;
    }

    return (
        <div className='w-screen h-screen quicksand grid grid-cols-12' style={{ background:'#FBFBFB' }}>
            <div className='col-start-2 col-end-12 grid grid-cols-12'>
                <div className='col-span-5 py-12'>
                    <div className='flex flex-col h-full'>
                        <div>
                            <p className='m-0 mt-2'>speakthenews</p>
                        </div>
                        <div className='flex flex-col justify-center h-full'>
                            <div className='text-4xl font-semibold mb-3 noto'>
                                Trump Allies Eye Long-Shot Election Reversal in Congress, Testing Pence
                            </div>
                            <div className='pl-1 mb-4'>
                                In interviews, more than two dozen swing-state electors detailed plans for Mondays vote  and a hint of anxiety about Trump.
                            </div>
                            <div className='mb-5'>
                                <a href='#' className='pl-1 text-md'>read this article</a>
                            </div>
                            <div className='flex flex-row mb-5 items-center ml-1 w-full'>
                                <div className='player__playlist flex flex-row overflow-x-auto mr-auto' style={{ width:'91%' }}>
                                    {displayPlaylistUrls()}
                                </div>
                                <div className='flex flex-row justify-center items-center'>
                                    <i className='fa fa-angle-right cursor-pointer text-2xl' style={{ color:'gray' }}></i>
                                </div>
                            </div>
                            <div className='flex flex-row items-center pl-1'>
                                <input type='checkbox' onClick={() => { setViewImage(!viewImage) }} className='mr-2 relative w-5 h-5' style={{ top:'1px' }} />
                                <p className='m-0'>view image</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-7 h-screen py-12 pl-24'>
                    <div className='relative h-full flex flex-col justify-end'>
                        <img src='/images/home/headphones.jpg' className={ viewImage ? 'transition-opacity duration-300 ease-in object-cover w-full h-full opacity-100 z-10' :
                       'transition-opacity duration-300 ease-in object-cover w-full h-full opacity-0 z--9999' } style={{ borderRadius:'4px' }} />
                        
                        <div className={ viewImage ? 'absolute top-0 left-0 transition-opacity duration-300 ease-in w-full h-full bg-black flex flex-row justify-center opacity-0 z--9999 px-5'
                        : 'absolute top-0 left-0 transition-opacity duration-300 ease-in w-full h-full bg-black flex flex-row justify-center opacity-100 z-10 px-5' }>
                            <p className='m-0 mt-5 text-white text-6xl noto'>The New York Times</p>
                        </div>

                        <div className={ viewImage ? 'absolute top-0 left-0 w-full h-full z-20' :
                       'absolute top-0 left-0 w-full h-full z-0' } style={{ background:'rgba(0,0,0,0.5)', borderRadius:'4px' }}></div>
                        
                        <div className={ viewImage ? 'flex flex-col absolute z-30 px-4 py-8 rounded controls__default__background' : 
                        'flex flex-col absolute z-30 px-4 py-8 rounded bg-white' }  style={{ left:'4%', width:'92%', bottom:'20%' }}>
                            <div className='relative mb-5' style={{ height:'3px' }}>
                                <div className='top-0 left-0 w-full h-full' style={{ background:'#333' }}></div>
                                <div className='absolute top-0 left-0 h-full bg-white w-1/4'></div>
                            </div>
                            <div className={ viewImage ? 'flex flex-row justify-between text-white' : 'flex flex-row justify-between text-black' }>
                                <p className='m-0 transition-colors duration-300 ease-in'><b>trump allies...</b></p>
                                <div className='flex flex-row mt-1 transition-colors duration-300 ease-in'>
                                    <i className='fa fa-backward mr-5 cursor-pointer'></i>
                                    <i className='fa fa-pause mr-5 cursor-pointer'></i>
                                    <i className='fa fa-forward cursor-pointer'></i>
                                </div>
                                <div className='invisible'>
                                    speakthenews
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Player;