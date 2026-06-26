import {
    BookOpen,
    Brain,
    CalendarDays,
    ChartColumn,
    FolderOpen,
    Sparkles,
} from 'lucide-react-native';

export const workspaceActions = [
  {
    id: 'notes',
    title: 'Notes',
    icon: BookOpen,
  },
  {
    id: 'planner',
    title: 'Planner',
    icon: CalendarDays,
  },
  {
    id: 'cards',
    title: 'Cards',
    icon: Brain,
  },
  {
    id: 'files',
    title: 'Files',
    icon: FolderOpen,
  },
  {
    id: 'higher',
    title: 'Higher',
    icon: Sparkles,
  },
  {
    id: 'progress',
    title: 'Progress',
    icon: ChartColumn,
  },
];