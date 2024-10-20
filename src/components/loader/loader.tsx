import { FC } from "react";
import "./loader-style.css";

const LoaderElement = () => <span className="loader"></span>;

const Loader: FC<{ LoaderComponent?: FC }> = ({
  LoaderComponent = LoaderElement,
}) => {
  return (
    <div className={"loader-block"}>
      <LoaderComponent />
    </div>
  );
};

export default Loader;
