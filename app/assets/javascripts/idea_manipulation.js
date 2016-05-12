$(document).ready(function(){
  loadIdeas();
  $("#idea-save").on('click', createIdea);
  $("body").on("click", "p.idea-delete", deleteIdea);
  $("body").on("click", "p.idea-downvote", downvoteIdeaQuality);
  $("body").on("click", "p.idea-upvote", upvoteIdeaQuality);
  $("body").on("blur", "h2", updateTitle);
  $("body").on("keydown", "h2", checkKeyDown);
  $("body").on("blur", "p.idea-body", updateBody);
  $("body").on("keydown", "p.idea-body", checkKeyDown);
  $("#search").on("keyup", filterIdeas)

})

var qualityMapping = {0:"swill", 1:"plausible", 2:"genius" };

function loadIdeas(){
  return $.getJSON('/api/v1/ideas').then(function (ideas) {
    addIdeasToPage(ideas);
  })
}

function filterIdeas(){
  var searchTerm = $(this).val().toLowerCase();

  $(".idea").each(function(index, idea){
    var title = $(this).children().children(".idea-title").text().toLowerCase();
    var body = $(this).children().children(".idea-body").text().toLowerCase();
    (title.indexOf(searchTerm) >= 0 || body.indexOf(searchTerm) >= 0) ?
      $(idea).show() : $(idea).hide();
  })
}

function checkKeyDown(e){
  var keyedThis = this;
  if (e.keyCode === 13) {
    e.preventDefault();
    if (this.tagName == "H2"){
      updateTitle(keyedThis)
    } else if (this.tagName == "P"){
      updateBody(keyedThis)
    }
  }
}

function updateBody(keyedThis){
  if (keyedThis.tagName === "P" ) {
    var context = keyedThis;
    $(context).blur()
  } else {
    var context = this;
  }
  var ideaId = $(context).parent().parent().attr("id");
  var newBody = $(context).text();

  $.ajax({
    url: "/api/v1/ideas/" + ideaId + ".json",
    method: "PUT",
    dataType: "json",
    data: {idea: {body: newBody }}
  })
}

function updateTitle(keyedThis){
  if (keyedThis.tagName === "H2" ) {
    var context = keyedThis;
    $(context).blur()
  } else {
    var context = this;
  }
  var ideaId = $(context).parent().parent().attr("id");
  var newTitle = $(context).text();

  $.ajax({
    url: "/api/v1/ideas/" + ideaId + ".json",
    method: "PUT",
    dataType: "json",
    data: {idea: {title: newTitle }}
  })
}

function downvoteIdeaQuality(){
  var that = this
  var ideaId = $(this).parent().parent(".idea").attr("id")
  var quality = $(this).parent().parent(".idea").attr("quality")

  switch (quality) {
    case "genius":
      updateQuality(ideaId, "1", that)
      break;
    case "plausible":
      updateQuality(ideaId, "0", that)
      break;
    case "swill":
      break;
  }
}

function upvoteIdeaQuality(){
  var that = this
  var ideaId = $(this).parent().parent(".idea").attr("id")
  var quality = $(this).parent().parent(".idea").attr("quality")

  switch (quality) {
    case "genius":
      break;
    case "plausible":
      updateQuality(ideaId, "2", that)
      break;
    case "swill":
      updateQuality(ideaId, "1", that)
      break;
  }
}

function updateQuality(ideaId, newQuality, that){
  debugger;
  changeQualityTag(ideaId, newQuality, that)
  $.ajax({
    url: "/api/v1/ideas/" + ideaId + ".json",
    method: "PUT",
    dataType: "json",
    data: {idea: {quality: newQuality }}
  })
}

function changeQualityTag(ideaId, newQuality, that){
  $(that).parents().children("#" + ideaId).attr('quality', qualityMapping[newQuality])
  $(that).parent().parent().find("span.quality").text(qualityMapping[newQuality])
  $(that).parent().parent().find(".quality").removeClass("swill genius plausible").addClass(qualityMapping[newQuality])
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
  var ideaId = $(this).parent().parent(".idea").attr("id")
    $.ajax({
    url: "/api/v1/ideas/" + ideaId + ".json",
    method: "DELETE",
    success: function(){
      $("#" + ideaId).remove();
    }
  })
}

function addIdeasToPage() {
  var renderedIdeas = arguments[0].map(renderIdea);
  $("#ideas").append(renderedIdeas);
}

function renderIdea(idea) {
  return $(
    '<li class="row idea" id='
    + idea.id
    + ' quality='
    + idea.quality
    + '><div class="col-md-1 icons"><p class="idea-delete btn btn-link glyphicon glyphicon-remove red"></p><p class="glyphicon glyphicon-thumbs-up idea-upvote"></p><p class="glyphicon glyphicon-thumbs-down idea-downvote"></p></div>'
    + '<div class="col-md-11"><h2 class=idea-title contentEditable=true>'
    + idea.title
    + '</h2><span class="label label-default label-pill pull-xs-right quality '
    + idea.quality
    + '">'
    + idea.quality
    + "</span>"
    + '<p class="idea-body" contentEditable=true>'
    + truncateText(idea.body)
    + '</p></div></li>').addClass("list-group-item idea");
}

function truncateText(text) {
  return jQuery.trim(text).substring(0, 100).split(" ").join(" ")
}
