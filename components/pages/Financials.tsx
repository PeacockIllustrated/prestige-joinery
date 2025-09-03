
import React from 'react';
import Placeholder from '../ui/Placeholder';
import { DollarSignIcon } from '../icons/Icons';

const Financials: React.FC = () => {
  return (
    <Placeholder 
      icon={<DollarSignIcon />}
      title="Financials"
      message="Generate professional quotes and invoices, track project expenses, and manage budgets all in one place."
    />
  );
};

export default Financials;