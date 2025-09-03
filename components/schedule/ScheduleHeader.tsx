
import React from 'react';
// FIX: ChevronLeftIcon is now correctly imported from the centralized Icons file.
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/Icons.tsx';
import { ScheduleView } from '../pages/Schedule';
import { monthYearFormat } from '../../utils/dateUtils';

interface ScheduleHeaderProps {
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
    view: ScheduleView;
    setView: (view: ScheduleView) => void;
}

const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({ currentDate, setCurrentDate, view, setView }) => {
    const handlePrev = () => {
        const newDate = new Date(currentDate);
        if (view === 'month') {
            newDate.setMonth(newDate.getMonth() - 1);
        } else {
            newDate.setDate(newDate.getDate() - 7);
        }
        setCurrentDate(newDate);
    };
    
    const handleNext = () => {
        const newDate = new Date(currentDate);
        if (view === 'month') {
            newDate.setMonth(newDate.getMonth() + 1);
        } else {
            newDate.setDate(newDate.getDate() + 7);
        }
        setCurrentDate(newDate);
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    const ViewButton: React.FC<{ viewName: ScheduleView, children: React.ReactNode }> = ({ viewName, children }) => (
        <button
            onClick={() => setView(viewName)}
            className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${
                view === viewName ? 'bg-prestige-charcoal text-white' : 'text-prestige-text hover:bg-prestige-gray'
            }`}
        >
            {children}
        </button>
    );

    return (
        <div className="p-4 border-b border-prestige-gray flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
                <h2 className="text-xl font-bold text-prestige-charcoal min-w-[180px]">
                    {monthYearFormat.format(currentDate)}
                </h2>
                <div className="flex items-center space-x-1">
                    <button onClick={handlePrev} className="p-2 rounded-full hover:bg-prestige-gray transition-colors"><ChevronLeftIcon className="w-5 h-5" /></button>
                    <button onClick={handleNext} className="p-2 rounded-full hover:bg-prestige-gray transition-colors"><ChevronRightIcon className="w-5 h-5" /></button>
                </div>
                 <button onClick={handleToday} className="px-3 py-1.5 text-sm font-semibold border border-prestige-gray rounded-md text-prestige-charcoal hover:bg-prestige-gray transition-colors">
                    Today
                </button>
            </div>
            <div className="flex items-center space-x-1 bg-prestige-light-gray p-1 rounded-lg">
                <ViewButton viewName="month">Month</ViewButton>
                <ViewButton viewName="week">Week</ViewButton>
                <ViewButton viewName="team">Team</ViewButton>
            </div>
        </div>
    );
};

export default ScheduleHeader;
