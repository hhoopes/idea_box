10.times do
  idea_params = {
    title: Faker::Company.catch_phrase,
    body: Faker::Hipster.sentence(20, false, 0),
    quality: Random.rand(0..2)
  }

  Idea.create(idea_params)
end
