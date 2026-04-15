import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import taichiTxt from "../assets/img/taichi/taichiTxt.png";
import quizModel from "../assets/img/taichi/quizModel.webp";
import selectAgeTxt from "../assets/img/taichi/selectAgeTxt.png";
import cta from "../assets/img/cta.png";
import { taichiAge } from "../data/data";
import useAnalytics from "../hooks/useAnalytics";

const Taichi = ({ onSelectAge, setShowModal, setModalType }) => {
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const { trackEvent } = useAnalytics();

  const STAGE = 1;
  const TOTAL_STAGES = 3;

  useEffect(() => {
    if (typeof window.ALPlayableAnalytics !== "undefined") {
      window.ALPlayableAnalytics.trackEvent("shown", {
        event: "shown",
        stage: STAGE,
        totalStages: TOTAL_STAGES,
        totalSelects: taichiAge.length,
        question: "Select Taichi Age",
      });
    }
  }, []);

  const handleClick = (id) => {
    setSelectedQuizId(id);

    const selectedValue = [String(id)];

    if (typeof window.ALPlayableAnalytics !== "undefined") {
      window.ALPlayableAnalytics.trackEvent("selected", {
        event: "selected",
        stage: STAGE,
        totalStages: TOTAL_STAGES,
        totalSelects: taichiAge.length,
        question: "Select Taichi Age",
        selected: selectedValue,
      });
    }

    trackEvent("taichi_age_selected", id);

    setTimeout(() => {
      onSelectAge(id);
    }, 400);
  };

  return (
    <div className="h-full flex flex-col justify-evenly items-center">
      <motion.div
        className="w-6/12 mx-auto"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <img src={taichiTxt} alt="taichiTxt" className="w-full" />
      </motion.div>

      <motion.div
        className="w-12/12 mx-auto my-0"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <img src={quizModel} alt="quizModel" className="w-full" />
      </motion.div>

      <motion.div
        className="w-5/12 mx-auto my-0"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <img src={selectAgeTxt} alt="selectAgeTxt" className="w-full" />
      </motion.div>

      <ul className="grid grid-cols-2 gap-4 w-10/12 mx-auto my-0">
        {taichiAge.map((item, index) => (
          <motion.li
            key={item.id}
            className="flex justify-center"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 14,
              delay: index * 0.1, // 👈 stagger delay
            }}
          >
            <button onClick={() => handleClick(item.id)}>
              <img
                src={selectedQuizId === item.id ? item.highlight : item.age}
                alt={`quiz-${item.id}`}
                className="w-full cursor-pointer transition-all duration-300"
              />
            </button>
          </motion.li>
        ))}
      </ul>

      <div>
        <motion.div
          className="w-12/12 mx-auto my-0"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const mraid = window.mraid || {};
              if (mraid.open && typeof mraid.open === "function") {
                mraid.open();
              } else {
                window.open("", "_blank", "noopener,noreferrer");
              }
            }}
            className="animate-pulsing"
            style={{
              background: "transparent",
              border: 0,
              padding: 0,
              width: "100%",
              cursor: "pointer",
              pointerEvents: "auto",
              position: "relative",
              zIndex: 9999,
            }}
          >
            <img
              src={cta}
              alt="cta"
              className="w-full"
              style={{ pointerEvents: "none" }}
            />
          </button>
        </motion.div>
        <motion.div
          className="text-center px-4 mb-40 landscape:mb-55 mt-10"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
            delay: 0.3,
          }}
        >
          <p className="text-[30px] text-[#575757] fontSemiBold">
            By continuing, you agree to:
            <button
              onClick={() => {
                setModalType("terms");
                setShowModal(true);
              }}
              className="mx-3 cursor-pointer underline"
            >
              Terms Of Use
            </button>
            |
            <button
              onClick={() => {
                setModalType("privacy");
                setShowModal(true);
              }}
              className="ml-3  cursor-pointer underline"
            >
              Privacy Policy
            </button>
            <br />
            2026 © All rights reserved
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Taichi;
