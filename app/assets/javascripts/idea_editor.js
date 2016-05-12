function updateBody(keyedThis){
  if (keyedThis.tagName === "P" ) {
    var context = keyedThis;
    $(context).blur()
  } else {
    var context = this;
  }
  var newBody = $(context).text();
  updateDatabase(context, 'PUT', {body: newBody})
}

function updateTitle(keyedThis){
  if (keyedThis.tagName === "H2" ) {
    var context = keyedThis;
    $(context).blur()
  } else {
    var context = this;
  }
  var newTitle = $(context).text();
  updateDatabase(context, "PUT", {title:newTitle})
}

function downvoteIdeaQuality(){
  var that = this

  switch (getQuality(this)) {
    case "genius":
      updateQuality(getIdeaId(this), "1", that);
      break;
    case "plausible":
      updateQuality(getIdeaId(this), "0", that);
      break;
    case "swill":
      break;
  }
}

function upvoteIdeaQuality(){
  var that = this

  switch (getQuality(this)) {
    case "genius":
      break;
    case "plausible":
      updateQuality(getIdeaId(this), "2", that);
      break;
    case "swill":
      updateQuality(getIdeaId(this), "1", that);
      break;
  }
}

function updateQuality(ideaId, newQuality, that){
  changeQualityTag(newQuality, that);
  updateDatabase(that, "PUT", {quality: newQuality })
}

function changeQualityTag(newQuality, that){
  $(that).parents().children("#" + getIdeaId(that)).attr('quality', qualityMapping[newQuality])
  $(that).parent().parent().find("span.quality").text(qualityMapping[newQuality])
  $(that).parent().parent().find(".quality").removeClass("swill genius plausible").addClass(qualityMapping[newQuality])
}

function deleteIdea(){
  var ideaId = getIdeaId(this)
  updateDatabase(this, "DELETE")
  $("#" + ideaId).remove();
}
