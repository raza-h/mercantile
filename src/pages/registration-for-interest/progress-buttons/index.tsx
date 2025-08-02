import { Dispatch, FC, SetStateAction } from "react";
import styles from "./index.module.scss";
import { Button, Flex } from "antd";

const ProgressButtons: FC<{
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  handleSubmit?: () => void;
  loading?: boolean;
}> = ({
  step = 1,
  setStep = () => {},
  handleSubmit = () => {},
  loading = false,
}) => (
  <Flex gap={4} className={styles.button}>
    {step === 2 && !loading && <Button onClick={() => setStep(1)}>Back</Button>}
    {step !== 3 && (
      <Button type="primary" onClick={() => handleSubmit()} loading={loading}>
        {step === 2 ? "Submit" : "Next"}
      </Button>
    )}
  </Flex>
);

export default ProgressButtons;
