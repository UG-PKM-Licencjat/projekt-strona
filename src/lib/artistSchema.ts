import { z } from "zod";

const fileSchema = z
  .instanceof(File)
  .and(z.object({ url: z.string(), key: z.string() }));

export const artistSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Tytuł musi mieć co najmniej 3 znaki." })
    .max(100, { message: "Tytuł nie może przekraczać 100 znaków." }),
  shortDescription: z
    .string()
    .min(3, { message: "Opis musi mieć co najmniej 3 znaki." })
    .max(400, { message: "Opis nie może przekraczać 400 znaków." }),
  longDescription: z
    .string({ message: "Opis musi mieć co najmniej 10 znaków." })
    .min(10, { message: "Opis musi mieć co najmniej 10 znaków." })
    .max(4000, { message: "Opis nie może przekraczać 4000 znaków." }),
  longDescriptionHTML: z.string().optional(),
  locationName: z
    .string({ message: "Lokalizacja jest wymagane." })
    .min(1, { message: "Lokalizacja jest wymagana." }),
  locationPlaceholder: z.string(),
  location: z.object({
    x: z.number(),
    y: z.number(),
  }),
  distance: z
    .number()
    .min(0, { message: "Odległość musi być dodatnia." })
    .max(600, { message: "Odległość nie może przekraczać 600 km." }),
  tags: z
    .array(z.object({ id: z.number(), name: z.string() }), {
      message: "Musisz wybrać chociaż 1 tag.",
    })
    .min(1, { message: "Musisz wybrać chociaż 1 tag." })
    .max(5, { message: "Możesz wybrać maksymalnie 5 tagów." }),
  files: z.array(fileSchema).optional(),
  price: z
    .string()
    .regex(/^\d{1,9}(\,\d{1,2})?$/, {
      message:
        "Cena powinna być podana w formacie 12345,50 i nie przekraczać 999 999 999,99 zł",
    })
    .optional(),
});

export type ArtistFormData = z.infer<typeof artistSchema>;
