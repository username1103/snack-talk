export const palette = {
  white500: "#fefefe",
  yellow500: "#ffc00a",
  blue500: "#0a49ff",
  red500: "#ff6842",
  green500: "#98e263",
};

export const theme = {
  neutral: palette.white500,
  primary: palette.yellow500,
  secondary: palette.blue500,
  error: palette.red500,
  success: palette.green500,
};

export const color = {
  ...theme,
  palette,
};
