import { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import AddBudgetModal from "./Components/AddBudgetModal";
import AddExpenseModal from "./Components/AddExpenseModal";
import BudgetCard from "./Components/BudgetCard";
import TotalBudgetCard from "./Components/TotalBudgetCard";
import UncategorizedBudgetCard from "./Components/UncategorizedBudgetCard";
import ViewExpensesModal from "./Components/ViewExpensesModal";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./Contexts/BudgetContext";
import image from "../src/Assets/Images/favicon.jpg";

function App() {

    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
    const { budgets, getBudgetExpenses } = useBudgets();

    function openAddExpenseModal(budgetId) {
        setShowAddExpenseModal(true);
        setAddExpenseModalBudgetId(budgetId);
    }

    return (
        <>
            <Container className="my-4">
                <Stack id="HeaderStack" direction="horizontal" gap='2' className="mb=4">
                    <Button
                        className="AddBudgetBtn"
                        variant="info"
                        onClick={() => setShowAddBudgetModal(true)}
                    >
                         תקציב חדש
                    </Button>
                    <Button
                        variant="outline-light"
                        onClick={openAddExpenseModal}
                    >
                         הוצאה חדשה
                    </Button>
                    <img src={image}></img>
                </Stack>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill,minimax(300px, 1fr))",
                        gap: "1.5rem",
                        alignItems: "flex-start",
                        
                    }}
                    className="ContentDiv"
                >
                    {budgets.map(budget => {
                        const amount = getBudgetExpenses(budget.id)
                            .reduce((total, expense) => total + expense.amount, 0);
                        return (
                            <BudgetCard
                                key={budget.id}
                                name={budget.name}
                                amount={amount}
                                max={budget.max}
                                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                                onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
                            />
                        )
                    })}
                    <UncategorizedBudgetCard
                        onAddExpenseClick={openAddExpenseModal}
                        onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)} />
                    <TotalBudgetCard />
                </div>
            </Container>
            <AddBudgetModal
                show={showAddBudgetModal}
                handleClose={() => setShowAddBudgetModal(false)}
            />
            <AddExpenseModal
                show={showAddExpenseModal}
                defaultBudgetId={addExpenseModalBudgetId}
                handleClose={() => setShowAddExpenseModal(false)}
            />
            <ViewExpensesModal
                budgetId={viewExpensesModalBudgetId}
                handleClose={() => setViewExpensesModalBudgetId()}
            />
        </>
    )
}

export default App;