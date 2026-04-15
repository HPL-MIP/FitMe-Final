import { useState, useEffect } from "react";
import DownloadButton from "./DownloadButton";
import droplet from "../assets/img/droplet.webp";
import above10 from "../assets/img/above10.webp";
import tea from "../assets/img/tea.webp";
import { motion } from "framer-motion";

const STAGE = 15;
const TOTAL_STAGES = 15;

const choices = [
    { id: "coffee_tea", label: "I drink only coffee or tea", icons: [tea] },
    { id: "less_than_2", label: "Less than 2 glasses", icons: [droplet] },
    { id: "2_to_6", label: "2-6 glasses", icons: [droplet, droplet] },
    { id: "7_to_10", label: "7-10 glasses", icons: [droplet, droplet, droplet] },
    { id: "more_than_10", label: "More than 10 glasses", icons: [above10] },
];

const Scene22 = ({ onNext }) => {
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "shown",
                stage: STAGE,
                totalStages: TOTAL_STAGES,
                totalSelects: choices.length,
                question: "How much water do you drink daily?",
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
                question: "How much water do you drink daily?",
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
            {/* Content area */}
            <div className="px-[50px] pt-[50px] pb-[30px] mt-8">
                {/* Title */}
                <h1
                    className="font-bold mt-0 mb-[60px] text-[#1f2933] text-center"
                    style={{ fontSize: "72px", lineHeight: "90px" }}
                >
                    How much water do you drink daily?
                </h1>

                {/* Choices */}
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
                            <span>{choice.label}</span>
                            <span className="flex items-center gap-[10px] ml-[20px]">
                                {choice.icons.map((icon, i) => (
                                    <img
                                        key={i}
                                        src={icon}
                                        alt=""
                                        style={{ width: "64px", height: "64px" }}
                                    />
                                ))}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Download Button */}
            <DownloadButton />
        </motion.div>
    );
};

export default Scene22;
