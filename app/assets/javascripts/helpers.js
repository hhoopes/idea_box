function truncateText(text) {
  return jQuery.trim(text).substring(0, 100).split(" ").join(" ")
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

var qualityMapping = {0:"swill", 1:"plausible", 2:"genius" };

function changeQualityTag(ideaId, newQuality, that){
  $(that).parents().children("#" + ideaId).attr('quality', qualityMapping[newQuality])
  $(that).parent().parent().find("span.quality").text(qualityMapping[newQuality])
  $(that).parent().parent().find(".quality").removeClass("swill genius plausible").addClass(qualityMapping[newQuality])
}

function getIdeaId(context){
  return $(context).parent().parent(".idea").attr("id")
}

function getQuality(context){
  return $(context).parent().parent(".idea").attr("quality")
}

function updateDatabase(context, verb, newValue){
  $.ajax({
    url: "/api/v1/ideas/" + getIdeaId(context) + ".json",
    method: verb,
    dataType: "json",
    data: { idea: newValue }
  })
}
