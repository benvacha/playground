/*	esoFooter : github.com/esocode/esofooter
**	esoCode : esocode.com
*/
function esoFooterHeightUpdate(){var e=$(".footer"),t=$(".footer-spacer"),n=e[0].scrollHeight;t.css({height:n});e.css({height:n,marginTop:-n})}$(document).ready(function(){$(".footer").bind("DOMSubtreeModified",esoFooterHeightUpdate);$(window).bind("orientationchange",esoFooterHeightUpdate);esoFooterHeightUpdate()})