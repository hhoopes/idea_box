class Idea < ActiveRecord::Base
  scope :newest_first, -> { order("created_at desc")}
  enum quality: {
    swill: 0,
    plausible: 1,
    genius: 2
  }
end
