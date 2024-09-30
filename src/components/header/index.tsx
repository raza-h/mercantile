import { Flex, Image } from "antd";
import { Header } from "antd/es/layout/layout";
import { authorizedDistributor } from "../../assets";
import styles from "./index.module.scss";

const TopHeader = () => {
  return (
    <Header className={styles.header}>
      <Image
        src={"https://www.epanorama.pk/images/thumbs/0000110_Header-Logo.png"}
        preview={false}
        width={200}
      />
      <Flex gap={8}>
        <Image
          src={"https://mercantile.com.pk/assets/images/logo.svg"}
          preview={false}
          width={80}
        />
        <Image
          src={authorizedDistributor}
          color="white"
          preview={false}
          width={80}
        />
      </Flex>
    </Header>
  );
};

export default TopHeader;
