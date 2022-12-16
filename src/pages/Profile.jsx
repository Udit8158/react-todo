import Banner from "../components/UI/Banner";
import useUpdateProfile from "../hooks/use-update-profile";

function Profile() {
  const {
    showBanner,
    inputData,
    setInputData,
    updateNameHandler,
    updateEmailHandler,
    passwordUpdateHandler,
  } = useUpdateProfile();

  return (
    <>
      {showBanner.state && (
        <Banner message={showBanner.msg} color={showBanner.color} />
      )}
      {/* {showBanner && error && <Banner message="Error Occured" color="red" />} */}
      <div className="mx-auto w-5/6  my-12 flex flex-col gap-y-4  md:w-4/6 lg:w-3/6 ">
        <h1 className="text-center text-xl text-white">Update Your Profile</h1>

        <div className="flex gap-x-3 ">
          <input
            type="name"
            placeholder="Enter Your Updated Name"
            className="border-2 p-1 w-3/6"
            value={inputData.name}
            onChange={(e) => {
              setInputData((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
          />

          <button
            className="bg-blue-600 p-2 text-white hover:bg-blue-500"
            onClick={updateNameHandler}
          >
            Update Name
          </button>
        </div>

        <div className="flex gap-x-3 ">
          <input
            type="email"
            placeholder="Enter Your Updated Email"
            className="border-2 p-1 w-3/6"
            value={inputData.email}
            onChange={(e) => {
              setInputData((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
          />

          <button
            className="bg-blue-600 p-2 text-white hover:bg-blue-500"
            onClick={updateEmailHandler}
          >
            Update Email
          </button>
        </div>

        <div className="flex gap-x-3 ">
          <input
            type="password"
            min={6}
            placeholder="Enter Your Updated Password"
            className="border-2 p-1 w-3/6"
            value={inputData.password}
            onChange={(e) => {
              setInputData((prev) => {
                return { ...prev, password: e.target.value };
              });
            }}
          />

          <button
            className="bg-blue-600 p-2 text-white hover:bg-blue-500"
            onClick={passwordUpdateHandler}
          >
            Update Password
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
