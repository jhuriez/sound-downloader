var Form = (function(){
    var hostSongData = {
        'title': null,
        'title_container': null,
        'performer': null,
        'performer_container': null,
        'track_version': null
    };

    var soundDownloader = null;
    
    function Form() {
        soundDownloader = new SoundDownloader();

        document.querySelector('.getTrack').addEventListener('click', function() {
            return form.track();
        });
    }

    Form.prototype.track = function() {
		// From input
		trackAuthorName = document.getElementById('trackAuthorName').value;
		authorName = document.getElementById('authorName').value;
		trackName = document.getElementById('trackName').value;
		
		if (trackAuthorName != '')
		{
			hostSongData.title = trackAuthorName;
		}
		else
		{
			hostSongData.title = trackName;
            hostSongData.performer = authorName;
		}
	
        soundDownloader.searchTrack(hostSongData);

		return true;
    };

    return Form;
})();



var form = new Form();