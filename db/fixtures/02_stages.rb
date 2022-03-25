# frozen_string_literal: true

# Stages of Lesson 1
lesson1 = Lesson.find_by!(number: 1)
Stage.seed(
  :id,
  { id: 1, number: 1, lesson_id: lesson1.id, next_id: 2   },
  { id: 2, number: 2, lesson_id: lesson1.id, next_id: 3   },
  { id: 3, number: 3, lesson_id: lesson1.id, next_id: 4   },
  { id: 4, number: 4, lesson_id: lesson1.id, next_id: 5   },
  { id: 5, number: 5, lesson_id: lesson1.id, next_id: 6   },
  { id: 6, number: 6, lesson_id: lesson1.id, next_id: 7   },
  { id: 7, number: 7, lesson_id: lesson1.id, next_id: 8   },
  { id: 8, number: 8, lesson_id: lesson1.id, next_id: nil }
)

# Stages of Lesson 2
lesson2 = Lesson.find_by!(number: 2)
Stage.seed(
  :id,
  { id: 9, number: 1, lesson_id: lesson2.id, next_id: 10 },
  { id: 10, number: 2, lesson_id: lesson2.id, next_id: 11  },
  { id: 11, number: 3, lesson_id: lesson2.id, next_id: 12  },
  { id: 12, number: 4, lesson_id: lesson2.id, next_id: 14  },
  { id: 14, number: 5, lesson_id: lesson2.id, next_id: 15  },
  { id: 15, number: 6, lesson_id: lesson2.id, next_id: 16  },
  { id: 16, number: 7, lesson_id: lesson2.id, next_id: nil }
)

# Stages of Lesson 3
lesson3 = Lesson.find_by!(number: 3)
Stage.seed(
  :id,
  { id: 17, number: 1, lesson_id: lesson3.id, next_id: 18  },
  { id: 18, number: 2, lesson_id: lesson3.id, next_id: 19  },
  { id: 19, number: 3, lesson_id: lesson3.id, next_id: 21  },
  { id: 21, number: 4, lesson_id: lesson3.id, next_id: 22  },
  { id: 22, number: 5, lesson_id: lesson3.id, next_id: nil }
)

# Stages of Lesson 4
lesson4 = Lesson.find_by!(number: 4)
Stage.seed(
  :id,
  { id: 23, number: 1, lesson_id: lesson4.id, next_id: 24  },
  { id: 24, number: 2, lesson_id: lesson4.id, next_id: 25  },
  { id: 25, number: 3, lesson_id: lesson4.id, next_id: 26  },
  { id: 26, number: 4, lesson_id: lesson4.id, next_id: 27  },
  { id: 27, number: 5, lesson_id: lesson4.id, next_id: 28  },
  { id: 28, number: 6, lesson_id: lesson4.id, next_id: 29  },
  { id: 29, number: 7, lesson_id: lesson4.id, next_id: 30  },
  { id: 30, number: 8, lesson_id: lesson4.id, next_id: 31  },
  { id: 31, number: 9, lesson_id: lesson4.id, next_id: nil }
)

# Stages of Lesson 5
lesson5 = Lesson.find_by!(number: 5)
Stage.seed(
  :id,
  { id: 32, number: 1, lesson_id: lesson5.id, next_id: 33  },
  { id: 33, number: 2, lesson_id: lesson5.id, next_id: nil }
)

Stage.find_by(id: 13)&.destroy # Lesson2 Stage5

Stage.find_by(id: 20)&.destroy # Lesson3 Stage4
