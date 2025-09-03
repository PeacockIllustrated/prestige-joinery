import React, { useMemo, useState } from 'react';
import { useData } from '../../hooks/useData';
import { Project, ProjectStatus, CostItem } from '../../types';
import { DollarSignIcon, TrendingUpIcon, AlertTriangleIcon, PlusIcon } from '../icons/Icons';
import KPICard from '../financials/KPICard';
import LaborCostModal from '../financials/LaborCostModal';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

interface ProjectFinancials extends Project {
    materialCosts: number;
    laborCosts: number;
    totalCost: number;
    profit: number;
    margin: number;
}

const Financials: React.FC = () => {
  const { projects, costs } = useData();
  const [isLaborModalOpen, setIsLaborModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const formatCurrency = (amount?: number) => {
    if (typeof amount !== 'number') return '$0.00';
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const activeProjects = useMemo(() => 
    projects.filter(p => p.status !== ProjectStatus.Completed), 
    [projects]
  );
  
  const projectFinancials = useMemo((): ProjectFinancials[] => {
    return projects.map(project => {
        const projectCosts = costs.filter(c => c.projectId === project.id);
        const materialCosts = projectCosts.filter(c => c.type === 'material').reduce((acc, c) => acc + c.amount, 0);
        const laborCosts = projectCosts.filter(c => c.type === 'labor').reduce((acc, c) => acc + c.amount, 0);
        const totalCost = materialCosts + laborCosts;
        const quote = project.quoteAmount || 0;
        const profit = quote - totalCost;
        const margin = quote > 0 ? (profit / quote) * 100 : 0;

        return {
            ...project,
            materialCosts,
            laborCosts,
            totalCost,
            profit,
            margin,
        }
    })
  }, [projects, costs]);

  const financialSummary = useMemo(() => {
    const activeProjectIds = new Set(activeProjects.map(p => p.id));
    const activeFinancials = projectFinancials.filter(pf => activeProjectIds.has(pf.id));

    const summary = activeFinancials.reduce((acc, pf) => {
        acc.totalQuoted += pf.quoteAmount || 0;
        acc.totalCost += pf.totalCost;
        if (pf.totalCost > (pf.quoteAmount || 0) && (pf.quoteAmount || 0) > 0) {
            acc.projectsOverBudget += 1;
        }
        return acc;
    }, { totalQuoted: 0, totalCost: 0, projectsOverBudget: 0 });

    const totalProfit = summary.totalQuoted - summary.totalCost;
    const profitability = summary.totalQuoted > 0 ? (totalProfit / summary.totalQuoted) * 100 : 0;

    return { ...summary, profitability, totalProfit };
  }, [activeProjects, projectFinancials]);

  const handleOpenLaborModal = (project: Project) => {
    setSelectedProject(project);
    setIsLaborModalOpen(true);
  };
  
  const handleSaveLaborCost = async (costData: Omit<CostItem, 'id' | 'projectId' | 'type'>) => {
    if (!selectedProject) return;
    try {
        await addDoc(collection(db, 'costs'), {
            ...costData,
            projectId: selectedProject.id,
            type: 'labor',
        });
    } catch(error) {
        console.error("Error saving labor cost: ", error);
        alert("There was an error saving the labor cost.");
    } finally {
        setIsLaborModalOpen(false);
        setSelectedProject(null);
    }
  };


  return (
    <>
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold text-prestige-charcoal">Financial Overview</h1>
            <p className="text-prestige-text mt-1">Summary of all active projects.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Quoted"
          value={formatCurrency(financialSummary.totalQuoted)}
          icon={<DollarSignIcon />}
          colorClass="bg-blue-500"
        />
        <KPICard 
          title="Total Job Cost"
          value={formatCurrency(financialSummary.totalCost)}
          icon={<DollarSignIcon />}
          colorClass="bg-yellow-500"
        />
        <KPICard 
          title="Overall Profit"
          value={formatCurrency(financialSummary.totalProfit)}
          icon={<TrendingUpIcon />}
          colorClass={financialSummary.profitability >= 0 ? "bg-green-500" : "bg-red-500"}
        />
        <KPICard 
          title="Projects Over Budget"
          value={String(financialSummary.projectsOverBudget)}
          icon={<AlertTriangleIcon />}
          colorClass={financialSummary.projectsOverBudget > 0 ? "bg-red-500" : "bg-prestige-teal"}
        />
      </div>

      <div className="bg-white rounded-xl shadow-md border border-prestige-gray/50 overflow-hidden">
        <div className="p-4 border-b border-prestige-gray flex justify-between items-center">
          <h2 className="text-xl font-bold text-prestige-charcoal">Project Financial Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-prestige-light-gray/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-sm font-semibold text-prestige-charcoal">Project</th>
                <th scope="col" className="px-6 py-3 text-sm font-semibold text-prestige-charcoal">Quote Amount</th>
                <th scope="col" className="px-6 py-3 text-sm font-semibold text-prestige-charcoal">Material Costs</th>
                <th scope="col" className="px-6 py-3 text-sm font-semibold text-prestige-charcoal">Labor Costs</th>
                <th scope="col" className="px-6 py-3 text-sm font-semibold text-prestige-charcoal">Total Job Cost</th>
                <th scope="col" className="px-6 py-3 text-sm font-semibold text-prestige-charcoal">Profit / Loss</th>
                <th scope="col" className="px-6 py-3 text-sm font-semibold text-prestige-charcoal">Margin</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-prestige-gray">
              {projectFinancials.map(pf => (
                  <tr key={pf.id} className="hover:bg-prestige-light-gray/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-prestige-charcoal">{pf.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-prestige-text">{formatCurrency(pf.quoteAmount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-prestige-text">{formatCurrency(pf.materialCosts)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-prestige-text">{formatCurrency(pf.laborCosts)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-prestige-charcoal">{formatCurrency(pf.totalCost)}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${pf.profit < 0 ? 'text-red-600' : 'text-green-600'}`}>{formatCurrency(pf.profit)}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${pf.margin < 0 ? 'text-red-600' : 'text-green-600'}`}>{pf.margin.toFixed(1)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <button onClick={() => handleOpenLaborModal(pf)} className="text-prestige-teal hover:text-prestige-charcoal font-semibold flex items-center">
                        <PlusIcon className="w-4 h-4 mr-1"/> Log Labor
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {isLaborModalOpen && selectedProject && (
        <LaborCostModal 
            isOpen={isLaborModalOpen}
            onClose={() => setIsLaborModalOpen(false)}
            onSave={handleSaveLaborCost}
            project={selectedProject}
        />
    )}
    </>
  );
};

export default Financials;