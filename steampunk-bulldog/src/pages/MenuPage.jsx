import { useContext, useState } from 'react';
import { Col, Container, Input, Label, Row } from 'reactstrap';
import MenuItemCard from '../components/MenuItemCard.jsx';
import menuData from '../data/menuData.js';
import { CartContext } from '../App.jsx';

export default function MenuPage() {
    const [category, setCategory] = useState('All');
    const { addToCart } = useContext(CartContext);

    const visibleItems =
        category === 'All'
            ? menuData
            : menuData.filter((item) => item.category === category);

    return (
        <Container className="page-content">
            <section className="content-panel">
                <p className="eyebrow">Fresh from the steam kitchen</p>
                <h1>Our Menu</h1>

                <Label htmlFor="category-filter">Filter by category</Label>
                <Input
                    id="category-filter"
                    type="select"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="mb-4"
                >
                    {['All', 'Breakfast', 'Lunch', 'Dinner'].map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </Input>

                <Row className="g-4">
                    {visibleItems.map((item) => (
                        <Col key={item.id} sm="6" lg="4">
                            <MenuItemCard item={item} onAdd={addToCart} />
                        </Col>
                    ))}
                </Row>
            </section>
        </Container>
    );
};
