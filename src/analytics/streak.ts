type CompletedSession = {
  completedAt: string;
};

export function getStudyStreak(
  sessions: CompletedSession[]
) {
  if (sessions.length === 0) return 0;

  const uniqueDays = Array.from(
    new Set(
      sessions.map((session) =>
        new Date(session.completedAt)
          .toISOString()
          .split('T')[0]
      )
    )
  ).sort().reverse();

  let streak = 0;
  const today = new Date();

  for (let i = 0; i < uniqueDays.length; i++) {
    const expected = new Date(today);
    expected.setDate(today.getDate() - i);

    const expectedDay = expected
      .toISOString()
      .split('T')[0];

    if (uniqueDays.includes(expectedDay)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}