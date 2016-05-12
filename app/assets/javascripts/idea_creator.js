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
