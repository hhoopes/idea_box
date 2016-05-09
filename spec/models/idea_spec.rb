require 'rails_helper'

RSpec.describe Idea, type: :model do
  it do
    should define_enum_for(:quality).
    with([:swill, :plausible, :genius])
  end
end
