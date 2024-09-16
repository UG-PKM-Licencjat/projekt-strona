import { z } from "zod";

export const artistSchema = z.object({
  name: z.string().min(3),
  shortDescription: z.string().min(3),
  longDescription: z.string().min(10),
  links: z.array(z.string()).optional(),
  location: z.string().optional(),
  price: z
    .string()
    .regex(/^\d{1,9}(\,\d{1,2})?$/, {
      message:
        "Cena powinna być podana w formacie 12345,50 i nie przekraczać 999 999 999,99 zł",
    })
    .optional(),
  gallery: z
    .array(
      z.object({
        url: z.string().url(),
        type: z.string(),
      }),
    )
    .optional(),
});

export type ArtistFormData = z.infer<typeof artistSchema>;
