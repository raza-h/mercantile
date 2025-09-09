import { Flex, Image } from "antd";
import { Header } from "antd/es/layout/layout";
import { authorizedDistributor, mercantileLogo } from "../../assets";
import styles from "./index.module.scss";

const TopHeader = () => {
  return (
    <Header className={styles.header}>
      <Image
        src={"https://www.epanorama.pk/images/thumbs/0000110_Header-Logo.png"}
        preview={false}
        width={200}
        fetchPriority={'high'}
      />
      <Flex gap={8}>
        <Image
          src={mercantileLogo}
          preview={false}
          width={80}
          loading="lazy"
        />
        <Image
          src={authorizedDistributor}
          color="white"
          preview={false}
          width={80}
          loading="lazy"
        />
      </Flex>
    </Header>
  );
};

export default TopHeader;
