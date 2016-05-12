module Api
  module V1
    class IdeasController < ApiController
      def index
        respond_with Idea.newest_first
      end

      def create
        respond_with Idea.create(idea_params), location: nil
      end

      def destroy
        respond_with Idea.destroy(params[:id])
      end

      def update
        edited_params = edit_params
        respond_with Idea.update(params[:id], edited_params), location: nil
      end

      private
        def idea_params
          params.require(:idea).permit(:title, :body, :quality)
        end

        def edit_params
          edited_params = idea_params
          edited_params[:quality] = params[:idea][:quality].to_i if params[:idea][:quality]
          edited_params
        end
    end
  end
end
