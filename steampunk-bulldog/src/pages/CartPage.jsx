import {
    Button, Col, Container, Form, FormFeedback, FormGroup,
    Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table
} from "reactstrap";
import {useContext, useState} from "react";
import {CartContext} from "../App.jsx";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";



const CartPage = () => {
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [showCancel, setShowCancel] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const handleFinalize = () => {
        setShowThankYou(true);
        clearCart();
    };

    if (cart.length === 0) return (
        <Container className="py-5 text-center">
            <h1>Your cart is empty.</h1>
            <Button color="primary" className="mt-3" tag={Link} to="/menu">View Menu</Button>
        </Container>
    );

    return (
        <Container className="py-5">
            <h1 className="mb-4">Review Your Order</h1>
            <Table responsive striped>
                <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Line Total</th></tr></thead>
                <tbody>
                {cart.map(item => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div className="text-end mt-4">
                <p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
                <p>Tax (8%): <strong>${tax.toFixed(2)}</strong></p>
                <h3 className="text-primary">Total: ${total.toFixed(2)}</h3>
                <div className="mt-4 gap-2 d-flex justify-content-end">
                    <Button color="secondary" onClick={() => setShowCancel(true)}>Cancel Order</Button>
                    <Button color="primary" onClick={handleFinalize}>Submit Order</Button>
                </div>
            </div>

            <Modal isOpen={showCancel} toggle={() => setShowCancel(false)}>
                <ModalHeader>Cancel Order</ModalHeader>
                <ModalBody>Are you sure you want to cancel your order?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => { clearCart(); setShowCancel(false); setShowThankYou(true); }}>Yes, Cancel</Button>
                    <Button color="secondary" onClick={() => setShowCancel(false)}>No</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={showThankYou} toggle={() => navigate('/menu')}>
                <ModalHeader>Order Status</ModalHeader>
                <ModalBody>Thank you for your visit to Steampunk Bulldog!</ModalBody>
                <ModalFooter><Button color="primary" onClick={() => navigate('/menu')}>Back to Menu</Button></ModalFooter>
            </Modal>
        </Container>
    );
};

export default CartPage;