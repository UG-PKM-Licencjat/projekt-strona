import { z } from "zod";

const offerSchema = z
  .object({
    price: z.string().regex(/^\d{1,9}(\,\d{1,2})?$/, {
      message:
        "Cena powinna być podana w formacie 12345,50 i nie przekraczać 999 999 999,99 zł",
    }),
    tags: z
      .array(z.object({ name: z.string(), id: z.string() }))
      .nonempty({ message: "Musisz dodać co najmniej jeden tag" }),
    about: z.array(
      z.object({
        text: z.string().min(1, { message: "Pole nie może być puste" }),
      }),
    ),
    skills: z.array(
      z.object({
        text: z.string().min(1, { message: "Pole nie może być puste" }),
      }),
    ),
    files: z.array(
      z.object({
        url: z.string(),
        type: z.string(),
      }),
    ),
    links: z.array(
      z.object({
        text: z.string().url({ message: "Wklej poprawny link" }),
      }),
    ),
  })
  .required();

type FormData = z.infer<typeof offerSchema>;

export { offerSchema, type FormData };
