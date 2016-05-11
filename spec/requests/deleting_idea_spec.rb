require 'rails_helper'

describe "ideas#delete API", :js => true do
  it "deletes an idea" do
    create_list(:idea, 5)
    expect(Idea.count).to eq(5)
    idea = Idea.last

    delete "/api/v1/ideas/#{idea.id}"

    expect(response).to be_success
    expect(Idea.count).to eq(4)
    expect(Idea.last.id).not_to eq(idea.id)

  end
end
