import { faker } from '@faker-js/faker'
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { 
  Question, 
  QuestionsProps
} from "@/domain/forum/enterprise/entities/question";

export function makeQuestion(
  override: Partial<QuestionsProps> = {},
  id?: UniqueEntityID,
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}