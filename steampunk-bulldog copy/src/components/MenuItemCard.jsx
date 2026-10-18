import {useState} from "react";
import {Button, Card, CardBody, FormGroup, Input, Label} from "reactstrap";

export default function MenuItemCard({ item, onAdd }) {
    const [quantity, setQuantity] = useState(1);

    function updateQuantity(event) {
        const value = Number(event.target.value);
        setQuantity(math.min(5, Math.max(1, value || 1)));
    }

    return (
        <Card className = "h-100">
            <CardBody className="d-flex flex-column">
                <p className="eyebrow">{item.category}</p>
                <h2 className="h5">{item.name}</h2>
                <p className="flex-grow-1">{item.description}</p>
                <p className="fw-bold">{item.price.toFixed(2)}</p>
                <FormGroup>
                    <Label htmlFor={`quantity-${item.id}`}>Quantity</Label>
                    <Input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="1"
                        max="5"
                        value={quantity}
                        onChange={updateQuantity}
                        />
                </FormGroup>
                <Button color="primary" onClick={() => onAdd(item, quantity)}>
                    Add to Cart
                </Button>
            </CardBody>
        </Card>
    );
}