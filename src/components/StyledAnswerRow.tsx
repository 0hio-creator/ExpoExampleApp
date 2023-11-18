import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const QUESTIONS = {
  speedingTickets: "Have you had any speeding tickets in the last year?",
  vehicleServiced: "Has your vehicle been serviced in the last 6 months?",
  consumedAlcohol: "Have you consumed any alcohol in the last 6 hours?",
};

type answerRowProps = {
  question: "speedingTickets" | "vehicleServiced" | "consumedAlcohol";
  answer: boolean;
};

export const StyledAnswerRow = ({ question, answer }: answerRowProps) => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.questionContainer}>
        <Text>{QUESTIONS[question]}</Text>
      </View>
      <View style={styles.answerContainer}>
        <Text style={styles.answerText}>{answer ? "Yes" : "No "}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 8,
    marginTop: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  questionContainer: {
    flex: 4,
    paddingLeft: 8,
  },
  answerContainer: {
    paddingLeft: 4,
    flex: 1,
  },
  answerText: {
    fontWeight: "bold",
  },
});
