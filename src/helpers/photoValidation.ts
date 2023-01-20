export const checkIfImageSizeIsValid = (
  image: File,
  setImageError: React.Dispatch<React.SetStateAction<string>>
) => {
  const reader = new FileReader();
  reader.readAsDataURL(image);

  reader.onload = function (e) {
    var image = new Image();
    image.src = e.target?.result as string;
    image.onload = function () {
      const minHeight = 70;
      const minWidth = 70;
      if (image.height < minHeight || image.width < minWidth) {
        setImageError(
          `Image size is small (${image.height}px x ${image.width}px). Image size should be more than ${minHeight}px x ${minWidth}px`
        );
      }
    };
  };
};

export const checkIfFileIsTooBig = (image: File): string => {
  let isValid = "";

  if (image) {
    const size = image.size / 1024 / 1024;

    if (size >= 5) {
      isValid = `File is too big (${size.toFixed(
        1
      )}mb). Image size shoud be less than 5mb`;
    }
  }

  return isValid;
};

export const checkIfFileIsCorrectType = (image: File): string => {
  let isValid = "";

  if (image) {
    if (!["image/jpg", "image/jpeg"].includes(image.type)) {
      isValid = "Wrong type of the image. Should be uploaded jpg/jpeg files";
    }
  }

  return isValid;
};
