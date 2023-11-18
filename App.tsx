import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { StyledDriverInfoRow } from "./src/components/StyledRow";
import {
  tAllInfoForADriver,
  getAllInfoForADriver,
} from "./src/functions/driverInfo";
import { DriverDetailModal } from "./src/components/DriverDetailModal";
import { AppHeader } from "./src/components/AppHeader";
import { sortDrivers, tSortStratergy } from "./src/functions/sortDrivers";
import {
  fetchDriverData,
  tAllDriversData,
  tAllSafetyAnswers,
  tDriverInfo,
} from "./src/hooks/useFetchDriverData";

const App = () => {
  const [driverInfo, setDriverInfo] = useState<tAllDriversData>([]);
  const [driverSafeyAnswers, setDriverSafeyAnswers] =
    useState<tAllSafetyAnswers>([]);
  const [selectedDriverInfo, setSelectedDriverInfo] =
    useState<tAllInfoForADriver>(undefined);
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [sortStrategy, setSortStrategy] = useState<tSortStratergy>("name");

  const { retrieveDriversData } = fetchDriverData();

  useEffect(() => {
    const getDriverData = async () => {
      const { driverData, safetyAnswerData } = await retrieveDriversData();
      setDriverInfo(driverData);
      setDriverSafeyAnswers(safetyAnswerData);
    };
    getDriverData();
  }, []);

  const onDriverSelect = (id: string) => {
    setSelectedDriverInfo(
      getAllInfoForADriver(id, driverSafeyAnswers, driverInfo)
    );
  };

  const onCloseModal = () => {
    setSelectedDriverInfo(undefined);
  };

  const checkMatching = (input: tDriverInfo) => {
    if (filter === undefined) {
      return true;
    }
    return (
      (input?.name || "").toLowerCase().search(filter.toLowerCase()) >= 0 ||
      (input?.phone || "").toLowerCase().search(filter.toLowerCase()) >= 0 ||
      (input?.rego || "").toLowerCase().search(filter.toLowerCase()) >= 0
    );
  };

  const filteredDriverInfo = driverInfo.filter(checkMatching);
  // applying a sorting strategy default is driver alphabetical
  const sortedDriverInfo = filteredDriverInfo.sort((a, b) =>
    sortDrivers[sortStrategy](a, b)
  );
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={sortedDriverInfo}
        initialNumToRender={12}
        ListHeaderComponent={
          <AppHeader
            sortStrategy={sortStrategy}
            setSortStrategy={setSortStrategy}
            setFilter={setFilter}
          />
        }
        renderItem={({ item }) => (
          <StyledDriverInfoRow
            onDriverSelect={onDriverSelect}
            driverInfo={item}
          />
        )}
      />
      <DriverDetailModal
        selectedDriverInfo={selectedDriverInfo}
        onCloseModal={onCloseModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0EAD6",
  },
});

export default App;
