var test = window.location.href.substr(window.location.href.length-6);
var now = window.location.href;
var pageProfile = now.substr(now.length - 7)
var poly = localStorage.getItem('politician');
var pol = localStorage.getItem(pageProfile);
var populateInfo = JSON.parse(pol);
var voterId = populateInfo.votes;
$(document).ready(function(){
  var polHeader = document.querySelector('#polName');
  polHeader.innerHTML = populateInfo.nombre;
  $('.twitDesc').html('description');
  $(".heroImg").attr("src",'https://theunitedstates.io/images/congress/450x550/' + pageProfile + '.jpg');
  getTweets();
  console.log('conected');
})

////////////////
function voteHistory(){
  var voteURL = 'https://www.govtrack.us/api/v2/vote_voter/?person='+ voterId;
    $.ajax({
         dataType: "json",
         url: voteURL,
         cache: true,
         success: function(data){
           for(var i=0 in data.objects){
             var issue = data.objects[i].vote.question;
             var yeaNay = data.objects[i].option.value;
             var chamber = data.objects[i].vote.chamber;
             var question = data.objects[i].vote.question;
             var required = data.objects[i].vote.required;
             var tally = data.objects[i].vote.result;
             $('.voteHist').append(
              "<div class=''>" +
              "<p>" + yeaNay + "</p>" +
              "<p>" + chamber + "</p>" +
              "<p>" + question + "</p>" +
              "<p>" + required + "</p>" +
              "<p>" + tally + "</p>" +
              "</div>"
             )
           }
         }
  }).done(function(){
    console.log('Donezo!');
  });
}
voteHistory();
