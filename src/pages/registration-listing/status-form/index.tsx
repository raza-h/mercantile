import { Formik, FormikProps, FormikValues } from "formik";
import {
  Dispatch,
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  SetStateAction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Select from "../../../common/select";
import { formatStatusOptions } from "../registration-listing-constants";
import {
  getRegistrationStatus,
  updateRegistrationStatus,
} from "../../../apis/registrations";
import { showErrorToast } from "../../../utils/common";
import { Skeleton } from "antd";
import dayjs from "dayjs";
import { statuses } from "../../../constants/generic";
import { RegistrationDTO } from "../../../types/registration";
import { FormRef } from "../../../types/formik";

type StatusFormProps = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  closeModal: () => void;
  updateRegistrations: Dispatch<SetStateAction<RegistrationDTO[]>>;
  registrations: RegistrationDTO[];
  registration: RegistrationDTO | null;
}

const StatusForm = forwardRef<
  FormRef,
  StatusFormProps
>(
  (
    {
      registration,
      setLoading = () => {},
      closeModal = () => {},
      updateRegistrations = () => {},
      registrations = [],
    },
    ref: ForwardedRef<FormRef>
  ) => {
    const formikRef = useRef<FormikProps<FormikValues>>(null);
    const [status, setStatus] = useState(undefined);
    const [fetchLoading, setFetchLoading] = useState(false);

    useEffect(() => {
      const fetchCurrentStatus = async () => {
        try {
          setFetchLoading(true);
          if (registration?.id) {
            const currentStatus = await getRegistrationStatus(registration?.id);
            setStatus(currentStatus);
          } else {
            throw "Registration does not exist";
          }
        } catch (error: unknown) {
          showErrorToast({ action: "fetching current status", error });
        } finally {
          setFetchLoading(false);
        }
      };

      fetchCurrentStatus();
    }, [setFetchLoading, setStatus, registration?.id]);

    const changeStatus = async (values: FormikValues) => {
      try {
        setLoading(true);
        if (registration?.id) {
          const success = await updateRegistrationStatus(
            registration?.id,
            values
          );
          if (success) {
            const newRegistrations = [...registrations];
            const currentRegistrationIndex = registrations.findIndex(
              (item: RegistrationDTO) => item.id === registration?.id
            );
            newRegistrations[currentRegistrationIndex].status = values.status;
            newRegistrations[currentRegistrationIndex].updated_at =
              dayjs().format();
            if (currentRegistrationIndex >= 0) {
              updateRegistrations(newRegistrations);
            }
            closeModal();
          }
        } else {
          throw "Registration does not exist";
        }
      } catch (error: unknown) {
        showErrorToast({ action: "updating status", error });
      } finally {
        setLoading(false);
      }
    };

    useImperativeHandle<FormRef, FormRef>(ref, () => ({
      submit: () => {
        formikRef.current?.submitForm();
      },
    }));

    return fetchLoading ? (
      <Skeleton active />
    ) : (
      <Formik
        initialValues={{ status }}
        onSubmit={changeStatus}
        innerRef={formikRef}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <div style={{ padding: "2rem" }}>
            <Select
              label="Select Status"
              value={values.status}
              onChange={(value) => setFieldValue("status", value)}
              name="status"
              options={formatStatusOptions(statuses)}
              errorMsg={touched?.status && errors?.status && errors?.status}
            />
          </div>
        )}
      </Formik>
    );
  }
);

export default StatusForm as ForwardRefExoticComponent<PropsWithoutRef<StatusFormProps> & RefAttributes<FormRef>>;
