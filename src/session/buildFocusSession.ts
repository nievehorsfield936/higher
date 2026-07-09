import type { FocusSession } from './types';

export function buildFocusSession(
  preparation: number
): FocusSession {
  const tasks: FocusSession['tasks'] = [];

  if (preparation < 50) {
    tasks.push({
      id: 'notes',
      type: 'notes',
      title: 'Strengthen Notes',
      description: 'Improve your lecture notes before revising.',
      estimatedMinutes: 20,
      completed: false,
    });
  }

  tasks.push({
    id: 'cards',
    type: 'flashcards',
    title: 'Review Flashcards',
    description: "Complete today's review cards.",
    estimatedMinutes: 15,
    completed: false,
  });

  tasks.push({
    id: 'quiz',
    type: 'quiz',
    title: 'Knowledge Check',
    description: 'Test your understanding with a short quiz.',
    estimatedMinutes: 10,
    completed: false,
  });

  tasks.push({
    id: 'break',
    type: 'break',
    title: 'Take a Break',
    description: 'Rest for five minutes.',
    estimatedMinutes: 5,
    completed: false,
  });

  return {
    preparation,
    totalMinutes: tasks.reduce(
      (sum, task) => sum + task.estimatedMinutes,
      0
    ),
    tasks,
  };
}