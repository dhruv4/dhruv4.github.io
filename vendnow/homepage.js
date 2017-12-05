var map, directionsDisplay, pos = new google.maps.LatLng(42.374168, -71.116977);
var directionsService = new google.maps.DirectionsService();
var markers = [];
var geocoder;
var infoWindow
var resultsBox;
var clicked;
var currentPos = pos;
var startPos = pos;
var myDataRef = new Firebase("https://vendnow.firebaseio.com/");
var geoFire = new GeoFire(myDataRef.child("_geofire"));
var vendsList = {};
var geoQuery = geoFire.query({
      center: [currentPos.lat(), currentPos.lng()],
      radius: 0 //kilometers
});
var rateVal = 0, rateID;
$(document).ready(function(){
  $('body').keypress(function(e){
    if(e.keyCode==13)
    $('#find_vends').click();
  });
  $('.modal-trigger').leanModal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    in_duration: 300, // Transition in duration
    out_duration: 200, // Transition out duration
    //ready: function() { alert('Ready'); }, // Callback for Modal open
    //complete: function() { alert('Closed'); } // Callback for Modal close
  });

  $("i.mdi-action-star-rate.rate").on("click", function(){
    console.log($(this).attr("value"));
    rateVal = parseInt($(this).attr("value"));
    $( "i.mdi-action-star-rate" ).each(function() {
      console.log(parseInt($(this).attr("value")));
      if(parseInt($(this).attr("value")) > rateVal)
        $(this).css("color", "gray");
      else
        $(this).css("color", "gold");
    });
  });

})

function initialize() {
  geocoder = new google.maps.Geocoder();
  directionsDisplay = new google.maps.DirectionsRenderer();

  mapOptions = {
    zoom: 14,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID]
    },
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  
  infoWindow = new google.maps.InfoWindow();

  if(navigator.geolocation) {
    var lat;
    var lon;
    navigator.geolocation.getCurrentPosition(function(position) {

      pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: 'Current Location',
        icon: '/media/current-loc.png'
      });
      google.maps.event.addListener(marker, 'click', function() {
        if(infowindow) {
          infowindow.close();
        }
        infowindow.setContent("<div class='noscrollbar'>Your location</div>");
        infowindow.open(map,marker);
      });

      currentPos = pos;
      startPos = pos;
      map.setCenter(pos);
      map.setZoom(18);
      
    }, function() {
      alert("Error: The Geolocation service failed.");
      currentPos = pos;
      map.setCenter(pos);
    });
  } else {
    //Browser doesn't support Geolocation
    alert("Error: Your browser doesn\'t support geolocation.");
    currentPos = pos;
    map.setCenter(pos);
  }

  directionsDisplay.setMap(map);

  directionsDisplay.setPanel(document.getElementById('directionsCardCont'));

  google.maps.event.addListener(map, 'drag', function() { 

    currentPos = map.getCenter();
    geoQuery.updateCriteria({
        center: [currentPos.lat(),currentPos.lng()],
        radius: getRadius()
    });

  });
  google.maps.event.addListener(map, 'zoom_changed', function() { 

    currentPos = map.getCenter();
    geoQuery.updateCriteria({
        center: [currentPos.lat(),currentPos.lng()],
        radius: getRadius()
    });

  } );

}
google.maps.event.addDomListener(window, 'load', initialize);

/* Adds new vehicle markers to the map when they enter the query */

geoQuery.on("key_entered", function(vendID, vehicleLocation) {
  // Specify that the vehicle has entered this query

  vendsList[vendID] = true;

  // Look up the vehicle's data in the Transit Open Data Set
  myDataRef.child(vendID).once("value", function(dataSnapshot) {
    // Get the vehicle data from the Open Data Set
    vend = dataSnapshot.val();

    // If the vehicle has not already exited this query in the time it took to look up its data in the Open Data
    // Set, add it to the map
    if (vend !== null && vendsList[vendID] === true) {
      // Add the vehicle to the list of vehicles in the query
      vendsList[vendID] = vend;

      createMarker(vend);

    }
  });

  //console.log(Object.keys(vendsList));

});
geoQuery.on("key_exited", function(key, location, distance) {

  //console.log("key");

  var vend = vendsList[key];

  vend.marker.setMap(null);

  delete vendsList[key];

  //console.log(Object.keys(vendsList));

});


function clearOverlays() {
  for (var i = 0; i < markers.length; i++ ) {
   markers[i].setMap(null);
  }
}

