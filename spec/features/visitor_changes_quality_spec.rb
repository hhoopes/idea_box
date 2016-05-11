require 'rails_helper'

feature "visitor clicks on thumbs up", :js => true do
  scenario "idea quality tag changes to plausible" do
    idea = create(:idea, quality: 0)

    visit "/"

    within("li:first-child") {
      expect(page).to have_content("swill")
      expect(page).not_to have_content("plausible")

      find(".idea-upvote").click
      wait_for_ajax
      expect(page).not_to have_content("swill")
      expect(page).to have_content("plausible")
    }
  end
end
