import { useState, useEffect } from "react";

import img1 from "../assets/img/scene19/1st.webp";
import img2 from "../assets/img/scene19/2nd.webp";
import img3 from "../assets/img/scene19/3rd.webp";
import img4 from "../assets/img/scene19/4th.webp";
import img1Female from "../assets/img/scene19/female-1st.webp";
import img2Female from "../assets/img/scene19/female-2nd.webp";
import img3Female from "../assets/img/scene19/female-3rd.webp";
import img4Female from "../assets/img/scene19/female-4th.webp";
import dislikeIcon from "../assets/img/scene19/DISLIKE.webp";
import neutralIcon from "../assets/img/scene19/NEUTRAL.webp";
import likeIcon from "../assets/img/scene19/LIKE.webp";
import { motion } from "framer-motion";

const TOTAL_STAGES = 10;

const itemsMale = [
    { id: 0, image: img1, label: "Gentle Flow" },
    { id: 1, image: img2, label: "Power Stretch" },
    { id: 2, image: img3, label: "Core Balance" },
    { id: 3, image: img4, label: "Deep Calm" },
];

const itemsFemale = [
    { id: 0, image: img1Female, label: "Gentle Flow" },
    { id: 1, image: img2Female, label: "Power Stretch" },
    { id: 2, image: img3Female, label: "Core Balance" },
    { id: 3, image: img4Female, label: "Deep Calm" },
];

const reactions = [
    { id: "dislike", icon: dislikeIcon, label: "Dislike" },
    { id: "neutral", icon: neutralIcon, label: "Neutral" },
    { id: "like", icon: likeIcon, label: "Like" },
];

const Scene20 = ({ onNext, gender, onIndexChange }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answers, setAnswers] = useState([]);

    const items = gender === "female" ? itemsFemale : itemsMale;
    const currentItem = items[currentIndex];

    useEffect(() => {
        if (onIndexChange) onIndexChange(currentIndex);
    }, [currentIndex, onIndexChange]);

    // Fire "shown" event
    useEffect(() => {
        if (!currentItem) return;
        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "shown",
                stage: 10 + currentIndex,
                totalStages: TOTAL_STAGES + items.length,
                totalSelects: reactions.length,
                question: `Like it or dislike it - ${currentItem.label}`,
            });
        }
    }, [currentIndex, currentItem]);

    if (!currentItem) return null;

    const handleReaction = (reactionId) => {
        setSelected(reactionId);

        // Fire "selected" event
        if (typeof window.ALPlayableAnalytics !== "undefined") {
            window.ALPlayableAnalytics.trackEvent("CUSTOM", {
                event: "selected",
                stage: 10 + currentIndex,
                totalStages: TOTAL_STAGES + items.length,
                totalSelects: reactions.length,
                question: `Like it or dislike it - ${currentItem.label}`,
                selected: [reactionId],
            });
        }

        const newAnswers = [...answers, { item: currentItem.label, reaction: reactionId }];
        setAnswers(newAnswers);

        setTimeout(() => {
            if (currentIndex < items.length - 1) {
                setCurrentIndex((prev) => prev + 1);
                setSelected(null);
            } else {
                // All done
                if (onNext) onNext(newAnswers);
            }
        }, 400);
    };

    return (
        <motion.div className="flex flex-col items-center px-[50px] pt-[60px] pb-[80px] min-h-full bg-[#EAF4F6]" style={{ fontFamily: "'Open Sans', sans-serif" }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >

            {/* Title */}
            <h1 className="font-bold text-[72px] leading-[90px] text-center text-[#1f2933] mb-[50px] w-full"
                style={{ fontFamily: "'Open Sans', sans-serif" }}>
                Like it or dislike it
            </h1>

            {/* Image Card */}
            <div className="w-full mb-[50px]">
                <img
                    src={currentItem.image}
                    alt={currentItem.label}
                    className="w-full block rounded-[40px]"
                />
            </div>

            {/* Reaction Buttons */}
            <div className="flex w-full gap-[30px] mb-[50px] justify-center">
                {reactions.map((r) => (
                    <button
                        key={r.id}
                        onClick={() => handleReaction(r.id)}
                        className={`bg-transparent border-none cursor-pointer transition-all duration-200 p-0 ${selected === r.id ? "scale-105 opacity-100" : "opacity-90"
                            }`}
                    >
                        <img src={r.icon} alt={r.label} className="w-full block" />
                    </button>
                ))}
            </div>

           
        </motion.div>
    );
};

export default Scene20;
