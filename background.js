var Extension = (function() {

    var hostSongData = {
            'action': null,
            'title': null,
            'title_container': null,
            'performer': null,
            'performer_container': null,
            'track_version': null
    };

    function Extension(data) {
        if (typeof data !== 'undefined' && typeof data.action !== 'undefined')
        {
            // Open tab for search track
            if (data.action == 'opentab')
            {
                if (localStorage['rows'] === undefined) {
                    localStorage['rows'] = JSON.stringify({});
                }

                localStorage['rows'] = JSON.stringify(data.results);
                chrome.tabs.create({
                    url: chrome.extension.getURL('search.html')
                });
            }
        }
    }
    ////////////////////////////
    // Menu context functions //
    ////////////////////////////

    Extension.prototype.menuDownloadTrack = function(info, tab) {
        hostSongData.title = info.selectionText;
        hostSongData.action = 'downloadTrack';
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.sendMessage(tab.id, hostSongData);
        });
    };
    
    Extension.prototype.menuSearchTrack = function(info, tab) {
        hostSongData.title = info.selectionText;
        hostSongData.action = 'searchTrack';
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.sendMessage(tab.id, hostSongData);
        });
    };

    Extension.prototype.menuSearchTrackOnLink = function(info, tab) {
        if (info.linkUrl.indexOf('#playerLinkContext') > 0)
        {
            hostSongData.action = 'searchTrackFromLink';
            hostSongData.context = 'link';
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.sendMessage(tab.id, hostSongData);
            });
        }
        else if (info.linkUrl.indexOf('#playerTopContext') > 0)
        {
            hostSongData.action = 'searchTrackFromLink';
            hostSongData.context = 'playerTop';
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.sendMessage(tab.id, hostSongData);
            });
        }
        else if (info.linkUrl.indexOf('#playerListContext') > 0)
        {
            hostSongData.action = 'searchTrackFromLink';
            hostSongData.context = 'playerList';
            hostSongData.key = extension.getKeyFromLink(info.linkUrl)
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.sendMessage(tab.id, hostSongData);
            });
        }
        else
        {
            hostSongData.action = 'searchTrackFromAnchor';
            hostSongData.link = info.linkUrl;
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.sendMessage(tab.id, hostSongData);
            });
        }
    }

    Extension.prototype.menuDownloadTrackOnLink = function(info, tab) {
        if (info.linkUrl.indexOf('#playerLinkContext') > 0)
        {
            hostSongData.action = 'downloadTrackFromLink';
            hostSongData.context = 'link';
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.sendMessage(tab.id, hostSongData);
            });
        }
        else if (info.linkUrl.indexOf('#playerTopContext') > 0)
        {
            hostSongData.action = 'downloadTrackFromLink';
            hostSongData.context = 'playerTop';
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.sendMessage(tab.id, hostSongData);
            });
        }
        else if (info.linkUrl.indexOf('#playerListContext') > 0)
        {
            hostSongData.action = 'downloadTrackFromLink';
            hostSongData.context = 'playerList';
            hostSongData.key = extension.getKeyFromLink(info.linkUrl)
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.sendMessage(tab.id, hostSongData);
            });
        }
        else
        {
            hostSongData.action = 'downloadTrackFromAnchor';
            hostSongData.link = info.linkUrl;
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.sendMessage(tab.id, hostSongData);
            });
        }
    }


    ///////////////
    // Utilities //
    ///////////////

    Extension.prototype.getKeyFromLink = function(link)
    {
        key = link.split('#')[1].split('|')[1];
        return key;
    }

    return Extension;
})();

var extension = new Extension();
// Create menu context

var options = {
    'selectionSearch': null,
    'selectionDownload': null, 
    'linkSearch': null,
    'linkDownload': null
};

for(var key in options)
{
    options[key] = (typeof localStorage[key] == 'undefined' || localStorage[key] == 'true') ? true : false;
}

if (options.selectionDownload)
    chrome.contextMenus.create({"title": "Télécharger le son", "contexts":["selection"], "onclick": extension.menuDownloadTrack});

if (options.linkDownload) 
    chrome.contextMenus.create({"title": "Télécharger le son", "contexts":["link"], "onclick": extension.menuDownloadTrackOnLink});

if (options.selectionSearch)
    chrome.contextMenus.create({"title": "Chercher le son", "contexts":["selection"], "onclick": extension.menuSearchTrack});

if (options.linkSearch)
    chrome.contextMenus.create({"title": "Chercher le son", "contexts":["link"], "onclick": extension.menuSearchTrackOnLink});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var extension = new Extension(request);
});


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, {action: 'refresh'});
    });
});