module Api
  module V1
    class IdeasController < ApiController
      def index
        respond_with Idea.newest_first
      end

      def create
        respond_with Idea.create(idea_params), location: nil
      end

      private
        def idea_params
          params.require(:idea).permit(:title, :body, :quality)
        end
    end
  end
end
