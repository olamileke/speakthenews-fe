import React, { useState } from 'react';
import Home from '../Home/home';
import Player from '../Player/player';
import { notifyError } from '../../services/notify';


function Container() {

    const [tabs, setTabs] = useState({ home:false, player:true });
    const [urls, setUrls] = useState(['https://www.politico.com/news/2020/12/14/electoral-college-biden-victory-444952',
    'https://www.nytimes.com/2020/12/13/us/border-crossing-migrants-biden.html?action=click&module=Top%20Stories&pgtype=Homepage',
    'https://www.nytimes.com/2020/12/13/arts/television/saturday-night-live-fauci.html?action=click&module=Editors%20Picks&pgtype=Homepage',
    'https://www.nytimes.com/2020/12/12/us/politics/republicans-trump-supreme-court-.html?action=click&module=Top%20Stories&pgtype=Homepage'
    ])

    function switchTab(tab) {
        let tabs;
        if(tab == 'home') {
            tabs = { home:true, player:false };
            setTabs(tabs);
        }
        else if(tab == 'player') {
            tabs = { home:false, player:true }
            setTabs(tabs);
        }
    }

    function addUrl(url) {
        const updatedUrls = [...urls, url];
        setUrls(updatedUrls);
    }

    function removeUrl(index) {
        const updatedUrls = [...urls].reverse();
        updatedUrls.splice(index, 1);
        setUrls(updatedUrls);
        notifyError('url removed from playlist!');
    }

    let componentToDisplay;
    tabs.home ? componentToDisplay = <Home switchTab={switchTab} urls={urls} addUrl={addUrl} removeUrl={removeUrl} /> : componentToDisplay = <Player switchTab={switchTab} urls={urls} />;

    return (
        <div>
            {componentToDisplay}
        </div>
    )
    
}

export default Container;