import Loader from "../../assets/loader.gif";
import "./loading.css";

interface LoadingProps {
  isLoading: boolean;
  fixed?: boolean;
}

const Loading = ({ isLoading, fixed = false }: LoadingProps) => {
  if (!isLoading) return <></>;

  return (
    <div
      className={`Loading__Wrapper ${
        fixed ? "Loading__Wrapper--Fixed" : ""
      }`}
    >
      <img src={Loader} alt="" />
    </div>
  );
};

export default Loading;
