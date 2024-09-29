import { Image } from 'antd';
import { Header } from 'antd/es/layout/layout'
import { authorizedDistributor } from '../../assets';
import styles from './index.module.scss';

const TopHeader = () => {
  return (
    <Header className={styles.header}>
        <Image src={'https://mercantile.com.pk/assets/images/logo.svg'} preview={false} width={150} />
        <Image src={authorizedDistributor} color="white" preview={false} width={150} />
    </Header>
  )
}

export default TopHeader;