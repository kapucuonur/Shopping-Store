import { useState } from "react";
import Swal from "sweetalert2";
import { useLoginContext } from "../context/LoginProvider";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useLoginContext()

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email, password);

    if (email === "admin@admin.com" && password === "admin") {
      login({email,password}) //! setUser ile user bilgisi güncelleniyor!!
    } else {
      let errorMessage = "";
      if (email !== "admin@admin.com") {
        errorMessage = "Wrong Email Adress";
      } else {
        errorMessage = "Wrong Password";
      }
    
      Swal.fire({
        title: errorMessage,
        text: "Please check your credentials and try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }    

  return (
    <div className="loginDiv py-2">
      <div
        className="h-[500px] w-11/12 sm:w-9/12 md:w-6/12
       relative shadow-login bg-slate-200 login-box rounded-e-xl pt-10"
      >
        <h1 className="text-center text-[22px] sm:text-[32px] font-montserrat font-[700] uppercase font-montserrat">
          Shopping Store
        </h1>
        <h2 className="text-center text-[20px] sm:text-[30px] text-gray-700 uppercase font-[600] font-montserrat">
          sıgn ın
        </h2>

        <div className="header-text">
          <p className="text-center text-labelColor text-label mt-1">
            Enter your credentials to access your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 text-left mt-9 px-10"
        >
          <div className="flex flex-col gap-2">
            <label
              className=" font-montserrat text-label text-labelColor hover:cursor-pointer hover:after:content-['admin@admin.com'] hover:after:text-black hover:after:underline hover:after:pl-3"
              htmlFor="email"
            >
              Email Adress
            </label>
            <input
              className="login-input"
              type="email"
              id="email"
              placeholder="Enter your email adress"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <label
              className=" font-montserrat text-label text-labelColor hover:cursor-pointer hover:after:content-['admin'] hover:after:text-black hover:after:underline hover:after:pl-3"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="login-input"
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="bg-main text-white font-montserrat uppercase hover:opacity-90 rounded-md h-[44px]">
            Sign In
          </button>

          <p className="flex  justify-center gap-2 flex-wrap">
            <span>Forgot Your Password</span>
            <span className=" underline text-main">Reset password</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
