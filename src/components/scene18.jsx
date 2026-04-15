import { useState, useEffect } from "react";

import boostEmoji from "../assets/img/boost.png";
import easyEmoji from "../assets/img/easy.png";
import overweightBmiIcon from "../assets/img/overweight_bmi.png";
import errorIcon from "../assets/img/overweight_bmi.png";
import { motion } from "framer-motion";

const STAGE = 8;
const TOTAL_STAGES = 9;

const getWeightMessage = (currentKg, goalKg, minHealthy, maxHealthy) => {
    const diff = currentKg - goalKg;
    const pct = Math.round(Math.abs(diff) / currentKg * 100);

    // Goal is higher than current — need to gain weight
    if (diff < 0) {
        return {
            icon: boostEmoji,
            color: "#D5EFFA",
            title: `GET MOVING: gain ${pct}% of your weight`,
            message: "Even 5-minute workouts every day can help you keep fit and improve your sleep and energy levels.",
        };
    }

    // Goal weight is below healthy range
    if (goalKg < minHealthy) {
        return {
            icon: overweightBmiIcon,
            color: "#F6DEEE",
            title: "LOW WEIGHT ALERT!",
            message: `Rapidly losing a large percentage of one's weight can have adverse health effects. Your normal body weight is between ${minHealthy} kg and ${maxHealthy} kg`,
        };
    }

    // Small loss (<5%)
    if (pct <= 5) {
        return {
            icon: easyEmoji,
            color: "#E2F1D7",
            title: `EASY WIN: lose ${pct}% of your weight`,
            message: "Even 5-minute workouts every day can help you keep fit and improve your sleep and energy levels.",
        };
    }

    // Moderate loss (6–15%)
    if (pct <= 15) {
        return {
            icon: easyEmoji,
            color: "#FFE9C7",
            title: `REALISTIC GOAL: lose ${pct}% of your weight`,
            message: "Lower your risk of chronic health problems, such as heart disease and type 2 diabetes",
        };
    }

    // Significant loss (>15%)
    return {
        icon: boostEmoji,
        color: "#EAE0FF",
        title: `BOOST YOUR HEALTH: Lose ${pct}% of your weight`,
        message: "Studies show that losing 10% or more of your weight reduces the chances of having a heart attach and diabetes and decreases inflammation in blood vessels.",
    };
};

