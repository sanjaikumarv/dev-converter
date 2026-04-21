import Router from "next/router";
import { useEffect } from "react";
import Loader from "../components/common/Loader";
import { useAuth } from "./auth.context";

export default function ProtectedPage(WrapperComponent: any) {
  function Wrapper() {
    const { user } = useAuth();
    useEffect(() => {
      if (!user) {
        Router.push("/login");
      }
    }, [user]);

    if (user) {
      return <WrapperComponent />;
    }
    return (
      <div className='flex justify-center mt-2'>
        <Loader color={"#ffffff"} loading={true} size={20} />
      </div>
    );
  }
  return Wrapper;
}
