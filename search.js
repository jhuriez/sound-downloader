var Search = (function(){
    searchElement = document.querySelector('#search');

    function Search(){
        if (localStorage['rows'] === undefined) {
            localStorage['rows'] = JSON.stringify({});
        }
        this.refresh();
    }


    Search.prototype.add = function(data) {
        var parent = this;

        var trElement = document.createElement('tr');

        var titleElement = document.createElement('td');
            titleElement.classList.add('left');
            titleElement.innerHTML = document.querySelectorAll('table tbody tr').length + 1;
        trElement.appendChild(titleElement);        

        var titleElement = document.createElement('td');
            titleElement.classList.add('left');
            titleElement.innerHTML = data.title;
		trElement.appendChild(titleElement);		
		
        var titleElement = document.createElement('td');
            titleElement.classList.add('left');
            var time = data.duration;
            var minutes = Math.floor(time / 60);
            var seconds = time - minutes * 60;

            titleElement.innerHTML = minutes + ':' + ((seconds > 9) ? seconds : '0' + seconds);
        trElement.appendChild(titleElement);    

        var titleElement = document.createElement('td');
            titleElement.classList.add('left');
            titleElement.innerHTML = data.artist;
		trElement.appendChild(titleElement);	
		
		var titleElement = document.createElement('td');
            titleElement.classList.add('left');
			titleElement.innerHTML = '<a href="'+data.url+'" target="_blank">Ecouter</a>';
		trElement.appendChild(titleElement);
			
        var titleElement = document.createElement('td');
            titleElement.classList.add('left');
			
		var linkElement = document.createElement('a');
			linkElement.setAttribute('data-title', data.title);
			linkElement.setAttribute('data-artist', data.artist);
			linkElement.setAttribute('data-url', data.url);
			linkElement.setAttribute('href', '#'+data.url);
			linkElement.innerHTML = 'Telecharger';
			linkElement.addEventListener('click', function() {
                    var url = document.createElement('a');
                    url.download = this.getAttribute('data-artist') + ' - ' + this.getAttribute('data-title') + '.mp3';
                    url.href = this.getAttribute('data-url');
                    url.dataset.downloadurl = ['audio/mpeg', url.download, url.href].join(':');
                    url.click();
					return false;
			});
			
		titleElement.appendChild(linkElement);
		trElement.appendChild(titleElement);	
			
        searchElement.querySelector('tbody').appendChild(trElement);
    };


    Search.prototype.refresh = function() {
        var tbody = searchElement.querySelector('tbody');
            tbody.innerHTML = '';


        var rows = JSON.parse(localStorage['rows']);

        if (Object.keys(rows).length > 0) {
            for (var index in rows) {
                this.add(rows[index]);
            }
        } else {
            var trElement = document.createElement('tr');

            var noResultsElement = document.createElement('td');
                noResultsElement.colSpan = 2;
                noResultsElement.classList.add('center');
                noResultsElement.innerHTML = 'No Results';

            trElement.appendChild(noResultsElement);

            tbody.appendChild(trElement);
        }
    };

    return Search;
})();

new Search();