function filterIdeas(){
  var searchTerm = $(this).val().toLowerCase();

  $(".idea").each(function(index, idea){
    var title = $(this).children().children(".idea-title").text().toLowerCase();
    var body = $(this).children().children(".idea-body").text().toLowerCase();
    (title.indexOf(searchTerm) >= 0 || body.indexOf(searchTerm) >= 0) ?
      $(idea).show() : $(idea).hide();
  })
}
