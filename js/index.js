$(document).ready(function(){
    $('.scrollspy').scrollSpy();
});
$('ul#navmobile.side-nav li a').click(function(){
	console.log("clicked");
	if($("#proj-tab").hasClass('active')){
		$("#proj-tab").removeClass("active");
		$("#proj-tab .collapsible-body").hide();
	}
});