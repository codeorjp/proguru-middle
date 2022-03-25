# frozen_string_literal: true

class Sensei::TermsController < SenseiController
  before_action :require_login
  before_action :set_class_room
  before_action :set_term, only: [:show, :edit, :update]
  rescue_from ActiveRecord::RecordNotFound, with: :rescue_record_not_found

  def new
    @term = Term.new
  end

  def create
    @term = Term.new(term_params.merge(class_room_id: @class_room.id))
    if @term.save
      redirect_to sensei_class_rooms_path, notice: t('.success')
    else
      render :new
    end
  end

  def show; end

  def edit; end

  def update
    if @term.update(term_params)
      redirect_to sensei_class_rooms_path, notice: t('.success')
    else
      render :edit
    end
  end

  private

    def set_class_room
      @class_room = ClassRoom.owner(current_user.id).find(params[:class_room_id])
    end

    def set_term
      @term = Term.find_by(class_room_id: @class_room.id)
    end

    def term_params
      params.require(:term).permit(:content)
    end
end
