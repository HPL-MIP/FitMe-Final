import { useState, useEffect, useRef } from "react";
import checkIcon from "../assets/img/CHECK.webp";
import starIcon from "../assets/img/star.webp";
import { motion, AnimatePresence } from "framer-motion";

const STAGE = 24;
const TOTAL_STAGES = 24;

const steps = [
    { label: "Compiling your profile" },
    { label: "Calculating your metabolism" },
    { label: "Adjusting to your activity level" },
    { label: "Creating personalized plan" },
];

const reviews = [
    {
        text: "These short asian workouts are like my daily energy boost. And guess what? They're working some magic on the scale too! I've dropped 10 pounds!",
        author: "Daniel Walker",
    },
    {
        text: "Taichi has been a game-changer for my fitness journey. The short, effective workouts helped me lose 16 pounds, and I'm finally at my goal weight.",
        author: "Robert Young",
    },
    {
        text: "FitMe has been a pleasant surprise for my health. Despite my doubts at first, the short workouts have significantly improved my well-being",
        author: "Andrew Thompson",
    },
];

const Scene31 = ({ onNext }) => {
    const [progresses, setProgresses] = useState([0, 0, 0, 0]);
    const [activeStep, setActiveStep] = useState(0);
    const [reviewIndex, setReviewIndex] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "shown",
                stage: STAGE,
                totalStages: TOTAL_STAGES,
                totalSelects: 0,
                question: "Analyzing your answers",
            });
        }
    }, []);

    useEffect(() => {
        if (activeStep >= steps.length) return;

        let advanced = false;
        let advanceTimer;

        intervalRef.current = setInterval(() => {
            setProgresses((prev) => {
                const next = [...prev];
                const currentProgress = next[activeStep];

                if (currentProgress < 100) {
                    next[activeStep] = Math.min(currentProgress + 2, 100);
                } else {
                    clearInterval(intervalRef.current);
                    if (!advanced) {
                        advanced = true;
                        advanceTimer = setTimeout(() => setActiveStep((s) => s + 1), 300);
                    }
                }

                return next;
            });
        }, 30);

        return () => {
            clearInterval(intervalRef.current);
            if (advanceTimer) clearTimeout(advanceTimer);
        };
    }, [activeStep]);

    useEffect(() => {
        const timer = setInterval(() => {
            setReviewIndex((prev) => (prev + 1) % reviews.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const currentReview = reviews[reviewIndex];

    return (
        <motion.div
            className="h-full flex flex-col justify-between bg-[#EAF4F6]"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
            <div className="px-[50px] pt-[50px] pb-[30px]">

                <h1 className="font-bold text-center text-[#1f2933] mt-0 mb-[50px] text-[68px] leading-[85px]">
                    Analyzing your answers...
                </h1>

                {/* Progress Steps */}
                <div className="flex flex-col mb-[50px]">
                    {steps.map((step, i) => (
                        <div key={i} className="mb-[55px]">
                            <div className="flex justify-between items-center mb-[8px]">
                                {/* Updated Label Styling */}
                                <p
                                    className="mt-0 mb-0"
                                    style={{
                                        fontFamily: "'Open Sans', sans-serif",
                                        fontWeight: 600,
                                        fontSize: "42.47px",
                                        lineHeight: "58.06px",
                                        letterSpacing: "0%",
                                        color: progresses[i] >= 100 ? "#363636" : "#7b8998",
                                        verticalAlign: "middle"
                                    }}
                                >
                                    {step.label}
                                </p>
                                <span className="text-[42px] font-bold text-[#1f2933]">
                                    {progresses[i] >= 100
                                        ? <img src={checkIcon} alt="done" className="w-[48px] h-[48px]" />
                                        : `${progresses[i]}%`}
                                </span>
                            </div>

                            <div className="w-full h-[14px] bg-white rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#4DB8C4] rounded-full transition-[width] duration-[50ms] linear"
                                    style={{ width: `${progresses[i]}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-center mt-0 mb-[10vh] text-[44px] leading-[54px] font-bold text-[#334155]">
                    Trusted by over 1,289,897 clients
                </p>

                <div className="relative w-full overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={reviewIndex}
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -300, opacity: 0 }}
                            transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
                            className="w-full rounded-[47px] bg-white p-[45px_40px] flex flex-col items-center shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)] border-none"
                        >
                            <div className="mb-[20px] flex gap-[8px]">
                                {[...Array(5)].map((_, i) => (
                                    <img key={i} src={starIcon} alt="star" className="w-[46px] h-[46px]" />
                                ))}
                            </div>

                            <p className="mt-0 mb-[15px] font-normal text-[40px] leading-[59px] text-center text-[#7b8998]">
                                {currentReview.text}
                            </p>

                            <p className="mt-0 mb-0 font-bold text-[43px] leading-[55px] text-center text-[#1f2933]">
                                {currentReview.author}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div
                className="shrink-0 px-[50px] pb-[30vh] landscape:pb-[6vh] landscape:mt-[4vh]"
                style={{ backgroundColor: "#EAF4F6" }}
            >
                <button
                    onClick={() => onNext && onNext()}
                    className="w-full py-[42px] rounded-full border-none font-bold text-white cursor-pointer transition-all duration-300 landscape:mb-[60vh]"
                    style={{ fontSize: "47px", backgroundColor: "#4DB8C4" }}
                >
                    Continue
                </button>
            </div>
        </motion.div>
    );
};

export default Scene31;