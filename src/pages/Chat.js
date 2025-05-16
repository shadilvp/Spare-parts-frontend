// import { LucidePlusCircle } from "lucide-react";
// import { useState } from "react";
// import SearchUser from "../../utils/ui/searchBarUser";
// import { sendNotification } from "./services/services";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllUsers } from "../serveces/userService";
import { useMutation } from "@tanstack/react-query";
import { sendNotification } from "../serveces/notificationService";
import { data } from "react-router-dom";

const Chat = () => {
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const users = userData ?? [];

  const [messageDatas, setMessageDatas] = useState({
    heading: "",
    messageType: "",
    message: "",
    user: "",
  });
  const [searchTrue, setSearchTrue] = useState(false);
  const [search, setSearch] = useState("");

  const handleSubmit = () => {
    mutation.mutate(messageDatas);
  };

  const mutation = useMutation({
    mutationFn: sendNotification,
    onSuccess: (data) => {
      console.log("Notification Sended SuccessFully", data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1000,
      });

      // ✅ Reset message data
      setMessageDatas({
        heading: "",
        messageType: "",
        message: "",
        user: "",
      });

      // ✅ Reset search input and selection
      setSearch("");
      setSearchTrue(false); // Optional: close the search box
    },
    onError: (error) => {
      console.log("Notification is not send", error);
      Swal.fire({
        position: "top-end",
        icon: "failure",
        title: "message is not send",
        showConfirmButton: false,
        timer: 1000,
      });
    },
  });

  const handleClickIsSearch = () => {
    setSearchTrue((prev) => !prev);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleHeading = (e) => {
    setMessageDatas((prev) => ({ ...prev, heading: e.target.value }));
  };

  const handleMessageType = (e) => {
    setMessageDatas((prev) => ({ ...prev, messageType: e.target.value }));
  };

  const handleMessage = (e) => {
    setMessageDatas((prev) => ({ ...prev, message: e.target.value }));
  };

  return (
    <div className="bg-[#2c2e3a] ml-64 min-h-full text-[#9e9e9e] flex items-center justify-center">
      <div className="flex flex-col items-center justify-between border border-blue-600 rounded-xl p-6 h-[80vh] w-full max-w-xl mx-auto shadow-[0_4px_30px_rgba(0,0,255,0.3)]">
        <h1 className="text-5xl font-semibold text-[#706e6e] custom-stroke ">
          Send Message
        </h1>
        <div>
          <div className="flex justify-between w-full gap-10">
            <button className="bg-[#171639] p-3 rounded-3xl hover:bg-[#0b0924]">
              Send To All Users
            </button>
            <button
              className="bg-[#171639] p-3 rounded-3xl hover:bg-[#0b0924]"
              onClick={handleClickIsSearch}
            >
              Send Individually
            </button>
          </div>
          {searchTrue && (
            <div className="mt-8 w-full max-w-md">
              <input
                onChange={handleSearch}
                value={search}
                placeholder="Search User..."
                className="w-full p-2 rounded bg-[#1e1f2a] text-white border border-gray-600"
              />

              <ul className="mt-4 max-h-40 overflow-y-auto bg-[#1e1f2a] rounded border border-gray-700">
                {users
                  .filter((user) =>
                    user.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((user) => (
                    <li
                      key={user._id}
                      onClick={() => {
                        setMessageDatas((prev) => ({
                          ...prev,
                          user: user._id,
                        }));
                        setSearch("");
                      }}
                      className="p-2 hover:bg-[#2f2f3f] cursor-pointer"
                    >
                      {user.name}
                    </li>
                  ))}
              </ul>

              {messageDatas.user && (
                <p className="mt-2 text-sm text-green-400">
                  Selected User:{" "}
                  {users.find((u) => u._id === messageDatas.user)?.name ||
                    "User not found"}
                </p>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-10">
            <input
              placeholder="Enter Heading "
              className="p-1 rounded"
              onChange={handleHeading}
            />
            <div className="flex flex-col gap-2">
              <select
                name="type"
                id="type"
                className="p-2 rounded-md bg-[#1e1f2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#5a5af5]"
                onClick={handleMessageType}
              >
                <option value="">Select Type</option>
                <option value="offer">Offer</option>
                <option value="advertisment">Advertisement</option>
                <option value="message">Message</option>
                <option value="announcment">Announcment</option>
              </select>
            </div>
          </div>
          <textarea
            placeholder="Enter Message..."
            className="p-3 rounded-xl"
            onChange={handleMessage}
          />
        </div>
        <button
          onClick={handleSubmit}
          className=" p-1 px-5 rounded-lg text-white font-semibold hover:bg-[#2b2b2b] border border-blue-600 shadow-[0_3px_10px_rgba(0,0,255,0.3)]"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Chat;
