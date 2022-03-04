import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect, RootStateOrAny } from "react-redux";
import { actions } from "../../actions and const/actions";
import "./chartFormula.css";

let useClickOutside = (handler: any) => {
    let domNode = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let maybeHandler = (e: MouseEvent) => {
            if (!domNode!.current!.contains(e.target as Node)) {
                handler();
            }
        };
        document.addEventListener("mousedown", maybeHandler);
        return () => {
            document.removeEventListener("mousedown", maybeHandler);
        };
    });
    return domNode;
};

type PropsTypeInputsChart = {
    title: string;
    callback: (n: string) => void;
    value: string;
    onClick?: () => void;
};

type PropsType = {
    setCounterYear: (year: string) => void;
    countYear: string;
    setPeriodicity: (per: string) => void;
    periodicity: string;
    setInitialAmount: (amount: string) => void;
    initialAmount: string;
    setReplenishment: (rep: string) => void;
    replenishment: string;
    setInterestAccruals: (inAc: string) => void;
    interestAccruals: string;
};

const ChartFormula = (props: PropsType) => {
    const [initialAmount, setInitialAmount] = useState<string>("");

    const [isReplenishmentDropmenuOpen, setIsReplenishmentDropmenuOpen] = useState<boolean>(false);

    const domNodePeriodicity = useClickOutside(() => {
        setIsReplenishmentDropmenuOpen(false);
    });

    const takeLimitedNumber = (numberSt: string, value: string, limitNumber: number) => {
        // if ((numberSt + value).toString().length <= limitNumber) {
        if ((numberSt + "1").toString().length <= limitNumber) {
            return numberSt;
        } else {
            return value;
        }
    };

    // takeLimitedNumber(takenumber,value,3)

    const takeNumber = (v: string, value: string) => {
        if (isNaN(+v) != true) {
            // if ((v + value).toString().length <= 3) {
            return v;
            // } else {
            //     return value;
            // }
        } else {
            return value;
        }
    };

    return (
        <>
            <div className="body-inputsContainer" style={{ marginTop: "50px" }}>
                <Row className="inputRowContainer">
                    <Col md={{ offset: 1, span: 7 }}>
                        <p className="inputsChart1" style={{ fontSize: "26px" }}>
                            <div className="inputContainer">
                                <p className="inputContainer-inputTitle">initial amount</p>
                                <span className="required"></span>
                                <br />
                                <input
                                    autoComplete="off"
                                    type="text"
                                    name="your-name"
                                    value={props.initialAmount}
                                    onChange={(e) =>
                                        props.setInitialAmount(
                                            takeLimitedNumber(
                                                takeNumber(e.target.value, props.initialAmount),
                                                props.initialAmount,
                                                11
                                            )
                                        )
                                    }
                                    className="inputRowChart"
                                />
                            </div>
                        </p>
                    </Col>
                </Row>
                <Row className="inputRowContainer">
                    <Col md={{ offset: 1, span: 5 }}>
                        <div className="">
                            <p className="inputsChart1" style={{ fontSize: "26px" }}>
                                <div className="inputContainer">
                                    <p className="inputContainer-inputTitle">replenishment</p>
                                    <span className="required"></span>
                                    <br />
                                    <input
                                        autoComplete="off"
                                        type="text"
                                        value={props.replenishment}
                                        className="inputRowChart"
                                        onChange={(e) =>
                                            props.setReplenishment(
                                                takeLimitedNumber(
                                                    takeNumber(e.target.value, props.replenishment),
                                                    props.replenishment,
                                                    8
                                                )
                                            )
                                        }
                                    />
                                </div>
                            </p>
                        </div>
                    </Col>
                    <Col md={{ offset: 0, span: 5 }}>
                        <div className="">
                            <p className="inputsChart1" style={{ fontSize: "26px" }}>
                                <div className="inputContainer">
                                    <p className="inputContainer-inputTitle">Periodicity</p>
                                    <span className="required"></span>
                                    <br />
                                    <div className="" ref={domNodePeriodicity}>
                                        <input
                                            autoComplete="off"
                                            type="text"
                                            value={props.periodicity}
                                            className="inputRowChart"
                                            onClick={() => setIsReplenishmentDropmenuOpen(!isReplenishmentDropmenuOpen)}
                                            onChange={(e) => {
                                                setInitialAmount(takeNumber(e.target.value, "3"));
                                            }}
                                        />
                                        {isReplenishmentDropmenuOpen ? (
                                            <>
                                                <div
                                                    className="replenishmentDropmenuOpen-dropItem"
                                                    onClick={() => {
                                                        props.setPeriodicity("EVERY YEAR");
                                                        setIsReplenishmentDropmenuOpen(false);
                                                    }}
                                                >
                                                    EVERY YEAR
                                                </div>
                                                <div
                                                    className="replenishmentDropmenuOpen-dropItem"
                                                    onClick={() => {
                                                        props.setPeriodicity("EVERY MONTH"); 
                                                        setIsReplenishmentDropmenuOpen(false);
                                                    }}
                                                >
                                                    EVERY MONTH
                                                </div>
                                            </>
                                        ) : (
                                            <div className=""></div>
                                        )}
                                    </div>
                                </div>
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row className="inputRowContainer">
                    <Col md={{ offset: 1, span: 5 }}>
                        <div className="">
                            <p className="inputsChart1" style={{ fontSize: "26px" }}>
                                <div className="inputContainer">
                                    <p className="inputContainer-inputTitle">Interest accruals</p>
                                    <span className="required"></span>
                                    <br />
                                    <input
                                        autoComplete="off"
                                        type="text"
                                        value={props.interestAccruals}
                                        className="inputRowChart"
                                        onChange={(e) =>
                                            props.setInterestAccruals(
                                                takeLimitedNumber(
                                                    takeNumber(e.target.value, props.interestAccruals),
                                                    props.interestAccruals,
                                                    4
                                                )
                                            )
                                        }
                                    />
                                </div>
                            </p>
                        </div>
                    </Col>
                    <Col md={{ offset: 0, span: 5 }}>
                        <p className="inputsChart" style={{ fontSize: "48px", textAlign: "center", left: "40%" }}>
                            YEAR
                        </p>
                    </Col>
                </Row>
                <Row className="inputRowContainer">
                    <Col md={{ offset: 1, span: 10 }}>
                        <div className="">
                            <p className="inputsChart1" style={{ fontSize: "26px" }}>
                                <div className="inputContainer">
                                    <p className="inputContainer-inputTitle">Number of years</p>
                                    <span className="required"></span>
                                    <br />
                                    <input
                                        autoComplete="off"
                                        type="text"
                                        value={props.countYear}
                                        className="inputRowChart"
                                        onChange={(e) => {
                                            props.setCounterYear(
                                                takeLimitedNumber(
                                                    takeNumber(e.target.value, props.countYear),
                                                    props.countYear,
                                                    3
                                                )
                                            );
                                        }}
                                    />
                                </div>
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};

const mapStateToProps = (state: RootStateOrAny) => ({
    countYear: state.generalState.countYear,
    periodicity: state.generalState.periodicity,
    initialAmount: state.generalState.initialAmount,
    replenishment: state.generalState.replenishment,
    interestAccruals: state.generalState.interestAccruals,
});

export default connect(mapStateToProps, {
    setCounterYear: actions.setCounterYear,
    setPeriodicity: actions.setPeriodicity,
    setInitialAmount: actions.setInitialAmount,
    setReplenishment: actions.setReplenishment,
    setInterestAccruals: actions.setInterestAccruals,
})(ChartFormula);
