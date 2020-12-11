import React, { useState } from 'react';
import { notifySuccess, notifyError } from '../../services/notify';

function Home(props) {

    const [url, setUrl] = useState('');
    const [viewPlaylist, setViewPlaylist] = useState(false);

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
            return <div key={index} className='border rounded-md p-3 mb-4 flex flex-col' style={{ borderColor:'rgba(0,0,0,0.06)' }}>
                <p className='m-0 mb-2 font-semibold break-words'>{url}</p>
                <p onClick={() => { removeUrl(index) }} className='m-0 text-sm text-gray-600 cursor-pointer' style={{ fontFamily:'Noto Sans TC, sans-serif' }}>remove</p>
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
        <div className={viewPlaylist ? 'h-screen overflow-y-hidden' : ''} style={{ fontFamily:'Quicksand, sans-serif' }}>
            <div className='relative w-screen grid grid-cols-12' style={{ height:'80vh'}}>
                <div className='absolute top-0 left-0 ml-10 mt-10 text-white z-20 font-semibold'>speakthenews</div>
                <img src='/images/home/newspapers.jpg' className='absolute w-full h-full object-cover'alt='background image' />
                <div className='relative col-start-2 col-span-5 text-white z-20 h-full flex flex-col justify-center' style={{ top:'1vh' }}>
                    <div className='flex flex-col justify-center'>
                        <p className='m-0 mb-4 text-4xl font-semibold' style={{ fontFamily:'Noto Sans TC, sans-serif' }}>LISTEN TO YOUR FAVOURITE ARTICLES TODAY</p>
                        <p className='m-0 mb-5 text-lg'>add a news url to your playlist <i className='ml-1 mt-1 fa fa-headphones'></i></p>
                        <div className='mr-24 relative'>
                            <i className='absolute mt-5 ml-4 text-black fa fa-link text-lg'></i>
                            <input type='text' value={url} onChange={e => { setUrl(e.target.value) }} placeholder='https://link-to-your-article' className='focus:outline-none border border-yellow-900 url__input text-black mb-5 p-4 pl-12 font-semibold w-full rounded' style={{ borderRadius:'3px', borderWidth:'3px' }} autoFocus />
                            <button onClick={addNewUrl} className='focus:outline-none add__btn p-4 shadow-lg'>add to playlist</button>
                        </div>
                    </div>
                </div>
                <div className='col-start-7 col-span-5 px-12 z-20' style={{ height:'80vh' }}>
                    <div className='w-full h-full flex flex-row items-center relative' style={{ top:'8.67%' }}>
                        <img className='w-full h-full object-cover' src='/images/home/headphones.jpg' alt='speakthenews cover image' />
                        <div className='absolute w-full h-full z-10' style={{ background:'rgba(0,0,0,0.2)' }}></div>
                    </div>
                </div>
            </div>
            <div className='pt-24 pb-32 px-64 text-center' style={{ background:'#ebebeb' }}>
                <p className='m-0 mt-12 text-center font-semibold text-xl'>
                    multitask effectively with the speakthenews app. listen to your favourite articles while carrying out your usual
                    daily tasks. it is the ultimate productivity tool that enables you to always stay up to date with happenings
                    in the world while focusing on something else. if you have ever been frustrated at having to drop whatever you
                    were doing simply because you want to focus on an article, then speakthenews is for you.
                </p>
            </div>
            <div className='grid grid-cols-12 pb-12'>
                <div className='col-start-2 col-span-5 pr-16' style={{ height:'80vh' }}>
                    <div className='w-full h-full flex flex-row items-center relative' style={{ bottom:'8.67%' }}>
                        <img className='w-full h-full object-cover' src='/images/home/read-newspaper.jpg' alt='extra text image' />
                    </div>
                </div>
                <div className='col-start-7 pl-12 col-span-5 flex flex-col justify-center'>
                    <div className='flex flex-col'>
                        <p className='font-semibold m-0 mb-4 text-3xl'>A New Way to Stay Up to Date</p>
                        <p className='m-0 text-lg mb-4 text-gray-800 pr-16'>
                            dropping everything because you have an article to read is so old school. listening to them is the
                            new school.
                        </p>
                        <p className='m-0 text-lg text-gray-800 pr-16'>
                            speakthenews takes advantage of the latest speech synthesis technology to deliver a wholesome
                            news experience. it is powered by the responsive voice library which leverages unique mechanisms
                            to deliver the news to you.
                        </p>    
                    </div>
                </div>
            </div>
            <div className='relative w-screen grid grid-cols-12 py-20 text-white font-semibold bg-black'>
                <div className='col-start-2 col-end-5 flex flex-col z-10'>
                    <p className='m-0 mb-2 text-2xl text-yellow-900'>speakthenews</p>
                    <p className='m-0 text-lg'>
                        text to speech tool for news articles. providing value by taking advantage of the latest technology.
                        text to speech tool for news articles.
                    </p>
                </div>
                <div className='col-start-6 col-end-9 pl-8 flex flex-col z-10'>
                    <p className='m-0 mb-2 text-2xl'>supported sites</p>
                    <p className='m-0 mb-1 text-lg'>
                       <a href='https://www.nytimes.com' target='_blank' noreferrer noupgrade>nytimes</a>
                    </p>
                    <p className='m-0 mb-1 text-lg'>
                       <a href='https://www.washingtonpost.com' target='_blank' noreferrer noupgrade>the washington post</a>
                    </p>
                    <p className='m-0 mb-1 text-lg'>
                       <a href='https://www.politico.com' target='_blank' noreferrer noupgrade>politico</a>
                    </p>
                    <p className='m-0 text-lg'>
                       <a href='https://www.economist.com' target='_blank' noreferrer noupgrade>the economist</a>
                    </p>
                </div>
                <div className='col-start-9 col-end-13 pl-6 flex flex-col z-10'>
                    <p className='m-0 mb-2 text-2xl'>contact</p>
                    <div className='flex flex-row items-center mb-3'>
                        <i className='fas fa-map-marker-alt mr-3'></i>
                        <p className='m-0 text-lg'>3, Bisi Awosika Street, Ologolo, Lekki</p>
                    </div>
                    <div className='flex flex-row items-center mb-3'>
                        <i className='fas fa-phone-alt mr-3'></i>
                        <p className='m-0 text-lg'>+2348179868840</p>
                    </div>
                    <div className='flex flex-row items-center'>
                        <i className='fas fa-envelope mr-3'></i>
                        <p className='m-0 text-lg'><a href='mailto:olamileke.dev@gmail.com'>support@speakthenews.xyz</a></p>
                    </div>
                </div>
            </div>

            <div className={props.urls.length > 0 ? 'fixed w-screen transition-all duration-300 ease-in view__playlist__parent active p-6 flex flex-row justify-end bg-white z-30' :
                'fixed w-screen transition-all duration-300 ease-in view__playlist__parent p-6 flex flex-row justify-end bg-white z-30'} style={{ background:'#FBFBFB' }}>
                <div className='flex flex-row items-center'>
                    <button onClick={() => { setViewPlaylist(!viewPlaylist) }} className='focus:outline-none bg-black text-white p-4 mr-5 font-semibold'>View Playlist</button>
                </div>
            </div>

            <div onClick={() => { setViewPlaylist(!viewPlaylist) }} className={viewPlaylist && props.urls.length > 0 ? 'fixed left-0 top-0 w-screen h-screen transition-opacity opacity-100 z-30 duration-300 ease-in bg-black' :
            'fixed left-0 top-0 w-screen h-screen transition-opacity opacity-0 z--9999 duration-300 ease-in'} style={{ background:'rgba(0,0,0,0.8)' }}>
            </div>

            <div className={viewPlaylist && props.urls.length > 0 ? 'fixed overflow-y-auto playlist active h-screen flex flex-col p-8 bg-white z-50 transition-all duration-300 ease-in' :
            'fixed overflow-y-auto playlist h-screen flex flex-col p-8 bg-white z-50 transition-all duration-300 ease-in'} style={{ background:'#FBFBFB' }}>
                <p className='m-0 mb-2 text-lg font-semibold'>playlist ({props.urls.length})</p>
                <hr className='mb-4'/>
                <div>
                    {urlsData}
                </div>
                <div className='mb-4'>
                    <button className='w-full p-5 bg-black text-white font-semibold'>Listen to Playlist <i className='ml-1 mt-1 fa fa-headphones'></i></button>
                </div>
            </div>
        </div>
    )
}

export default Home;