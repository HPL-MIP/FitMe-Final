import { useState, useEffect, useRef } from "react";

import infoEmoji from "../assets/img/info_emoji.png";
import errorIcon from "../assets/img/overweight_bmi.png";
import { motion } from "framer-motion";

const STAGE = 9;
const TOTAL_STAGES = 10;

const Scene19 = ({ onNext }) => {
    const [age, setAge] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const blurTimerRef = useRef(null);

    const handleFocus = () => {
        if (blurTimerRef.current) {
            clearTimeout(blurTimerRef.current);
            blurTimerRef.current = null;
        }
        setIsTyping(true);
    };
    const handleBlur = () => {
        if (blurTimerRef.current) clearTimeout(blurTimerRef.current);
        blurTimerRef.current = setTimeout(() => setIsTyping(false), 400);
    };

    // Fire "shown" event on mount
    useEffect(() => {
        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "shown",
                stage: STAGE,
                totalStages: TOTAL_STAGES,
                totalSelects: 1,
                question: "What's your age?",
            });
        }
    }, []);

    const ageValue = parseInt(age);
    const hasInput = !!age;
    const inRange = ageValue >= 18 && ageValue <= 100;
    const showError = hasInput && !inRange;
    const isValid = hasInput && inRange;

    const handleNext = () => {
        const val = ageValue;
        if (!isValid || !onNext) return;

        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "selected",
                stage: STAGE,
                totalStages: TOTAL_STAGES,
                totalSelects: 1,
                question: "What's your age?",
                selected: [`${val}`],
            });
        }

        setIsTyping(false);
        if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
        setTimeout(() => onNext(val), 800);
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
                What's your age?
            </h1>

            {/* Age Input Container */}
            <div className="relative flex items-center w-full mb-[50px]">
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={isTyping ? "" : "-"}
                    className="w-full h-[160px] bg-white rounded-[40px] border-[2px] border-[#d1d9e0] outline-none text-[72px] font-bold text-center text-[#1f2933] px-[50px]"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                />
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

            {/* Info Card */}
            {!isTyping && (
            <div className="bg-[#DBE4E9] rounded-[40px] p-[45px] w-full mb-[50px]">
                <div className="flex items-start gap-[25px]">
                    <img src={infoEmoji} alt="info" className="w-[52px] h-[52px] shrink-0 mt-[5px]" />
                    <div>
                        <p className="font-bold text-[42px] leading-[50px] text-[#2d3748] mb-[15px]"
                            style={{ fontFamily: "'Open Sans', sans-serif" }}>
                            We ask your age to personalize plan
                        </p>
                        <p className="font-normal text-[41px] leading-[50px] text-[#4a5568]"
                            style={{ fontFamily: "'Open Sans', sans-serif" }}>
                            Older people are found to have higher body fat percentage than younger people with the same BMI
                        </p>
                    </div>
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
        </motion.div>
    );
};

export default Scene19;
