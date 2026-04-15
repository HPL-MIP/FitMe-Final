import { useState, useEffect } from "react";
import DownloadButton from "./DownloadButton";
import { motion } from "framer-motion";

const STAGE = 14;
const TOTAL_STAGES = 14;

const choices = [
    { id: "not_often", label: "Not often. I'm not big on sweets" },
    { id: "several_times", label: "Several times a week" },
    { id: "every_day", label: "Pretty much every day" },
];

const Scene21 = ({ onNext }) => {
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "shown",
                stage: STAGE,
                totalStages: TOTAL_STAGES,
                totalSelects: choices.length,
                question: "How often do you consume sugary foods or beverages?",
            });
        }
    }, []);

    const handleSelect = (choiceId) => {
        setSelected(choiceId);

        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "selected",
                stage: STAGE,
                totalStages: TOTAL_STAGES,
                totalSelects: choices.length,
                question: "How often do you consume sugary foods or beverages?",
                selected: [choiceId],
            });
        }

        setTimeout(() => {
            if (onNext) onNext(choiceId);
        }, 400);
    };

    return (
        <motion.div
            className="h-full flex flex-col justify-between"
            style={{ fontFamily: "'Open Sans', sans-serif", backgroundColor: "#EAF4F6" }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
            {/* Scrollable content area */}
            <div className="px-[50px] pt-[50px] pb-[30px]">
                {/* Title */}
                <h1
                    className="font-bold mt-0 mb-[50px] text-[#1f2933] mt-8"
                    style={{ fontSize: "72px", lineHeight: "90px" }}
                >
                    How often do you consume sugary foods or beverages?
                </h1>

                {/* Choices */}
                <div className="flex flex-col gap-[30px]">
                    {choices.map((choice) => (
                        <button
                            key={choice.id}
                            onClick={() => handleSelect(choice.id)}
                            className="w-full flex items-center text-left font-semibold text-[#1f2933] cursor-pointer transition-all duration-200 rounded-[47px] shadow-[0px_4px_13px_0px_#0000000D] px-[50px]"
                            style={{
                                height: "233.71px",
                                fontSize: "46px",
                                lineHeight: "55.1px",
                                border: selected === choice.id ? "3px solid #4DB8C4" : "3px solid transparent",
                                backgroundColor: selected === choice.id ? "#E0F4F7" : "#FFFFFF",
                            }}
                        >
                            {choice.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Download Button */}
            <DownloadButton />
        </motion.div>
    );
};

export default Scene21;