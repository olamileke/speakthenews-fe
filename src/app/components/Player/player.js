import React, {useState, useEffect} from 'react';
import Footer from '../Footer/footer';
import getText from '../../services/text.js';
import './player.css';

function Player(props) {

    const [activeUrl, setActiveUrl] = useState(props.urls[0]);
    const [viewImage, setViewImage] = useState(false);
    let [nowPlayingArticle, setNowPlayingArticle] = useState(false);
    const [fetching, setFetching] = useState(false);

    //fetching the contents of the active url
    useEffect(() => {
        fetchUrlText();
    }, [activeUrl])

     // function to fetch the contents of an article url
     function fetchUrlText() {
        setFetching(true);

        getText(activeUrl)
        .then(response => {
            setNowPlayingArticle(response.data.data);
            console.log(nowPlayingArticle);
            setFetching(false);
        })
        .catch(error => {
            console.log(error);
        })
    }

    function displayPlaylistUrls() {
        const urls = [...props.urls];
        const slicedUrls = urls.map(url => url.slice(0, 35) + '...');
        const markup = slicedUrls.map((url, index) => {
            return <div key={index} className={url == activeUrl.slice(0, 35) + '...' ? 'font-semibold cursor-pointer flex-shrink-0 rounded-sm mr-3 w-1/3 h-32 p-4 flex flex-row justify-center items-center bg-black text-white' :
            'font-semibold cursor-pointer flex-shrink-0 mr-3 w-1/3 h-32 p-4 flex flex-row justify-center items-center'} >
                <p className='m-0 break-all'>{url}</p>
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

    return (
        <div className={ fetching ? 'w-screen h-screen overflow-y-hidden quicksand grid grid-cols-12' : 'w-screen quicksand grid grid-cols-12' } style={{ background:'#FBFBFB' }}>
            <div className='col-start-2 col-end-12 grid grid-cols-12'>
                <div className='col-span-5 py-12'>
                    <div className='flex flex-col h-full'>
                        <div>
                            <p className='m-0 mt-2'><a href='#'>speakthenews</a> | <a className='cursor-pointer' onClick={() => { props.switchTab('home') }}>home</a></p>
                        </div>
                        <div className='flex flex-col justify-center h-full'>
                            <div className='text-4xl font-semibold mb-3 noto'>
                                { nowPlayingArticle ? nowPlayingArticle.title : '' }
                            </div>
                            <div className='pl-1 mb-4'>
                                { nowPlayingArticle ? nowPlayingArticle.summary : '' }
                            </div>
                            <div className='mb-5'>
                                { nowPlayingArticle && <a href='#' className='pl-1 text-md'>read this article <i>here</i></a> }
                            </div>
                            <div className='flex flex-row mb-6 items-center ml-1 w-full'>
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
                        
                        <div className={ viewImage ? 'absolute top-0 left-0 transition-opacity duration-300 ease-in w-full h-full bg-black flex flex-row opacity-0 z--9999 px-5'
                        : 'absolute top-0 left-0 transition-opacity duration-300 ease-in w-full h-full bg-black flex flex-row opacity-100 z-10 px-5' }>
                            <p className='m-0 mt-5 text-white text-6xl noto'>{getNowPlayingBackgroundText()}</p>
                        </div>

                        <div className={ viewImage ? 'absolute top-0 left-0 w-full h-full z-20' :
                       'absolute top-0 left-0 w-full h-full z-0' } style={{ background:'rgba(0,0,0,0.5)', borderRadius:'4px' }}></div>
                        
                        <div className='flex flex-col absolute z-30 px-4 py-8 rounded bg-white' style={{ left:'4%', width:'92%', bottom:'20%' }}>
                            <div className='relative mb-5' style={{ height:'3px' }}>
                                <div className='top-0 left-0 w-full h-full' style={{ background:'#333' }}></div>
                                <div className='absolute top-0 left-0 h-full bg-white w-1/4'></div>
                            </div>
                            <div className='flex flex-row justify-between text-black'>
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
            <Footer />

            <div className={ fetching ? 'flex flex-row justify-center items-center transition-opacity duration-300 ease-in opacity-100 z-50 fixed left-0 top-0 w-screen h-screen' :
            'flex flex-row justify-center items-center transition-opacity duration-300 ease-in opacity-0 z--9999 fixed left-0 top-0 w-screen h-screen z-50' } style={{ background:'rgba(255, 255, 255, 0.97)' }}>
                <div className='loader'>
                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>    
                </div>
            </div>
        </div>
    )
}

export default Player;