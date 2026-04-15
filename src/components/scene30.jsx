import { useEffect } from "react";
import taichiImg from "../assets/img/taichi.webp";
import taichiFemaleImg from "../assets/img/taichi-female.webp";
import harvardImg from "../assets/img/harvard.webp";
import { motion } from "framer-motion";

const STAGE = 23;
const TOTAL_STAGES = 24;

const Scene30 = ({ onNext, gender }) => {
    const taichiSrc = gender === "female" ? taichiFemaleImg : taichiImg;
    useEffect(() => {
        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "shown",
                stage: STAGE,
                totalStages: TOTAL_STAGES,
                totalSelects: 0,
                question: "Tai Chi - Harvard Backed",
            });
        }
    }, []);

    return (
        <motion.div className="h-full flex flex-col justify-between bg-[#EAF4F6]" style={{ fontFamily: "'Open Sans', sans-serif" }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
            <div className="px-[50px] pt-[50px] pb-[30px] flex flex-col items-center">

                {/* Title */}
                <h1 className="font-bold text-center text-[#1f2933] mt-0 mb-[40px] text-[64px] leading-[80px]">
                    Tai Chi reduces blood <br />
                    pressure better than aerobics
                </h1>

                {/* Tai Chi Image */}
                <div className="w-full mb-[40px]">
                    <img
                        src={taichiSrc}
                        alt="Tai Chi"
                        className="w-full block rounded-[30px]"
                    />
                </div>

                {/* Harvard Badge Card */}
                <div className="w-full flex items-center gap-[50px] rounded-[40px] p-[35px]">
                    {/* Harvard Logo */}
                    <div className="shrink-0">
                        <img
                            src={harvardImg}
                            alt="Harvard Health"
                            className="w-[180px] h-[200px] object-contain"
                        />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col">
                        <p className="font-bold text-[#606060]  mt-0 mb-[12px] text-[48px] leading-[50px] whitespace-nowrap">
                            According to Harvard Research
                        </p>
                        <p className="text-[#4a5568] mt-0 mb-0 font-normal text-[48px] leading-[58px]">
                            Tai Chi is 38% more effective than aerobic exercise in achieving normal blood pressure
                        </p>
                    </div>
                </div>

            </div>

            {/* Continue Button */}
            <div className="shrink-0 px-[50px] pb-[30vh]" style={{ backgroundColor: "#EAF4F6" }}>
                <button
                    onClick={() => { if (onNext) onNext(); }}
                    className="w-full py-[42px] rounded-full border-none font-bold text-white cursor-pointer transition-all duration-300"
                    style={{ fontSize: "47px", backgroundColor: "#4DB8C4" }}
                >
                    Continue
                </button>
            </div>
        </motion.div>
    );
};

export default Scene30;