//helper function for getting the id from the url tag frp, swapi.dev
export const getId = (url: string) => {
  return url.split("/")[url.split("/").length - 2];
};
