$(document).ready(function(){
  highlightActive();
});

function highlightActive(){
  var pageLinks = $('.page-link');
  for(var i = 0; i <= pageLinks.length; i++){
    if($(pageLinks[i]).prop('href') === window.location.href){
      $(pageLinks[i]).addClass('highlight-link');
    }
    else{
      $(pageLinks[i]).removeClass('highlight-link'); 
    }
  }
}
