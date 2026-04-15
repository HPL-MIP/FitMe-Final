import { motion, AnimatePresence } from "framer-motion";

const List1 = ({
  choices,
  modelImage,
  handleSelect,
  selectedId,
  selectedIds,
  isMultiple,
  className = {},
}) => {
  return (
    <div
      className={`flex mx-auto h-full my-0 ${className.wrapper || "w-full"}`}
    >
      <div
        className={`btnContainer flex flex-col items-center ${
          modelImage ? "w-[50%]" : "w-full"
        } ${className.btnContainer || "gap-20 mt-0"}`}
      >
        <AnimatePresence mode="wait">
          {choices.map((choice, index) => {
            const active = isMultiple
              ? selectedIds.includes(choice.id)
              : selectedId === choice.id;

            return (
              <motion.button
                key={choice.id}
                onClick={() => handleSelect(choice.id)}
                className={`btn w-11/12 flex justify-between items-center cursor-pointer overflow-hidden ${
                  active ? "border-7 border-[#4DB8C4] bg-[#DAE7EE]" : "bg-white"
                } ${className.btn || "h-[280px] pl-[50px]"}`}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 14,
                  delay: index * 0.1,
                }}
              >
                <div
                  className={`fontSemiBold text-[#252525] flex items-center w-full gap-4 text-left ${
                    className.textContainer || "justify-between"
                  }`}
                >
                  <p className="whitespace-pre-line">{choice.text}</p>
                  <div>
                    {choice.img && (
                      <img
                        src={choice.img}
                        alt=""
                        className="w-full relative z-0"
                      />
                    )}
                  </div>
                </div>

                {isMultiple && (
                  <div
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                      active ? "border-[#4DB8C4]" : "border-gray-400"
                    }`}
                  >
                    {active && (
                      <div className="w-3.5 h-3.5 rounded-full bg-[#4DB8C4]" />
                    )}
                  </div>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {modelImage && (
        <motion.div
          className="quizModelContainer w-[50%]"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          <img
            src={modelImage}
            alt=""
            className={`${className.modelImage || "w-full "} mx-auto my-0`}
          />
        </motion.div>
      )}
    </div>
  );
};

export default List1;
