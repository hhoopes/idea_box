// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
//= require bootstrap-sprockets

$(document).ready(function(){
  loadIdeas();
  $("#idea-save").on('click', createIdea)
})

function loadIdeas(){
  return $.getJSON('/api/v1/ideas').then(function (ideas) {
    addIdeasToPage(ideas);
  })
}

function createIdea(){
  var ideaParams = {idea: {title: $("#title").val(), body: $("#body").val()}}

var created =  $.ajax({
    url: "/api/v1/ideas.json",
    method: "POST",
    dataType: "json",
    data: ideaParams,
    success: function(idea){
      addIdeasToPage(idea)
    }
  })
}

function addIdeasToPage() {
  var renderedIdeas = arguments[0].map(renderIdea);
  $("#ideas").append(renderedIdeas);
}

function renderIdea(idea) {
  return $(
    '<li><h2>'
    + idea.title
    + '<span class="label label-default label-pill pull-xs-right quality '
    + idea.quality
    + '">'
    + idea.quality
    + "</span></h2>"
    + '<p class="idea-body">'
    + truncateText(idea.body)
    + '</p></li>').addClass("list-group-item idea-"
    + idea.id);
}

function truncateText(text) {
  return jQuery.trim(text).substring(0, 100).split(" ").join(" ")
}
