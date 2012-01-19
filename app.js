
/* 
  This code demonstrates how to replace complete pages in an already initialized
 jQuery-mobile environment, dynamically, after jquery-mobile initializtion,
  including the currently active Page.
  
  This is useful in the context where entire pages are being generated by a templating system.

  If the page we are replacing is not active,
  we may simply remove the old one and replace the new one in the DOM.
  
  If the the current page is active (being viewed)
  we must allow for it to coexist in the dom with the new version.
  
  -update the id and data-url of the active page
  -insert the new verssion in the DOM
  -invoke changePage (transition:none) to view the new version
  
*/

function replacePage(pageId){
  // determine if we are replacing the currently viewed page
  var isPageActive= pageId == $.mobile.activePage.prop('id')

  // if the page being replaced is not the active page: simply remove it
  $oldpage=$('#'+pageId);
  if (!isPageActive){
    $oldpage.remove();
  } else { // if active: change oldpage's id, and data-url
    $oldpage.attr('id','toberemoved');
    $oldpage.attr('data-url','toberemoved');
    $oldpage.jqmData('url','toberemoved'); // just to be safe
  }

  // now generate and add the new page to the DOM
  var $page = $("#pageTemplate").tmpl(pageById[pageId]);
  $('body').append($page);
  
  if (isPageActive){
    var options={
      transition: 'none',
      dataUrl : pageId
    };
    // navigate to new version of self
    // other option: $.mobile.changePage($page , options );    
    $.mobile.changePage('#'+pageId , options );    
    $oldpage.remove();
  }
  
  // for extra-credit highlight the generated time stamp 8-)
  $page.find('.genstamp').addClass('red');
  setTimeout(function(){
    $page.find('.genstamp').removeClass('red');
  },3000);
  
}

/* jQuery ready */
$(function(){
  // initial rendering of all pages
  $("#pageTemplate").tmpl(pageData).appendTo("body");
  // tell jQuery Mobile we are ready - after rendering is done
  $.mobile.initializePage();

  // page generation event handler
  $('a.generate').live('click',function(){
    var what=$(this).data('generate'); // pageId or 'all'
    if ('all'==what){
      $.each(pageData,function(){ replacePage(this.id)});
      return;
    } else {
      replacePage(what);
    }
  });
  
  // clock updater
  setInterval(function(){
    $('.clock').text(generateStamp());
  },1000);
});

/* this is the static data used by the template */
var pageData = [{
  id:'page1',
  name:'Page One',
  items:['item 1-1','item 1-2']
},{
  id:'page2',
  name:'Page Two'
},{
  id:'page3',
  name:'Page Three'
}];

/* lookup array */
var pageById = {};
for (var i=0;i<pageData.length;i++){
  pageById[pageData[i].id]=pageData[i];
}

// Template support functions
var counterVal=1;
function counter(){
  return counterVal++;
}
function generateStamp(){
  var now=new Date();
  var pad=function(i){return (i<10)?"0"+i:""+i};
  return [pad(now.getHours()),pad(now.getMinutes()),pad(now.getSeconds())].join(':');
}
function activePage(id,linkid){
  var attrs = 'href=#'+linkid;
  return (id==linkid)?'data-theme=b':'';
}