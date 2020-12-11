import React, { useState } from 'react';
import Home from '../Home/home';
import Player from '../Player/player';

function Container() {

    const [tabs, setTabs] = useState({ home:true, player:false });
    const [urls, setUrls] = useState([]);

    function switchTab(tab) {
        let tabs;
        if(tab == 'home') {
            tabs = { home:true, player:false };
            setTabs(tabs);
        }
        else if(tabs == 'player') {
            tabs = { home:false, player:true }
            setTabs(tabs);
        }
    }

    function addUrl(url) {
        const updatedUrls = [...urls, url];
        setUrls(updatedUrls);
    }

    let componentToDisplay;
    tabs.home ? componentToDisplay = <Home addUrl={addUrl} /> : componentToDisplay = <Player />;

    return (
        <div>
            {componentToDisplay}
        </div>
    )
    
}

export default Container;