export const formatPropertyName = (propertyName: string) => {
  return propertyName
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
