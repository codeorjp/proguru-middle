# frozen_string_literal: true

class KeywordsController < Students::BaseController
  before_action :require_student_login
  before_action :set_keyword, only: [:destroy]

  layout 'keywords/layouts/application'

  def index
    @keywords = Keyword.owner(current_student)
  end

  def new
    @keyword = Keyword.new
  end

  def create
    @keyword = Keyword.new(
      keyword_params.merge(student: current_student)
    )

    if @keyword.save
      flash[:success] = t('.success')
      redirect_to new_keyword_url
    else
      render :new
    end
  end

  def destroy
    @keyword.destroy
    redirect_to keywords_url
  end

  private

    def set_keyword
      @keyword = Keyword.owner(current_student).find(params[:id])
    rescue ActiveRecord::RecordNotFound
      flash[:error] = t('.not_found')
      redirect_to keywords_url
    end

    def keyword_params
      params.require(:keyword)
            .permit(:content)
    end
end
