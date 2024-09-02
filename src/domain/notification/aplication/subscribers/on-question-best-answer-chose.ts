import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { SendNotificationUseCase } from "../use-cases/send-notification";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { QuestionBestAnswerChoseEvent } from "@/domain/forum/enterprise/events/question-best-answer-chose-event";

export class OnQuestionBestAnswerChose implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerChoseEvent.name,
    )
  }

  private async sendQuestionBestAnswerNotification({ 
    question,
    bestAnswerId,
  }: QuestionBestAnswerChoseEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString(),
    )

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        content: `A respota que você enviou em "${question.title
          .substring(0, 20)
          .concat('...')} foi escolhída pelo autor!" `,
        title: `Sua resposta foi escolhida!`,
      })
    }
  }
}