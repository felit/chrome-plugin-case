(function () {
    function jquery_html(url, func) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (func) {
                    func($(xhr.responseText),url);
                }
            }else{
//                console.log(xhr.responseText);
            }
        };
        xhr.send();
    }

    var out = document.createElement('div');
    document.body.appendChild(out);
    var completed = 0;
    var tags = (function () {
        var ts = {};
        return {
            add: function (tag) {
                ts[tag] = true;
            }, to_a: function () {
                var r = [];
                for (var i in ts) {
                    r.push(i);
                }
                return r;
            }, show: function () {
                var r = tags.to_a();
                out.innerHTML = "num: " + r.length +  "->" + r.join(',');
            }
        }
    })();
    for (var i = 1; i < 8000; i++) {
       
        jquery_html(url, function ($html,_url) {
            $('#hasLabels li span', $html).each(function (index, span) {
                tags.add($(span).text());
                tags.show();
                completed ++;
            })
        });
    }
})();