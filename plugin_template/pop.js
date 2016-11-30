var cpu = document.getElementById('cpu');
console.log('cpu:' + cpu.innerHTML);
cpu.innerHTML='hello world';
var $cpu=$(cpu);
window.indexedStore = {};
window.indexedStore.setup = function(handler){
  console.log(requestFileSystem);
};

var htmls = {};
var Site = function(name,url,html,$html){
   //var name,url,html,$html;
   this.name=name;
   this.url=url;
   this.html=html;
   this.$html=$html;
   this.has_jobs=null;
};
var sites=[];
var names = [];
function show(){
  names=[];
  for(var i=0,len=sites.length;i<len;i++){
   if(sites[i].has_jobs===false){
      names.push(sites[i].name);
   }
  }
  console.log('900');
  cpu.innerText=names.join(',');
}

function request_jobs(name,url){
    var xhr = new XMLHttpRequest();
    var site = new Site(name,url);
    xhr.open('GET',url + 'search',true);
    xhr.onreadystatechange=function(){
      if(xhr.readyState==4){
       site.html=xhr.responseText;
       site.$html=$(site.html);
       var tds = site.$html.find('table tbody td');
       site.has_jobs= tds.length > 0;
       sites.push(site);
       show();
      }
    };
    xhr.send();
}

function jobs_urls(html){
  var $html = $(html);
  var as = $html.find('.main-box a');
  var urls ={};
  as.each(function(){
     urls[this.text]=this.href;
  });
  return urls;
}

/*
var script = document.createElement('script');
script.src='http://code.jquery.com/jquery-1.10.2.min.js';
script.type='text/javascript';
document.body.appendChild(script);

*/
var xhr = new XMLHttpRequest();
xhr.open('GET','http://www.cn.jobs/maps/industry',true);
xhr.onreadystatechange=function(){
  if(xhr.readyState==4){
     var urls = jobs_urls(xhr.responseText);
     for(var i in urls){
       request_jobs(i,urls[i]);    
     }
  }
};
xhr.send();

