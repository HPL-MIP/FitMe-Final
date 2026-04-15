import chairyogaTxt from "../assets/img/intro/chairyogaTxt.png";
import baseTxt from "../assets/img/intro/baseTxt.png";
import introModelImg from "../assets/img/intro/introModelImg.webp";
import cta from "../assets/img/cta.png";
import { motion, AnimatePresence } from "framer-motion";

import { useState, useEffect } from "react";
import { ages } from "../data/data";
import useAnalytics from "../hooks/useAnalytics";

const Intro = ({ onSelectGender, setShowModal, setModalType }) => {
  const [selectedId, setSelectedId] = useState(null);

  const { trackEvent } = useAnalytics();

  const STAGE = 0;
  const TOTAL_STAGES = 3;

  useEffect(() => {
    if (typeof window.ALPlayableAnalytics !== "undefined") {
      window.ALPlayableAnalytics.trackEvent("shown", {
        event: "shown",
        stage: STAGE,
        totalStages: TOTAL_STAGES,
        totalSelects: ages.length,
        question: "Select Age",
      });
    }
  }, []);

  const handleSelect = (id) => {
    setSelectedId(id);

    const selectedValue = [String(id)];

    if (typeof window.ALPlayableAnalytics !== "undefined") {
      window.ALPlayableAnalytics.trackEvent("selected", {
        event: "selected",
        stage: 0,
        totalStages: 3,
        totalSelects: ages.length,
        question: "Select Age",
        selected: selectedValue,
      });
    }

    trackEvent("intro_age_selected", id);

    setTimeout(() => {
      onSelectGender?.(id);
    }, 400);
  };

  return (
    <div className="flex flex-col justify-start items-center h-full">
      {/* TOP TEXT */}
      <motion.div
        className="introTxtContainer w-8/12 mx-auto my-20"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <img src={chairyogaTxt} alt="chairyogaTxt" className="w-full" />
        <img src={baseTxt} alt="baseTxt" className="w-8/12 mx-auto mt-10" />
      </motion.div>

      {/* CONTENT */}
      <div className="flex w-11/12">
        <motion.div
          className="w-[50%]"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          <img src={introModelImg} alt="introModelImg" className="w-full" />
        </motion.div>

        <ul className="w-[50%] flex flex-col gap-2">
          {ages.map((item, index) => (
            <motion.li
              key={item.id}
              className="flex justify-center w-full"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 14,
                delay: index * 0.1,
              }}
            >
              <button
                onClick={() => handleSelect(item.id)}
                className="w-full block"
              >
                <img
                  src={selectedId === item.id ? item.highlight : item.age}
                  alt={`age-${item.id}`}
                  className="cursor-pointer w-full h-auto object-contain"
                />
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* TERMS TEXT */}
      <motion.div
        className="text-center px-4 my-20 w-8/12"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <p className="text-[35px] text-[#575757] fontSemiBold">
          By continuing, you agree to: <br />
          <button
            onClick={() => {
              setModalType("terms");
              setShowModal(true);
            }}
            className="underline mr-5 cursor-pointer"
          >
            Terms Of Use
          </button>
          |
          <button
            onClick={() => {
              setModalType("privacy");
              setShowModal(true);
            }}
            className="underline ml-5 cursor-pointer"
          >
            Privacy Policy
          </button>
          <br />
          2026 © All rights reserved.
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="w-10/12 mx-auto absolute top-[80%]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.3 }}
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
    </div>
  );
};

export default Intro;
