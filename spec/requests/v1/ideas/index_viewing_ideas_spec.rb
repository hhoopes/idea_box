require 'rails_helper'

describe "Ideas#index API", :js => true do
  it "returns all ideas" do
    create_list(:idea, 10)
    expect(Idea.count).to eq(10)

    get "/api/v1/ideas"
    json = JSON.parse(response.body)

    expect(response).to be_success

    expect(json.count).to eq(10)
    json.zip(Idea.newest_first).each do | json_idea, db_idea |
      expect(json_idea[ "title"]).to eq(db_idea.title)
    end
  end
end
