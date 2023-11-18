import React from "react";
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { tAllInfoForADriver } from "../functions/driverInfo";
import { StyleSheet, Text, View } from "react-native";
import { StyledAnswerRow } from "./StyledAnswerRow";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  selectedDriverInfo: tAllInfoForADriver;
  onCloseModal: () => void;
};

/** Modal for displaying detailed info regarding a selected driver */
export const DriverDetailModal = ({
  selectedDriverInfo,
  onCloseModal,
}: Props) => {
  const { styles } = useStyles(selectedDriverInfo?.riskRating);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={selectedDriverInfo != undefined}
    >
      <TouchableWithoutFeedback onPress={onCloseModal}>
        <View style={styles.modalBackground}>
          {selectedDriverInfo !== undefined && (
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={onCloseModal}
                >
                  <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.heading}>{"Driver Profile"}</Text>
                <Text style={styles.subHeading}>{"Name: "}</Text>
                <View style={styles.infoContainer}>
                  <Text>{selectedDriverInfo.name || "N/A"}</Text>
                </View>
                <Text style={styles.subHeading}>{"Phone Number: "}</Text>
                <View style={styles.infoContainer}>
                  <Text>{selectedDriverInfo.phone || "N/A"}</Text>
                </View>
                <Text style={styles.subHeading}>{"Registration: "}</Text>
                <View style={styles.infoContainer}>
                  <Text>{selectedDriverInfo.rego || "N/A"}</Text>
                </View>

                <View style={styles.riskRatingContainer}>
                  <Text style={styles.riskRating}>
                    {selectedDriverInfo.riskRating.toString()}
                  </Text>
                </View>
                <Text style={styles.riskRatingSubHeading}>{"Risk rating"}</Text>
                <Text style={styles.subHeading}>{"Safety Answers"}</Text>
                <StyledAnswerRow
                  question="speedingTickets"
                  answer={selectedDriverInfo.speedingTickets}
                />
                <StyledAnswerRow
                  question="vehicleServiced"
                  answer={selectedDriverInfo.vehicleServiced}
                />
                <StyledAnswerRow
                  question="consumedAlcohol"
                  answer={selectedDriverInfo.consumedAlcohol}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const useStyles = (riskRating: number | undefined) => {
  const styles = StyleSheet.create({
    modalBackground: { flex: 1, backgroundColor: "rgba(52, 52, 52, 0.8)" },
    modalContainer: {
      position: "absolute",
      bottom: 0,
      backgroundColor: "#F0EAD6",
      width: "90%",
      height: "85%",
      alignSelf: "center",
      paddingBottom: 128,
      paddingHorizontal: 16,
      paddingTop: 32,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
    },
    closeButton: {
      position: "absolute",
      right: 16,
      top: 16,
      height: 32,
      width: 32,
      justifyContent: "center",
      alignItems: "center",
    },
    heading: {
      paddingTop: 12,
      fontSize: 32,
      fontWeight: "bold",
    },
    riskRatingContainer: {
      backgroundColor: "white",
      width: 64,
      height: 64,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      marginTop: 16,
    },
    riskRating: {
      fontSize: 48,
      color: riskRating == 0 ? "green" : riskRating <= 3 ? "orange" : "red",
    },
    subHeading: {
      fontWeight: "bold",
      marginTop: 8,
    },
    riskRatingSubHeading: {
      fontWeight: "bold",
      marginTop: 8,
      alignSelf: "center",
    },
    infoContainer: {
      backgroundColor: "white",
      width: "80%",
      borderRadius: 16,
      padding: 8,
      marginTop: 8,
    },
  });

  return { styles };
};
