import {
  tAllDriversData,
  tAllSafetyAnswers,
  tDriversSafetyAnswers,
  tDriverInfo,
} from "../../App";

/** returns the drivers risk rating based on 3 yes/no questions */
export const getRiskRating = (safetyAnswers: tDriversSafetyAnswers): number => {
  return (
    3 * Number(safetyAnswers.speedingTickets) +
    Number(!safetyAnswers.vehicleServiced) +
    2 * Number(safetyAnswers.consumedAlcohol)
  );
};

export type tAllInfoForADriver =
  | tDriverInfo &
      tDriversSafetyAnswers & {
        riskRating: number;
      };

/** gets all the info for a specifed driver in one place*/
export const getAllInfoForADriver = (
  id: string,
  allSafetyAnswers: tAllSafetyAnswers,
  allDriversData: tAllDriversData
): tAllInfoForADriver => {
  const driverData = allDriversData.find((item) => item.id === id);
  const safetyAnswers = allSafetyAnswers.find((item) => item.id === id);

  return {
    ...driverData,
    ...safetyAnswers,
    riskRating: getRiskRating(safetyAnswers),
  };
};
