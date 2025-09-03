import { Project, ProjectStatus, Task, TaskStatus, TaskPriority, StaffMember, CostItem } from './types';

export const sampleStaff: StaffMember[] = [
    {
        id: 'sample-staff-1',
        name: 'Olivia Chen (Sample)',
        avatarUrl: 'https://i.pravatar.cc/150?u=olivia',
        role: 'Lead Carpenter',
        email: 'olivia.c@example.com',
        phone: '07700 900101',
        isSample: true,
    },
    {
        id: 'sample-staff-2',
        name: 'Ben Carter (Sample)',
        avatarUrl: 'https://i.pravatar.cc/150?u=ben',
        role: 'Apprentice',
        email: 'ben.c@example.com',
        phone: '07700 900102',
        isSample: true,
    },
    {
        id: 'sample-staff-3',
        name: 'Sophia Rodriguez (Sample)',
        avatarUrl: 'https://i.pravatar.cc/150?u=sophia',
        role: 'Finisher',
        email: 'sophia.r@example.com',
        phone: '07700 900103',
        isSample: true,
    }
];

export const sampleProjects: Project[] = [
  {
    id: 'sample-proj-1',
    name: 'Modern Kitchen Remodel (Sample)',
    address: '123 Oak Avenue, London, W1 1AA',
    client: 'The Johnson Family',
    progress: 75,
    status: ProjectStatus.Active,
    quoteAmount: 42000,
    isSample: true,
  },
  {
    id: 'sample-proj-2',
    name: 'Bespoke Library Shelving (Sample)',
    address: '456 Pine Street, Manchester, M1 1AA',
    client: 'Dr. Evelyn Reed',
    progress: 10,
    status: ProjectStatus.Active,
    quoteAmount: 18500,
    isSample: true,
  },
   {
    id: 'sample-proj-3',
    name: 'Commercial Office Fit-out (Sample)',
    address: '789 Maple Drive, Birmingham, B1 1AA',
    client: 'Innovate Co.',
    progress: 30,
    status: ProjectStatus.OnHold,
    quoteAmount: 110000,
    isSample: true,
  },
  {
    id: 'sample-proj-4',
    name: 'Attic Conversion (Sample)',
    address: '101 Birch Lane, Bristol, BS1 1AA',
    client: 'The Garcia Family',
    progress: 100,
    status: ProjectStatus.Completed,
    quoteAmount: 32000,
    isSample: true,
  },
];


