import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Icon } from "src/components/ui/Icon/Icon";
import { type FormData } from "~/lib/offerSchema";
import { motion, AnimatePresence } from "framer-motion";

export function SegmentField({
  type = "about",
}: {
  type: "about" | "skills" | "links";
}) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: type,
    keyName: "key",
  });

  const [active, setActive] = useState("none");

  return (
    <>
      <motion.div
        className="flex items-center justify-start divide-x divide-slate-600 border-l border-slate-600"
        layout
      >
        <motion.ul className="flex list-inside list-none flex-col justify-center pl-8 font-medium leading-snug text-slate-500">
          <AnimatePresence initial={false}>
            {fields.map((field, index) => (
              <div key={field.key}>
                <motion.li
                  className={`flex items-center gap-2 rounded-lg p-1 ${active === `${type}.${index}` ? "bg-gray-200" : ""}`}
                  initial={{ opacity: 0, translateX: 100 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  exit={{ opacity: 0, translateX: -100 }}
                  layout
                >
                  <span>•</span>
                  <input
                    {...register(`${type}.${index}.text` as const)}
                    className="w-[450px] bg-inherit outline-none"
                    placeholder={
                      type === "about"
                        ? "Napisz coś o sobie"
                        : type === "skills"
                          ? "Co oferujesz?"
                          : "Wklej link"
                    }
                  />
                  <Icon
                    name="plus"
                    className="size-6 rotate-45 hover:cursor-pointer"
                    onClick={() => {
                      remove(index);
                      setActive("none");
                    }}
                    onMouseEnter={() => setActive(`${type}.${index}`)}
                    onMouseLeave={() => setActive("none")}
                  />
                </motion.li>
                <motion.p
                  className="text-sm font-semibold text-red-500"
                  initial={{ opacity: 0, translateX: 100 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  exit={{ opacity: 0, translateX: -100 }}
                  layout
                >
                  {errors[type]?.[index]?.text?.message}
                </motion.p>
              </div>
            ))}
          </AnimatePresence>
        </motion.ul>
      </motion.div>
      <div
        className="flex items-center rounded-full border-2 p-1 hover:cursor-pointer hover:bg-secondary disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-60"
        onClick={() => append({ text: "" })}
      >
        <Icon name="plus" className="size-6" />
      </div>
    </>
  );
}
