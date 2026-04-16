import { useEffect } from "react";
import easyIcon from "../assets/img/easy.png";
import { motion } from "framer-motion";

const STAGE = 28;
const TOTAL_STAGES = 28;

const Scene35 = ({ onNext, onDecline }) => {
    useEffect(() => {
        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "shown",
                stage: STAGE,
                totalStages: TOTAL_STAGES,
                question: "Do you want to receive emails with Fitness and Wellness tips and our product updates?",
            });
        }
    }, []);

    const trackSelect = (choice) => {
        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "selected",
                stage: STAGE,
                totalStages: TOTAL_STAGES,
                question: "Do you want to receive emails with Fitness and Wellness tips and our product updates?",
                selected: [choice],
            });
        }
    };

    const handleAccept = () => {
        trackSelect("accept");
        if (onNext) onNext(true);
    };

    const handleDecline = () => {
        trackSelect("decline");
        if (onDecline) onDecline();
        else if (onNext) onNext(false);
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
                    className="font-bold mt-0 mb-[40px] text-[#1f2933] text-center"
                    style={{ fontSize: "84px", lineHeight: "100px" }}
                >
                    Do you want to receive <br /> emails  with{" "}
                    <span style={{ color: "#4DB8C4" }}>Fitness and Wellness</span>{" "}
                    tips and our <br /> product updates?
                </h1>

                {/* Reassurance badge */}
                <div
                    className="flex items-center gap-[30px] mt-4"
                    style={{
                        backgroundColor: "#D6E6EC",
                        borderRadius: "20px",
                        padding: "28px 32px",
                    }}
                >
                    <img src={easyIcon} alt="" style={{ width: "90px", height: "auto", objectFit: "contain", }} />
                    <span
                        className="text-[#4c4c4c]"
                        style={{
                            fontFamily: "'Open Sans', sans-serif",
                            fontWeight: 400,
                            fontSize: "46px",
                            lineHeight: "58px",
                            letterSpacing: "0",
                            verticalAlign: "middle",
                        }}
                    >
                        No worries, we won't fill up your inbox with spam.
                    </span>
                </div>
            </div>

            {/* Bottom actions */}
            <div className="px-[50px] pb-[300px] landscape:pb-[6vh] landscape:mb-[60vh] flex flex-col items-center gap-[30px]">
                <button
                    onClick={handleAccept}
                    className="animate-pulsing w-full rounded-full border-none font-bold text-white cursor-pointer active:scale-95 transition-all duration-200"
                    style={{
                        height: "180px",
                        fontSize: "56px",
                        backgroundColor: "#4DB8C4",
                    }}
                >
                    Sure, I'm in!
                </button>

                <button
                    onClick={handleDecline}
                    className="bg-transparent border-none cursor-pointer text-[#575757] mt-[12vh]"
                    style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: "46px",
                        lineHeight: "56px",
                        letterSpacing: "0",
                        textAlign: "center",
                        verticalAlign: "middle",
                        textDecoration: "underline",
                        textDecorationStyle: "solid",
                        textDecorationSkipInk: "auto",
                    }}
                >
                    I don't want to receive tips or updates
                </button>
            </div>
        </motion.div>
    );
};

export default Scene35;
