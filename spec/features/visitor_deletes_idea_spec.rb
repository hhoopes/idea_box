require 'rails_helper'

feature "visitor deletes an idea", :js => true do
  scenario "they no longer see the idea on the page" do
    create_list(:idea, 10)
    idea = Idea.last
    visit "/"

    within("li:first-child") {
      expect(page).to have_content(idea.title)
      expect(page).to have_content(idea.body)

      find(".idea-delete").click
      wait_for_ajax
      expect(page).not_to have_content(idea.title)
      expect(page).not_to have_content(idea.body)
    }

  end

end
