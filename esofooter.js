/*	esoFooter : github.com/esocode/esofooter
**	esoCode : esocode.com
*/

//
function esoFooterHeightUpdate() {
	//
	var footer = $('.footer'), spacer = $('.footer-spacer'),
	newHeight = footer[0].scrollHeight;
	//
	spacer.css({height: newHeight});
	footer.css({height: newHeight, marginTop: -newHeight});
}

//
$(document).ready(function() {
	$('.footer').bind('DOMSubtreeModified', esoFooterHeightUpdate);
	$(window).bind('orientationchange', esoFooterHeightUpdate);
	esoFooterHeightUpdate()
});