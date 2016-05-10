FactoryGirl.define do
  factory :idea do
    sequence(:title) { |n| "Idea ##{n}" }
    sequence(:body) { |n| "Descriptive text about this idea #{n}" }
    quality 1
  end
end
