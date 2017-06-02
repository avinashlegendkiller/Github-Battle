// attaching functions to scroll events can be very expensive to performance. 
// We’ll remedy this by checking if the user has scrolled on an interval instead of executing functions for every pixel scrolled.

// 1. if they scrolled more than delta
// 2. if they scrolled past the header height
// 3. if they scrolled up or down
// 4. store the current scroll position in a variable

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var appBarHeight = $('#app-bar').outerHeight();
var appBottomBarHeight = $('#app-bottom-bar').outerHeight();
var feedFABHeight = $('#feed-fab').outerHeight();

//didScroll
$(window).scroll(function(event){
    didScroll = true;
});

//set interval - check for didScroll value every 250ms
setInterval(function(){
    //if scrolled, call hasScrolled method
    if(didScroll) {
        hasScrolled();
        //set didScroll to false
    }
},250);

function hasScrolled() {
    //store the scroll position in a variable
    var st = $(this).scrollTop();

    //make sure user scrolls more than delta
    if(Math.abs(st - lastScrollTop) <= delta)
        return;

    //if they scroll down and are past the appBar, add class .nav-up
    // this is necessary so that user never sees what is "behind" appBar

    //if current position > last position AND current position > appbar height
    if(st > lastScrollTop && st > appBarHeight) {
        //scroll down
        $('#app-bar').addClass('nav-up');//app-bar
        $('#app-bottom-bar').addClass('bottom-bar-down');//bottom-bar
        $('#feed-fab').addClass('feed-fab-down').removeClass('feed-fab-normal');//feed-fab
    }
    else {
        //scroll up
        if(st + $(window).height() < $(document).height()) {
            $('#app-bar').removeClass('nav-up');
            $('#app-bottom-bar').removeClass('bottom-bar-down');
            $('#feed-fab').removeClass('feed-fab-down').addClass('feed-fab-normal');
        }
    }

    //update lastScrollTop value
    lastScrollTop = st;
}