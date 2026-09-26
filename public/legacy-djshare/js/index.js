//index.js
var myDataRef = new Firebase("https://dj-share.firebaseIO.com/");
/******
myDataRef is the main Firebase reference point
*******/
var hasID = false, isDJ;

SC.initialize({

	client_id: '99e7642d52b561e876783bf9125a0c7e'

});
$(document).ready(function(){         
	if(window.location.hash.length > 1)
		joinList();
	$('.slider').slider({full_width: true, height: 270, interval: 6000, transition: 500});
	$('#visas_style_div').remove();
});
$(function() {

	$( "#upnext" ).sortable({
 		placeholder: "ui-state-highlight",
 		update: function( event, ui ) {changeList()}
	});
	$( "#upnext" ).disableSelection();
	$('#search-div').keypress(function(e) {

		if(e.which == 13) { search(); }

	});
});
function addToList(id){

	SC.get("/tracks/" + id, function(song){
		document.getElementById("upnext").innerHTML += 
		"<li class='play-li collection-item' value=" + id + " oncreate='changeList()'>" + song['title'] 
		+ "<button onclick='removeSong(this)' class='remove btn-floating btn right waves-effect waves-light red mdi-content-remove-circle'></button></li>";
		changeList();
	});

}
function removeSong(self){

	self.parentNode.parentNode.removeChild(self.parentNode);
	changeList();

}
function playPlaylist(){

	var id = parseInt($("#upnext li").val());

	if(id == -1 || id == null || id == NaN)
		return;

	$("#stop-playlist").removeClass("disabled");
	$("#pause-playlist").removeClass("disabled");
	$("#next-playlist").removeClass("disabled");
	$("#stop-playlist").prop("disabled", false);
	$("#pause-playlist").prop("disabled", false);
	$('#pause-playlist').html("<i class='mdi-av-pause-circle-fill'></i>");
	$("#next-playlist").prop("disabled", false);

	console.log(document.getElementById("upnext").firstChild);

	document.getElementById("upnext").removeChild(document.getElementById("upnext").firstChild);

	$("#play-playlist").addClass("disabled");
	$("#play-playlist").prop("disabled", true);

	console.log(document.getElementById("upnext").firstChild);

	console.log("Now Set ID: ", id);

	changeList();

	setFBNowPlaying(id);
	
	if(SC.sound != null)
		SC.sound.stop();
	
	console.log("Now Play ID", id);

	SC.stream("/tracks/" + id, 
		{
			onfinish: function(){ 
				playPlaylist();
			}
		}, 
		function(sound){
			SC.sound = sound;
			sound.play();
		}
	);

}
function pauseSong(){
	

	if($('#pause-playlist i').hasClass("mdi-av-pause-circle-fill"))
		$('#pause-playlist').html("<i class='mdi-av-play-circle-fill'></i>");
	else
		$('#pause-playlist').html("<i class='mdi-av-pause-circle-fill'></i>");

	if(SC.sound != null)
		SC.sound.togglePause();

}
function stopSong(){

	setFBNowPlaying(-1);

	$("#play-playlist").removeClass("disabled");
	$("#play-playlist").prop("disabled", false);
	$("#stop-playlist").addClass("disabled");
	$("#pause-playlist").addClass("disabled");
	$("#next-playlist").addClass("disabled");
	$("#stop-playlist").prop("disabled", true);
	$("#pause-playlist").prop("disabled", true);
	$("#next-playlist").prop("disabled", true);

	if(SC.sound != null)
		SC.sound.stop();

}
function nextSong(){

	playPlaylist();

}
function prevSong(self, val){

	if(SC.sound != null){
		SC.sound.stop();

		if($(self).hasClass("mdi-av-pause-circle-outline")){
			$(self).removeClass('mdi-av-pause-circle-outline');
			$(self).addClass('mdi-av-play-circle-outline');
		} else {

			$(".prevsong").each(function(){
				$(this).removeClass('mdi-av-pause-circle-outline');
				$(this).addClass('mdi-av-play-circle-outline');
			});

			$(self).removeClass('mdi-av-play-circle-outline');
			$(self).addClass('mdi-av-pause-circle-outline');
			SC.stream("/tracks/" + val, 
				function(sound){
					SC.sound = sound;
					sound.play();
				}
			);
		}

	} else {
		SC.stream("/tracks/" + val, 
			function(sound){
				SC.sound = sound;
				sound.play();
				$(self).removeClass('mdi-av-play-circle-outline');
				$(self).addClass("mdi-av-pause-circle-outline");
			}
		);
	}

}
function search(){

	$("#search-results").show();
	var inp = document.getElementById("search-inp").value;
	SC.get('/tracks', { q: inp }, function(tracks) {
	  	document.getElementById("search-results").innerHTML = "";
	  for(var x = 0; x < tracks.length; x++){
		  		
		  	if(isDJ){
				document.getElementById("search-results").innerHTML += "<li class='collection-item search-li'>" 
		  		+ tracks[x]['title']
		  		+ "<div class='search-buttons'><button class='btn-floating right red mdi-content-add-circle-outline waves-effect waves-light' onclick='addToList(" + tracks[x]['id'] + ")'></button></div></li>";
		  	} else {
		  		document.getElementById("search-results").innerHTML += "<li class='collection-item search-li'>" 
		  		+ tracks[x]['title']
		  		+ "<div class='search-buttons'><button class='btn-floating right red mdi-content-add-circle-outline waves-effect waves-light' onclick='addToList(" + tracks[x]['id'] + ")'></button><button class='btn-floating right blue waves-effect waves-light mdi-av-play-circle-outline prevsong' onclick=prevSong(this," + tracks[x]['id'] + ")></button></div></li>";
	  		}
	  }

	});

}
function setFBNowPlaying(id){

	console.log("Now ID: ", id);

	myDataRef.child("nowplaying").set(id);

	setNowPlaying(id);

}
function setNowPlaying(id){

	console.log("Now ID: ", id);

	if(id == -1){
		$('#now-img').attr('src', 'media/blank-album.png');
		$('#now-title').text("");
		$('#now-artist').text("");
		return;
	}

	SC.get("/tracks/" + id, function(song){
		$('#now-title').text(song['title']);
		$('#now-artist').text(song['user']['username']);
		if(song['artwork_url'] != null)
			$('#now-img').attr('src', song['artwork_url']);
		else
			$('#now-img').attr('src', 'media/blank-album.png');
	})

}
function createList(){

	/************
	Method called when User chooses to join a list initially. This is when myDataRef is set to the code and when the basic playlist is created
	***********/

	hasID = true;

	var newRef = myDataRef.push({list: [["No songs in up next!", -1]], nowplaying: -1});
	document.getElementById("ID-disp").innerHTML = newRef.key().substr(1);
	$('#twitter-share').attr('href', "https://twitter.com/intent/tweet?via=djsharetweets&text=Join my group playlist at dj-share.com/%23" + newRef.key().substr(1) + "!");
	//$('#fb-share').attr('data-href', "https://www.dj-share.com/#" + newRef.key().substr(1));

	isDJ = true;

	window.location.hash = newRef.key().substr(1);
	$('music-control').show();
	$('#playlist-name').show();
	$('#search-div').show();
	$('#code-card').show();
	$('#isDJ').show();
	$('#join-container').remove();
	$('#playlist-name-head').remove();
	$('#qrcode').qrcode({width: 100,height: 100, text: "https://www.dj-share.com/#" + newRef.key().substr(1)});
	$('#dj-modal').openModal();

	myDataRef = new Firebase("https://dj-share.firebaseIO.com/" + newRef.key());
	myDataRef.onDisconnect().remove();

}
function setList(dataSnapshot){

	/**************
	This is called by two functions: joinList() and "on child_changed". This will take the data from the Firebase database and delete the current list and set it to this one
	**************/

	if(dataSnapshot.val() != null){
		if(dataSnapshot.val()["nowplaying"] != -1)
			setNowPlaying(dataSnapshot.val()["nowplaying"]);
		if(dataSnapshot.val()["title"] != null)
			$("#playlist-name-head").html(dataSnapshot.val()["title"]);
  		document.getElementById("upnext").innerHTML = "";
		if(dataSnapshot.val()["list"] != null)
	  		for(var x=0; x < dataSnapshot.val()["list"].length; x++)
				if(dataSnapshot.val()["list"][x][1] != -1)
		  			document.getElementById("upnext").innerHTML += 
		  			"<li value='" + dataSnapshot.val()["list"][x][1] + "' class='play-li collection-item' oncreate='changeList()'>" + dataSnapshot.val()["list"][x][0] 
		  			+ "<button onclick='removeSong(this)' class='remove btn-floating btn waves-effect waves-light right red mdi-content-remove-circle'></button></li>";
				else
					document.getElementById("upnext").innerHTML += 
		  			"<li value='" + dataSnapshot.val()["list"][x][1] + "' class='play-li collection-item' oncreate='changeList()'>" + dataSnapshot.val()["list"][x][0] 
		  			+ "</li>";

	}
}
myDataRef.on("child_changed", function(snapshot) {

	/********
	This is called whenever the list or nowplaying is altered
	hasID is a boolean to check whether the user has actually successfully connected to an existing playlist
	******/

	if(hasID)
		if(snapshot['V']['path']['n'][0] == myDataRef['path']['n'][0])
			setList(snapshot);

});
function addslashes( str ) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}
function joinList(){

	/******
	This is called when the user inputs an id code and attempts to join it.
	This method calls setList to set the playlist locally
	*******/
	if(window.location.hash.length < 1){
		if(document.getElementById("id-inp").value.length > 19){
			$("#code-error").text("Inputted Code Too Long");
			return;
		} else if(document.getElementById("id-inp").value.length < 19){
			$("#code-error").text("Inputted Code Too Short");
			return;
		}
		window.location.hash = document.getElementById("id-inp").value;
	}
	
	var val = window.location.hash.substr(1, 19);

	myDataRef = new Firebase("https://dj-share.firebaseIO.com/-" + val);

	var stop = false;

	myDataRef.once('value', function(dataSnapshot) {

		if(dataSnapshot.val() == null){
			$("main").html("<h4 class='blue-grey-text center'>Playlist Not Found</h4>");
			stop = true;
			$('#attendee-modal').closeModal();
			return;
		}

		setList(dataSnapshot);

	});

	if(stop)
		return;

	hasID = true;

	isDJ = false;

	$('#code-card').show();
	$('#playlist-name').show();
	$('#ID-disp').text(val);
	$('#twitter-share').attr('href', "https://twitter.com/intent/tweet?via=djsharetweets&text=Join my group playlist at dj-share.com/%23" + val + "!");
	//$('#fb-share').attr('data-href', "https://www.dj-share.com/%23" + val);
	$('#qrcode').qrcode({width: 100,height: 100, text: "https://www.dj-share.com/%23" + val});
	$('#search-div').show();
	$('#join-container').remove();
	$('#playlist-name-input').remove();
	$('#music-control').remove();
	$('#isDJ').remove();
	$('#attendee-modal').openModal();



}
function changeList(){

	/***********
	This method is called whenever something that should have the list changed on the database occurs.
	The previous list in the database is erased and replaced with this one.
	***********/

	console.log("change list");

	if(hasID){
		var songs = [];
		$("#upnext li").each(function() { 
			if($(this).val() != -1)
				songs.push([$(this).text(), $(this).val()]) 
		});

		if(songs.length == 0){
			songs.push(["No songs in up next!", -1])
		}

		myDataRef.child("list").set(songs);
	}

}
function nameChange(val){
	myDataRef.child("title").set(val.value);
}