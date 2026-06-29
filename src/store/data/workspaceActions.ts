import {
    BookOpen,
    Brain,
    CalendarDays,
    ChartColumn,
    ClipboardList,
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
    id: 'cards',
    title: 'Cards',
    icon: Brain,
  },
  {
    id: 'assessments',
    title: 'Assessments',
    icon: ClipboardList,
  },
  {
    id: 'planner',
    title: 'Planner',
    icon: CalendarDays,
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