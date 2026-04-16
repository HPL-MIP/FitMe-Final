import { useState, useEffect } from "react";

import normalBmiIcon from "../assets/img/normal_bmi.png";
import underweightBmiIcon from "../assets/img/underweight_bmi.png";
import overweightBmiIcon from "../assets/img/overweight_bmi.png";
import errorIcon from "../assets/img/overweight_bmi.png";
import { motion } from "framer-motion";

const STAGE = 7;
const TOTAL_STAGES = 8;

const getBMIData = (bmi) => {
    if (bmi < 18.5) return {
        category: "underweight",
        color: "#D8E7FD",
        icon: underweightBmiIcon,
        message: "You've got some work ahead, but it's wonderful that you're starting with this first step",
    };
    if (bmi < 25) return {
        category: "normal",
        color: "#E2F1D7",
        icon: normalBmiIcon,
        message: "Adding a little more sweat exercise can help reveal a fitter you!",
    };
    if (bmi < 30) return {
        category: "overweight",
        color: "#F6DEEE",
        icon: overweightBmiIcon,
        message: "A balanced diet and consistent exercise can help you achieve effective weight loss!",
    };
    return {
        category: "obese",
        color: "#F6DEEE",
        icon: overweightBmiIcon,
        message: "Small consistent steps can lead to big changes. Let's start your journey today!",
    };
};

const Scene17 = ({ heightCm, onNext, unit = "lbs" }) => {
    const isKg = unit === "kg";
    const [weight, setWeight] = useState("");
    const [bmiResult, setBmiResult] = useState(null);
    const [isTyping, setIsTyping] = useState(false);

    const handleFocus = () => setIsTyping(true);
    const handleBlur = () => setTimeout(() => setIsTyping(false), 400);

    // Fire "shown" event on mount
    useEffect(() => {
        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "shown",
                stage: STAGE,
                totalStages: TOTAL_STAGES,
                totalSelects: 1,
                question: "What's your current weight?",
            });
        }
    }, []);

    const inputValue = parseFloat(weight);
    const hasInput = !!weight;
    const inRange = isKg
        ? (inputValue >= 20 && inputValue <= 150)
        : (inputValue >= 44 && inputValue <= 329);
    const showError = hasInput && !inRange;
    const isValid = hasInput && inRange;
    const lbsValue = isKg ? inputValue * 2.20462262 : inputValue;

    // Auto-compute BMI whenever a valid weight is entered
    useEffect(() => {
        if (!isValid) {
            setBmiResult(null);
            return;
        }

        const lbs = lbsValue;
        const kg = isKg ? inputValue : lbs * 0.45359237;
        const heightM = (heightCm || 170) / 100;
        const bmi = kg / (heightM * heightM);
        const data = getBMIData(bmi);

        setBmiResult({ bmi: bmi.toFixed(1), ...data });

        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "selected",
                stage: STAGE,
                totalStages: TOTAL_STAGES,
                totalSelects: 1,
                question: "What's your current weight?",
                selected: [isKg ? `${inputValue} kg` : `${lbs} lbs`],
            });
        }

        window.ALPlayableParams = {
            stage: STAGE,
            totalStages: TOTAL_STAGES,
            question: "What's your current weight?",
            selected: [isKg ? `${inputValue}` : `${lbs}`],
            bmi: bmi.toFixed(1),
            bmiCategory: data.category,
        };
    }, [weight, isValid, lbsValue, inputValue, isKg, heightCm]);

    const handleNext = () => {
        if (!isValid) return;
        setIsTyping(false);
        if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
        setTimeout(() => { if (onNext) onNext(lbsValue); }, 800);
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
                What's your current weight?
            </h1>

            {/* Unit Badge */}
            <div className="flex items-center justify-center mb-[50px]">
                <div className="bg-[#4DB8C4] rounded-[34px] px-[70px] py-[22px]">
                    <span className="text-[36px] font-bold text-white"
                        style={{ fontFamily: "'Open Sans', sans-serif" }}>
                        {isKg ? "KG" : "LBS"}
                    </span>
                </div>
            </div>

            {/* Weight Input Container */}
            <div className="relative flex items-center w-full mb-[50px]">
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={isTyping ? "" : "-"}
                    className="w-full h-[160px] bg-white rounded-[40px] border-[2px] border-[#d1d9e0] outline-none text-[72px] font-bold text-center text-[#1f2933] px-[120px]"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                />
                {/* Unit Text Overlay */}
                <span className="absolute right-[60px] text-[88px] font-bold text-[#a0aab5] pointer-events-none"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    {isKg ? "kg" : "lbs"}
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

            {/* BMI Result Card */}
            {bmiResult && (
                <div
                    className="w-[978px] rounded-[44px] p-[45px] mb-[50px] flex items-start gap-[30px] transition-all duration-500"
                    style={{
                        backgroundColor: bmiResult.color,
                        minHeight: "272px",
                        animation: "fadeSlideIn 0.4s ease-out",
                    }}
                >
                    <img src={bmiResult.icon} alt="bmi" className="w-[56px] h-[56px] shrink-0 mt-[5px]" />
                    <div>
                        <p className="font-bold text-[42px] leading-[56px] text-[#1f2933] mb-[12px]"
                            style={{ fontFamily: "'Open Sans', sans-serif" }}>
                            Your BMI is {bmiResult.bmi} which is {bmiResult.category}
                        </p>
                        <p className="font-normal text-[38px] leading-[52px] text-[#4a5568]"
                            style={{ fontFamily: "'Open Sans', sans-serif" }}>
                            {bmiResult.message}
                        </p>
                    </div>
                </div>
            )}

            {/* Next Button */}
            <div className="w-full">
                <button
                    onClick={handleNext}
                    className={`animate-pulsing w-full py-[42px] rounded-full border-none text-[44px] font-bold transition-all duration-300 text-white ${isValid ? "bg-[#4DB8C4] cursor-pointer" : "bg-[#cccccc] cursor-default"}`}
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                    Next
                </button>
            </div>

            {/* Inline animation keyframes */}
            <style>{`
                @keyframes fadeSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </motion.div>
    );
};

export default Scene17;