const Scene18 = ({ heightCm, weightKg, onNext }) => {
    const [goalWeight, setGoalWeight] = useState("");
    const [messageData, setMessageData] = useState(null);

    // Fire "shown" event on mount
    useEffect(() => {
        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "shown",
                stage: STAGE,
                totalStages: TOTAL_STAGES,
                totalSelects: 1,
                question: "What's your goal weight?",
            });
        }
    }, []);

    // Calculate healthy weight range from height
    const hm = (heightCm || 170) / 100;
    const minHealthy = Math.round(18.5 * hm * hm);
    const maxHealthy = Math.round(24.9 * hm * hm);

    const kgValue = parseFloat(goalWeight);
    const hasInput = !!goalWeight;
    const inRange = kgValue >= 20 && kgValue <= 200;
    const showError = hasInput && !inRange;
    const isValid = hasInput && inRange;

    const handleNext = () => {
        const kg = kgValue;
        if (!isValid) return;

        // If message not yet shown, calculate and display it
        if (!messageData) {
            const currentW = weightKg || 70;
            const data = getWeightMessage(currentW, kg, minHealthy, maxHealthy);
            setMessageData(data);

            // Fire "selected" event
            if (typeof window.ALPlayableAnalytics !== "undefined") {
                window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                    event: "selected",
                    stage: STAGE,
                    totalStages: TOTAL_STAGES,
                    totalSelects: 1,
                    question: "What's your goal weight?",
                    selected: [`${kg} kg`],
                });
            }
            return;
        }

        // Second click: proceed
        if (onNext) onNext(kg);
    };

    return (
        <motion.div className="flex flex-col items-center px-[50px] pt-[80px] pb-[80px] min-h-full bg-[#EAF4F6]" style={{ fontFamily: "'Open Sans', sans-serif" }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >

            {/* Title */}
            <h1 className="font-bold text-[72px] leading-[90px] text-center text-[#1f2933] mb-[60px] w-full"
                style={{ fontFamily: "'Open Sans', sans-serif" }}>
                What's your goal weight?
            </h1>

            {/* KG Badge */}
            <div className="flex items-center justify-center mb-[50px]">
                <div className="bg-[#4DB8C4] rounded-[34px] px-[70px] py-[22px]">
                    <span className="text-[36px] font-bold text-white"
                        style={{ fontFamily: "'Open Sans', sans-serif" }}>
                        KG
                    </span>
                </div>
            </div>

            {/* Goal Weight Input Container */}
            <div className="relative flex items-center w-full mb-[50px]">
                <input
                    type="number"
                    value={goalWeight}
                    onChange={(e) => {
                        setGoalWeight(e.target.value);
                        setMessageData(null);
                    }}
                    placeholder="-"
                    className="w-full h-[160px] bg-white rounded-[40px] border-[2px] border-[#d1d9e0] outline-none text-[72px] font-bold text-center text-[#1f2933] px-[120px]"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                />
                {/* Unit Text Overlay */}
                <span className="absolute right-[60px] text-[88px] font-bold text-[#a0aab5] pointer-events-none"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    kg
                </span>
            </div>

            {/* Validation Error */}
            {showError && (
                <div className="flex items-center justify-center gap-[18px] w-full mb-[30px]">
                    <img src={errorIcon} alt="" className="w-[56px] h-[56px]" />
                    <span
                        style={{
                            fontFamily: "'Open Sans', sans-serif",
                            fontWeight: 600,
                            fontSize: "37.2px",
                            lineHeight: "16.95px",
                            letterSpacing: "-2%",
                            color: "#DB2B42",
                            verticalAlign: "middle",
                        }}
                    >
                        Incorrect data entered
                    </span>
                </div>
            )}

            {/* Healthy Weight Range */}
            <div className="w-full mb-[50px] text-center">
                <p className="text-[#1f2933]"
                    style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: "44.6px",
                        lineHeight: "54.51px",
                        letterSpacing: "-0.02em",
                    }}>
                    Your healthy weight range:{" "}
                    <span className="text-[#4DB8C4]"
                        style={{
                            fontFamily: "'Open Sans', sans-serif",
                            fontWeight: 600,
                            fontSize: "44.6px",
                            lineHeight: "54.51px",
                            letterSpacing: "-0.02em",
                        }}>
                        {minHealthy} kg - {maxHealthy} kg
                    </span>
                </p>
            </div>

            {/* Message Card */}
            {messageData && (
                <div
                    className="w-[978px] rounded-[44px] p-[45px] mb-[50px] flex items-start gap-[30px]"
                    style={{
                        backgroundColor: messageData.color,
                        minHeight: "272px",
                        animation: "fadeSlideIn 0.4s ease-out",
                    }}
                >
                    <img src={messageData.icon} alt="icon" className="w-[56px] h-[56px] shrink-0 mt-[5px]" />
                    <div>
                        <p className="font-bold text-[42px] leading-[56px] text-[#1f2933] mb-[12px]"
                            style={{ fontFamily: "'Open Sans', sans-serif" }}>
                            {messageData.title}
                        </p>
                        <p className="font-normal text-[38px] leading-[52px] text-[#4a5568]"
                            style={{ fontFamily: "'Open Sans', sans-serif" }}>
                            {messageData.message}
                        </p>
                    </div>
                </div>
            )}

            {/* Next Button */}
            <div className="w-full">
                <button
                    onClick={handleNext}
                    className={`w-full py-[42px] rounded-full border-none text-[44px] font-bold transition-all duration-300 text-white ${isValid ? "bg-[#4DB8C4] cursor-pointer" : "bg-[#cccccc] cursor-default"}`}
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                    Next
                </button>
            </div>

            {/* Skip Button */}
            <button
                onClick={() => onNext && onNext(null)}
                className="mt-[40px] bg-transparent border-none cursor-pointer"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "44.6px",
                    lineHeight: "54.51px",
                    letterSpacing: "-0.02em",
                    color: "#515151",
                    textDecoration: "underline",
                    textDecorationColor: "#515151",
                    textDecorationStyle: "solid",
                    textUnderlineOffset: "auto",
                    textDecorationSkipInk: "auto",
                }}
            >
                I'm okay with my weight
            </button>

            {/* Animation */}
            <style>{`
                @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </motion.div>
    );
};

export default Scene18;
