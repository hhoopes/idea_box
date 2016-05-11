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
  $("#idea-save").on('click', createIdea);
  $("body").on("click", "p#idea-delete", deleteIdea);
})

function loadIdeas(){
  return $.getJSON('/api/v1/ideas').then(function (ideas) {
    addIdeasToPage(ideas);
  })
}

function createIdea(){
  var ideaParams = {idea: {title: $("#title").val(), body: $("#body").val()}}

  $.ajax({
    url: "/api/v1/ideas.json",
    method: "POST",
    dataType: "json",
    data: ideaParams,
    success: function(idea){
      addIdeasToPage(idea)
    }
  })
}

function deleteIdea(){
  console.log("Clicked!")

  var ideaId = $(this).parents(".idea").data("idea-id");

  $.ajax({
    url: "/api/v1/ideas/" + ideaId + ".json",
    method: "DELETE",
    success: function(){
      $(".idea[data-idea-id=" + ideaId + "]").remove();
    }
  })
}

function addIdeasToPage() {
  var renderedIdeas = arguments[0].map(renderIdea);
  $("#ideas").append(renderedIdeas);
}

function renderIdea(idea) {
  return $(
    '<li class="row idea" data-idea-id='
    + idea.id
    + '><div class="col-md-1 icons"><p id="idea-delete" class="btn btn-link glyphicon glyphicon-remove red"></p><p class="glyphicon glyphicon-thumbs-up"></p><p class="glyphicon glyphicon-thumbs-down"></p></div>'
    + '<div class="col-md-11"><h2>'
    + idea.title
    + '<span class="label label-default label-pill pull-xs-right quality '
    + idea.quality
    + '">'
    + idea.quality
    + "</span></h2>"
    + '<p class="idea-body">'
    + truncateText(idea.body)
    + '</p></div></li>').addClass("list-group-item idea");
}

function truncateText(text) {
  return jQuery.trim(text).substring(0, 100).split(" ").join(" ")
}
