import { useState, useEffect } from "react";
import { quiz } from "../data/data";
import { motion, AnimatePresence } from "framer-motion";

import cta from "../assets/img/cta.png";
import continueBtn from "../assets/img/continueBtn.png";
import quizSubTxt from "../assets/img/quiz/quizSubTxt.png";
import List1 from "./List1";
import List2 from "./List2";

const LAYOUTS = {
  list1: List1,
  list2: List2,
};

const Quiz = ({
  stage,
  setStage,
  gender,
  setGender,
  setScreen,
  answers,
  setAnswers,
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const currentQuiz = quiz[stage];
  if (!currentQuiz) return null;

  const isMultiple = currentQuiz?.option === "multiple";

  const choices =
    currentQuiz?.choicesByGender?.[gender] || currentQuiz?.choices || [];

  const modelImage = currentQuiz?.imageByGender?.[gender] || null;

  const layoutKey = currentQuiz?.layout || (isMultiple ? "list2" : "list1");
  const LayoutComponent = LAYOUTS[layoutKey] || List1;

  const className = currentQuiz?.className || {};
  const totalStages = quiz.length;

  useEffect(() => {
    if (window.ALPlayableAnalytics) {
      window.ALPlayableAnalytics.trackEvent("CUSTOM", {
        event: "shown",
        stage,
        totalStages,
        totalSelects: choices.length,
        question: currentQuiz.question,
      });
    }
  }, [stage]);

  const reset = () => {
    setSelectedId(null);
    setSelectedIds([]);
  };

  const handleRedirects = (nextStage) => {
    // WORKOUT
    if (stage === 4) {
      setScreen("workout");
      return true;
    }

    // MEDIATION WORKOUT
    if (stage === 8) {
      setScreen("meditationWorkout");
      return true;
    }

    // GRAPH WORKOUT (optional)
    if (stage === 12) {
      setScreen("graphWorkout");
      return true;
    }

    return false;
  };

  const next = (updatedAnswers) => {
    const isLast = stage === quiz.length - 1;

    if (isLast) {
      setScreen("workout");
      return;
    }

    const blocked = handleRedirects(stage + 1);
    if (blocked) return;

    setStage((prev) => prev + 1);
    reset();
  };

  const handleSelect = (id) => {
    if (isMultiple) {
      const isNone = id === "None";
      const isNoneExclusive =
        currentQuiz.id === "problem_areas" ||
        currentQuiz.id === "struggle_to_follow";

      let updatedIds = [...selectedIds];

      if (isNoneExclusive) {
        if (isNone) {
          updatedIds = ["None"];
        } else {
          updatedIds = updatedIds.filter((x) => x !== "None");

          if (updatedIds.includes(id)) {
            updatedIds = updatedIds.filter((x) => x !== id);
          } else {
            updatedIds.push(id);
          }
        }
      } else {
        updatedIds = updatedIds.includes(id)
          ? updatedIds.filter((x) => x !== id)
          : [...updatedIds, id];
      }

      setSelectedIds(updatedIds);
      return;
    }

    if (selectedId) return;

    setSelectedId(id);

    const updated = {
      ...answers,
      [currentQuiz.id]: id,
    };

    setAnswers(updated);

    if (currentQuiz.id === "gender") {
      setGender(id);
    }

    if (stage === 5 || stage === 10) return;

    const selectedChoice = choices.find((c) => c.id === id);
    const hasResponse = !!selectedChoice?.response;
    const delay = hasResponse ? 1800 : 200;

    setTimeout(() => {
      const blocked = handleRedirects(stage + 1);
      if (blocked) return;

      next(updated);
    }, delay);
  };

  const handleContinue = () => {
    const updated = {
      ...answers,
      [currentQuiz.id]: selectedIds,
    };

    setAnswers(updated);

    const blocked = handleRedirects(stage + 1);
    if (blocked) return;

    const isLast = stage === quiz.length - 1;

    if (isLast) {
      setScreen("workout");
      return;
    }

    setStage((prev) => prev + 1);
    reset();
  };

  return (
    <div className="relative h-full flex flex-col justify-between items-center ">
      <div className="w-full">
        <motion.div
          key={currentQuiz.question}
          className="w-11/12 text-center mx-auto my-15"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          <h6 className="text-[70px] fontBold">{currentQuiz.question}</h6>
          {stage === 8 && (
            <motion.div
              className="w-12/12 mx-auto my-5 text-center mb-12 fontRegular  text-[#7E7F80] text-[50px] leading-15"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 14,
              }}
            >
              <h6>
                We’ll modify exercises to protect injured areas while restore
                their strength
              </h6>
            </motion.div>
          )}
        </motion.div>

        <div
          className={`${className.layoutContainer || ""} h-[1400px] ${
            modelImage ? "flex" : ""
          } w-full`}
        >
          <LayoutComponent
            stage={stage}
            choices={choices}
            modelImage={modelImage}
            handleSelect={handleSelect}
            selectedId={selectedId}
            selectedIds={selectedIds}
            isMultiple={isMultiple}
            className={className}
          />
        </div>
      </div>
      {selectedId &&
        (() => {
          const selectedChoice = choices.find((c) => c.id === selectedId);
          if (!selectedChoice?.response) return null;
          return (
            <div
              className="absolute left-1/2 -translate-x-1/2 w-10/12 p-10 rounded-3xl flex gap-6 items-start z-10"
              style={{
                backgroundColor: "#E2F1D7",
                bottom: stage === 10 ? "600px" : "460px",
              }}
            >
              <div className="text-[60px]">♡</div>
              <div className="text-left" style={{ color: "#464646" }}>
                <p
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "40px",
                    lineHeight: "51.24px",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                  }}
                >
                  {selectedChoice.response.title}
                </p>
                <p
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: "38px",
                    lineHeight: "51.24px",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                  }}
                >
                  {selectedChoice.response.body}
                </p>
              </div>
            </div>
          );
        })()}

      <motion.div
        className={`w-10/12 mx-auto mb-70 landscape:mb-90 ${
          (className.layoutContainer || "").includes("overflow") ? "mt-20" : ""
        }`}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        {/* MULTIPLE SELECT */}
        {isMultiple && selectedIds.length > 0 ? (
          <button onClick={handleContinue} className="cursor-pointer ">
            <img src={continueBtn} className="w-full animate-pulsing" />
          </button>
        ) : (
          <>
            {(stage === 5 || stage === 10) && selectedId ? (
              <div className="w-full">
                <button
                  onClick={() => {
                    const updated = {
                      ...answers,
                      [currentQuiz.id]: selectedId,
                    };

                    const blocked = handleRedirects(stage + 1);
                    if (blocked) return;

                    next(updated);
                  }}
                  className="animate-pulsing w-full py-[42px] rounded-full border-none text-[44px] font-bold transition-all duration-300 text-white bg-[#4DB8C4] cursor-pointer"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  Next
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="animate-pulsing cursor-pointer "
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
                  className="w-full"
                  style={{ pointerEvents: "none" }}
                />
              </button>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Quiz;
