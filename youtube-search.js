/*
var myVariable;
myVariable="Kim";

myVariable="Park";

//alert(myVariable);

function sayHi() {
  console.log("Hello JS!")
}

sayHi();

function getSum(a,b) {
  return a+b;
}

const result = getSum("a","b");
console.log(result);

// callback function - 검색어의 결과를 보여줄 때 사용

function isEnd(value, cb) {
  console.log(value);

  cb(value + ' now !!'); // excute cb func
}

isEnd('Take a break', function(data) {
  console.log(data + ', ok!');
});

var btn = document.querySelector('button');

btn.onclick = function(){
  alert('Ouch! Stop poking me!');
}
*/

// jQuery

$(function() {
  var apiKey = "AIzaSyDIkjTi8VAg_6PCGuj56H1f86fXSa4XbB8";
  var apiYoutube = "https://www.googleapis.com/youtube/v3/search";

  $('form').submit(function(ev) {
    ev.preventDefault(); // 전송을 막음

    var query = $('#query').val();

    search(query);
  })

  function search(query) {
    $.get(
      apiYoutube, 
      {
        part:'snippet',
        q:query,
        type:'video',
        maxResults: 10,
        key: apiKey
      },
      function(data) { // 성공
        //console.log(data)
        
        $('#results').empty();

        $.each(data.items, function(index, item) {
          var newItem = buildItem(item);
          $('#results').append(newItem)
        })
      }
    );
  }

  var buildItem = function(item) {
    var videoId = item.id.videoId;
    var thumbnail = item.snippet.thumbnails.default.url;
    var title = item.snippet.title;
    var description = item.snippet.description;

    //console.log('=========================');
    //console.log(videoId, thumbnail, title, description);

    var newItem = `
    <li class="item">
      <a href="http://www.youtube.com/watch?v=${videoId}" target="_blank">
      <h3>${title} – US Official Final Trailer</h3>
      <div class="image-wrapper">
        <img src="${thumbnail}">
      </div>
      <div class="description">
        ${description}
      </div>
      </a>
    </li>`;
    
    return newItem;
  }
})