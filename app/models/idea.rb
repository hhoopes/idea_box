class Idea < ActiveRecord::Base
  enum quality: {
    swill: 0,
    plausible: 1,
    genius: 2
  }
end
