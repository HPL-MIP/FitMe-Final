import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const STAGE = 26;
const TOTAL_STAGES = 26;

const Scene33 = ({ onNext }) => {
    const [name, setName] = useState("");

    useEffect(() => {
        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "shown",
                stage: STAGE,
                totalStages: TOTAL_STAGES,
                question: "What's your name?",
            });
        }
    }, []);

    const handleNext = () => {
        if (!name.trim()) return;

        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "selected",
                stage: STAGE,
                totalStages: TOTAL_STAGES,
                question: "What's your name?",
                selected: [name.trim()],
            });
        }

        if (onNext) onNext(name.trim());
    };

    return (
        <motion.div
            className="h-full flex flex-col items-center"
            style={{
                fontFamily: "'Open Sans', sans-serif",
                backgroundColor: "#EAF4F6",
                paddingTop: "120px"
            }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
            {/* Title */}
            <h1
                className="font-bold mb-[60px] text-[#1f2933] text-center"
                style={{ fontSize: "72px", lineHeight: "90px" }}
            >
                What's your name?
            </h1>

            {/* Name Input */}
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleNext(); }}
                className="shadow-[0px_4px_13px_0px_#0000000D] px-[20px] outline-none"
                style={{
                    width: "978.09px",
                    height: "177.78px",
                    borderRadius: "44px",
                    border: "3px solid #CACACA",
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "91.72px",
                    lineHeight: "41.79px",
                    letterSpacing: "-0.02em",
                    backgroundColor: "#FFFFFF",
                    textAlign: "center",
                    color: "#1f2933",
                    opacity: 1,
                }}
            />

            <div className="flex flex-col gap-[80px] w-full px-[60px] mt-20 items-center">
                {/* Next Button */}
                <button
                    onClick={handleNext}
                    disabled={!name.trim()}
                    className="w-full rounded-full border-none font-bold text-white cursor-pointer active:scale-95 transition-all duration-200"
                    style={{
                        height: "160px",
                        fontSize: "52px",
                        backgroundColor: name.trim() ? "#4DB8C4" : "#C0C0C0",
                        opacity: name.trim() ? 1 : 0.7,
                        maxWidth: "90%",
                    }}
                >
                    Next
                </button>
            </div>
        </motion.div>
    );
};

export default Scene33;
