import { useEffect } from "react";

export type tDriversSafetyAnswers = {
  id: string;
  speedingTickets: boolean;
  vehicleServiced: boolean;
  consumedAlcohol: boolean;
};
export type tAllSafetyAnswers = Array<tDriversSafetyAnswers>;

export type tDriverInfo = {
  id: string;
  name: string;
  phone: string;
  rego: string;
};
export type tAllDriversData = Array<tDriverInfo>;

type tRetreiveData = {
  driverData: tAllDriversData;
  safetyAnswerData: tAllSafetyAnswers;
};

const DRIVER_ENDPOINT = "http://0.0.0.0:3000/drivers";
const SAFETY_ANSWER_ENDPOINT = "http://0.0.0.0:3000/safetyAnswers";

export const fetchDriverData = () => {
  const retrieveDriversData = async (): Promise<tRetreiveData> => {
    const responseDriverData = await fetch(DRIVER_ENDPOINT);
    const driverDataArr = (await responseDriverData.json()) as tAllDriversData;

    // tranfrom +61 phone numbers into 04.. for consistency
    const driverData = driverDataArr.map((value) => {
      if (value.phone && value.phone.substring(0, 3) === "+61") {
        return {
          ...value,
          phone: "0" + value.phone.substring(3, value.phone.length),
        };
      } else {
        return value;
      }
    });

    const reponsesafetyAnswersData = await fetch(SAFETY_ANSWER_ENDPOINT);
    const safetyAnswerData =
      (await reponsesafetyAnswersData.json()) as tAllSafetyAnswers;

    return { driverData, safetyAnswerData };
  };

  return { retrieveDriversData };
};
