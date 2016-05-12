function loadIdeas(){
  return $.getJSON('/api/v1/ideas').then(function (ideas) {
    addIdeasToPage(ideas);
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
    + '><div class="col-md-1 icons">'
    + addButtons()
    + '</div>'
    + '<div class="col-md-11"><h2 class=idea-title contentEditable=true>'
    + idea.title
    + '</h2>'
    + addLabel(idea)
    + '<p class="idea-body" contentEditable=true>'
    + truncateText(idea.body)
    + '</p></div></li>').addClass("list-group-item idea");
}

function addButtons(){
  return '<p class="idea-delete btn btn-link glyphicon glyphicon-remove red"></p>'
  + '<p class="glyphicon glyphicon-thumbs-up idea-upvote"></p>'
  + '<p class="glyphicon glyphicon-thumbs-down idea-downvote"></p>'
}

function addLabel(idea){
  return '<span class="label label-default label-pill pull-xs-right quality '
  + idea.quality
  + '">'
  + idea.quality
  + "</span>"
}
