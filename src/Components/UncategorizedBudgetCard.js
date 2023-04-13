import React from 'react'
import BudgetCard from './BudgetCard'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../Contexts/BudgetContext';

export default function UncategorizedBudgetCard(props) {

    const { getBudgetExpenses } = useBudgets();
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID)
        .reduce((total, expense) => total + expense.amount, 0);
    if (amount === 0) return null;
    return (
        <BudgetCard className='Card' amount={amount} name="אחר" gray {...props} />
    )

}
