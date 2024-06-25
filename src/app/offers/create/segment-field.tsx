import React, { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Icon } from "~/components/ui/Icon/Icon";
import { type FormData } from "./schema";

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

  useEffect(() => {
    console.log("Root errors: ");

    console.log(errors);
  }, [errors]);

  return (
    <>
      {/* TODO rethink textarea usage */}
      <div className="flex items-center justify-start divide-x divide-slate-600">
        <div></div>
        <ul className="flex list-inside list-none flex-col justify-center pl-12 font-medium leading-snug text-slate-500">
          {fields.map((field, index) => (
            <div key={field.key}>
              <li className="flex items-center gap-2">
                <span>•</span>
                <textarea
                  {...register(`${type}.${index}.text` as const)}
                  className="h-[1.2rem] w-[450px] bg-inherit outline-none"
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
                  onClick={() => remove(index)}
                />
              </li>
              <p className="text-sm font-semibold text-red-500">
                {errors[type]?.[index]?.text?.message}
              </p>
            </div>
          ))}
        </ul>
      </div>
      <div
        className="flex items-center rounded-full border-2 p-1 hover:cursor-pointer hover:bg-secondary disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-60"
        onClick={() => append({ text: "" })}
      >
        <Icon name="plus" className="size-6" />
      </div>
    </>
  );
}
