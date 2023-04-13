import { Button, Modal, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../Contexts/BudgetContext";
import { currencyFormatter } from "../Utils";

export default function ViewExpensesModal({ budgetId, handleClose }) {

    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();

    const expenses = getBudgetExpenses(budgetId);
    const budget = UNCATEGORIZED_BUDGET_ID === budgetId
        ? { name: "אחר", id: UNCATEGORIZED_BUDGET_ID }
        : budgets.find(b => b.id === budgetId);

    return (
        <Modal dir='rtl' show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="ViewExpensesTitle">
                    <Stack direction="horizontal" gap='2'>
                        <div>הוצאות - {budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <Button
                                className="DeleteBudgetBtn"
                                onClick={() => {
                                    deleteBudget(budget)
                                    handleClose()
                                }}
                                variant="outline-danger"
                            >
                                מחיקה
                            </Button>
                        )}
                        &nbsp;
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="ViewExpenseBody">
                <Stack direction="vertical" gap='3'>
                    {expenses.map(expense => (
                        <Stack direction="horizontal" gap='4' key={expense.id}>
                            <div className="me-auto fs-5">{expense.description}</div>
                            <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
                            <Button className="DeleteExpenseBtn" onClick={() => deleteExpense(expense)} size="sm" variant="outline-danger">❌</Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    )

}
