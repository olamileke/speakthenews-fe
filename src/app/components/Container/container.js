import React, { useState } from 'react';
import Home from '../Home/home';
import Player from '../Player/player';
import { notifyError } from '../../services/notify';


function Container() {

    const [tabs, setTabs] = useState({ home:true, player:false });
    const [urls, setUrls] = useState(['https://www.nytimes.com/2020/12/17/nyregion/new-york-ppe-refunds.html',
    'https://www.politico.com/news/2020/12/17/never-trump-what-next-447235', 'https://www.economist.com/leaders/2020/12/19/the-year-when-everything-changed',
    'https://www.nytimes.com/interactive/2020/12/17/world/europe/britain-covid-contracts.html?action=click&module=Top%20Stories&pgtype=Homepage',
    'https://www.economist.com/leaders/2020/12/19/why-democracy-failed-in-the-middle-east', 'https://www.politico.com/news/2020/12/17/gop-legal-war-absentee-voting-georgia-runoffs-447266',
    'https://www.washingtonpost.com/education/biden-education-secretary-fenwick-cardona/2020/12/16/5811142e-3fb4-11eb-8bc0-ae155bee4aff_story.html',
    'https://www.economist.com/graphic-detail/2020/12/16/how-would-the-american-economy-have-fared-under-a-gold-standard', 
    'https://www.washingtonpost.com/national-security/trump-biden-voter-fraud-election-security/2020/12/16/c7e75d5a-3fd0-11eb-9453-fc36ba051781_story.html',
    'https://www.economist.com/united-states/2020/12/19/georgias-run-offs-could-decide-donald-trumps-future-and-the-senate',
    'https://www.nytimes.com/2020/12/17/us/covid-vaccine-health-workers.html?action=click&module=Top%20Stories&pgtype=Homepage',
    'https://www.politico.com/news/2020/12/16/covid-vaccine-lobbying-447275', 'https://www.washingtonpost.com/politics/biden-mcconnell-senate-georgia/2020/12/16/72919d6a-3e5a-11eb-9453-fc36ba051781_story.html',
    'https://www.politico.com/news/2020/12/16/interior-david-bernhardt-positive-covid-19-447524'
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