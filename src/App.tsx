import { Layout } from "antd"
import { FC } from "react"
import './index.scss';
import Router from "./router/index.tsx";

const App : FC<{}> = () => {

  return (
    <Layout className="root">
      <Router />
    </Layout>
  )
}

export default App
