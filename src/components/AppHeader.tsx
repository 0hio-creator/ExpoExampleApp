import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { tSortStratergy } from "../functions/sortDrivers";

type tSortField = {
  sortStrategy: tSortStratergy;
  field: tSortStratergy;
};

/** Visible indicator of selected sort strategy*/
const SelectedSortField = ({ field, sortStrategy }: tSortField) => {
  if (field != sortStrategy && field + "Reverse" != sortStrategy) {
    return null;
  }
  return (
    <Entypo
      name={field == sortStrategy ? "chevron-down" : "chevron-up"}
      size={24}
      color="black"
    />
  );
};
type Props = {
  sortStrategy: tSortStratergy;
  setSortStrategy: React.Dispatch<React.SetStateAction<tSortStratergy>>;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};
export const AppHeader = ({
  sortStrategy,
  setSortStrategy,
  setFilter,
}: Props) => {
  const onPressSortStratergy = (
    sortStrategy: tSortStratergy,
    field: tSortStratergy
  ) => {
    if (sortStrategy == field) {
      const newField = (field + "Reverse") as tSortStratergy;
      setSortStrategy(newField);
    } else {
      setSortStrategy(field);
    }
  };
  const onChangeText = (text: string) => {
    if (text.length == 0) {
      setFilter(undefined);
    } else {
      setFilter(text);
    }
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Driver Information</Text>
      <Text style={styles.subHeadig}>Search:</Text>
      <TextInput
        onChangeText={(text) => {
          onChangeText(text);
        }}
        placeholder="Search by name, phone number or rego"
        style={{
          backgroundColor: "white",
          marginTop: 4,
          marginBottom: 8,
          borderRadius: 8,
          padding: 4,
        }}
      />
      <View style={styles.sortRow}>
        <View style={styles.nameContainer}>
          <TouchableOpacity
            onPress={() => {
              onPressSortStratergy(sortStrategy, "name");
            }}
            style={styles.sortTouchable}
          >
            <Text style={styles.rowHeading}>Name</Text>
            <SelectedSortField sortStrategy={sortStrategy} field={"name"} />
          </TouchableOpacity>
        </View>
        <View style={styles.phoneContainer}>
          <TouchableOpacity
            onPress={() => {
              onPressSortStratergy(sortStrategy, "phone");
            }}
            style={styles.sortTouchable}
          >
            <Text style={styles.rowHeading}>Phone</Text>
            <SelectedSortField sortStrategy={sortStrategy} field={"phone"} />
          </TouchableOpacity>
        </View>
        <View style={styles.regoContainer}>
          <TouchableOpacity
            onPress={() => {
              onPressSortStratergy(sortStrategy, "rego");
            }}
            style={styles.sortTouchable}
          >
            <Text style={styles.rowHeading}>Rego</Text>
            <SelectedSortField sortStrategy={sortStrategy} field={"rego"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 64,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subHeadig: {
    marginTop: 8,
    fontWeight: "bold",
  },
  rowHeading: {
    //marginTop: 8,
    fontWeight: "bold",
  },
  sortRow: {
    flexDirection: "row",
    height: 24,
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
  sortTouchable: {
    flexDirection: "row",
    alignItems: "center",
    height: 24,
  },
});
