import React, {useState, useEffect} from 'react';
import Footer from '../Footer/footer';
import getText from '../../services/text.js';
import Glide from "@glidejs/glide";
import './player.css';
import { notifyError, notifySuccess } from '../../services/notify';

function Player(props) {

    const [activeUrl, setActiveUrl] = useState(props.urls[0]);
    const [viewImage, setViewImage] = useState(false);
    const [nowPlayingArticle, setNowPlayingArticle] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [totalTextArray, setTotalTextArray] = useState([]);
    const [fetching, setFetching] = useState(false);

    let playlistTiming;
    let currentTextIndex = 0;
    let totalTextContent;

    //fetching the contents of the active url
    useEffect(() => {
        return fetchUrlText();
    }, [activeUrl])

    // creating the glide controls for the slide along the playlist
    useEffect(() => {
        if(window.screen.width > 1024 && props.urls.length > 3) {
            new Glide(".glide", {
                bound:true,
                startAt:0,
                perView: 2.95,
                type: "slider"
              }).mount();
        }
    }, []);

    // checking if the user is accessing the application via chrome
    function isChrome() {
        let isChrome = navigator.userAgent.includes('Firefox') || navigator.userAgent.includes('Edg') ? false : true;
        return isChrome;
    }
    
     // function to fetch the contents of an article url
     function fetchUrlText() {
        setFetching(true);
        setPlaying(false);
        
        if(isChrome()) {
            window.screen.width > 1024 ? document.getElementById('playlistTiming').style.width = '0%' 
            : document.getElementById('playlistTimingSmall').style.width = '0%';
            resetPlaylistTiming();
        }

        getText(activeUrl)
        .then(response => {
            const article = response.data.data;
            setNowPlayingArticle(article);
            const content = `${article.title} ` + article.content;
            window.responsiveVoice.speak(content);
            
            if(isChrome()) {
                setPlaying(true);
                setTotalTextArray(window.responsiveVoice.multipartText);
                totalTextContent = window.responsiveVoice.multipartText;
                setPlaylistTiming();    
            }
            
            setFetching(false);
        })
        .catch(error => {
            setFetching(false);
            notifyError('an error occured');
            const urls = [...props.urls];
            const nextActiveUrlIndex = (urls.findIndex(url => url == activeUrl)) + 1;

            if(nextActiveUrlIndex < urls.length) {
                setActiveUrl(urls[nextActiveUrlIndex]);
            }
            else {
                notifySuccess('end of playlist reached!');
            }
        })

        return () => {
            window.responsiveVoice.cancel();
            resetPlaylistTiming();
        }
    }

    // setting the timing of the article as it plays. the loader
    function setPlaylistTiming() {
        playlistTiming = setInterval(() => {

            let currentIndex = totalTextContent.findIndex(text => text == window.responsiveVoice.currentMsg.text);
            currentIndex = currentIndex + 1;

            if(currentIndex != currentTextIndex) {
                const percent = String((currentIndex/totalTextContent.length) * 100) + '%';
                window.screen.width > 1024 ? document.getElementById('playlistTiming').style.width = percent 
                : document.getElementById('playlistTimingSmall').style.width = percent;
                currentTextIndex = currentIndex;            
            }
            
            // playing the next article in the playlist when the current one ends
            if((currentIndex == totalTextContent.length) && !window.responsiveVoice.isPlaying()) {
                const urls = [...props.urls];
                const nextActiveUrlIndex = (urls.findIndex(url => url == activeUrl)) + 1;

                if(nextActiveUrlIndex < urls.length) {
                    setActiveUrl(urls[nextActiveUrlIndex]);
                }
                else {
                    notifySuccess('end of playlist reached!');
                }
                resetPlaylistTiming();
            }
        }, 1000)
    }

    function resetPlaylistTiming() {
        clearInterval(playlistTiming);
    }

    // event handler for when the user tries to fast forward or go backwards
    function forwardAndBackwardHandler(direction) {
        let current = totalTextArray.findIndex(text => text == window.responsiveVoice.currentMsg.text);

        if(direction == 'forward') {
            const total = window.responsiveVoice.utterances.length;
            if(current < (total - 1)) {
                current = current + 1;
            }
        }
        else if(direction == 'backward') {
            if(current > 0) {
                current = current - 1;
            }
        }

        const newTextArray = totalTextArray.slice(current, );
        const text = newTextArray.reduce((totalText, currentText) => {
            return totalText + currentText;
        })

        window.responsiveVoice.speak(text);
    }

    function parseArticleTitle() {
        if(nowPlayingArticle.title.length > 70) {
            return nowPlayingArticle.title.slice(0,63) + '...';
        }
        return nowPlayingArticle.title;
    }

    function getNewsSite() {
        if(activeUrl.includes('nytimes')) {
            return 'The New York Times';
        }

        if(activeUrl.includes('washingtonpost')) {
            return 'The Washington Post';
        }

        if(activeUrl.includes('economist')) {
            return 'The Economist';
        }

        if(activeUrl.includes('politico')) {
            return 'Politico';
        }
    }

    function displayPlaylistUrls() {
        const urls = [...props.urls];

        const markup = urls.map((url, index) => {
            const slicedUrl = url.slice(0, 35) + '...';

            return <div key={index} onClick={() => { setActiveUrl(url) }} className={ url == activeUrl ? 'active__url firefox__font glide__slide font-semibold cursor-pointer flex-shrink-0 mr-3 w-3/7 bsm:w-1/3 md:w-1/4 lg:w-1/3 h-32 p-4 flex flex-row justify-center items-center bg-black text-white' :
            'firefox__font glide__slide font-semibold cursor-pointer flex-shrink-0 mr-3 w-3/7 bsm:w-1/3 md:w-1/4 lg:w-1/3 h-32 p-4 flex flex-row justify-center items-center'} >
                <p className='m-0 break-all'>{slicedUrl}</p>
            </div>
        })

        return (
            <div className='flex flex-row glide__slides w-full'>
                {markup}
            </div>
        )
    }

    // function get text to display if user does not want to view article image
    function getNowPlayingBackgroundText() {

        if(!nowPlayingArticle) {
            return 'speakthenews';
        }

        return nowPlayingArticle.title.slice(0, 30) + '...';
    }

    function pauseAndPlayHandler() {
        const pauseAndPlay = window.screen.width > 1024 ? document.getElementById('pauseAndPlay') :
        document.getElementById('pauseAndPlaySm')

        if(pauseAndPlay.classList.contains('fa-pause')) {
            window.responsiveVoice.pause();
        }
        else {
            window.responsiveVoice.resume();
        }

        setPlaying(!playing);
    }

    return (
        <div className={ fetching ? 'w-screen h-screen overflow-y-hidden quicksand grid grid-cols-12' : 'w-screen quicksand grid grid-cols-12' } style={{ background:'#FBFBFB' }}>
            <div className='hidden lg:grid col-start-2 col-end-12 grid grid-cols-12'>
                <div className='col-span-5 py-12'>
                    <div className='flex flex-col h-full'>
                        <div>
                            <p className='m-0 mt-2'><a href='#' onClick={() => { props.switchTab('home') }}>speakthenews</a></p>
                        </div>
                        <div className='flex flex-col justify-center h-full'>
                            <div className='text-4xl font-semibold mb-3 noto'>
                                { nowPlayingArticle ? parseArticleTitle() : '' }
                            </div>
                            <div className='pl-1 mb-4'>
                                { nowPlayingArticle ? nowPlayingArticle.summary : '' }
                            </div>
                            <div className='mb-5'>
                                { nowPlayingArticle && <p  className='pl-1 text-md'>read this article <a href={activeUrl} target='_blank' noopener="true" noreferrer="true">here</a></p> }
                            </div>
                            <div className='flex flex-row mb-4 items-center ml-1 w-full glide'>
                                {props.urls.length > 3 && <div className='flex flex-row justify-start items-center glide__arrows' data-glide-el="controls" style={{ width:'5%' }}>
                                    <i className='fa fa-angle-left cursor-pointer text-xl glide__arrow glide__arrow--left' data-glide-dir="<" style={{ color:'rgba(0,0,0,0.4)' }}></i>
                                </div>}
                                <div id='player__playlist' className='player__playlist flex flex-row overflow-x-auto mr-auto glide__track' data-glide-el="track" style={{ width:'90%' }}>
                                    {displayPlaylistUrls()}
                                </div>
                                {props.urls.length > 3 && <div className='flex flex-row justify-center items-center glide__arrows' data-glide-el="controls">
                                    <i className='fa fa-angle-right cursor-pointer text-xl glide__arrow glide__arrow--right' data-glide-dir=">" style={{ color:'rgba(0,0,0,0.4)' }}></i>
                                </div>}
                            </div>
                            <div className='flex flex-row items-center pl-1'>
                                <div className='check__container' onClick={() => { setViewImage(!viewImage) }}>
                                    <input type='checkbox' checked={viewImage} />
                                    <span className='checkmark'></span>
                                </div>
                                <p className='m-0 mt-2'>view image</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-7 h-screen py-12 pl-24'>
                    <div className='relative h-full flex flex-col justify-end'>
                        <img src={nowPlayingArticle ? nowPlayingArticle.image : '/images/home/headphones.jpg'} alt={nowPlayingArticle ? nowPlayingArticle.title.slice(0, 30) + '...' : 'speakthenews'}
                        className={ viewImage ? 'transition-opacity duration-300 ease-in object-cover w-full h-full opacity-100 z-10' :
                       'transition-opacity duration-300 ease-in object-cover w-full h-full opacity-0 z--9999' } style={{ borderRadius:'4px' }} />
                        
                        <div className={ viewImage ? 'absolute top-0 left-0 transition-opacity duration-300 ease-in w-full h-full bg-black flex flex-row opacity-0 z--9999 px-5'
                        : 'absolute top-0 left-0 transition-opacity duration-300 ease-in w-full h-full bg-black flex flex-row opacity-100 z-10 px-5' }>
                            <p className='m-0 mt-5 text-white text-6xl noto'>{getNowPlayingBackgroundText()}</p>
                        </div>

                        <div className={ viewImage ? 'absolute top-0 left-0 w-full h-full z-20' :
                       'absolute top-0 left-0 w-full h-full z-0' } style={{ background:'rgba(0,0,0,0.5)', borderRadius:'4px' }}></div>
                        
                        {isChrome() && <div className='flex flex-col absolute z-30 px-4 py-8 rounded-lg w-full' style={{ background:'#FBFBFB', borderRadius:'18px 18px 0 0' }}>
                            <div className='relative mb-5' style={{ height:'3px' }}>
                                <div className='top-0 left-0 w-full h-full bg-black'></div>
                                <div id='playlistTiming' className='transition-all duration-300 ease-in w-0 absolute top-0 left-0 h-full' style={{ background:'#FBFBFB' }}></div>
                            </div>
                            <div className='flex flex-col w-full items-center mb-3'>
                                <p className='m-0 mb-1 text-lg'>{ getNewsSite() }</p>
                                {nowPlayingArticle && <p className='m-0'>{nowPlayingArticle.summary.slice(0,50) + '...'}</p>}
                            </div>
                            <div className='flex flex-row justify-center text-black relative' style={{ top:'2px' }}>
                                <div className='flex flex-row items-center transition-colors duration-300 ease-in'>
                                    <i onClick={() => { forwardAndBackwardHandler('backward') }} className='fa fa-backward mr-5 cursor-pointer'></i>
                                    <div className='w-12 h-12 flex flex-row justify-center items-center mr-5 border border-black rounded-full'> 
                                        <i id='pauseAndPlay' onClick={ () => { pauseAndPlayHandler() } } className={ playing ? 'fa fa-pause cursor-pointer' : 'fa fa-play cursor-pointer' }></i>
                                    </div>
                                    <i onClick={() => { forwardAndBackwardHandler('forward') }} className='fa fa-forward cursor-pointer'></i>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>

            <div className='p-4 bsm:p-6 bmd:p-8 lg:hidden col-span-12 grid grid-cols-12'>
                <div className='col-span-12 article__image__parent'>
                    <div className='relative h-full flex flex-col justify-end'>
                        <img src={nowPlayingArticle ? nowPlayingArticle.image : '/images/home/headphones.jpg'} alt={nowPlayingArticle ? nowPlayingArticle.title.slice(0, 30) + '...' : 'speakthenews'}
                        className='transition-opacity duration-300 ease-in object-cover w-full h-full opacity-100 z-10' />
                        <div className='absolute top-0 left-0 w-full h-full z-20' style={{ background:'rgba(0,0,0,0.28)', borderRadius:'4px' }}>
                            <a href='#' className='text-white font-semibold z-50 relative' onClick={() => { props.switchTab('home') }}
                            style={{ top:'4%', left:'4%' }}>speakthenews</a>
                        </div>
                        
                        {isChrome() && <div className='flex flex-col absolute z-30 px-4 py-8 rounded' style={{ background:'rgba(0,0,0,0.5)', left:'4%', width:'92%', bottom:'20%' }}>
                            <div className='relative mb-5' style={{ height:'3px' }}>
                                <div className='top-0 left-0 w-full h-full bg-white'></div>
                                <div id='playlistTimingSmall' className='transition-all duration-300 ease-in w-0 absolute top-0 left-0 h-full' style={{ background:'rgba(0,0,0,0.5)'}}></div>
                            </div>
                            <div className='flex flex-col items-center text-white'>
                                <div className='flex flex-row mt-1 transition-colors duration-300 ease-in'>
                                    <i onClick={() => { forwardAndBackwardHandler('backward') }} className='fa fa-backward mr-5 cursor-pointer'></i>
                                    <i id='pauseAndPlaySm' onClick={ () => { pauseAndPlayHandler() } } className={ playing ? 'fa fa-pause mr-5 cursor-pointer' : 'fa fa-play mr-5 cursor-pointer' }></i>
                                    <i onClick={() => { forwardAndBackwardHandler('forward') }} className='fa fa-forward cursor-pointer'></i>
                                </div>
                                {nowPlayingArticle && <p className='m-0 mt-3 text-center'>{nowPlayingArticle.title.slice(0, 50) + '...'}</p>}
                            </div>
                        </div>}
                    </div>
                </div>
                <div className='col-span-12 py-10 md:py-16'>
                    <div className='flex flex-col h-full'>
                        <div className='px-2 bsm:px-0 flex flex-col justify-center h-full'>
                            <div className='text-3xl md:text-4xl font-semibold mb-3 noto'>
                                { nowPlayingArticle ? parseArticleTitle() : '' }
                            </div>
                            <div className='mb-4'>
                                { nowPlayingArticle ? nowPlayingArticle.summary : '' }
                            </div>
                            <div className='mb-5'>
                                { nowPlayingArticle && <a href={activeUrl} target='_blank' noopener="true" noreferrer="true" className='mr-3 text-md'>read this article here</a> }
                            </div>
                            <div className='flex flex-row items-center w-full'>
                                <div id='player__playlist' className='player__playlist flex flex-row overflow-x-auto mr-auto w-full'>
                                    {displayPlaylistUrls()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            <div onClick={() => { props.switchTab('home') }} className='fixed bottom-0 right-0 cursor-pointer mb-6 mr-6 bg-black w-12 h-12 rounded-lg flex flex-row justify-center items-center'>
                <i className='fa fa-reply text-xl text-white' />
            </div>

            <div className={ fetching ? 'fetching__parent flex flex-row justify-center items-center transition-opacity duration-300 ease-in opacity-100 z-50 fixed left-0 top-0 w-screen h-screen' :
            'fetching__parent flex flex-row justify-center items-center transition-opacity duration-300 ease-in opacity-0 z--9999 fixed left-0 top-0 w-screen h-screen z-50' }>
                <div className='flex flex-row items-center justify-center p-4 rounded bg-white'>
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>    
                </div>
            </div>
        </div>
    )
}

export default Player;