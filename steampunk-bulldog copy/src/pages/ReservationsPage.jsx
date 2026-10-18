import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    Button, Col, Container, Form, FormFeedback, FormGroup,
    Input, Label, Row
} from "reactstrap";
import * as yup from "yup";

const ReservationsPage = () => {
    const schema = yup.object().shape({
        name: yup.string().required('Name is required').max(20, 'Max 20 characters'),
        email: yup.string().email('Invalid email').required('Email is required'),
        partySize: yup.number().typeError('Required').min(1).max(8).required(),
        date: yup.string().required('Date is required'),
        time: yup.string().required('Time is required'),
        seating: yup.string().required('Pick a seating preference'),
        dietaryNotes: yup.string().max(30, 'Max 30 characters')
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        alert('Reservation Confirmed for ' + data.name);
        reset();
    };

    return (
        <Container className="py-5" style={{maxWidth: '600px'}}>
            <div className="bg-light p-4 p-md-5 rounded-4 shadow-sm">
                <h1 className="mb-4">Make a Reservation</h1>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Name</Label>
                                <Input {...register('name')} invalid={!!errors.name} />
                                <FormFeedback>{errors.name?.message}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input {...register('email')} invalid={!!errors.email} />
                                <FormFeedback>{errors.email?.message}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label>Party Size</Label>
                        <Input type="select" {...register('partySize')} invalid={!!errors.partySize}>
                            <option value="">Select party size</option>
                            {[...Array(8)].map((_, i) => (<option key={i+1} value={i+1}>{i+1}</option>))}
                        </Input>
                        <FormFeedback>{errors.partySize?.message}</FormFeedback>
                    </FormGroup>
                    <Row>
                        <Col md={6}>
                            <FormGroup><Label>Date</Label><Input type="date" {...register('date')} invalid={!!errors.date} /></FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup><Label>Time</Label><Input type="time" {...register('time')} invalid={!!errors.time} /></FormGroup>
                        </Col>
                    </Row>
                    <FormGroup tag="fieldset">
                        <Label className="fw-bold">Seating Preference</Label>
                        {['Indoor', 'Outdoor', 'Airship Deck'].map(opt => (
                            <FormGroup check key={opt}>
                                <Input type="radio" value={opt} {...register('seating')} invalid={!!errors.seating} />
                                <Label check>{opt}</Label>
                            </FormGroup>
                        ))}
                        {errors.seating && <div className="text-danger small">{errors.seating.message}</div>}
                    </FormGroup>
                    <FormGroup>
                        <Label>Dietary Notes</Label>
                        <Input type="textarea" {...register('dietaryNotes')} invalid={!!errors.dietaryNotes} />
                        <FormFeedback>{errors.dietaryNotes?.message}</FormFeedback>
                    </FormGroup>
                    <Button color="primary" size="lg" className="w-100">Reserve Now</Button>
                </Form>
            </div>
        </Container>
    );
};

export default ReservationsPage;