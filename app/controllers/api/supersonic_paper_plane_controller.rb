class Api::SupersonicPaperPlaneController < ApplicationController
	BLACK_LIST = %w[< >]

	def create_record
		nickname = params[:nickname]
		BLACK_LIST.each { |bl| nickname.gsub!(bl, "\#{bl}") }
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
