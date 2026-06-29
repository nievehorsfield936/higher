import { StudySession } from './types';

export interface SessionRunner {
  session: StudySession;
  currentStep: number;
}

export function createSessionRunner(
  session: StudySession
): SessionRunner {
  return {
    session,
    currentStep: 0,
  };
}

export function getCurrentStep(
  runner: SessionRunner
) {
  return runner.session.steps[runner.currentStep];
}

export function hasNextStep(
  runner: SessionRunner
) {
  return runner.currentStep < runner.session.steps.length - 1;
}

export function hasPreviousStep(
  runner: SessionRunner
) {
  return runner.currentStep > 0;
}

export function nextStep(
  runner: SessionRunner
): SessionRunner {
  if (!hasNextStep(runner)) {
    return runner;
  }

  return {
    ...runner,
    currentStep: runner.currentStep + 1,
  };
}

export function previousStep(
  runner: SessionRunner
): SessionRunner {
  if (!hasPreviousStep(runner)) {
    return runner;
  }

  return {
    ...runner,
    currentStep: runner.currentStep - 1,
  };
}