import { z } from "zod";

const offerSchema = z
  .object({
    price: z
      .number({
        message: "Cena powinna być podana w formacie 123456.50",
      })
      .step(0.01, {
        message: "Cena powinna być podana w formacie 123456.50",
      })
      .positive({
        message: "Cena powinna być podana w formacie 123456.50",
      })
      .max(999999999, {
        message: "Cena nie może przekraczać 999 999 999 zł",
      }),
    tags: z
      .array(z.object({ name: z.string(), id: z.string() }))
      .nonempty({ message: "Musisz dodać co najmniej jeden tag" }),
    about: z.array(z.object({ text: z.string() })),
    skills: z.array(z.object({ text: z.string() })),
    links: z.array(
      z.object({
        text: z.string().url({ message: "Wklej poprawny link" }),
      }),
    ),
  })
  .required();

type FormData = z.infer<typeof offerSchema>;

export { offerSchema, type FormData };
