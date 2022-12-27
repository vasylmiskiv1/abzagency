import { Formik } from "formik";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import * as yup from "yup";
import "yup-phone";
import { TextField } from "@mui/material";
import { grey, red } from "@mui/material/colors";

import {
  checkIfFilesAreCorrectType,
  checkIfFileIsTooBig,
} from "../helpers/photoValidation";
import { addUser } from "../api/usersApi";

import Button from "../components/Button";
import { ReactComponent as SuccessImage } from "../assets/success-image.svg";
import { addCheckedStatus } from "../helpers/buttonsStatus";

const CreateUser = ({ onUpdateUsers }: CreateUserProps) => {
  const [image, setImage] = useState<ImageFile | null>();
  const [imageError, setImageError] = useState("");
  const [positions, setPositions] = useState<PositionToUpdate[]>([]);
  const [isFormNotCompleted, setIsFormNotCompleted] = useState(true);
  const [isShowedLoader, setIsShowedLoader] = useState(false);
  const [isShowedSuccess, setIsShowedSuccess] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_POSITIONS_API_URL}`)
      .then((res) => res.json())
      .then((data) => {
        const positions = addCheckedStatus(data.positions);
        setPositions(positions);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (isShowedSuccess) {
      setTimeout(() => {
        setIsShowedSuccess(false);
      }, 3000);
    }
  }, [isShowedSuccess]);

  useEffect(() => {
    const ImageValidationList = [
      checkIfFilesAreCorrectType,
      checkIfFileIsTooBig,
    ];

    if (image) {
      for (const validation of ImageValidationList) {
        if (validation(image)) {
          setImageError(validation(image));
          break;
        }

        setImageError("");
      }
    }
  }, [image]);

  const handleUplaodImage = (photo: ImageFile) => setImage(photo);

  const handleSubmit = async (values: FormikValues, resetForm: () => void) => {
    setIsShowedLoader(true);
    const { name, email, phone, position } = values;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("position_id", Number(position) as any);
    formData.append("photo", image as any);

    addUser(
      formData,
      setIsShowedSuccess,
      setImage,
      setIsShowedLoader,
      resetForm,
      onUpdateUsers
    );
  };

  const checkIsFormValid = (values: FormikValues) => {
    const isFormNotCompleted = !Object.values(values).every((x) => x !== "");
    !isFormNotCompleted && setIsFormNotCompleted(false);
  };

  const setRadioButtonChecked = (id: number) => {
    const setRadioChecked = positions.map((position) =>
      position.id === id
        ? { ...position, isChecked: true }
        : { ...position, isChecked: false }
    );
    setPositions(setRadioChecked);
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[A-Za-z ]*$/, "Please enter valid name")
      .min(2, "Please enter a full name")
      .max(20, "Name is too long")
      .required("Input is required"),
    email: yup
      .string()
      .email("Please enter a correct emal address")
      .required("Input is required"),
    phone: yup
      .string()
      .required("Input is required")
      .matches(/^(^\+380?)/, "Number should start from +380")
      .phone("UA"),
    position: yup.string().required("Please choose your position"),
  });

  return (
    <div className="pt-36 pb-20">
      <h1 className="text-5xl text-center max-sm:px-10">
        Working with POST request
      </h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          position: "",
          photo: "",
        }}
        validateOnChange
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const inputBorderColorDefault = grey[500];
          const inputBorderColorError = red[500];

          const textFieldStyleDefault = {
            marginTop: "20px",
            backgroundColor: "#f8fafc",
            "& label.Mui-focused": {
              color: inputBorderColorDefault,
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                border: `1px solid ${inputBorderColorDefault}`,
              },
            },
          };

          const textFieldStyleError = {
            marginTop: "20px",
            backgroundColor: "#ffff",
            "& label.Mui-focused": {
              color: inputBorderColorError,
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                border: `1px solid ${inputBorderColorError}`,
              },
            },
          };

          return (
            <div className="relative flex flex-col max-w-[485px] m-auto items-center">
              {isShowedLoader && (
                <div className="absolute w-full h-full flex items-center justify-center">
                  <TailSpin
                    height="80"
                    width="80"
                    color="#0891b2"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                  />
                </div>
              )}
              {isShowedSuccess ? (
                <>
                  <SuccessImage className="mt-32" />
                  <p className="text-4xl mt-20 text-center">
                    User has successfully created
                  </p>
                </>
              ) : (
                <form
                  id="create-user"
                  className="flex flex-col w-full px-4 py-8"
                >
                  <TextField
                    label="Your name"
                    name="name"
                    variant="outlined"
                    sx={
                      errors.name && values.name.length
                        ? textFieldStyleError
                        : textFieldStyleDefault
                    }
                    onChange={(e) => {
                      handleChange(e);
                      checkIsFormValid(values);
                    }}
                    onBlur={handleBlur}
                    defaultValue={values.name}
                  />
                  <p
                    className={`${
                      errors.name && (values.name.length || touched.name)
                        ? `visible text-error`
                        : `invisible`
                    } h-8 px-4 text-sm`}
                  >
                    {errors.name}
                  </p>
                  <TextField
                    label="Your email"
                    name="email"
                    variant="outlined"
                    sx={
                      errors.email && values.email.length
                        ? textFieldStyleError
                        : textFieldStyleDefault
                    }
                    onChange={(e) => {
                      handleChange(e);
                      checkIsFormValid(values);
                    }}
                    onBlur={handleBlur}
                    defaultValue={values.email}
                  />
                  <p
                    className={`${
                      errors.email && (values.email.length || touched.email)
                        ? `visible text-error`
                        : `invisible`
                    } h-8 px-4 text-sm`}
                  >
                    {errors.email}
                  </p>
                  <TextField
                    id="phone-input"
                    label="Phone"
                    name="phone"
                    variant="outlined"
                    sx={
                      errors.phone && values.phone.length
                        ? textFieldStyleError
                        : textFieldStyleDefault
                    }
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      checkIsFormValid(values);
                    }}
                    defaultValue={values.phone}
                  />
                  <p
                    className={`${
                      errors.phone && (values.phone.length || touched.phone)
                        ? `visible text-error`
                        : `invisible`
                    } h-8 px-4 text-sm`}
                  >
                    {errors.phone}
                  </p>

                  <div className="text-lg mt-4">Select your position</div>
                  {positions.length &&
                    positions.map((position: PositionToUpdate) => (
                      <div
                        className="text-lg mt-2 flex gap-3"
                        key={position.id}
                      >
                        <input
                          id={`${position.name
                            .replace(/\s+/g, "-")
                            .toLowerCase()}-radio`}
                          checked={position.isChecked}
                          className="h-[18px] w-[18px] mt-1"
                          type="radio"
                          name="position"
                          value={position.id.toString()}
                          onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            setRadioButtonChecked(position.id);
                            handleChange(e);
                            checkIsFormValid(values);
                          }}
                        />
                        <label
                          htmlFor={`${position.name
                            .replace(/\s+/g, "-")
                            .toLowerCase()}-radio`}
                        >
                          {position.name}
                        </label>
                      </div>
                    ))}
                  <p
                    className={`${
                      errors.position && touched.position
                        ? `visible text-error`
                        : `invisible`
                    } h-8`}
                  >
                    {errors.position}
                  </p>

                  <div className="mt-4 flex">
                    <input
                      type="file"
                      className="hidden"
                      id="photo-input"
                      name="photo"
                      accept="image/jpg, image/jpeg"
                      onChange={(e) => {
                        if (e.target.files) {
                          handleUplaodImage(e.target.files[0]);
                          values.photo = e.target.files[0].name;
                        }
                        checkIsFormValid(values);
                      }}
                    />
                    <button
                      type="button"
                      className={`p-4 rounded-l border-black border ${
                        imageError && `border-2 border-red-500`
                      }`}
                      onClick={() =>
                        document.getElementById("photo-input")?.click()
                      }
                    >
                      Upload
                    </button>
                    <input
                      type="text"
                      className={`w-full p-4 bg-background outline-none border-r border-b border-t rounded-r ${
                        imageError ? `border-red-500` : `border-input-border`
                      }`}
                      placeholder={`${
                        image?.name ? image.name : `Upload your photo`
                      }`}
                      readOnly
                    />
                  </div>
                  <p className="h-8 text-red-500">{imageError}</p>
                  <Button
                    text="Sign up"
                    type="submit"
                    onSubmit={(e: React.FormEvent) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                    disabled={isFormNotCompleted}
                  />
                </form>
              )}
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateUser;
