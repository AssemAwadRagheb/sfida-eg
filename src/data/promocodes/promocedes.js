import { PrivatePromocodes } from "./private-promocodes/privatePromocode";
import { PublicPromocodes } from "./public-promocodes/publicPromocode";

export const Promocodes = [...PrivatePromocodes, ...PublicPromocodes];
