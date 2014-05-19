var SoundDownloader = (function() {

    var hostSongData = {
        'action': null,
        'title': null,
        'title_container': null,
        'performer': null,
        'performer_container': null,
        'track_version': null
    };

    var hostsList = {
        'rdio': 'www.rdio.com',
        'deezer': 'www.deezer.com',
        'youtube': 'www.youtube.com',
        'soundcloud': 'soundcloud.com',
        'beatport': 'www.beatport.com',
    };
    var currentHost = window.top.location.host;
    var pathname = window.top.location.pathname;
    // Constructor
    function SoundDownloader(data) {
        // Dispatch action from message sender
        if (typeof data !== 'undefined' && typeof data.action !== 'undefined')
        {
            if (data.action == 'downloadTrack')
            {
                this.downloadTrack(data);
            }
            else if (data.action == 'searchTrack')
            {
                this.searchTrack(data);
            }
            else if (data.action == 'searchTrackFromLink')
            {
                this.searchTrackFromLink(data);
            }
            else if (data.action == 'searchTrackFromAnchor')
            {
                this.searchTrackFromAnchor(data);
            }
            else if (data.action == 'downloadTrackFromLink')
            {
                this.downloadTrackFromLink(data);
            }
            else if (data.action == 'downloadTrackFromAnchor')
            {
                this.downloadTrackFromAnchor(data);
            }
            else if (data.action == 'refresh')
            {
                this.refreshPage();
            }
        }
        else
        {
            this.refreshPage();
        }
    }

    SoundDownloader.prototype.refreshPage = function()
    {
        // Affichage des boutons en fonctions des sites hosts

        /////////////
        // YOUTUBE //
        /////////////
        if (currentHost === hostsList.youtube)
        {
            var playerLinkContext = setInterval(function() {
                if (document.getElementById('watch-headline-title'))
                {
                    if (document.getElementById('get-track-download') == null)
                    {
                        clearInterval(playerLinkContext);
                        playerContainer = document.getElementById('watch-headline-title');
                        getTrackElement = document.createElement('div');
                        getTrackElement.className = 'getTrack-element';
                        getTrackElement.innerHTML = '<a href="#playerLinkContext" class="get-track-download" id="get-track-download">[ Télécharger le son ]</a>';
                        getTrackElement.addEventListener('click', function(){
                            return soundDownloader.initDownload({context: "link"});
                        });
                        playerContainer.appendChild(getTrackElement);
                    }
                }
            }, 2000);

            // Player list context
            var playerListContext = setInterval(function() {
                if (typeof document.getElementById('watch-related') !== 'undefined')
                {
                    // Add context tip in related video
                    playerListContainer = document.getElementById('watch-related');
                    if (playerListContainer.classList.contains('player-list-context') == false)
                    {
                        var items = playerListContainer.querySelectorAll('.video-list-item');
                        for(var i;i<items.length;i++)
                        {
                            item = playerListContainer.getElementsByClassName('video-list-item')[i];
                            link = item.getElementsByTagName('a')[0];
                            link.setAttribute('data-key', i);
                            link.href = link.href + '#playerListContext|' + i;
                        }

                        playerListContainer.className = playerListContainer.className + ' player-list-context';
                    }
                }
            }, 2000);

}
        ////////////////
        // SOUNDCLOUD //
        ////////////////
        else if (currentHost === hostsList.soundcloud)
        {
            var playerLinkContext = setInterval(function() {

                if (document.querySelectorAll('.listen-content .sound__soundActions .sc-button-group').length > 0)
                {
                    if (document.getElementById('get-track-download') == null)
                    {
                        clearInterval(playerLinkContext);
                        playerContainer = document.querySelector('.listen-content .sound__soundActions .sc-button-group');
                        getTrackElement = document.createElement('button');
                        getTrackElement.className = 'sc-button sc-button-medium sc-button-responsive';
                        getTrackElement.innerHTML = '<a href="#playerLinkContext" class="get-track-download" id="get-track-download">Télécharger</a>';
                        getTrackElement.addEventListener('click', function(){
                            return soundDownloader.initDownload({context: "link"});
                        });
                        playerContainer.appendChild(getTrackElement);
                    }
                }
            }, 2000);

            // Player top context
            var playerTopContext = setInterval(function() {
                if (typeof document.getElementsByClassName('playbackTitle__link sc-truncate')[0] !== 'undefined')
                {
                    // Add context tip in playerTop
                    playerTopContainer = document.getElementsByClassName('playbackTitle__link sc-truncate')[0];
                    playerTopContainer.href = playerTopContainer.href + '#playerTopContext';
                }
            }, 2000);
        }
        //////////////
        // BEATPORT //
        //////////////
        else if (currentHost === hostsList.beatport)
        {
            var playerTopContext = setInterval(function() {
                if (document.getElementById('player-item') && document.getElementById('site-nav'))
                {
                    if (document.getElementById('get-track-download') == null)
                    {
                        clearInterval(playerTopContext);
                        playerContainer = document.getElementById('site-nav').getElementsByTagName('ul')[0];
                        getTrackElement = document.createElement('li');
                        getTrackElement.className = 'nav-item';
                        getTrackElement.innerHTML = '<a href="#playerTopContext" class="get-track-download" id="get-track-download"><span>[ Télécharger ]</span><span class="tick"></span></a>';
                        getTrackElement.addEventListener('click', function(){
                            return soundDownloader.initDownload({context: "playerTop"});
                        });
                        playerContainer.appendChild(getTrackElement);
                    }
                }
            }, 2000);

            // Player list context
            var playerListContext = setInterval(function() {
                if (typeof document.getElementsByClassName('track-grid-browse')[0] !== 'undefined')
                {
                    // Add context tip in track grid
                    playerListContainer = document.getElementsByClassName('track-grid-browse')[0];
                    if (playerListContainer.classList.contains('player-list-context') == false)
                    {
                        var links = playerListContainer.querySelectorAll('tbody>tr>td.secondColumn>a');
                        for(var key=0; key < links.length;key++)
                        {
                            link = links[key];
                            link.setAttribute('data-key', key);
                            link.href = link.href + '#playerListContext|' + key;
                        }
                        playerListContainer.className = playerListContainer.className + ' player-list-context';
                    }
                }
            }, 2000);
        }
        ////////////
        // DEEZER //
        ////////////
        else if (currentHost === hostsList.deezer)
        {
            var playerTopContext = setInterval(function() {
                if (document.querySelectorAll('.page-header .nav').length > 0)
                {
                    if (document.getElementById('get-track-download') == null)
                    {
                        clearInterval(playerTopContext);
                        playerContainer = document.querySelector('.page-header .nav');
                        getTrackElement = document.createElement('li');
                        getTrackElement.className = 'nav-item';
                        getTrackElement.innerHTML = '<a href="#playerTopContext" class="get-track-download deezify-link" id="get-track-download"><span class="deezify-text">[ Télécharger ]</span></a>';
                        getTrackElement.addEventListener('click', function(){
                            return soundDownloader.initDownload({context: "playerTop"});
                        });
                        playerContainer.appendChild(getTrackElement);
                    }
                }
            }, 2000);
        }
        ////////////
        // RDIO //
        ////////////
        else if (currentHost === hostsList.rdio)
        {
            var playerTopContext = setInterval(function() {
                if (document.querySelectorAll('.bottom.player_bottom').length > 0)
                {
                    if (document.getElementById('get-track-download') == null)
                    {
                        clearInterval(playerTopContext);
                        playerContainer = document.querySelector('.bottom.player_bottom');
                        getTrackElement = document.createElement('span');
                        getTrackElement.className = 'nav-item';
                        getTrackElement.innerHTML = '<a href="#playerTopContext" class="get-track-download" style="right: 179px; position: absolute; color: #fff;" id="get-track-download">[ Télécharger ]</a>';
                        getTrackElement.addEventListener('click', function(){
                            return soundDownloader.initDownload({context: "playerTop"});
                        });
                        playerContainer.appendChild(getTrackElement);
                    }
                }
            }, 2000);
        }
}

SoundDownloader.prototype.initDownload = function(params)
{
    hostSongData.context = (typeof params.context === 'undefined') ? 'link' : params.context;
    hostSongData.key = (typeof params.key === 'undefined') ? 0 : params.key;        
    hostSongData = soundDownloader.searchData(hostSongData);
    hostSongData.action = "downloadTrack";
    soundDownloader.downloadTrack(hostSongData);
    return false;
}

    //////////////////////////
    // SEARCH TRACK PROCESS //
    //////////////////////////

    SoundDownloader.prototype.searchTrack = function(params) {
        soundDownloader.doRequest(params, function() {
            var results = this;
            // Open tab
            chrome.runtime.sendMessage({action: "opentab", results: results}, function(response) {

            });
        });
    }

    SoundDownloader.prototype.searchTrackFromLink = function(params) {
        hostSongData.context = (typeof params.context === 'undefined') ? 'link' : params.context;   
        hostSongData.key = (typeof params.key === 'undefined') ? 0 : params.key;        
        hostSongData = soundDownloader.searchData(hostSongData);
        this.searchTrack(hostSongData);
    }

    SoundDownloader.prototype.searchTrackFromAnchor = function(params) {
        links = document.querySelectorAll('a');
        for(var i=0;i<links.length;i++)
        {
            if (links[i].href == params.link)
            {
                if (links[i].innerText)
                    params.title = links[i].innerText;
                else if (links[i].text)
                    params.title = links[i].text;
                else
                    params.title = links[i].name;

                soundDownloader.searchTrack(params);

                return true;
            }
        }
    }

    ///////////////////////////////
    // DOWNLOAD TRACK process // //
    ///////////////////////////////

    SoundDownloader.prototype.downloadTrackFromLink = function(params) {
        hostSongData.context = (typeof params.context === 'undefined') ? 'link' : params.context;        
        hostSongData.key = (typeof params.key === 'undefined') ? 0 : params.key;        
        hostSongData = soundDownloader.searchData(hostSongData);
        this.downloadTrack(hostSongData);
    }
    SoundDownloader.prototype.downloadTrack = function(params) {
        params.count = 1;
        soundDownloader.doRequest(params, function() {
            var result = this[0];
            var url = document.createElement('a');
            url.download = result.artist + ' - ' + result.title + '.mp3';
            url.href = result.url;
            url.dataset.downloadurl = ['audio/mpeg', url.download, url.href].join(':');
            url.click();
        });
    }

    SoundDownloader.prototype.downloadTrackFromAnchor = function(params) {
        links = document.querySelectorAll('a');
        for(var i=0;i<links.length;i++)
        {
            if (links[i].href == params.link)
            {
                if (links[i].innerText)
                    params.title = links[i].innerText;
                else if (links[i].text)
                    params.title = links[i].text;
                else
                    params.title = links[i].name;

                soundDownloader.downloadTrack(params);

                return true;

            }
        }
    }

    ////////////////////////////
    // DO REQUEST to vk.com //
    ////////////////////////////

    SoundDownloader.prototype.doRequest = function(params, callback) {
        // Default value
        params.onlyAuthor = (typeof params.onlyAuthor === 'undefined') ? false : params.onlyAuthor;
        params.count = (typeof params.count === 'undefined' || params.count > 300) ? 300 : params.count;
        params.fixParentheses = (typeof params.fixParentheses === 'undefined') ? false : params.count;

        var vkParams = {
            'app': {
                'token': '4cd077a4a74c9d34a5d7cd23031a6b680b239bcb38e6834cf4ddffd99f39975d382a4454fa2478ef7e29f'
            },
            'api': {
                'url': 'https://api.vk.com',
                'method': 'audio.search',
                'version': '5.7'
            }
        };

        // Only author
        if (params.title == null || params.title == '')
        {
            params.trackSearch = params.performer;
            params.onlyAuthor = true;
        }
        else
        {
            params.trackSearch = (params.performer == '' || params.performer == null) ? params.title : params.performer + ' - ' + params.title;
        }

        // Fix track title
        params.trackSearch = this.fixTrack(params.trackSearch, params.fixParentheses);

        // Query
        var apiQueryData = {
            'q': params.trackSearch,
            'auto_complete': 0,
            'access_token': vkParams.app.token,
            'v': vkParams.api.version,
            'sort': 0,
            'performer_only': (params.onlyAuthor) ? 1 : 0,
            'count': params.count
        };

        // Do query
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', vkParams.api.url + '/method/' + vkParams.api.method + soundDownloader.encodeQueryData(apiQueryData), true);
        xmlhttp.send();
        
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState === 4)
            {
                var apiResponse = JSON.parse(xmlhttp.response);
                var results = apiResponse.response.items;

                // OK !
                if (typeof apiResponse.error === 'undefined' && apiResponse.response.count)
                {
                    if (typeof callback == "function")
                    {
                        callback.apply(results);
                    }
                }

                else if (typeof apiResponse.error === 'undefined' && !apiResponse.response.count)
                {
                    // Retry without parentheses
                    if (params.fixParentheses === false)
                    {
                        params.fixParentheses = true;
                        params.trackSearch = soundDownloader.fixTrack(params.trackSearch, params.fixParentheses);
                        apiQueryData.q = params.trackSearch;

                        ///////////////////////////////////////
                        // Re-DO query without parentheses ! //
                        ///////////////////////////////////////

                        var xmlhttptwo = new XMLHttpRequest();
                        xmlhttptwo.open('GET', vkParams.api.url + '/method/' + vkParams.api.method + soundDownloader.encodeQueryData(apiQueryData), true);
                        xmlhttptwo.send();
                        
                        xmlhttptwo.onreadystatechange = function()
                        {
                            if (xmlhttptwo.readyState === 4)
                            {
                                var apiResponse = JSON.parse(xmlhttptwo.response);
                                var results = apiResponse.response.items;

                                // OK !
                                if (typeof apiResponse.error === 'undefined' && apiResponse.response.count)
                                {
                                    if (typeof callback == "function")
                                    {
                                        callback.apply(results);
                                    }
                                }

                                else if (typeof apiResponse.error === 'undefined' && !apiResponse.response.count)
                                {
                                    alert('No result');
                                    return false;
                                }

                                else if (typeof apiResponse.error !== 'undefined' && captchaRequested)
                                {
                                    alert('Erreur captcha');
                                    return false;
                                }

                                else if (apiResponse.error.error_code === 14)
                                {
                                    alert('Error : Captcha');
                                    return false;
                                }

                                else return false;
                            }
                        };
                    }
                    return false;
                }

                else if (typeof apiResponse.error !== 'undefined' && captchaRequested)
                {
                    alert('Erreur captcha');
                    return false;
                }

                else if (apiResponse.error.error_code === 14)
                {
                    alert('Error : Captcha');
                    return false;
                }

                else return false;
            }
        };
    };

    //////////////////////////////////////
    // Search data from multiples hosts //
    //////////////////////////////////////

    SoundDownloader.prototype.searchData = function(params)
    {
        context = params.context;
        /////////////
        // YOUTUBE //
        /////////////
        if (currentHost === hostsList.youtube)
        {
            var hostSongData = {};
            if (context == 'link')
            {
                hostSongData.title_container = document.getElementById('eow-title');
                hostSongData.performer_container = null;
                hostSongData.title = hostSongData.title_container.innerText;
                hostSongData.performer = null;
                hostSongData.track_version = null;
            }
            else if(context == 'playerList')
            {
                playerListContainer = document.getElementById('watch-related');
                var items = playerListContainer.querySelectorAll('.video-list-item');
                for(var i=0; i<items.length; i++)
                {
                    item = items[i];
                    link = item.getElementsByTagName('a')[0];

                    if (link.href.indexOf('playerListContext|' + params.key) > 0)
                    {
                        hostSongData.title_container = link.getElementsByClassName('title')[0];
                        hostSongData.performer_container = null;
                        hostSongData.title = hostSongData.title_container.innerText;
                        hostSongData.performer = null;
                        hostSongData.track_version = null;
                        return hostSongData;
                    }
                }
            }
            return hostSongData;
        }
        ////////////////
        // SOUNDCLOUD //
        ////////////////
        else if (currentHost === hostsList.soundcloud)
        {
            var hostSongData = {};
            if (context == 'link')
            {
                hostSongData.title_container = document.getElementsByClassName('soundTitle__title')[0];
                hostSongData.performer_container = null;
                hostSongData.title = hostSongData.title_container.innerText;
                hostSongData.performer = null;
                hostSongData.track_version = null;
            }
            else if (context == 'playerTop')
            {
                hostSongData.title_container = document.getElementsByClassName('playbackTitle__link')[0];
                hostSongData.performer_container = null;
                hostSongData.title = hostSongData.title_container.innerText;
                hostSongData.performer = null;
                hostSongData.track_version = null;
            }
            return hostSongData;  
        }
        //////////////
        // BEATPORT //
        //////////////
        else if (currentHost === hostsList.beatport)
        {
            var hostSongData = {};
            if (context == 'playerTop')
            {
                hostSongData.title_container = document.querySelector('#now-playing>.loaded-track>li.track-meta-data>a');
                hostSongData.performer_container = document.querySelector('#now-playing>.loaded-track>li.track-meta-data>.artists');
                hostSongData.title = hostSongData.title_container.title;
                hostSongData.performer = '';


                // Fetch artists
                var artists = hostSongData.performer_container.querySelectorAll('span.artist>a');
                for(var i = 0; i<artists; i++)
                {
                    hostSongData.performer += artists[i].innerText + ' ';
                }

                hostSongData.track_version = null;
            }
            else if(context == 'playerList')
            {
                playerListContainer = document.getElementsByClassName('track-grid-browse')[0];
                var links = playerListContainer.querySelectorAll('tbody>tr>td.secondColumn>a');
                for(var key=0; key < links.length;key++)
                {
                    link = links[key];
                    if (link.href.indexOf('playerListContext|' + params.key) > 0)
                    {
                        hostSongData.title_container = link;
                        hostSongData.performer_container = link.parentNode.parentNode.querySelectorAll('td')[4];
                        hostSongData.title = hostSongData.title_container.innerText;
                        hostSongData.performer = '';

                        // Fetch artists
                        var artists = hostSongData.performer_container.querySelectorAll('a');
                        for(var i = 0; i<artists; i++)
                        {
                            hostSongData.performer += artists[i].innerText + ' ';
                        }
                        hostSongData.track_version = null;
                        return hostSongData;
                    }
                }
            }
            return hostSongData;   
        }
        ////////////
        // DEEZER //
        ////////////
        else if (currentHost === hostsList.deezer)
        {
            var hostSongData = {};
            if (context == 'playerTop')
            {
                hostSongData.title_container = document.querySelector('#player_track_title');
                hostSongData.performer_container = document.querySelector('#player_track_artist');
                hostSongData.title = hostSongData.title_container.innerText;
                hostSongData.performer = hostSongData.performer_container.innerText;
                hostSongData.track_version = null;
            }
            return hostSongData;   
        }
        //////////
        // RDIO //
        //////////
        else if (currentHost === hostsList.rdio)
        {
            var hostSongData = {};
            if (context == 'playerTop')
            {
                hostSongData.title_container = document.querySelector('.player_bottom .song_title');
                hostSongData.performer_container = document.querySelector('.player_bottom .artist_title');
                hostSongData.title = hostSongData.title_container.innerText;
                hostSongData.performer = hostSongData.performer_container.innerText;
                hostSongData.track_version = null;
            }
            return hostSongData;   
        }

        return false;
    };

    /////////////////////////////////
    // Usefull functions utilities //
    /////////////////////////////////

    SoundDownloader.prototype.encodeQueryData = function(data)
    {
        var query = [];
        for (var key in data)
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        return '?' + query.join('&');
    };

    SoundDownloader.prototype.isNumeric = function(n)
    {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    SoundDownloader.prototype.fixTrack = function(title, fixParentheses) {
        var trackTitlePatch = {
            ' (Album Version Explicit)': '',
            ' (Audio)': '',
            ' (Live)' : '',
            ' (HD)' : '',
            ' (Motion Picture Soundtrack)': '',
            ' (Album Version Edited)': '',
            ' (12AM)' : '',
            ' (3PM)' : '',
            ' (Official Video)' : '',
            ' (Official)' : '',
            ' (Explicit)' : '',
            ' (Explicit Version)': '',
            ' - Preview' : '',
            ' | Preview' : '',
            ' - Download' : '',
            ' | Download' : '',
        };
        for (var patch in trackTitlePatch)
            title = title.replace(patch, trackTitlePatch[patch]);

        // Remove [ ] string
        title = title.replace(/\[[a-z0-9._-\s]+\]/ig, '');

        // Remove ( ) string
        if (typeof fixParentheses !== 'undefined' && fixParentheses == true)
        {
            title = title.replace(/\([a-z0-9._-\s]+\)/ig, '');
        }
        return title;
    };

    return SoundDownloader;
})();

var soundDownloader = new SoundDownloader({});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var soundDownloader = new SoundDownloader(request);
});
