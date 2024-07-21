import LogInSignUpTab from "../components/auth/LogInSignUpTab.jsx";
import Register from "../components/auth/Register.jsx";
import LogIn from "../components/auth/LogIn.jsx";
import Navbar from "../components/Navbar.jsx";

function SignInPage({ showRegisterForm }) {
  function registerOrLogIn() {
    if (showRegisterForm) {
      return <Register />;
    } else {
      return <LogIn />;
    }
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <LogInSignUpTab showRegisterForm={showRegisterForm} />

        {registerOrLogIn()}
      </div>
    </>
  );
}

export default SignInPage;
