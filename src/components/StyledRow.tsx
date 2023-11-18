import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { tDriverInfo } from "../../App";

type driverInfoRowProps = {
  driverInfo: tDriverInfo;
  onDriverSelect: (id: string) => void;
};

/** Rows for the driver info */
export const StyledDriverInfoRow = ({
  driverInfo,
  onDriverSelect,
}: driverInfoRowProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onDriverSelect(driverInfo.id);
      }}
      style={styles.rowContainer}
    >
      <View style={styles.nameContainer}>
        <Text>{driverInfo.name}</Text>
      </View>
      <View style={styles.phoneContainer}>
        <Text>{driverInfo.phone}</Text>
      </View>
      <View style={styles.regoContainer}>
        <Text>{driverInfo.rego}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 4,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  nameContainer: {
    flex: 2,
    paddingLeft: 8,
  },
  phoneContainer: {
    flex: 2,
  },
  regoContainer: {
    flex: 1,
  },
});
