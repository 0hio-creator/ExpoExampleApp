export type tSortStratergy =
  | "name"
  | "nameReverse"
  | "phone"
  | "phoneReverse"
  | "rego"
  | "regoReverse";

export const sortDrivers = {
  name: (a, b) => {
    return (a?.name || "").localeCompare(b?.name || "");
  },
  nameReverse: (a, b) => {
    return (b?.name || "").localeCompare(a?.name || "");
  },
  phone: (a, b) => {
    return (a?.phone || "").localeCompare(b?.phone || "");
  },
  phoneReverse: (a, b) => {
    return (b?.phone || "").localeCompare(a?.phone || "");
  },
  rego: (a, b) => {
    return (a?.rego || "").localeCompare(b?.rego || "");
  },
  regoReverse: (a, b) => {
    return (b?.rego || "").localeCompare(a?.rego || "");
  },
};
