
import React from 'react';
import { Task, TaskStatus } from '../../types';
import { getWeekDays, isSameDay, isToday, shortDayFormat } from '../../utils/dateUtils';
import { TaskWithProject } from '../pages/Schedule';
import ScheduleTask from './ScheduleTask';

interface WeekViewProps {
    currentDate: Date;
    tasks: TaskWithProject[];
    onSelectTask: (task: Task) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ currentDate, tasks, onSelectTask }) => {
    const days = getWeekDays(currentDate);

    return (
        <div className="grid grid-cols-7 h-full divide-x divide-prestige-gray">
            {days.map((day, index) => {
                const tasksForDay = tasks.filter(task => isSameDay(new Date(task.dueDate), day));
                return (
                    <div key={index} className="flex flex-col">
                        <div className="text-center py-2 border-b border-prestige-gray">
                            <p className="font-bold text-sm text-prestige-text">{shortDayFormat.format(day)}</p>
                            <p className={`text-lg font-bold mt-1 w-8 h-8 flex items-center justify-center rounded-full mx-auto ${isToday(day) ? 'bg-prestige-teal text-prestige-charcoal' : 'text-prestige-charcoal'}`}>
                                {day.getDate()}
                            </p>
                        </div>
                        <div className="p-2 space-y-2 flex-grow overflow-y-auto bg-prestige-light-gray/30">
                            {tasksForDay.map(task => (
                                <ScheduleTask key={task.id} task={task} onClick={() => onSelectTask(task)} />
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default WeekView;
