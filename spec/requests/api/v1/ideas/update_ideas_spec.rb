require 'rails_helper'

describe "ideas#update API", :js => true do
  it "changes the quality of an idea" do
    create(:idea, quality: 0)
    idea = Idea.last
    expect(idea.swill?).to eq true

    idea_params = {
      "quality":1
    }

    put "/api/v1/ideas/#{idea.id}", JSON.dump(idea: idea_params),
                    "CONTENT_TYPE" => "application/json"

    expect(response).to be_success
    expect(idea.reload.plausible?).to eq true
    expect(idea.reload.swill?).not_to eq true
  end
end
