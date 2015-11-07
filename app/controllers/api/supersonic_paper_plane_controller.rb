class Api::SupersonicPaperPlaneController < ApplicationController
	def create_record
		record = SupersonicPaperPlane.new(name: params[:nickname])
		record.score = params[:points]

		if record.name.blank?
			record.name = "Unnamed"
		end

		record.save

		render json: SupersonicPaperPlane.all.order('score DESC')
	end

	def index
		@records = SupersonicPaperPlane.all.order('score DESC').first(20)
		render json: @records
	end
end
