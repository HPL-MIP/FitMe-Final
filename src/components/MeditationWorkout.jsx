import { motion, AnimatePresence } from "framer-motion";
import gotItBtnImg from "../assets/img/gotItBtn.png";
import quizInfoMaleImg2 from "../assets/img/quiz/male/quizInfoMaleImg2.webp";
import quizInfoFemaleImg2 from "../assets/img/quiz/female/quizInfoFemaleImg2.webp";
import { quiz } from "../data/data";

const MeditationWorkout = ({ setScreen, setStage, gender }) => {
  const handleGotIt = () => {
    setStage((prev) => {
      const next = prev + 1;

      if (next >= quiz.length) {
        setScreen("scene16");
        return prev;
      }

      setScreen("quiz");
      return next;
    });
  };

  const infoImage = gender === "female" ? quizInfoFemaleImg2 : quizInfoMaleImg2;

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="mb-10">
        <motion.div
          className="w-12/12 mx-auto mt-20"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          <img src={infoImage} alt="" className="w-full" />
        </motion.div>
        <motion.div
          className="w-12/12 mx-auto mt-20 "
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          <div className=" w-11/12 mx-auto my-0 h-[750px]">
            <p className="fontBold text-[70px] text-center">
              <b>No Pain, No strain with our Tai Chi program</b>
            </p>

            <ul className="text-[45px] list-disc list-inside mt-20 text-[#7E7F80] fontRegular">
              {[
                "Strengthens muscles",
                "Improves flexibility",
                "Supports proper posture",
                "Reduces pain in back and joints",
                "Smooth movements with minimal strain",
              ].map((text, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-7"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 14,
                    delay: index * 0.1,
                  }}
                >
                  <span className="text-gray-500">✓</span>
                  <span>{text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="shrink-0 px-[50px] pb-[30vh] gotitBtn"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <button
          className="gotitBtn mx-auto block animate-pulsing"
          onClick={handleGotIt}
        >
          <img src={gotItBtnImg} />
        </button>
      </motion.div>
    </div>
  );
};

export default MeditationWorkout;
