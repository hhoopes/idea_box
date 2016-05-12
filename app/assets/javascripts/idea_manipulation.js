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
