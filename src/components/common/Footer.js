import React from 'react';
import {Row, Col} from "reactstrap";

const Footer = () => {
    const thisYear = () => {
        const year = new Date().getFullYear();
        return year
    };

    return (
        <footer>
            <Row>
                <Col>
                    <p>
                        Copyright &copy; <span>{thisYear()}</span>
                        
                    </p>
                </Col>
            </Row>
        </footer>
    )
};

export default Footer;