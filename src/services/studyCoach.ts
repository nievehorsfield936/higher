import { SubjectInsight } from '@/src/utils/studyEngine';

export interface CoachMessage {
  title: string;
  subtitle: string;
  action: string;
}

export function getCoachMessage(
  insight: SubjectInsight | null
): CoachMessage {
  if (!insight) {
    return {
      title: 'Welcome to Higher.',
      subtitle:
        'Create your first subject to begin building your study system.',
      action: 'Create Subject',
    };
  }

  if (insight.dueCardsCount > 20) {
    return {
      title: `${insight.subject.name} needs attention.`,
      subtitle: `You have ${insight.dueCardsCount} flashcards due. Spend about ${insight.estimatedMinutes} minutes reviewing them today.`,
      action: 'Review Flashcards',
    };
  }

  if (insight.accuracy < 60) {
    return {
      title: 'Focus on understanding.',
      subtitle: `${insight.subject.name} accuracy is ${insight.accuracy}%. Slow down and review the concepts before learning new material.`,
      action: 'Review Notes',
    };
  }

  if (insight.cardsCount === 0) {
    return {
      title: 'Create your first flashcards.',
      subtitle:
        'Flashcards are the fastest way to improve long-term memory.',
      action: 'Create Flashcards',
    };
  }

  if (insight.notesCount === 0) {
    return {
      title: 'Start taking notes.',
      subtitle:
        'Capture lecture notes so Higher can generate summaries and quizzes later.',
      action: 'New Note',
    };
  }

  return {
    title: `Great progress in ${insight.subject.name}.`,
    subtitle: `You're ${insight.mastery}% of the way to mastering this subject. Keep your momentum going today.`,
    action: 'Continue Studying',
  };
}