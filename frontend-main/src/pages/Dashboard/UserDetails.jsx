import { useUser } from "@/contexts/UserContextProvider.jsx";
import { reverseComplaintTypes, reverseUserTypes, UserTypes } from "@/constants.js";

const UserDetails = () => {
  const { user } = useUser();
  const HeadDivStyle = "flex flex-wrap item-center gap-1";
  const headstyle = "text-xl font-semibold text-gray-700";
  const contentstyle = "text-lg";
  const img = user.image;

  return (
    <div
      className="flex justify-center w-full"
      style={{
        alignItems: "center",
      }}
    >
      <div
        className="flex flex-row flex-wrap gap-16 p-10 m-5 border border-gray-300 rounded-lg shadow-xl w-fit h-min"
        style={{
          alignItems: "center",
        }}
      >
        <img
          src={img}
          className="bg-black rounded-full"
          style={{
            // width: '200px',
            height: "100%",
          }}
          alt="Img"
        />
        <div className="flex flex-wrap gap-16">
          <div className="flex flex-col gap-6">
            <div className={HeadDivStyle}>
              <div className={headstyle}>Name:</div>
              <div className={contentstyle}>
                {user.displayName}
              </div>
            </div>
            {user.role === UserTypes.Complainant && (
              <div className={HeadDivStyle}>
                <div className={headstyle}>Roll No:</div>
                <div className={contentstyle}>
                  {user.rollNo}
                </div>
              </div>
            )}
            <div className={HeadDivStyle}>
              <div className={headstyle}>Role:</div>
              <div className={contentstyle}>
                {reverseUserTypes[user.role]}
              </div>
            </div>
            {
              (user.domain || user.domain == 0) && (<div className={HeadDivStyle}>
                <div className={headstyle}>Domain: </div>
                <div className={contentstyle}>{reverseComplaintTypes[user.domain]}</div>
              </div>)
            }
            <div className={HeadDivStyle}>
              <div className={headstyle}>Email:</div>
              <div className={contentstyle}>{user.email}</div>
            </div>
          </div>
          {user.role === UserTypes.Complainant && (
            <div className="flex flex-wrap gap-5 text-base">
              <div className="flex flex-col items-center p-4 bg-orange-300 rounded justify-evenly">
                <div className="font-semibold ">
                  Registered Complaints
                </div>
                <div className="text-3xl font-bold text-orange-900">
                  {user.noOfComplaints || 0}
                </div>
              </div>
              <div className="flex flex-col items-center p-4 px-8 bg-green-300 rounded justify-evenly">
                <div className="font-semibold ">
                  Solved Complaints
                </div>
                <div className="text-3xl font-bold text-green-900">
                  {user.solvedComplaints || 0}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
