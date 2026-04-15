import { useEffect } from "react";
import chartImg from "../assets/img/CHART.webp";
import { motion } from "framer-motion";

const STAGE = 19;
const TOTAL_STAGES = 22;

const Scene26 = ({ onNext }) => {
    useEffect(() => {
        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "shown",
                stage: STAGE,
                totalStages: TOTAL_STAGES,
                totalSelects: 0,
                question: "Sleep - Chart Overview",
            });
        }
    }, []);

    return (
        <motion.div
            className="h-full flex flex-col justify-between"
            style={{ fontFamily: "'Open Sans', sans-serif", backgroundColor: "#EAF4F6" }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
            <div className="px-[50px] pt-[50px] pb-[30px]">
                {/* Chart Image */}
                <div className="mb-[40px] flex justify-center" style={{ marginLeft: "-150px", marginRight: "-150px" }}>
                    <img
                        src={chartImg}
                        alt="Sleep, Energy, Metabolism chart"
                        className="block max-w-none"
                        style={{ width: "calc(80% + 0px)" }}
                    />
                </div>

                {/* Title */}
                <h2
                    className="font-bold text-center text-[#1f2933] mt-0 mb-[30px]"
                    style={{ fontSize: "64px", lineHeight: "80px" }}
                >
                    Sleep
                </h2>

                {/* Description */}
                <p
                    className="text-center text-[#4a5568] mt-0 mb-[40px]"
                    style={{
                        fontSize: "50px",
                        lineHeight: "66px",
                        fontWeight: 400,
                    }}
                >
                    Deep, restful sleep is one of the best things you can do for your body and mind. Tai Chi can help you fall asleep faster, sleep deeper, and wake up with more clarity.
                </p>

                {/* Info Card */}
                <div
                    className="w-full rounded-[40px] p-[40px] flex items-start gap-[25px] text-white"
                    style={{ backgroundColor: "#4DB8C4" }}
                >
                    <span style={{ fontSize: "72px", lineHeight: 1, flexShrink: 0 }}>♡</span>
                    <div>
                        <p
                            className="font-bold text-white mt-0 mb-[10px]"
                            style={{ fontSize: "50px", lineHeight: "62px" }}
                        >
                            Improve sleep quality!
                        </p>
                        <p
                            className="text-white mt-0 mb-0"
                            style={{ fontSize: "46px", lineHeight: "60px", fontWeight: 400 }}
                        >
                            Studies show that slow, mindful Tai Chi movements before bed can improve sleep quality, reduce nighttime awakenings, and calm the mind.
                        </p>
                    </div>
                </div>
            </div>

            <div
                className="shrink-0 px-[50px] pb-[30vh]"
                style={{ backgroundColor: "#EAF4F6" }}
            >
                <button
                    onClick={() => onNext && onNext()}
                    className="w-full py-[42px] rounded-full border-none font-bold text-white cursor-pointer transition-all duration-300"
                    style={{ fontSize: "47px", backgroundColor: "#4DB8C4" }}
                >
                    Continue
                </button>
            </div>
        </motion.div>
    );
};

export default Scene26;
