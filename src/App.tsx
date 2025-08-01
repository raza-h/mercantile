import { Layout } from "antd";
import { FC, PropsWithChildren } from "react";
import "./index.scss";
import Router from "./router/index.tsx";

const App: FC<PropsWithChildren> = () => {
  return (
    <Layout className="root">
      <Router />
    </Layout>
  );
};

export default App;
