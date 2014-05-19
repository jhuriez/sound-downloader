var Options = (function(){
	var keys = ['selectionSearch', 'selectionDownload', 'linkSearch', 'linkDownload'];
    
    function Options() {
        document.querySelector('#submit').addEventListener('click', function() {
            return options.enregistrer();
        });

        this.restaurer();
    }

    Options.prototype.restaurer = function() {
    	for(i=0;i<keys.length;i++)
    	{
    		itemKey = keys[i];
			value = (typeof localStorage[itemKey] == 'undefined' || localStorage[itemKey] == 'true') ? true : false;
			document.getElementById(itemKey).checked=value;
    	}

    };

    Options.prototype.enregistrer = function() {
    	for(i=0;i<keys.length;i++)
    	{
    		itemKey = keys[i];
			localStorage[itemKey]=document.getElementById(itemKey).checked;
    	}

    	chrome.runtime.reload();
    };

    return Options;
})();



var options = new Options();
