export interface Assessment {
  id: string;
  subjectId: string;

  title: string;

  dueDate?: string;

  weight?: number;
}