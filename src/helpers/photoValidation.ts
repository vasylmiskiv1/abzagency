export const checkIfFileIsTooBig = (image: File): string => {
  let isValid = "";

  if (image) {
    const size = image.size / 1024 / 1024;

    if (size >= 5) {
      isValid = `File is too big (${size.toFixed(1)}mb). Image size shoud be less than 5mb`;
    }
  }

  return isValid;
};

export const checkIfFilesAreCorrectType = (image: File): string => {
  let isValid = "";

  if (image) {
    if (!["image/jpg", "image/jpeg"].includes(image.type)) {
      isValid = "Wrong type of image. Should be used jpg/jpeg files";
    }
  }

  return isValid;
};
