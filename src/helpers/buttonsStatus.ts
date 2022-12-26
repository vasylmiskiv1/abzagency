export const addCheckedStatus = (positions: PositionFromServer[]) => {
  return positions.map((position: PositionFromServer) =>
    position.id !== 1
      ? { ...position, isChecked: false }
      : { ...position, isChecked: true }
  );
};
