import { Button, Form, Modal } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../Contexts/BudgetContext";

export default function AddBudgetModal({ show, handleClose }) {
    const nameRef = useRef();
    const maxRef = useRef();
    const { addBudget } = useBudgets();
    function handleSubmit(e) {
        e.preventDefault();
        addBudget(
            {
                name: nameRef.current.value,
                max: parseFloat(maxRef.current.value),
            })
        handleClose();
    }

    return (
        <Modal dir="rtl" show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit} >
                <Modal.Header closeButton >
                    <Modal.Title className="NewBudgetTitle">
                        תקציב חדש
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>שם התקציב</Form.Label>
                        <Form.Control ref={nameRef} type="text" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="max">
                        <Form.Label>סכום המסגרת</Form.Label>
                        <Form.Control
                            placeholder="₪"
                            ref={maxRef}
                            type="number"
                            required min={0}
                            step={0.01} />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="info" type="submit">הוספת תקציב</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}
