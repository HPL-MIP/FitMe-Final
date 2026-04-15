export const logoVariants = {
  hidden: {
    scale: 0,
    rotateX: 0,
  },
  visible: {
    scale: [0, 1.25, 1],
    rotateX: [0, -180, 0],
    transition: {
      duration: 1.2,
      times: [0, 0.5, 1],
      ease: "easeInOut",
    },
  },
};

export const introVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 1.1,
      ease: "easeOut",
    },
  },
};

export const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.1 },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -70 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export const scaleUp = {
  hidden: { scale: 0 },
  visible: { scale: [0, 1.2, 1], transition: { duration: 1, ease: "easeOut" } },
};
export const fadeDownFlipped = {
  hidden: { opacity: 0, y: -40, scaleX: -1 },
  visible: {
    opacity: 1,
    y: 0,
    scaleX: -1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};
