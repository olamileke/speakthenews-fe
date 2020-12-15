import React, {useState, useEffect} from 'react';
import Footer from '../Footer/footer';
import getText from '../../services/text.js';
import './player.css';

function Player(props) {

    const [activeUrl, setActiveUrl] = useState(props.urls[0]);
    const [viewImage, setViewImage] = useState(false);
    const [nowPlayingArticle, setNowPlayingArticle] = useState(false);
    const [totalTextArray, setTotalTextArray] = useState([]);
    const [fetching, setFetching] = useState(false);

    let playlistTiming;
    let currentTextIndex = 0;
    let totalTextContent;

    //fetching the contents of the active url
    useEffect(() => {
        return fetchUrlText();
    }, [activeUrl])

    
     // function to fetch the contents of an article url
     function fetchUrlText() {
        setFetching(true);
        resetPlaylistTiming();

        getText(activeUrl)
        .then(response => {
            const article = response.data.data;
            setNowPlayingArticle(article);
            responsiveVoice.speak(article.content);
            setTotalTextArray(responsiveVoice.multipartText);
            totalTextContent = responsiveVoice.multipartText;
            setPlaylistTiming();
            setFetching(false);
        })
        .catch(error => {
            console.log(error);
        })

        return () => {
            responsiveVoice.cancel();
            resetPlaylistTiming();
        }
    }

    // setting the timing of the article as it plays. the loader
    function setPlaylistTiming() {
        playlistTiming = setInterval(() => {

            const currentIndex = totalTextContent.findIndex(text => text == responsiveVoice.currentMsg.text);

            if(currentIndex != currentTextIndex) {
                const percent = String((currentIndex/totalTextContent.length) * 100) + '%';
                document.getElementById('playlistTiming').style.width = percent;
                currentTextIndex = currentIndex;            }   
        }, 1000)
    }

    function resetPlaylistTiming() {
        document.getElementById('playlistTiming').style.width = '0%';
        clearInterval(playlistTiming);
    }

    // event handler for when the user tries to fast forward or go backwards
    function forwardAndBackwardHandler(direction) {
        let current = totalTextArray.findIndex(text => text == responsiveVoice.currentMsg.text);

        if(direction == 'forward') {
            const total = responsiveVoice.utterances.length;
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

        responsiveVoice.speak(text);
    }

    function parseArticleTitle() {
        if(nowPlayingArticle.title.length > 70) {
            return nowPlayingArticle.title.slice(0,68) + '...';
        }
        return nowPlayingArticle.title;
    }

    // scrolling the playlist horizontally
    function scrollPlaylist(direction) {
        const playlist = document.getElementById('player__playlist');
        if(direction == 'left') {
            playlist.scrollLeft -= 100;
        }
        else {
            playlist.scrollLeft += 100;
        }
    }

    function displayPlaylistUrls() {
        const urls = [...props.urls];

        const markup = urls.map((url, index) => {
            const slicedUrl = url.slice(0, 35) + '...';

            return <div key={index} onClick={() => { setActiveUrl(url) }} className={ url == activeUrl ? 'font-semibold cursor-pointer flex-shrink-0 rounded-sm mr-3 w-1/3 h-32 p-4 flex flex-row justify-center items-center bg-black text-white' :
            'font-semibold cursor-pointer flex-shrink-0 mr-3 w-1/3 h-32 p-4 flex flex-row justify-center items-center'} >
                <p className='m-0 break-all'>{slicedUrl}</p>
            </div>
        })

        return markup;
    }

    // function get text to display if user does not want to view article image
    function getNowPlayingBackgroundText() {
        if(activeUrl.includes('nytimes')) {
            return 'The New York Times';
        }

        if(activeUrl.includes('politico')) {
            return 'Politico';
        }

        if(activeUrl.includes('economist')) {
            return 'The Economist';
        }

        if(activeUrl.includes('washingtonpost')) {
            return 'The Washington Post';
        }
    }

    function pauseAndPlayHandler() {
        const pauseAndPlay = document.getElementById('pauseAndPlay');

        if(pauseAndPlay.classList.contains('fa-pause')) {
            pauseAndPlay.classList.remove('fa-pause');
            pauseAndPlay.classList.add('fa-play');
            responsiveVoice.pause();
        }
        else {
            pauseAndPlay.classList.remove('fa-play');
            pauseAndPlay.classList.add('fa-pause');
            responsiveVoice.resume();
        }
    }

    return (
        <div className={ fetching ? 'w-screen h-screen overflow-y-hidden quicksand grid grid-cols-12' : 'w-screen quicksand grid grid-cols-12' } style={{ background:'#FBFBFB' }}>
            <div className='col-start-2 col-end-12 grid grid-cols-12'>
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
                                { nowPlayingArticle && <a href={activeUrl} target='_blank' className='pl-1 text-md'>read this article <i>here</i></a> }
                            </div>
                            <div className='flex flex-row mb-4 items-center ml-1 w-full'>
                                <div className='flex flex-row justify-start items-center' style={{ width:'5%' }}>
                                    <i onClick={ () => { scrollPlaylist('left') } } className='fa fa-angle-left cursor-pointer text-2xl' style={{ color:'rgba(0,0,0,0.4)' }}></i>
                                </div>
                                <div id='player__playlist' className='player__playlist flex flex-row overflow-x-auto mr-auto' style={{ width:'90%' }}>
                                    {displayPlaylistUrls()}
                                </div>
                                <div className='flex flex-row justify-center items-center'>
                                    <i onClick={ () => { scrollPlaylist('right') } } className='fa fa-angle-right cursor-pointer text-2xl' style={{ color:'rgba(0,0,0,0.4)' }}></i>
                                </div>
                            </div>
                            <div className='flex flex-row items-center pl-1'>
                                <div className='check__container' onClick={() => { setViewImage(!viewImage) }}>
                                    <input type='checkbox' checked={viewImage} />
                                    <span className='checkmark'></span>
                                </div>
                                <p className='m-0 mt-2 italic'>view image</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-7 h-screen py-12 pl-24'>
                    <div className='relative h-full flex flex-col justify-end'>
                        <img src={nowPlayingArticle ? nowPlayingArticle.image : '/images/home/headphones.jpg'} className={ viewImage ? 'transition-opacity duration-300 ease-in object-cover w-full h-full opacity-100 z-10' :
                       'transition-opacity duration-300 ease-in object-cover w-full h-full opacity-0 z--9999' } style={{ borderRadius:'4px' }} />
                        
                        <div className={ viewImage ? 'absolute top-0 left-0 transition-opacity duration-300 ease-in w-full h-full bg-black flex flex-row opacity-0 z--9999 px-5'
                        : 'absolute top-0 left-0 transition-opacity duration-300 ease-in w-full h-full bg-black flex flex-row opacity-100 z-10 px-5' }>
                            <p className='m-0 mt-5 text-white text-6xl noto'>{getNowPlayingBackgroundText()}</p>
                        </div>

                        <div className={ viewImage ? 'absolute top-0 left-0 w-full h-full z-20' :
                       'absolute top-0 left-0 w-full h-full z-0' } style={{ background:'rgba(0,0,0,0.5)', borderRadius:'4px' }}></div>
                        
                        <div className='flex flex-col absolute z-30 px-4 py-8 rounded bg-white' style={{ left:'4%', width:'92%', bottom:'20%' }}>
                            <div className='relative mb-5' style={{ height:'3px' }}>
                                <div className='top-0 left-0 w-full h-full' style={{ background:'#333' }}></div>
                                <div id='playlistTiming' className='transition-all duration-300 ease-in w-0 absolute top-0 left-0 h-full bg-white'></div>
                            </div>
                            <div className='flex flex-row justify-between text-black'>
                                <p className='m-0 transition-colors duration-300 ease-in'><b>{nowPlayingArticle ? nowPlayingArticle.title.slice(0,10) + '...' : getNowPlayingBackgroundText()}</b></p>
                                <div className='flex flex-row mt-1 transition-colors duration-300 ease-in'>
                                    <i onClick={() => { forwardAndBackwardHandler('backward') }} className='fa fa-backward mr-5 cursor-pointer'></i>
                                    <i id='pauseAndPlay' onClick={ () => { pauseAndPlayHandler() } } className='fa fa-pause mr-5 cursor-pointer'></i>
                                    <i onClick={() => { forwardAndBackwardHandler('forward') }} className='fa fa-forward cursor-pointer'></i>
                                </div>
                                <div className='invisible'>
                                    speakthenews
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            <div className={ fetching ? 'flex flex-row justify-center items-center transition-opacity duration-300 ease-in opacity-100 z-50 fixed left-0 top-0 w-screen h-screen' :
            'flex flex-row justify-center items-center transition-opacity duration-300 ease-in opacity-0 z--9999 fixed left-0 top-0 w-screen h-screen z-50' } style={{ background:'rgba(0, 0, 0, 0.5)' }}>
                <div className='flex flex-row items-center justify-center p-4 rounded bg-white'>
                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>    
                </div>
            </div>
        </div>
    )
}

export default Player;