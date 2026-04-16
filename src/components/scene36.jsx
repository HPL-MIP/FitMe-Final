import { useEffect } from "react";
import { motion } from "framer-motion";
import MuscleMassChart from "./MuscleMassChart";
import LoseWeightChart from "./LoseWeightChart";

const STAGE = 29;
const TOTAL_STAGES = 29;

const Scene36 = ({ onNext, goal = "lose_weight", userName = "" }) => {
    useEffect(() => {
        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "shown",
                stage: STAGE,
                totalStages: TOTAL_STAGES,
                question: "Your 4-week plan is ready",
                goal,
            });
        }
    }, [goal]);

    const isMuscle = goal === "muscle_mass";
    const goalLabel = isMuscle ? "Increase Muscle Mass" : "Lose Weight";
    const goalColor = isMuscle ? "#4CAF50" : "#4CAF50";

    const handleNext = () => {
        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "selected",
                stage: STAGE,
                totalStages: TOTAL_STAGES,
                question: "Your 4-week plan is ready",
                selected: ["get_my_plan"],
            });
        }
        if (onNext) onNext();
    };

    return (
        <motion.div
            className="h-full flex flex-col justify-between"
            style={{
                fontFamily: "'Open Sans', sans-serif",
                backgroundColor: "#EAF4F6",
            }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
            <div className="px-[50px] pt-[60px] flex flex-col">
                {/* Title */}
                <h1
                    className="font-bold mt-0 mb-[50px] text-[#1f2933] text-center"
                    style={{ fontSize: "84px", lineHeight: "100px" }}
                >
                    {userName ? `${userName},` : ""}
                    <br />
                    your 4-week plan to
                    <br />
                    <span style={{ color: goalColor }}>{goalLabel}</span> is ready!
                </h1>

                {/* Chart */}
                {isMuscle ? (
                    <MuscleMassChart style={{ width: "100%", display: "block" }} />
                ) : (
                    <LoseWeightChart style={{ width: "100%", display: "block" }} />
                )}

                {/* Disclaimer */}
                <p
                    className="text-center text-[#7b8794] mt-[40vh]"
                    style={{ fontSize: "38px" }}
                >
                    This chart is for illustrative purposes only
                </p>
            </div>

            {/* CTA */}
            <div className="px-[50px] pb-[400px] landscape:pb-[6vh] landscape:mt-[4vh]">
                <button
                    onClick={handleNext}
                    className="animate-pulsing w-full rounded-full border-none font-bold text-white cursor-pointer active:scale-95 transition-all duration-200 landscape:mb-[60vh]"
                    style={{
                        height: "160px",
                        fontSize: "48px",
                        backgroundColor: "#4DB8C4",
                    }}
                >
                    Get my plan!
                </button>
            </div>
        </motion.div>
    );
};

export default Scene36;
