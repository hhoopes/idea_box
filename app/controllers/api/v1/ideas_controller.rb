module Api
  module V1
    class IdeasController < ApiController
      def index
        respond_with Idea.newest_first
      end
    end
  end
end
