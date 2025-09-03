export enum ProjectStatus {
  Active = 'Active',
  Quoting = 'Quoting',
  Completed = 'Completed',
  OnHold = 'On Hold',
}

export type BudgetStatus = 'On Track' | 'Over' | 'Under';

export interface Project {
  id: string;
  name: string;
  address: string;
  client: string;
  progress: number; // Percentage 0-100
  budgetStatus: BudgetStatus;
  status: ProjectStatus;
}

export enum TaskStatus {
  ToDo = 'To Do',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

export enum TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; // ISO 8601 format
  assigneeId: string;
  projectId: string;
}

export interface ProjectWithTasks extends Project {
    tasks: Task[];
}

export type Page = 
  | 'Project Hub' 
  | 'Tasks' 
  | 'Schedule' 
  | 'Documents' 
  | 'Financials' 
  | 'Client Portal' 
  | 'Settings';