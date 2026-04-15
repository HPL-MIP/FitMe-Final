import { useState, useEffect } from "react";
import star from "../assets/img/star.webp";
import lock from "../assets/img/lock.webp";
import { motion } from "framer-motion";

const STAGE = 27;
const TOTAL_STAGES = 27;

const Scene34 = ({ onNext }) => {
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "shown",
                stage: STAGE,
                totalStages: TOTAL_STAGES,
                question: "Enter your email to get your Tai Chi Plan!",
            });
        }
    }, []);

    const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

    const handleNext = () => {
        if (!isValidEmail(email)) return;

        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "selected",
                stage: STAGE,
                totalStages: TOTAL_STAGES,
                question: "Enter your email to get your Tai Chi Plan!",
                selected: [email.trim()],
            });
        }

        if (onNext) onNext(email.trim());
    };

    const canSubmit = isValidEmail(email);

    return (
        <motion.div
            className="h-full flex flex-col"
            style={{
                fontFamily: "'Open Sans', sans-serif",
                backgroundColor: "#EAF4F6",
            }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
            <div className="px-[50px] pt-[60px] pb-[30px] flex flex-col">
                {/* Title */}
                <h1
                    className="font-bold mt-0 mb-[50px] text-[#1f2933] text-center"
                    style={{ fontSize: "64px", lineHeight: "80px" }}
                >
                    Enter your email to get your
                    <br />
                    <span style={{ color: "#4DB8C4" }}>Tai Chi Plan!</span>
                </h1>

                {/* Email Input */}
                <div className="relative w-full">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleNext(); }}
                        className="shadow-[0px_4px_13px_0px_#0000000D] pl-[50px] pr-[160px] font-semibold outline-none"
                        style={{
                            width: "100%",
                            height: "160px",
                            borderRadius: "44px",
                            border: "3px solid #CACACA",
                            fontSize: "43px",
                            backgroundColor: "#FFFFFF",
                            color: "#1f2933",
                        }}
                    />
                    {canSubmit && (
                        <div
                            className="absolute flex items-center justify-center"
                            style={{
                                right: "40px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: "52px",
                                height: "52px",
                                borderRadius: "50%",
                                backgroundColor: "#34C759",
                            }}
                        >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12.5L10 17.5L19 7.5" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Social proof badge */}
                <div
                    className="flex items-center gap-[20px] mt-[40px]"
                    style={{
                        backgroundColor: "#D6E6EC",
                        borderRadius: "20px",
                        padding: "24px 30px",
                    }}
                >
                    <img src={star} alt="" style={{ width: "48px", height: "48px" }} />
                    <span
                        className="text-[#1f2933]"
                        style={{
                            fontFamily: "'Open Sans', sans-serif",
                            fontWeight: 600,
                            fontSize: "38.05px",
                            lineHeight: "48.39px",
                            letterSpacing: "0.03em",
                            verticalAlign: "middle",
                        }}
                    >
                        1+ MILLION USERS HAVE CHOSEN US
                    </span>
                </div>

                {/* Privacy note */}
                <div className="flex items-start gap-[20px] mt-[40px] px-[10px]">
                    <img
                        src={lock}
                        alt=""
                        style={{ width: "54px", height: "54px", marginTop: "6px" }}
                    />
                    <div style={{ fontSize: "40px", lineHeight: "48px" }}>
                        <div className="font-bold text-[#1f2933]">
                            Your data is 100% protected.
                        </div>
                        <div className="text-[#5a6672]">
                            FitMe does not share your personal information with third parties.
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <button
                    onClick={handleNext}
                    disabled={!canSubmit}
                    className="w-full rounded-full border-none font-bold text-white cursor-pointer active:scale-95 transition-all duration-200 mt-[60px]"
                    style={{
                        height: "160px",
                        fontSize: "48px",
                        backgroundColor: canSubmit ? "#4DB8C4" : "#C0C0C0",
                        opacity: canSubmit ? 1 : 0.7,
                    }}
                >
                    Get my plan!
                </button>
            </div>
        </motion.div>
    );
};

export default Scene34;
