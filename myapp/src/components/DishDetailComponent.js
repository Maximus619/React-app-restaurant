import React, { useState } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, ModalFooter, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Field } from 'react-redux-form'

const required = value => (value || typeof value === 'number' ? undefined : 'Required')
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
export const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength3 = minLength(3)
const alphaNumeric = value => value && /[^a-zA-Z0-9 ]/i.test(value)
const renderField = ({
    input,
    label,
    type,
    error, 
    touched, 
    warning
}) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)
    function RenderDish({ dish }) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    function RenderComments({ comments }) {
        const [modal, setModal] = useState(false);
        const toggle = () => setModal(!modal);
        if (comments != null)
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map((comment) => {
                            return (
                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            )
                        })}
                    </ul>
                    <Button outline onClick={toggle}><span className="fa fa-sign-in"></span>Submit Comment</Button>
                    <Modal isOpen={modal} toggle={toggle} className="comment">
                        <ModalHeader toggle={toggle}>Comments</ModalHeader>
                        <ModalBody>
                            <div>
                                <label>Rating</label>
                                <div>
                                    <Field name="rating" component="select">
                                        <option />
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                    </Field>
                                </div>
                            </div>
                            <form>
                                <Field
                                    name="author"
                                    type="text"
                                    component={renderField}
                                    label="Your Name"
                                    validate={[required, maxLength15, minLength3]}
                                    warn={alphaNumeric}
                                />
                            </form>
                            <div>
                                <label>Comment</label>
                                <div>
                                    <Field name="comment" component="textarea" />
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={toggle}>Submit</Button>
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            );
        else
            return (
                <div></div>
            );
    }
    const DishDetail = (props) => {
        if (props != null)
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.comments} />
                        </div>
                    </div>
                </div>
            );
    }

    export default DishDetail;