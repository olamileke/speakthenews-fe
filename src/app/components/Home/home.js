import React, { useState, useEffect } from 'react';
import Footer from '../Footer/footer';
import { notifySuccess, notifyError } from '../../services/notify';

function Home(props) {

    const [url, setUrl] = useState('');
    const [viewPlaylist, setViewPlaylist] = useState(false);
    const [isFirefox, setIsFirefox] = useState(false);

    // checking if the user is accessing the application via Firefox
    useEffect(() => {
        const isFirefox = navigator.userAgent.includes('Firefox') ? true : false;
        setIsFirefox(isFirefox);
    }, [])

    function addNewUrl() {
        const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
        if(!re.test(url)) {
            notifyError('enter a valid url!');
            return;
        }

        if(/https?:\/\/(www\.)?nytimes.com\/.+/.test(url)) {
            return validateNyTimes(url);
        }
        
        if(/https?:\/\/(www\.)?politico.com\/.+/.test(url)) {
            return validatePolitico(url);
        }

        if(/https?:\/\/(www\.)?economist.com\/.+/.test(url)) {
            return validateEconomist(url);
        }

        if(/https?:\/\/(www\.)?washingtonpost.com\/.+/.test(url)) {
            return validateWashingtonPost(url);
        }

        notifyError('enter a supported url!');
    }

    // regex validation for nytimes urls
    const validateNyTimes = url => {

        // regex validation to filter out nytimes live articles
        if(/https?:\/\/(www\.)?nytimes.com\/live(.*)/.test(url)) {
            notifyError('nytimes live urls not supported!');
            return false;
        }

        // regex validation to filter out nytimes interactive articles
        if(/https?:\/\/(www\.)?nytimes.com\/interactive(.*)/.test(url)) {
            notifyError('nytimes interactive urls not supported!');
            return false;
        }

        props.addUrl(url);
        notifySuccess('nytimes url added successfully!');
        setUrl('');
        return true;
    }

    // regex validation for politico articles
    const validatePolitico = url => {

        // regex validation to filter out politico video links
        if(/https?:\/\/(www\.)?politico.com\/video(.*)/.test(url)) {
            notifyError('politico video urls not supported!');
            return;
        }

        // regex validation to filter out politico newsletter links
        if(/https?:\/\/(www\.)?politico.com\/newsletters(.*)/.test(url)) {
            notifyError('politico newsletter urls not supported!');
            return;
        }

        props.addUrl(url);
        notifySuccess('politico url added successfully!');
        setUrl('');
        return true;
    }

    // regex validation for the economist articles
    const validateEconomist = url => {

        // regex validation to filter out the economist weekly edition articles
        if(/https?:\/\/(www\.)?economist.com\/weeklyedition(.*)/.test(url)) {
            notifyError('economist weekly edition urls not supported!');
            return;
        }

        props.addUrl(url);
        notifySuccess('the economist url added successfully!');
        setUrl('');
        return true;
    }

    // regex validation for washington post articles
    const validateWashingtonPost = url => {

        // regex validation to filter out washington post video urls
        if(/https?:\/\/(www\.)?washingtonpost.com\/video(.*)/.test(url)) {
            notifyError('w.post video urls not supported!');
            return false;
        }

        // regex validation to filter out washington post travel urls
        if(/https?:\/\/(www\.)?washingtonpost.com\/travel(.*)/.test(url)) {
            notifyError('w.post travel urls not supported!');
            return false;
        }

        props.addUrl(url);
        notifySuccess('w.post url added successfully!');
        setUrl('');
        return true;
    }

    function displayUrls() {
        const urls = [...props.urls].reverse();
        const urlsData = urls.map((url, index) => {
            return <div key={index} className='border p-3 mb-4 flex flex-col' style={{ borderColor:'rgba(0,0,0,0.06)' }}>
                <p className='m-0 mb-2 firefox__font font-semibold break-words'>{url}</p>
                <p onClick={() => { removeUrl(index) }} className='m-0 text-sm text-gray-600 cursor-pointer'>remove</p>
            </div>
        })

        return urlsData;
    }

    function removeUrl(index) {
        if(props.urls.length == 1) {
            setViewPlaylist(!viewPlaylist);
        }
        props.removeUrl(index);
    }

    const urlsData = displayUrls();

    return (
        <div className={viewPlaylist ? 'h-screen overflow-y-hidden quicksand' : 'quicksand'}>
            <div className='initial__content relative w-screen grid grid-cols-12 landing'>
                <div className='absolute top-0 left-0 ml-6 bsm:ml-8 lg:ml-10 mt-5 bsm:mt-6 lg:mt-8 text-white z-20 firefox__font font-semibold'>speakthenews</div>
                <img src='/images/home/newspapers.jpg' className='hidden lg:block absolute w-full h-full object-cover'alt='background' />
                <img src='/images/home/headphones.jpg' className='lg:hidden absolute w-full h-full object-cover'alt='background' />
                <div className='lg:hidden absolute top-0 left-0 w-full h-full' style={{ background:'rgba(0,0,0,0.75)' }}></div>
                <div className='relative main col-start-2 col-end-12 md:col-start-2 md:col-span-10 lg:col-start-2 lg:col-span-5 text-white z-20 h-full flex flex-col justify-center'>
                    <div className='flex flex-col justify-center'>
                        <p className='m-0 mb-2 sm:mb-3 lg:mb-4 text-2xl sm:text-3xl md:text-4xl font-semibold lowercase lg:uppercase header__text'>LISTEN TO YOUR FAVOURITE ARTICLES TODAY</p>
                        <p className='m-0 mb-3 sm:mb-4 lg:mb-5 text-lg'>add a news url to your playlist <i className='ml-1 mt-1 fa fa-headphones'></i></p>
                        <div className='lg:mr-24 relative'>
                            <i className='absolute mt-5 ml-4 text-black fa fa-link text-lg'></i>
                            <input type='text' value={url} onChange={e => { setUrl(e.target.value) }} placeholder='https://link-to-your-article' className='focus:outline-none border border-yellow-900 url__input text-black mb-3 sm:mb-4 lg:mb-5 p-4 pl-12 firefox__font font-semibold w-full rounded' style={{ borderRadius:'3px', border:'2px solid #eee' }} autoFocus />
                            <button onClick={addNewUrl} className='focus:outline-none add__btn bg-lightBlack p-4 shadow-lg'>add to playlist</button>
                        </div>
                    </div>
                </div>
                <div className='col-start-7 col-span-5 px-12 z-20 hidden lg:block' style={{ height:'80vh' }}>
                    <div className='w-full h-full flex flex-row items-center relative' style={{ top:'8.67%' }}>
                        <img className='w-full h-full object-cover' src='/images/home/headphones.jpg' alt='speakthenews cover image' />
                        <div className='absolute w-full h-full z-10' style={{ background:'rgba(0,0,0,0.2)' }}></div>
                    </div>
                </div>
            </div>
            <div className='py-24 lg:pt-24 lg:pb-32 px-10 bxs:px-12 bsm:px-16 bsm:px-32 lg:px-64 text-center' style={{ background:'#ebebeb' }}>
                <p className='m-0 lg:mt-12 text-center firefox__font font-semibold text-lg bsm:text-xl'>
                    multitask effectively with the speakthenews app. listen to your favourite articles while carrying out your usual
                    daily tasks. it is the ultimate productivity tool that enables you to always stay up to date with happenings
                    in the world while focusing on something else. if you have ever been frustrated at having to drop whatever you
                    were doing simply because you want to focus on an article, then speakthenews is for you.
                </p>
            </div>
            <div className='grid grid-cols-12 py-24 bsm:py-12 lg:pt-0 lg:pb-8'>
                <div className='hidden bsm:block col-start-2 col-span-5 lg:pr-16 mid__information'>
                    <div className='w-full h-full flex flex-row items-center relative'>
                        <img className='w-full h-full object-cover' src='/images/home/read-newspaper.jpg' alt='description' />
                    </div>
                </div>
                <div className='col-span-12 px-12 bsm:col-start-7 bsm:pl-8 bsm:pr-0 lg:pl-12 bsm:col-span-5 flex flex-col justify-center'>
                    <div className='flex flex-col items-center bsm:items-start'>
                        <p className='text-center bsm:text-left firefox__font font-semibold m-0 mb-4 text-xl sm:text-2xl bsm:text-3xl bsm:pl-6 lg:pl-0'>A New Way to Stay Up to Date</p>
                        <p className='text-center bsm:text-left m-0 text-lg mb-4 text-gray-800 bsm:pl-6 lg:pl-0 lg:pr-16'>
                            dropping everything because you have an article to read is so old school. listening to them is the
                            new school.
                        </p>
                        <p className='text-center bsm:text-left m-0 text-lg text-gray-800 bsm:pl-6 lg:pl-0 lg:pr-16'>
                            speakthenews takes advantage of the latest speech synthesis technology to deliver a wholesome
                            news experience. it is powered by the responsive voice library which leverages unique mechanisms
                            to deliver the news to you.
                        </p>    
                    </div>
                </div>
            </div>

            <Footer />
            
            <div className={props.urls.length > 0 ? 'fixed w-screen transition-all duration-300 ease-in view__playlist__parent active p-4 sm:p-6 flex flex-row justify-end bg-white z-30' :
                'fixed w-screen transition-all duration-300 ease-in view__playlist__parent p-4 sm:p-6 flex flex-row justify-end bg-white z-30'} style={{ background:'#FBFBFB' }}>
                <div className='flex flex-row items-center'>
                    <button onClick={() => { setViewPlaylist(!viewPlaylist) }} className='focus:outline-none bg-black firefox__font text-white p-3 sm:p-4 lg:mr-5 font-semibold'>view playlist</button>
                </div>
            </div>

            <div onClick={() => { setViewPlaylist(!viewPlaylist) }} className={viewPlaylist && props.urls.length > 0 ? 'fixed left-0 top-0 w-screen h-screen transition-opacity opacity-100 z-30 duration-300 ease-in bg-black' :
            'fixed left-0 top-0 w-screen h-screen transition-opacity opacity-0 z--9999 duration-300 ease-in'} style={{ background:'rgba(0,0,0,0.8)' }}>
            </div>

            <div className={viewPlaylist && props.urls.length > 0 ? 'fixed overflow-y-auto playlist active h-screen flex flex-col p-8 bg-white z-50 transition-all duration-300 ease-in' :
            'fixed overflow-y-auto playlist h-screen flex flex-col p-8 bg-white z-50 transition-all duration-300 ease-in'} style={{ background:'#FBFBFB' }}>
                <div className={isFirefox ? 'flex flex-row justify-between items-center h-5 mt-8 bsm:mt-6 mb-5' 
                : 'flex flex-row justify-between items-center h-5 mt-8 bsm:mt-6 mb-8' }>
                    <p className='m-0 mb-3 text-lg firefox__font font-semibold'>playlist ({props.urls.length})</p>
                    <img onClick={() => { setViewPlaylist(!viewPlaylist) }} src='/images/home/right-arrow.png' className='cursor-pointer object-cover relative' style={{ top:'-2px' }} />
                </div>

                <div>
                    {urlsData}
                </div>
                <div>
                    <button onClick={() => { props.switchTab('player') }} className={isFirefox ? 'focus:outline-none w-full p-5 mb-10 bg-black text-white firefox__font font-semibold' 
                    : 'focus:outline-none w-full p-5 bg-black text-white firefox__font font-semibold'}>listen to playlist</button>
                </div>
            </div>
        </div>
    )
}

export default Home;