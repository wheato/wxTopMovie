var util = {};

util.ajax = function (options) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            options.success && options.success(xmlhttp.responseText);
        }
    };

    xmlhttp.open(options.type || "GET", options.url, true);
    xmlhttp.send();

};

module.exports = util;