$.ajaxPrefilter(function(options) {
    options.url = 'http://big-event-api-t.itheima.net' + options.url
    console.log(options.url);
})