export const sampleTasks: Task[] = [
    // Project 1 Tasks
    { id: 'sample-task-1', title: 'Finalize cabinet design', description: 'Meet with Johnsons to get final sign-off on the design.', status: TaskStatus.Completed, priority: TaskPriority.High, dueDate: '2024-08-10T00:00:00Z', assigneeId: 'sample-staff-1', projectId: 'sample-proj-1', isSample: true },
    { id: 'sample-task-2', title: 'Order custom countertops', description: 'Quartz countertops from supplier XYZ.', status: TaskStatus.InProgress, priority: TaskPriority.High, dueDate: '2024-08-25T00:00:00Z', assigneeId: 'sample-staff-1', projectId: 'sample-proj-1', isSample: true },
    { id: 'sample-task-3', title: 'Demolition of old kitchen', description: 'Take out old cabinets and appliances.', status: TaskStatus.Completed, priority: TaskPriority.Medium, dueDate: '2024-08-15T00:00:00Z', assigneeId: 'sample-staff-2', projectId: 'sample-proj-1', isSample: true },
    { id: 'sample-task-4', title: 'Install new cabinets', description: 'Start installation of base and wall cabinets.', status: TaskStatus.InProgress, priority: TaskPriority.Medium, dueDate: '2024-09-05T00:00:00Z', assigneeId: 'sample-staff-1', projectId: 'sample-proj-1', isSample: true },
    { id: 'sample-task-5', title: 'Paint and finish', description: 'Final coat of paint and hardware installation.', status: TaskStatus.ToDo, priority: TaskPriority.Low, dueDate: '2024-09-20T00:00:00Z', assigneeId: 'sample-staff-3', projectId: 'sample-proj-1', isSample: true },

    // Project 2 Tasks
    { id: 'sample-task-6', title: 'Source reclaimed wood', description: 'Find suitable reclaimed oak for the shelves.', status: TaskStatus.InProgress, priority: TaskPriority.High, dueDate: '2024-08-30T00:00:00Z', assigneeId: 'sample-staff-1', projectId: 'sample-proj-2', isSample: true },
    { id: 'sample-task-7', title: 'Mill and prepare lumber', description: 'Plane and sand all wood to final dimensions.', status: TaskStatus.ToDo, priority: TaskPriority.Medium, dueDate: '2024-09-10T00:00:00Z', assigneeId: 'sample-staff-2', projectId: 'sample-proj-2', isSample: true },
    { id: 'sample-task-8', title: 'Fabricate shelves', description: 'Cut and assemble the shelving units in the workshop.', status: TaskStatus.ToDo, priority: TaskPriority.Medium, dueDate: '2024-09-25T00:00:00Z', assigneeId: 'sample-staff-1', projectId: 'sample-proj-2', isSample: true },

    // Project 4 (Completed) Tasks
    { id: 'sample-task-9', title: 'Frame new walls', description: '', status: TaskStatus.Completed, priority: TaskPriority.High, dueDate: '2024-06-10T00:00:00Z', assigneeId: 'sample-staff-1', projectId: 'sample-proj-4', isSample: true },
    { id: 'sample-task-10', title: 'Run electrical and plumbing', description: '', status: TaskStatus.Completed, priority: TaskPriority.High, dueDate: '2024-06-20T00:00:00Z', assigneeId: 'sample-staff-2', projectId: 'sample-proj-4', isSample: true },
    { id: 'sample-task-11', title: 'Drywall and paint', description: '', status: TaskStatus.Completed, priority: TaskPriority.Medium, dueDate: '2024-07-05T00:00:00Z', assigneeId: 'sample-staff-3', projectId: 'sample-proj-4', isSample: true },
];

export const sampleCosts: CostItem[] = [
    // Project 1 Costs
    { id: 'sample-cost-1', projectId: 'sample-proj-1', description: 'Hardwood for cabinets', amount: 7800, type: 'material', date: '2024-08-12T00:00:00Z', isSample: true },
    { id: 'sample-cost-2', projectId: 'sample-proj-1', description: 'Cabinet Hardware', amount: 650, type: 'material', date: '2024-08-18T00:00:00Z', isSample: true },
    { id: 'sample-cost-3', projectId: 'sample-proj-1', description: 'Olivia - Labor (40 hours)', amount: 2800, type: 'labor', date: '2024-08-20T00:00:00Z', isSample: true },
    { id: 'sample-cost-4', projectId: 'sample-proj-1', description: 'Ben - Labor (30 hours)', amount: 1050, type: 'labor', date: '2024-08-20T00:00:00Z', isSample: true },
    
    // Project 2 Costs
    { id: 'sample-cost-5', projectId: 'sample-proj-2', description: 'Reclaimed Oak order', amount: 3900, type: 'material', date: '2024-08-22T00:00:00Z', isSample: true },
    { id: 'sample-cost-6', projectId: 'sample-proj-2', description: 'Olivia - Labor (16 hours)', amount: 1120, type: 'labor', date: '2024-08-25T00:00:00Z', isSample: true },

    // Project 4 Costs
    { id: 'sample-cost-7', projectId: 'sample-proj-4', description: 'Lumber for framing', amount: 3200, type: 'material', date: '2024-06-05T00:00:00Z', isSample: true },
    { id: 'sample-cost-8', projectId: 'sample-proj-4', description: 'Drywall and supplies', amount: 1500, type: 'material', date: '2024-06-25T00:00:00Z', isSample: true },
    { id: 'sample-cost-9', projectId: 'sample-proj-4', description: 'Total Labor Costs', amount: 14000, type: 'labor', date: '2024-07-10T00:00:00Z', isSample: true },
];