function searchLocations() {
  var address = document.getElementById("id_address").value;
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({address: address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      currentPos = results[0].geometry.location;
      startPos = results[0].geometry.location;
      geoQuery.updateCriteria({
        center: [currentPos.lat(),currentPos.lng()],
        radius: getRadius()
      });
      map.setCenter(results[0].geometry.location);
      map.setZoom(15);
    } else {
      if(address.trim() != '')
        alert(address + ' not found');
    }
  });
}

function createMarker(vend) {

  latlng = new google.maps.LatLng(vend.lat, vend.lng);

  if(vend.report < 3)  
    var html = "<b>" + vend.name + "</b><br/>" + vend.address + "<br/>" + vend.description + "<br/>" + vend.type 
      + "<br/><button class='btn waves-effect waves-light red' title='Report Out of Order' onclick='updateVote(\"" 
        + vend.key + "\", \"report\", 1, this)'><i class='material-icons'>report_problem</i></button><button class='btn waves-effect waves-light blue' title='Get directions' onclick='calcRoute(" 
        + latlng.lat() + ", " + latlng.lng() + ")'><i class='material-icons'>directions</i></button><button class='btn waves-effect waves-light orange' title='Reviews' onclick='review(\"" 
        + vend.key + "\")'><i class='material-icons'>rate_review</i></button><a target='_blank' class='twitter-icon btn waves-effect waves-light light-blue' title='Share to Twitter' href='" 
        + "https://twitter.com/intent/tweet?via=vendnowapp&text=Check out the Vending Machine I found at " + vend.name + " with vend-now.com!'></a>";
  else
    var html = "<b>" + vend.name + "</b><br/>" + vend.address + "<br/>" + vend.description + "<br/>" + vend.type 
      + "<br/><span class='red-text'>Reported Out of Order</span><br/><button title='Report Working' class='btn waves-effect waves-light green' onclick='updateVote(\"" 
        + vend.key + "\", \"report\", -1, this)'><i class='material-icons'>report_problem</i></button><button title='Get directions' class='btn waves-effect waves-light blue' onclick='calcRoute(" 
        + latlng.lat() + ", " + latlng.lng() + ")'><i class='material-icons'>directions</i></button><a target='_blank' class='twitter-icon btn waves-effect waves-light light-blue' title='Share to Twitter' href='" 
        + "https://twitter.com/intent/tweet?via=vendnowapp&text=Check out the Vending Machine I found at " + vend.name + " with vend-now.com!'></a>";

  //console.log(vend.restricted);

  if(vend.restricted == true)
    html += "<br/><span class='red-text'>Restricted Access</span>";

  var marker = new google.maps.Marker({
    map: map,
    position: latlng
  });

  //Icon color: #1b71c2

  if(vend.type == "Snack")
    marker.setIcon('/media/icons/candy.png');
  else if(vend.type == "Drink")
    marker.setIcon('/media/icons/drink.png');
  else if(vend.type == "Redbox" || vend.type == "Movie")
    marker.setIcon('/media/icons/movierental.png');
  else if(vend.type == "Electronics")
    marker.setIcon('/media/icons/phones.png');
  else if(vend.type == "Momba")
    marker.setIcon('/media/icons/momba.png');
  else
    marker.setIcon('/media/icons/blank.png');

  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
    map.setCenter(marker.getPosition());
  });

  vend.marker = marker;

}
function getRadius(){
  var bounds = map.getBounds();
  if(bounds == undefined || bounds == null)
    return "25";
  var center = bounds.getCenter();
  var ne = bounds.getNorthEast();
  // r = radius of the earth in statute miles
  var r = 3963.0;  
  // Convert lat or lng from decimal degrees into radians (divide by 57.2958)
  var lat1 = center.lat() / 57.2958; 
  var lon1 = center.lng() / 57.2958;
  var lat2 = ne.lat() / 57.2958;
  var lon2 = ne.lng() / 57.2958;
  // distance = circle radius from center to Northeast corner of bounds
  var dis = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) + 
  Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
  return dis;
}
function calcRoute(lat, lng, walk) {

  $("#directionsCard").show();

  endPos = new google.maps.LatLng(lat, lng)

  var mode;
  if (walk) {
    mode = google.maps.TravelMode.WALKING;
  } else {
    mode = google.maps.TravelMode.DRIVING;
  }
  var request = {
      origin:startPos,
      destination:endPos,
      travelMode: mode
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      setDirections(response);
    }
  });
}
function calcRouteChange(lat, lng, walk) {

  endPos = new google.maps.LatLng(lat, lng)

  var mode;
  if (walk) {
    mode = google.maps.TravelMode.WALKING;
  } else {
    mode = google.maps.TravelMode.DRIVING;
  }
  var request = {
      origin:startPos,
      destination:endPos,
      travelMode: mode
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}
function setDirections(response){
  if($('#switchDirType'))  
    $('#switchDirType').remove();
  var d = document.createElement("div");
  d.innerHTML = "<button onclick='calcRouteChange(" + response['routes'][0]['legs'][0]['end_location'].lat() + "," 
    + response['routes'][0]['legs'][0]['end_location'].lng() + ", false)' id='drive' class='btn waves-effect waves-light'><i class='material-icons'>drive_eta</i></button><button id='walk' onclick='calcRouteChange(" 
    + response['routes'][0]['legs'][0]['end_location'].lat() + "," + response['routes'][0]['legs'][0]['end_location'].lng() 
    + ", true)' class='btn waves-effect waves-light'><i class='material-icons'>directions_walk</i></button><i id='closeDir' class='blue-grey-text darken-1 material-icons'>close</i>";
  d.id = "switchDirType";
  d.className = "card-title";
  directionsDisplay.setMap(map);
  directionsDisplay.setDirections(response);
  $('#directionsCard').prepend(d);
  //console.log(directionsDisplay);
  //console.log(response);

  $('#closeDir').click(function(){

    directionsDisplay.setMap(null);

     $("#directionsCard").hide();
     $('#switchDirType').remove();

  });
}

function updateVote(vendID, child, vote, self){

  myDataRef.child(vendID).child(child).set(vendsList[vendID].report + vote);
  self.innerHTML = "<i class='material-icons'>check_circle</i>";
  Materialize.toast('Reported!', 4000);
  self.disabled = true;

}

function review(vendID){

  $("#avg-review").hide();
  $("#reviews-collection").hide();
  $("#avg-review").text("Avg Rating: ");
  $("#reviews-collection").empty();
  $("#no-review").show();

  $('#modal-title').html(vendsList[vendID].name);
  $('#modal-type').html(vendsList[vendID].type);

  //load reviews

  if(vendsList[vendID].numberofreviews > 0){
    $("#avg-review").show();
    $("#reviews-collection").show();
    $("#no-review").hide();
  }


  rateID = vendID;

  for (var i = vendsList[vendID].avgrating - 1; i >= 0; i--) {
    $("#avg-review").append('<i class="mdi-action-star-rate"></i>');
  };

  for (var i in vendsList[vendID].reviews) {
    $("#reviews-collection").append(
      "<li class='collection-item'><h6>" + vendsList[vendID].reviews[i].username + "</h6><p>" + vendsList[vendID].reviews[i].reasoning 
      + "</p><p>" + vendsList[vendID].reviews[i].rating + " stars</p></li>"
    );
  };

  $('#review-modal').openModal();

}
function rated(){

  //save review
  console.log(rateVal);
  console.log(rateID);
  console.log($("#user-name").val());
  console.log($("#reasoning").val());

  if(rateVal == 0){
    $("#star-error").text("Please Rate!");
    return;
  }
  if($("#reasoning").val().trim().length == 0){
    $("#reasoning-error").text("Please Review!");
    return;
  }
  if($("#user-name").val() == ""){
    $("#user-name").val("Anonymous");
  }

  //store reviews here

  myDataRef.child(rateID).child("numberofreviews").set(vendsList[rateID].numberofreviews + 1);
  myDataRef.child(rateID).child("avgrating").set((vendsList[rateID].avgrating + rateVal)/(vendsList[rateID].numberofreviews + 1));
  myDataRef.child(rateID).child("reviews").push({ username: $("#user-name").val(), reasoning: $("#reasoning").val(), rating: rateVal });

  Materialize.toast('Rated!', 4000);
  $('#review-modal').closeModal();

  rateVal = 0;

  $("#user-name").val("");
  $("#reasoning").val("");
  $("#star-error").text("");
  $("#reasoning-error").text("");
  $( "i.mdi-action-star-rate" ).each(function() {
    $(this).css("color", "gray");
  });
}

window.onload = function(e) {
  document.getElementById('id_address').value = "";
  document.getElementById('id_address').focus();
}
