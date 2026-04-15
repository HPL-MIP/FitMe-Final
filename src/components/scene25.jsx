import { useState, useEffect } from "react";
import DownloadButton from "./DownloadButton";
import { motion } from "framer-motion";

const STAGE = 18;
const TOTAL_STAGES = 18;

const choices = [
    { id: "fewer_5", label: "Fewer than 5 hours" },
    { id: "5_6", label: "5-6 hours" },
    { id: "7_8", label: "7-8 hours" },
    { id: "8_plus", label: "8+ hours" },
];

const Scene25 = ({ onNext }) => {
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "shown",
                stage: STAGE,
                totalStages: TOTAL_STAGES,
                totalSelects: choices.length,
                question: "How long is your average night's sleep?",
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
                question: "How long is your average night's sleep?",
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
            <div className="px-[50px] pt-[50px] pb-[30px]">
                <h1
                    className="font-bold mt-0 mb-[60px] text-[#1f2933] text-center mt-8"
                    style={{ fontSize: "72px", lineHeight: "90px" }}
                >
                    How long is your average night's sleep?
                </h1>

                <div className="flex flex-col gap-[35px]">
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

            <DownloadButton />
        </motion.div>
    );
};

export default Scene25;
