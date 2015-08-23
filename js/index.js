$(document).ready(function(){
    $('.scrollspy').scrollSpy();
    $(".button-collapse").sideNav();
});
$('ul#navmobile.side-nav li a').click(function(){
	if($("#proj-tab").hasClass('active')){
		$("#proj-tab").removeClass("active");
		$("#proj-tab .collapsible-body").hide();
	}
});