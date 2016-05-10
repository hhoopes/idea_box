require 'rails_helper'

describe "ideas#new API", :js => true do
  it "creates a new idea" do
    expect(Idea.count).to eq(0)

    idea_params = {
      title: "New Idea",
      body: "Sample text about this idea"
    }

    post "/api/v1/ideas", idea: idea_params
    json = JSON.parse(response.body)

    expect(response).to be_success
    expect(Idea.count).to eq(1)
    expect(Idea.first.title).to eq(idea_params[:title])
    expect(Idea.first.body).to eq(idea_params[:body])
    expect(Idea.first.swill?).to be true
  end
end
