# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_03_17_023339) do

  create_table "active_storage_attachments", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "class_rooms", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin", force: :cascade do |t|
    t.integer "school_year", null: false
    t.string "name", null: false
    t.bigint "teacher_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["teacher_id"], name: "index_class_rooms_on_teacher_id"
  end

  create_table "keywords", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin", force: :cascade do |t|
    t.string "content", null: false
    t.bigint "student_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["content", "student_id"], name: "index_keywords_on_content_and_student_id", unique: true
    t.index ["student_id"], name: "index_keywords_on_student_id"
  end

  create_table "lessons", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin", force: :cascade do |t|
    t.integer "number", null: false
    t.string "title", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "message_boards", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin", force: :cascade do |t|
    t.integer "kind", null: false
    t.bigint "class_room_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["class_room_id"], name: "index_message_boards_on_class_room_id"
  end

  create_table "messages", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin", force: :cascade do |t|
    t.string "body"
    t.bigint "message_board_id"
    t.string "sender_type", null: false
    t.bigint "sender_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["message_board_id"], name: "index_messages_on_message_board_id"
    t.index ["sender_id", "created_at"], name: "index_messages_on_sender_id_and_created_at"
    t.index ["sender_type", "sender_id"], name: "index_messages_on_sender_type_and_sender_id"
  end

  create_table "stages", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin", force: :cascade do |t|
    t.integer "number", null: false
    t.bigint "lesson_id"
    t.bigint "next_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["lesson_id"], name: "index_stages_on_lesson_id"
  end

  create_table "students", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin", force: :cascade do |t|
    t.integer "number", null: false
    t.bigint "class_room_id"
    t.string "encrypted_password", limit: 128
    t.string "initial_token", limit: 128
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "initialized_at"
    t.string "remember_token", limit: 128, null: false
    t.string "nickname"
    t.integer "icon"
    t.string "status", null: false
    t.integer "failed_attempts", default: 0, null: false
    t.index ["class_room_id", "number"], name: "index_students_on_class_room_id_and_number", unique: true
    t.index ["class_room_id"], name: "index_students_on_class_room_id"
    t.index ["initial_token"], name: "index_students_on_initial_token"
    t.index ["remember_token"], name: "index_students_on_remember_token"
  end

  create_table "teachers", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", null: false
    t.string "encrypted_password", limit: 128, null: false
    t.string "confirmation_token", limit: 128
    t.string "remember_token", limit: 128, null: false
    t.string "email_confirmation_token", default: "", null: false
    t.datetime "email_confirmed_at"
    t.string "fullname", null: false
    t.string "nickname"
    t.string "unconfirmed_email"
    t.boolean "email_delivery_allowed", default: true, null: false
    t.index ["email"], name: "index_teachers_on_email", unique: true
    t.index ["email_confirmation_token"], name: "index_teachers_on_email_confirmation_token"
    t.index ["remember_token"], name: "index_teachers_on_remember_token"
  end

  create_table "terms", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin", force: :cascade do |t|
    t.text "content", null: false
    t.bigint "class_room_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["class_room_id"], name: "index_terms_on_class_room_id"
  end

  create_table "workspaces", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin", force: :cascade do |t|
    t.bigint "stage_id"
    t.bigint "student_id"
    t.text "body", size: :medium
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["stage_id"], name: "index_workspaces_on_stage_id"
    t.index ["student_id", "stage_id"], name: "index_workspaces_on_student_id_and_stage_id", unique: true
    t.index ["student_id"], name: "index_workspaces_on_student_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "class_rooms", "teachers"
  add_foreign_key "keywords", "students"
  add_foreign_key "message_boards", "class_rooms"
  add_foreign_key "messages", "message_boards"
  add_foreign_key "stages", "lessons"
  add_foreign_key "students", "class_rooms"
  add_foreign_key "terms", "class_rooms"
  add_foreign_key "workspaces", "stages"
  add_foreign_key "workspaces", "students"
end
