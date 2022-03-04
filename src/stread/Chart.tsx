import { useState } from "react";
import { Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import "./chart.css";
import ChartFormula from "./chartFormula/ChartFormula";
import ChartPic from "./chartPic/ChartPic";

const Chart = () => {
    return (
        <>
            <div className="body">
                <Row>
                    <Col style={{ backgroundColor: "#e6e4e4" }}>
                        <ChartFormula />
                    </Col>
                    <Col style={{ overflow: "hidden" }}>
                        <ChartPic />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default connect(null, null)(Chart);
