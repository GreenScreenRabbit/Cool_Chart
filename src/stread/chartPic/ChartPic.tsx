import { useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect, RootStateOrAny } from "react-redux";
import "./chartPic.css";

type PropsType = {
    countYear: string;
    periodicity: string;
    initialAmount: string;
    replenishment: string;
    interestAccruals: string;
};

const ChartPic = (props: PropsType) => {
    const sticks: JSX.Element[] = [];

    const heightOFSticksContainer = (800 / 100) * 80;

    const popUpRef = useRef<HTMLDivElement>(null);

    const [isShowDropPopMenu, setIsShowDropPopMenu] = useState(false);
    const [indexShowDropPopMenu, setIndexShowDropPopMenu] = useState<number>();

    let maxCapitalAtMouth: number = 0;

    const showPropMenu = (i: number | undefined, isShow: boolean) => {
        if (i != undefined) setIsShowDropPopMenu(isShow);
        setIndexShowDropPopMenu(i);
    };

    const takePeriodicityYear = (): number => {
        if (props.periodicity == "EVERY MONTH") {
            return +props.replenishment * 12;
        } else {
            return +props.replenishment;
        }
    };

    const periodicityYear = takePeriodicityYear();

    const calculationDefaultMoney = (periodicityYear: number, countYear: string, initialAmount: string) => {
        const defaultMoney: number[] = [];

        defaultMoney.push(+initialAmount + periodicityYear);

        for (var i = 0; i < +countYear - 1; i++) {
            defaultMoney.push(defaultMoney[i] + periodicityYear);
        }
        console.log(`defaultMoney = ${defaultMoney}`);

        return defaultMoney;
    };

    const moneyWithoutPercent = calculationDefaultMoney(periodicityYear, props.countYear, props.initialAmount);

    const calculationCompoundInterest = () => {
        const percentMoney: number[] = [];

        percentMoney.push(((+props.initialAmount + periodicityYear) / 100) * (100 + +props.interestAccruals));

        for (var i = 0; i < +props.countYear - 1; i++) {
            percentMoney.push(+(+((+percentMoney[i] + periodicityYear) / 100) * (100 + +props.interestAccruals)));
        }

        const removeСommas = (money: number[]) => {
            return money.map((num) => {
                return +num.toFixed(10);
            });
        };

        const money = removeСommas(percentMoney);

        return money;
    };

    const moneyWithPercent = calculationCompoundInterest();

    const findMaxCapitalAtMouth = (money: number[]) => {
        maxCapitalAtMouth = Math.max(...money);
    };
    findMaxCapitalAtMouth(moneyWithPercent);

    const takeOneProcentOfMaxPrice = (price: number) => {
        return price / maxCapitalAtMouth;
    };

    const oneProcMaxMoney = takeOneProcentOfMaxPrice(maxCapitalAtMouth);

    console.log(`moneyWithPercent = ${moneyWithPercent}`);

    console.log(`maxCapitalAtMouth = ${maxCapitalAtMouth}`);

    const createSticks = (yearCount: number[], isMoneyWithPercent: boolean) => {
        const stck: JSX.Element[] = [];

        moneyWithoutPercent.map((num, index) => {
            const priceStickProcent = moneyWithPercent[index];

            const heightForNonProcentStick = +num / (maxCapitalAtMouth / 100);
            const heightCorrectWithProcent = +priceStickProcent / (maxCapitalAtMouth / 100);

            const heightForProcentStick = heightCorrectWithProcent - heightForNonProcentStick;

            const calculationWidth = () => {
                const widthContainer = 480;

                return widthContainer / +props.countYear;

                // return widthContainer / +props.countYear;
            };

            const calculationTop = () => {
                if (100 - (heightForProcentStick + heightForNonProcentStick) > 99.9) {
                    return 99.8;
                } else {
                    return 100 - (heightForProcentStick + heightForNonProcentStick);
                }
            };

            const newWidth = calculationWidth();
            const newTop = calculationTop()


            console.log(`newWidth = ${newWidth}%`);

            console.log(`heightForProcentStick = ${heightForNonProcentStick}`);

            stck.push(
                <>
                    <div
                        className=""
                        style={{
                            // top: 100 - (heightForProcentStick + heightForNonProcentStick) + "%",
                            top: newTop + "%",
                            height: "100%",
                            position: "relative",
                        }}
                    >
                        {isShowDropPopMenu == true && indexShowDropPopMenu == index ? (
                            <div
                                ref={popUpRef}
                                className="stickContainer-stick-fropPop"
                                onMouseLeave={() => {
                                    showPropMenu(index, false);
                                }}
                            >
                                <p>body = {moneyWithoutPercent[index].toFixed(2)}</p>
                                <p>percent = {(priceStickProcent - moneyWithoutPercent[index]).toFixed(2)}</p>
                                <p>total = {priceStickProcent.toFixed(2)}</p>
                            </div>
                        ) : (
                            <div className=""></div>
                        )}
                        <div
                            className="stickContainer-stick"
                            onMouseEnter={() => {
                                showPropMenu(indexShowDropPopMenu, false);
                                showPropMenu(index, true);
                            }}
                            onMouseLeave={() => {
                                showPropMenu(index, false);
                            }}
                            style={{
                                flexBasis: "5%",
                                width: `${newWidth}px`,

                                backgroundColor: "green",
                                height: heightForProcentStick + "%",
                            }}
                        ></div>

                        <div
                            className="stickContainer-stick"
                            onMouseEnter={(e) => {
                                showPropMenu(indexShowDropPopMenu, false);
                                showPropMenu(index, true);
                            }}
                            onMouseLeave={() => {
                                showPropMenu(index, false);
                            }}
                            style={{
                                flexBasis: "5%",
                                // width: "5px",
                                width: `${newWidth}px`,
                                backgroundColor: "blue",
                                height: heightForNonProcentStick + "%",
                            }}
                        ></div>
                    </div>
                </>
            );
        });

        return stck;
    };

    console.log(popUpRef.current?.getBoundingClientRect().left);
    // createSticks(props.countYear, true);
    const stck = createSticks(moneyWithPercent, true);

    return (
        <div className="body-container">
            <div className="price-body">
                <div className="price-text">PRICE</div>
            </div>
            <div style={{ height: "100%", width: "100%", position: "relative" }}>
                <Row style={{ height: "100%", width: "100%" }}>
                    <Col md={{ offset: 1, span: 10 }} style={{ position: "relative" }}>
                        <div className="stickContainer">{stck.map((stick) => stick)}</div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootStateOrAny) => ({
    countYear: state.generalState.countYear,
    periodicity: state.generalState.periodicity,
    initialAmount: state.generalState.initialAmount,
    replenishment: state.generalState.replenishment,
    interestAccruals: state.generalState.interestAccruals,
});

export default connect(mapStateToProps, {})(ChartPic);
