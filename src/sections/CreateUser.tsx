import { Formik } from "formik";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import * as yup from "yup";
import "yup-phone";

import Button from "../components/Button";
import { ReactComponent as SuccessImage } from "../assets/success-image.svg";

interface ImageFile extends File {
  lastModified: number;
}

const CreateUser = ({ onGetUsers }: any) => {
  const [image, setImage] = useState<ImageFile | null>();
  const [positions, setPositions] = useState<any>([]);
  const [isFormNotCompleted, setIsFormNotCompleted] = useState(true);
  const [isShowedLoader, setIsShowedLoader] = useState(false);
  const [isShowedSuccess, setIsShowedSuccess] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_POSITIONS_API_URL}`)
      .then((res) => res.json())
      .then((data) => setPositions(data.positions))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (isShowedSuccess) {
      setTimeout(() => {
        setIsShowedSuccess(false);
      }, 3000);
    }
  }, [isShowedSuccess]);

  const handleUplaodImage = (photo: ImageFile) => setImage(photo);

  const handleSubmit = async (values: any, resetForm: any) => {
    setIsShowedLoader(true);
    const { name, email, phone, position } = values;

    const formData: any = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("position_id", Number(position));
    formData.append("photo", image);

    fetch(`${process.env.REACT_APP_USERS_API_URL}`, {
      method: "POST",
      headers: {
        Token: sessionStorage.getItem("abzagency_token") || "",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsShowedSuccess(true);
          onGetUsers();
          resetForm();
          setImage(null);
        }
      })
      .finally(() => {
        setIsShowedLoader(false);
      })
      .catch((e) => console.log(e));
  };

  const checkIfFilesAreTooBig = (): boolean => {
    let isValid = true;

    if (image) {
      const size = image.size / 1024 / 1024;

      if (size > 10) {
        isValid = false;
      }
    }

    return isValid;
  };

  const checkIfFilesAreCorrectType = (): boolean => {
    let isValid = true;

    if (image) {
      if (!["image/jpg", "image/jpeg"].includes(image.type)) {
        isValid = false;
      }
    }
    return isValid;
  };

  const checkIsFormValid = (values: any) => {
    console.log(values);
    const isFormNotCompleted = !Object.values(values).every((x) => x !== "");
    !isFormNotCompleted && setIsFormNotCompleted(false);
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
      .matches(/^(^\+380?)/, "Number should start from +380")
      .phone("UA")
      .required(),
    position: yup.string().required("Please choose your position"),
    photo: yup
      .mixed()
      .nullable()
      .test(
        "is-correct-file",
        "VALIDATION_FIELD_FILE_BIG",
        checkIfFilesAreTooBig
      )
      .test(
        "is-big-file",
        "Wrong type of image. Should be used jpg/jpeg files",
        checkIfFilesAreCorrectType
      ),
  });

  return (
    <div className="pt-36 pb-32">
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
        }) => (
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
              <form id="create-user" className="flex flex-col w-full px-4">
                <input
                  type="name"
                  name="name"
                  placeholder="Your name"
                  onChange={(e) => {
                    handleChange(e);
                    checkIsFormValid(values);
                  }}
                  onBlur={handleBlur}
                  value={values.name}
                  className="border border py-4 mt-12 px-3 outline-none rounded"
                />
                <p
                  className={`${
                    errors.name && touched.name
                      ? `visible text-error`
                      : `invisible`
                  }`}
                >
                  {errors.name ? errors.name : `some error`}
                </p>

                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  onChange={(e) => {
                    handleChange(e);
                    checkIsFormValid(values);
                  }}
                  onBlur={handleBlur}
                  value={values.email}
                  className="border border py-4 mt-8 px-3 outline-none rounded"
                />
                <p
                  className={`${
                    errors.email && touched.email
                      ? `visible text-error`
                      : `invisible`
                  }`}
                >
                  {errors.email ? errors.email : `some error`}
                </p>

                <input
                  type="phone"
                  name="phone"
                  placeholder="Phone"
                  onChange={(e) => {
                    handleChange(e);
                    checkIsFormValid(values);
                  }}
                  onBlur={handleBlur}
                  value={values.phone}
                  className="border border py-4 mt-8 px-3 outline-none rounded"
                />
                <p
                  className={`${
                    errors.phone && touched.phone
                      ? `visible text-error`
                      : `invisible`
                  }`}
                >
                  {errors.phone ? errors.phone : `some error`}
                </p>

                <div className="text-lg mt-8">Select your position</div>
                {positions.length &&
                  positions.map((position: any) => (
                    <>
                      <div className="text-lg mt-2 flex gap-3">
                        <input
                          id={`${position.name
                            .replace(/\s+/g, "-")
                            .toLowerCase()}-radio`}
                          className="h-[18px] w-[18px] mt-1"
                          type="radio"
                          name="position"
                          value={position.id.toString()}
                          onChange={(e: any) => {
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
                    </>
                  ))}
                <p
                  className={`${
                    errors.position && touched.position
                      ? `visible text-error`
                      : `invisible`
                  }`}
                >
                  {errors.position ? errors.position : `some error`}
                </p>

                <div className="mt-8 flex">
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
                    className="p-4 rounded-l border border-black"
                    onClick={() =>
                      document.getElementById("photo-input")?.click()
                    }
                  >
                    Upload
                  </button>
                  <input
                    type="text"
                    className="w-full p-4 outline-none border-r border-b border-t rounded-r "
                    placeholder={`${
                      image?.name ? image.name : `Upload your photo`
                    }`}
                    readOnly
                  />
                </div>
                <p
                  className={`${
                    errors.photo ? `visible text-error` : `invisible`
                  }`}
                >
                  {errors.photo ? errors.photo : `some error`}
                </p>
                <Button
                  text="Sign up"
                  type="submit"
                  onSubmit={(e: any) => {
                    e.preventDefault();
                    handleSubmit();
                    console.log(errors);
                  }}
                  disabled={isFormNotCompleted}
                />
              </form>
            )}
          </div>
        )}
      </Formik>
    </div>
  );
};

export default CreateUser;
