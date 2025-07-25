import { perfumesClass200 } from "./perfumes/perfumesClass200";
import { perfumesClass300 } from "./perfumes/perfumesClass300";
import { perfumesClass400 } from "./perfumes/perfumesClass400";
import { perfumesClass500 } from "./perfumes/perfumesClass500";

export const Perfumes = [
  ...(perfumesClass200 || []),
  ...(perfumesClass300 || []),
  ...(perfumesClass400 || []),
  ...(perfumesClass500 || []),
];

export const PerfumesForQuiz = Perfumes.map((perfume) => ({
  id: perfume?.id,
  sku: perfume?.sku,
  titleEn: perfume?.titleEn,
  titleAr: perfume?.titleAr,
  descriptionEnShort: perfume?.descriptionEnShort,
  descriptionArShort: perfume?.descriptionArShort,
  gender: perfume?.gender,
  descriptionEnLong: perfume?.descriptionEnLong,
  descriptionArLong: perfume?.descriptionArLong,
}));