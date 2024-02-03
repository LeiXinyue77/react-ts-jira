import { AuthenticatedApp } from "authenticated-app";
import "./App.css";
import { useAuth } from "context/auth-context";
import { UnauthenticatedApp } from "unauthenticated-app";
//import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import { FullPageErrorFallBack } from "components/lib";
import { ErrorBoundary } from "components/error_boundary";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallBack}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
