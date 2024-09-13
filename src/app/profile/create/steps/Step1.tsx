import { motion } from "framer-motion";

export default function Step1() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
    >
      Step 1
    </motion.div>
  );
}
