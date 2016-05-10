require 'rails_helper'

feature "visitor creates idea", :js => true do
  scenario "the new idea loads at the top" do
    visit '/'

    fill_in "title", with: "My Idea!!11"
    fill_in  "body", with: "So great."
    click_button "Save"

    expect(current_path).to eq("/")
    within("li:first-child") {
      expect(page).to have_content("My Idea!!11")
      expect(page).to have_content("So great.")
      expect(page).to have_content("swill")
    }
  end
end
