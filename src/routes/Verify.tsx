import { Navigate, useNavigate, useParams } from "react-router-dom"
import PageWrapper from "../components/PageWrapper";
import { useContext, useEffect } from "react";
import usePostRequest from "../utils/usePostRequest";
import { AuthContext } from "../components/AuthProvider";

const Verify = () => {
  const { id } = useParams<{ id: string }>();
  const [verify, { data, loading, error }] = usePostRequest('verify');
  const {
    refetchMe,
    isAuthenticated,
    setIsAuthenticated = () => { },
  } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await verify({
        verificationId: id,
      });
    })();

  }, [id]);

  useEffect(() => {
    if (error) {
      navigate('/signin');
    }
    if (data?.token) {
      localStorage.setItem("token", data?.token);
      (async () => {
        if (refetchMe) {
          try {
            const { data } = await refetchMe();
            const isAuthenticated = !!data?.me?.email;
            setIsAuthenticated(isAuthenticated);
            navigate("/");
          } catch (err) {
            navigate('/signin')
          }
        }
      })();
    }

  }, [data, error]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <PageWrapper loading={loading}>
      {error && <div>{error.message}</div>}
    </PageWrapper>
  );
}

export default Verify;
