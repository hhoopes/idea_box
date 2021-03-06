require 'rails_helper'

feature "visitor visits index", :js => true do
  scenario "they see all the ideas" do
    create_list(:idea, 5, quality: 0)

    visit '/'
    wait_for_ajax

    expect(page).to have_content("Idea Box")
    Idea.all.each do | idea |
      expect(page).to have_content(idea.title)
      expect(page).to have_content(idea.body)
      expect(page).to have_content(idea.quality)
    end

    expect(page).to have_selector("li", count: 5)
  end

  scenario "ideas are sorted recent at top" do
    idea = create(:idea)

    visit '/'
    wait_for_ajax

    within("li:first-child"){ expect(page).to have_content(idea.title)}
    within("li:first-child"){ expect(page).to have_content(idea.body)}

    new_idea = create(:idea)

    visit '/'
    wait_for_ajax

    within("li:first-child"){ expect(page).to have_content(new_idea.title)}
    within("li:first-child"){ expect(page).to have_content(new_idea.body)}
  end
end
