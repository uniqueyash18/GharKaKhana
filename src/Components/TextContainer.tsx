import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import colors from "../styles/colors";
import { scale } from "react-native-size-matters";
import fontFamily from "../styles/fontFamily";

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: scale(14),
    fontFamily: fontFamily.ProximaNovaRegular,
    color: colors.black,
  },
});

interface TextContainterProps extends TextProps {
  text: string | "";
  style?: any;
  isDynamicText?: boolean;
}

const TextContainer: React.FC<TextContainterProps> = ({
  text,
  isDynamicText = false,
  style = {},
  ...rest
}) => {
  const { t } = useTranslation();
  return (
    <Text style={[styles.sectionTitle, style]} {...rest}>
      {isDynamicText ? text : t(text)}
    </Text>
  );
};

export default React.memo(TextContainer);
