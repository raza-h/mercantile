import { Formik, FormikValues } from "formik";
import {
  FC,
  forwardRef,
  ReactNode,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Select from "../../../common/select";
import {
  formatStatusOptions,
  statuses,
} from "../registration-listing-constants";
import {
  getRegistrationStatus,
  updateRegistrationStatus,
} from "../../../apis/registrations";
import { showErrorToast } from "../../../utils/common";
import { Skeleton } from "antd";
import dayjs from "dayjs";

const StatusForm: FC<any> = forwardRef(
  (
    {
      registration = {},
      setLoading = () => {},
      closeModal = () => {},
      updateRegistrations = () => {},
      registrations = [],
    },
    ref: Ref<ReactNode>
  ) => {
    const formikRef = useRef<any>(null);
    const [status, setStatus] = useState(undefined);
    const [fetchLoading, setFetchLoading] = useState(false);

    useEffect(() => {
      const fetchCurrentStatus = async () => {
        try {
          setFetchLoading(true);
          const currentStatus = await getRegistrationStatus(registration?.id);
          setStatus(currentStatus);
        } catch (error: any) {
          showErrorToast({ action: "fetching current status", error });
        } finally {
          setFetchLoading(false);
        }
      };

      fetchCurrentStatus();
    }, []);

    const changeStatus = async (values: FormikValues) => {
      try {
        setLoading(true);
        const success = await updateRegistrationStatus(
          registration?.id,
          values
        );
        if (success) {
          let newRegistrations = [...registrations];
          const currentRegistrationIndex = registrations.findIndex(
            (item: { [key: string]: any }) => item.id === registration?.id
          );
          newRegistrations[currentRegistrationIndex].status = values.status;
          newRegistrations[currentRegistrationIndex].updated_at =
            dayjs().format();
          currentRegistrationIndex >= 0 &&
            updateRegistrations(newRegistrations);
          closeModal();
        }
      } catch (error: any) {
        showErrorToast({ action: "updating status", error });
      } finally {
        setLoading(false);
      }
    };

    useImperativeHandle<any, any>(ref, () => ({
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

export default StatusForm;
