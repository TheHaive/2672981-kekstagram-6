let currentData = {};
export const setState = (data) => {
  currentData = data;
};
export const getState = () => currentData;
