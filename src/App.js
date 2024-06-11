import "./App.css";
import { useCallback, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
function App() {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    password: "",
    conformPassword: "",
    domain: "",
    gender: "Male",
    passwordError: "",
    emailError: "",
    userNameError: "",
    passwordLengthError: "",
  });
  //user login Details
  const [loginDetails, setloginDetails] = useState([]);
  //updathing  the details to card
  const [getIndex, setGetIndex] = useState(-1);
  const [checkEditDetails, setCheckEditDetails] = useState(false);
  //showing password message
  let [showPassword, setShowPassword] = useState(false);
  let [showConformPassword, setShowConformPassword] = useState(false);

  ////function to check email

  function checkEmail(emailAddress) {
    let atSymbol = emailAddress.indexOf("@");
    let dotSymbol = emailAddress.lastIndexOf(".");
    let spaceSymbol = emailAddress.indexOf(" ");
    let domainNames = [".com", ".in", ".gov", ".edu", ".net", ".mil"];
    let lastDomainString = "",
      flag = 0;
    for (let i = dotSymbol; i < emailAddress.length; i++) {
      lastDomainString += emailAddress[i];
    }
    for (let i = 0; i < domainNames.length; i++) {
      if (lastDomainString === domainNames[i]) {
        flag = 1;
      }
    }
    if (flag == 0) {
      setUserDetails((previousValue) => {
        return { ...previousValue, emailError: "Email given wrong format" };
      });
      return 0;
    }
    if (
      atSymbol != -1 &&
      atSymbol != 0 &&
      dotSymbol != -1 &&
      dotSymbol != 0 &&
      dotSymbol > atSymbol + 1 &&
      emailAddress.length > dotSymbol + 1 &&
      spaceSymbol == -1
    ) {
      setUserDetails((previousValue) => {
        return { ...previousValue, emailError: "" };
      });
      return true;
    } else {
      setUserDetails((previousValue) => {
        return { ...previousValue, emailError: "Email given wrong format" };
      });
      return false;
    }
  }

  //check user name

  function checkName(userName) {
    const Name = [...userName].every(
      (char) => (char >= "a" && char <= "z") || (char >= "A" && char <= "Z")
    );
    if (!Name) {
      // console.log("kkkk")
      setUserDetails((previousValue) => {
        return { ...previousValue, userNameError: "Enter the only alphabets" };
      });
      // setUserNameError("Enter the only alphabets")
    } else {
      setUserDetails((previousValue) => {
        return { ...previousValue, userNameError: "" };
      });
    }
    return Name;
  }
  //function to checkpassword

  function checkPassword(password, conformPassword) {
    if (password == conformPassword) {
      setUserDetails((previousValue) => {
        return { ...previousValue, passwordError: "" };
      });
      return 1;
    }
    setUserDetails((previousValue) => {
      return { ...previousValue, passwordError: "password can't matching" };
    });
    // setPasswordError("password can't matching")
    return 0;
  }

  //Checking password length

  function checkPasswordLength(password) {
    let length = password.length;
    {
      if (length <= 8) {
        setUserDetails((previousValue) => {
          return { ...previousValue, passwordLengthError: 0 };
        });
        // setPasswordLengthError(0)
        return 0;
      } else {
        setUserDetails((previousValue) => {
          return { ...previousValue, passwordLengthError: 1 };
        });
        // setPasswordLengthError(1)
        return 1;
      }
    }
  }

  //user name
  const updatingUserNameValueOnChange = (event) => {
    const { name, value } = event.target;
    // console.log(userDetails.userName)
    setUserDetails({ ...userDetails, userName: value });
    checkName(event.target.value);
    console.log(value);
    //  console.log(loginDetails[2].userName)
    //  setUserDetails({loginDetails[2].userName:value})
  };

  //email

  const updatingEmailValueOnChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((previousValue) => {
      // console.log(event.target.value)
      return { ...previousValue, email: value };
    });
    checkEmail(event.target.value);
  };

  //password

  const updatePasswordValueOnChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((previousValue) => {
      return { ...previousValue, password: value };
    });
    checkPasswordLength(event.target.value);
    //  console.log(event1.target.value)
  };

  //conformedpassword

  const updateConformPasswordValueOnChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((previousValue) => {
      return { ...previousValue, conformPassword: value };
    });
    checkPassword(userDetails.password, event.target.value);
    //  console.log(event3.target.value)
  };
  ////domain name

  const updateDomainValueOnChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((previousValue) => {
      return {
        ...previousValue,
        domain: value,
      };
    });
    //  console.log(event1.target.value)
  };

  //seting gender

  function setUserGender(event) {
    let getGender = event.target.value;
    // console.log(getGender)
    setUserDetails({ ...userDetails, gender: getGender });
  }

  //submit the details
  const afterSubmitButtonClick = () => {
    if (
      !checkEditDetails &&
      userDetails.userName != "" &&
      userDetails.password != " " &&
      userDetails.email != "" &&
      userDetails.conformPassword != "" &&
      userDetails.domain != "" &&
      userDetails.gender != ""
    ) {
      if (
        checkName(userDetails.userName) &&
        checkEmail(userDetails.email) &&
        checkPassword(userDetails.password, userDetails.conformPassword) &&
        userDetails.passwordLengthError
      ) {
        setloginDetails([
          ...loginDetails,
          {
            userName: userDetails.userName,
            email: userDetails.email,
            password: userDetails.password,
            conformPassword: userDetails.conformPassword,
            domain: userDetails.domain,
            gender: userDetails.gender,
          },
        ]);
        setUserDetails((previousValue) => {
          return {
            ...previousValue,
            userName: "",
            email: "",
            password: "",
            conformPassword: "",
            domain: "",
            gender: "Male",
          };
        });
        // console.log("jj")
      }
    }
    /// Editing the details after updating
    else if (
      checkEditDetails &&
      userDetails.userName != "" &&
      userDetails.password != " " &&
      userDetails.email != "" &&
      userDetails.conformPassword != "" &&
      userDetails.domain != "" &&
      userDetails.gender != ""
    ) {
      let update = [...loginDetails];
      update[getIndex] = userDetails;
      if (
        checkName(update[getIndex].userName) &&
        checkEmail(update[getIndex].email) &&
        checkPassword(
          update[getIndex].password,
          update[getIndex].conformPassword
        ) &&
        checkPasswordLength(update[getIndex].password)
      ) {
        console.log("hello");
        let update = [...loginDetails];
        update[getIndex] = userDetails;
        setloginDetails(update);
        setUserDetails((previousValue) => {
          return {
            ...previousValue,
            userName: "",
            email: "",
            password: "",
            conformPassword: "",
            domain: "",
            gender: "Male",
          };
        });
        setCheckEditDetails(false);
      }
    }
  };

  //Editing the details

  function Edit(index) {
    setCheckEditDetails(true);
    setGetIndex(index);
    console.log(getIndex, checkEditDetails);
    setUserDetails(loginDetails[index]);
  }

  // Deleting after removing the particular login  details
  function Delete(index) {
    let allLoginUserDetails = [...loginDetails];
    let afterRemainDetails = allLoginUserDetails.filter(
      (value, ind) => ind != index
    );
    setloginDetails(afterRemainDetails);
  }

  ///showing Conformation password

  function ShowPassword() {
    setShowPassword(!showPassword);
  }

  //showing passsword
  function ShowConformPassword() {
    setShowConformPassword(!showConformPassword);
  }

  // Componentent
  return (
    <div className="fullscreen" class="mt-4">
      <div className="contain">
        <form id="form">
          <div>
            <input
              id="userName"
              name="userName"
              value={userDetails.userName}
              onChange={updatingUserNameValueOnChange}
              type="text"
              className={!userDetails.userName ? "red" : "blue"}
              placeholder="Name"
              maxLength={50}
              required
            />
            {!userDetails.userName ? (
              <p className="getProperDetailstoShowColor">
                please Enter the Username
              </p>
            ) : (
              <p></p>
            )}
            {userDetails.userNameError == "" ? (
              <p></p>
            ) : (
              <p className="error">{userDetails.userNameError}</p>
            )}
          </div>
          <div>
            <input
              id="email"
              name="email"
              value={userDetails.email}
              onChange={updatingEmailValueOnChange}
              type="email"
              className={!userDetails.email ? "red" : "blue"}
              placeholder="Email"
              required
            />
            {!userDetails.email ? (
              <p className="getProperDetailstoShowColor">
                please Enter the Email
              </p>
            ) : (
              <p></p>
            )}
            {userDetails.emailError == "" ? (
              <p></p>
            ) : (
              <p className="error">{userDetails.emailError}</p>
            )}
          </div>
          <div className="input">
            <a href="#">
              {" "}
              <div className="eye" onClick={() => ShowPassword()}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>{" "}
            </a>
            <input
              id="password"
              name="password"
              value={userDetails.password}
              onChange={updatePasswordValueOnChange}
              type={showPassword ? "text" : "password"}
              className={!userDetails.password ? "red" : "blue"}
              placeholder="Password"
              minLength={8}
              required
            />
            {!userDetails.password ? (
              <p className="getProperDetailstoShowColor">
                please Enter the Password
              </p>
            ) : (
              <p></p>
            )}
            {userDetails.passwordLengthError == " " ? (
              <p className="error">Minimun 8 letter required</p>
            ) : (
              <p></p>
            )}
          </div>
          <div className="input">
            <a href="#">
              {" "}
              <div className="eye" onClick={() => ShowConformPassword()}>
                {showConformPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </a>
            <input
              id="conformedpassword"
              name="conformPassword"
              value={userDetails.conformPassword}
              onChange={updateConformPasswordValueOnChange}
              type={showConformPassword ? "text" : "password"}
              className={!userDetails.conformPassword ? "red" : "blue"}
              placeholder="Conform Password"
              minLength={8}
              required
            />

            {!userDetails.conformPassword ? (
              <p className="getProperDetailstoShowColor">
                please Enter the Password
              </p>
            ) : (
              <p></p>
            )}
            {userDetails.passwordError == "" ? (
              <p></p>
            ) : (
              <p className="error">{userDetails.passwordError}</p>
            )}
          </div>
          <div>
            <label> Domains</label>
          </div>
          <div>
            <select
              id="domain"
              name="domain"
              value={userDetails.domain}
              onChange={updateDomainValueOnChange}
              type="text"
              className={!userDetails.domain ? "red" : "blue"}
              required
            >
              <option>Other</option>
              <option value="FullStack Web Development">
                FullStack Web Development
              </option>
              <option value="Data Science">Data Science</option>
              <option value="App Developer">App Developer</option>
              <option value="Data Analyst">Data Analyst</option>
            </select>
            {!userDetails.domain ? (
              <p className="getProperDetailstoShowColor">
                please Select the domain name
              </p>
            ) : (
              <p></p>
            )}
          </div>
          <div id="gender" className="gender">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={userDetails.gender === "Male"}
              onChange={setUserGender}
            />
            <label> Male</label>
          </div>
          <div className="gender">
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={setUserGender}
            />
            <label> Female</label>
          </div>
        </form>
        <div>
          <button
            name="loginDetails"
            className="from"
            onClick={afterSubmitButtonClick}
          >
            Sumbit
          </button>
        </div>
      </div>
      <div class=" py-5 ">
        {loginDetails.map((values, i) => (
          <div
            key={i}
            className="cardshow"
            class="card rounded-5 bg-body-tertiary mt-5"
          >
            <div class=" ms-5">
              {/* <div class="d-flex  justify-content-end">
                <CiEdit />
              </div> */}
              <img
                class="img-fluid align-items-md-center rounded-3"
                src="../card.png"
                alt="profile"
              />
              {/* <div><CiEdit /></div> */}
            </div>

            <div class="card-body bg-success-subtle rounded-5">
              <div class="row">
                <p class="col-10"></p>
                <p class="col-2 d-flex justify-content-end">
                  <a
                    onClick={() => Edit(i)}
                    className="edit"
                    href="#form"
                    class="me-2"
                  >
                    <CiEdit />
                  </a>
                  <a class="ms-2 " href="#">
                    <span onClick={() => Delete(i)}>
                      <MdDelete />
                    </span>{" "}
                  </a>
                </p>
              </div>
              <div class="ms-2 ">
                <p class="">
                  Name{" "}
                  <span class="ms-4">
                    {" "}
                    <span class="m-1"> :</span>
                  </span>{" "}
                  <span class="ms-1">{values.userName}</span>
                </p>
                {/* <p class='col-2 d-flex justify-content-end' ><a className='edit' href='#userName' class=""><CiEdit/></a><a class='ms-2 ' href='#userName'><span><TiDelete /></span> </a></p> */}
              </div>
              <div class="ms-2">
                <p class="">
                  Email
                  <span class="ms-4">
                    {" "}
                    <span class="m-2"> :</span>
                  </span>{" "}
                  <span class="">{values.email}</span>
                </p>
                {/* <p class='col-2 d-flex justify-content-end' ><a className='edit' href='#email' class=""><CiEdit/></a><a class='ms-2 ' href='#email'><span><TiDelete /></span> </a></p> */}
              </div>
              <div class="ms-2 ">
                <p class="">
                  password <span class="ms-2">:</span>{" "}
                  <span class="ms-1">{values.password}</span>
                </p>
                {/* <p class='col-2 d-flex justify-content-end' ><a className='edit' href='#password' class=""><CiEdit/></a><a class='ms-2 ' href='#password'><span><TiDelete /></span> </a></p> */}
              </div>
              <div class="ms-2">
                <p class=" d-flex">
                  Domain
                  <span class="ms-4"> :</span>
                  <span class="ms-2">{values.domain}</span>
                </p>
                {/* <p class='col-2 d-flex justify-content-end' ><a className='edit' href='#domain' class=""><CiEdit/></a><a class='ms-2 ' href='#domain'><span><TiDelete /></span> </a></p> */}
              </div>
              <div class="ms-2 ">
                <p class="">
                  Gender<span class="ms-4">:</span>{" "}
                  <span class="ms-1">{values.gender}</span>
                </p>
                {/* <p class='col-2 d-flex justify-content-end' ><a className='edit' href='#gender' class=""><CiEdit/></a><a class='ms-2 ' href='#gender'><span><TiDelete /></span> </a></p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
