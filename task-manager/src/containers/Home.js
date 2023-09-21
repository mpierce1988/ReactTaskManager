import { Col, Row } from "react-bootstrap";


export function Home() {
    return (
        <Row className='justify-content-center'>
            <Col xs={12} md={8}>
            <h1 className='display-1'>Welcome to Task Manager!</h1>
            <p className='lead'>Welcome to React Task Manager, a React-based task management application designed to showcase my skills in web development.</p>
            <p> As a product of test-driven design, this application will help you manage your tasks through intuitive Create, Read, Update, and Delete (CRUD) functionalities. You can register as a new user or log in to unlock a tailored task management experience. Get started today and see how React can power robust and dynamic user interfaces!</p>
            </Col>
        </Row>
    );
}