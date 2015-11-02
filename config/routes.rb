Rails.application.routes.draw do
  root to: 'static_pages#supersonic_paper_plane'

  namespace :api, default: { format: :json } do
	  post 'supersonic_paper_plane/new_point', to: 'supersonic_paper_plane#create_record'
	  get 'supersonic_paper_plane/index', to: 'supersonic_paper_plane#index'
  end

end