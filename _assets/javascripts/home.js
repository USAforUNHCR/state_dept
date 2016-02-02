$(document).ready(function(){
  highlightActive();
});

function highlightActive(){
  var pageLinks = $('.page-link');
  for(var i = 0; i <= pageLinks.length; i++){
    // debugger;
    // console.log($(pageLinks[i]).attr('href'));
    // console.log(window.location.href);
    if($(pageLinks[i]).prop('href') === window.location.href){
      $(pageLinks[i]).addClass('highlight-link');
    }
  }
}