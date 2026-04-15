import { motion, AnimatePresence } from "framer-motion";
import gotItBtnImg from "../assets/img/gotItBtn.png";
import quizInfoMaleImg1 from "../assets/img/quiz/male/quizInfoMaleImg1.webp";
import quizInfoFemaleImg1 from "../assets/img/quiz/female/quizInfoFemaleImg1.webp";
import { quiz } from "../data/data";

const RegularWorkout = ({ setScreen, setStage, gender, taichiAgeLabel }) => {
  const handleGotIt = () => {
    setStage((prevStage) => {
      const nextStage = prevStage + 1;

      //
      if (nextStage >= quiz.length) {
        setScreen("scene16");
        return prevStage;
      }

      // move forward
      setScreen("quiz");
      return nextStage;
    });
  };

  // gender-based image
  const infoImage = gender === "female" ? quizInfoFemaleImg1 : quizInfoMaleImg1;

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        {/* IMAGE SECTION */}
        <motion.div
          className="w-12/12 mx-auto mt-20"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          <img src={infoImage} alt="workout info" className="w-full" />
        </motion.div>

        <motion.div
          className="w-12/12 mx-auto mt-8"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          <div className="w-11/12 mx-auto my-0 landscape:my-10">
            <p className="fontBold text-[70px]">
              <b>This isn't a regular workout. It's meditation in motion</b>
            </p>

            <p className="text-[#7E7F80] landscape:mt-3 mt-5 fontRegular text-[49px]">
              Tai Chi is an ancient Chinese practice, proven by thousands of
              years and perfectly suited for{" "}
              {gender === "male" ? "men" : "women"} after {taichiAgeLabel} to:
            </p>
            <br />
            <ul className="text-[50px] mt-0 landscape:mt-0 list-disc list-inside text-[#7E7F80] fontSemiBold">
              {[
                "Activate weight loss processes",
                "Gently stretch and restore the body",
                "Boost energy and vitality",
                "Reduce stress and anxiety",
                "Improve sleep",
              ].map((text, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 14,
                    delay: index * 0.1,
                  }}
                >
                  {text}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
      {/* CTA BUTTON */}
      <motion.div
        className="shrink-0 px-[50px] pb-[30vh] gotitBtnContainer"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <button
          className="gotitBtn mx-auto block animate-pulsing"
          onClick={handleGotIt}
        >
          <img src={gotItBtnImg} alt="gotItBtn" />
        </button>
      </motion.div>
    </div>
  );
};

export default RegularWorkout;
