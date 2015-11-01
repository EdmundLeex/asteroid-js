require 'test_helper'

class StaticPagesControllerTest < ActionController::TestCase
  test "should get supersonic_paper_plane" do
    get :supersonic_paper_plane
    assert_response :success
  end

end
