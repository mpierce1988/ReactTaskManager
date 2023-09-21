import { Row, Col } from "react-bootstrap";

export function About(){
    const currentYear = new Date().getFullYear();
    return (
        <Row className='justify-content-center'>
            <Col xs={12} md={8}>
            <h1 className="display-1">Task Manager &copy; {currentYear}</h1>
            <p>Task Manager is a simple task management application built using React and Node.js.</p>
            </Col>
        </Row>
    );
}