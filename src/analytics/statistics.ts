type CompletedSession = {
  completedAt: string;
  totalMinutes: number;
};

export function getTotalStudyMinutes(
  sessions: CompletedSession[]
) {
  return sessions.reduce(
    (total, session) => total + session.totalMinutes,
    0
  );
}

export function getSessionsThisWeek(
  sessions: CompletedSession[]
) {
  const now = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(now.getDate() - 7);

  return sessions.filter(
    (session) => new Date(session.completedAt) >= weekAgo
  );
}