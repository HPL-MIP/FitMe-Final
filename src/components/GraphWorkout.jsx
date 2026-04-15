import { motion, AnimatePresence } from "framer-motion";
import chartWorkout from "../assets/img/chartWorkout.png";
import { quiz } from "../data/data";

const GraphWorkout = ({ setScreen, setStage, gender }) => {
  const handleGotIt = () => {
    setStage((prevStage) => {
      const nextStage = prevStage + 1;

      if (nextStage >= quiz.length) {
        setScreen("scene16");
        return prevStage;
      }

      setScreen("quiz");
      return nextStage;
    });
  };

  return (
    <div
      className="h-full flex flex-col justify-between"
      style={{
        fontFamily: "'Open Sans', sans-serif",
        backgroundColor: "#EAF4F6",
      }}
    >
      <div className="px-[50px] pt-[80px] pb-[40px] flex flex-col items-center">
        <motion.div
          className=""
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          <h1
            className="font-bold text-center text-[#1f2933] mt-0 mb-[80px]"
            style={{ fontSize: "72px", lineHeight: "90px" }}
          >
            Pushing yourself to the limites is not required!
          </h1>
        </motion.div>

        {/* Chart Image */}
        <motion.div
          className="w-full"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          <img src={chartWorkout} alt="workout info" className="w-full block" />
        </motion.div>

        {/* NOW / 6 MONTHS Labels */}
        <motion.div
          className="w-full flex justify-between px-11 mb-[40px] text-[#A4A3A6] text-[40px] fontSemiBold"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
            delay: 0.2,
          }}
        >
          <p className="m-0">NOW</p>
          <p className="m-0">6 MONTHS</p>
        </motion.div>

        {/* Footnote */}
        <motion.p
          className="mt-0 mb-[60px] text-center text-[40px] text-[#A4A3A6] fontSemiBold"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
            delay: 0.2,
          }}
        >
          *Based on data from over 1 million of our users
        </motion.p>

        {/* Body Text */}
        <motion.p
          className="text-center mt-0 text-[55px] text-[#7E7F80] fontSemiBold"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
            delay: 0.2,
          }}
        >
          While intense workouts can lead to burnout and stress, Tai Chi works
          by calming your body and mind, not exhausting them
        </motion.p>
      </div>

      {/* Continue Button */}
      <motion.div
        className="shrink-0 px-[50px] pb-[30vh]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <button
          onClick={handleGotIt}
          className="animate-pulsing graphContinueBtn w-full py-[42px] rounded-full border-none font-bold text-white cursor-pointer transition-all duration-300"
          style={{ fontSize: "47px", backgroundColor: "#4DB8C4" }}
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
};

export default GraphWorkout;
