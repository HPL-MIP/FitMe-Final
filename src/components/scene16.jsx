import { useState, useEffect, useRef } from "react";

import infoEmoji from "../assets/img/info_emoji.png";
import errorIcon from "../assets/img/overweight_bmi.png";
import { motion } from "framer-motion";

const STAGE = 6;
const TOTAL_STAGES = 8;

const Scene16 = ({ onNext }) => {
    const [unit, setUnit] = useState("cm");
    const [height, setHeight] = useState("");
    const [feet, setFeet] = useState("");
    const [inches, setInches] = useState("");
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
                question: "What's your height?",
            });
        }
    }, []);

    // Convert current input to CM
    const getHeightCm = () => {
        if (unit === "cm") {
            return parseFloat(height) || 0;
        }
        const ft = parseFloat(feet) || 0;
        const inc = parseFloat(inches) || 0;
        return Math.round((ft * 12 + inc) * 2.54);
    };

    const hasInput = unit === "cm" ? !!height : (!!feet || !!inches);
    const heightCmPreview = getHeightCm();
    const inRange =
        unit === "cm"
            ? heightCmPreview >= 50 && heightCmPreview <= 240
            : (() => {
                const ft = parseFloat(feet) || 0;
                const inc = parseFloat(inches) || 0;
                return ft >= 1 && ft <= 7 && inc >= 0 && inc <= 11;
            })();
    const showError = hasInput && !inRange;
    const isValid = hasInput && inRange;

    const handleNext = () => {
        if (!isValid || !onNext) return;

        const heightCm = getHeightCm();
        const selectedValue = unit === "cm"
            ? [`${height} cm`]
            : [`${feet}ft ${inches}in`];

        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "selected",
                stage: STAGE,
                totalStages: TOTAL_STAGES,
                totalSelects: 1,
                question: "What's your height?",
                selected: selectedValue,
            });
        }

        setIsTyping(false);
        if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
        setTimeout(() => onNext(heightCm, unit), 800);
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
                What's your height?
            </h1>

            {/* Unit Toggle */}
            <div
                className="flex items-center justify-center bg-[#DAE7EE] rounded-[47px] p-[12px] mb-[50px] w-[459px] h-[136px]"
                style={{ gap: "15px" }}
            >
                <button
                    onClick={() => setUnit("ft")}
                    className={`h-full w-[200px] rounded-[34px] border-none text-[36px] font-bold cursor-pointer transition-all duration-200 ${unit === "ft"
                        ? "bg-[#4DB8C4] text-white shadow-sm"
                        : "bg-transparent text-[#17202A]"
                        }`}
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                    FT
                </button>
                <button
                    onClick={() => setUnit("cm")}
                    className={`h-full w-[200px] rounded-[34px] border-none text-[36px] font-bold cursor-pointer transition-all duration-200 ${unit === "cm"
                        ? "bg-[#4DB8C4] text-white shadow-sm"
                        : "bg-transparent text-[#17202A]"
                        }`}
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                    CM
                </button>
            </div>

            {/* Height Input — CM */}
            {unit === "cm" && (
                <div className="relative flex items-center w-full mb-[50px]">
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={isTyping ? "" : "-"}
                        className="w-full h-[160px] bg-white rounded-[40px] border-[2px] border-[#d1d9e0] outline-none text-[72px] font-bold text-center text-[#1f2933] px-[120px]"
                        style={{ fontFamily: "'Open Sans', sans-serif" }}
                    />
                    <span className="absolute right-[60px] text-[88px] font-bold text-[#a0aab5] pointer-events-none"
                        style={{ fontFamily: "'Open Sans', sans-serif" }}>
                        cm
                    </span>
                </div>
            )}

            {/* Height Input — FT + IN */}
            {unit === "ft" && (
                <div className="flex w-full gap-[24px] mb-[50px]">
                    {/* Feet */}
                    <div className="relative flex items-center flex-1">
                        <input
                            type="number"
                            value={feet}
                            onChange={(e) => setFeet(e.target.value)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder={isTyping ? "" : "-"}
                            className="w-full h-[160px] bg-white rounded-[40px] border-[2px] border-[#d1d9e0] outline-none text-[72px] font-bold text-center text-[#1f2933] px-[24px]"
                            style={{ fontFamily: "'Open Sans', sans-serif" }}
                        />
                        <span className="absolute right-[36px] text-[88px] font-bold text-[#a0aab5] pointer-events-none"
                            style={{ fontFamily: "'Open Sans', sans-serif" }}>
                            ft
                        </span>
                    </div>

                    {/* Inches */}
                    <div className="relative flex items-center flex-1">
                        <input
                            type="number"
                            value={inches}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val.length <= 2) {
                                    setInches(val);
                                }
                            }}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder={isTyping ? "" : "-"}
                            className="w-full h-[160px] bg-white rounded-[40px] border-[2px] border-[#d1d9e0] outline-none text-[72px] font-bold text-center text-[#1f2933] px-[24px]"
                            style={{ fontFamily: "'Open Sans', sans-serif" }}
                        />
                        <span className="absolute right-[36px] text-[88px] font-bold text-[#a0aab5] pointer-events-none"
                            style={{ fontFamily: "'Open Sans', sans-serif" }}>
                            in
                        </span>
                    </div>
                </div>
            )}

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
            <div className="bg-[#DBE4E9] rounded-[40px] p-[45px] w-full mb-[50px] mt-8">
                <div className="flex items-start gap-[25px]">
                    <img src={infoEmoji} alt="info" className="w-[64px] h-auto shrink-0 mt-[5px]" />
                    <div>
                        <p className="font-bold text-[42px] leading-[50px] text-[#2d3748] mb-[15px]"
                            style={{ fontFamily: "'Open Sans', sans-serif" }}>
                            We ask your height to calculate BMI
                        </p>
                        <p className="font-normal text-[41px] leading-[50px] text-[#4a5568]"
                            style={{ fontFamily: "'Open Sans', sans-serif" }}>
                            Body Mass Index (BMI) is a metric of body fat percentage commonly
                            used to estimate{" "}
                            <span className="text-[#fb7185]">risk levels</span>{" "}
                            of potential health problems.
                        </p>
                    </div>
                </div>
            </div>
            )}

            {/* Next Button */}
            <div className="w-full">
                <button
                    onClick={handleNext}
                    className={`animate-pulsing w-full mt-8 py-[42px] rounded-full border-none text-[44px] font-bold transition-all duration-300 text-white ${isValid ? "bg-[#4DB8C4] cursor-pointer" : "bg-[#cccccc] cursor-default"}`}
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                    Next
                </button>
            </div>
        </motion.div>
    );
};

export default Scene16;