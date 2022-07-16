import React, { useEffect, useState, useRef, FormEvent } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { Select, Button, useDisclosure } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

const VolunteerStatusForm = (params: any) => {
  type UserInfo = {
    activityStatus: string;
  };

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [activityStatus, setActivityStatus] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const statusRef = useRef<string>("");
  const cancelRef = useRef();

  useEffect(() => {
    params.getUser(params.updateUserID).then((result: any) => {
      setUserInfo(result);
    });
  }, []);

  useEffect(() => {
    if (userInfo?.activityStatus != null) {
      setActivityStatus(userInfo.activityStatus);
    }
  }, [userInfo]);

  useEffect(() => {
    statusRef.current = activityStatus;
  }, [activityStatus]);

  const sendAlert = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onOpen();
  };

  const submit = () => {
    const req_data = {
      activityStatus: statusRef.current,
    };
    params.updateUser(req_data);
  };

  return (
    <div className="w-screen h-screen fixed left-0 top-0 bg-purple-400 flex-col">
      <div
        className="absolute right-4 top-4 p-2 rounded-xl text-white border-2 border-gray-200 hover:bg-gray-200 hover:border-purple-400 hover:text-purple-400"
        onClick={() => params.setVisible(false)}
      >
        <CloseIcon />
      </div>
      <form
        className=" flex flex-col items-center justify-center h-full"
        onSubmit={sendAlert}
      >
        <div className="w-1/2 h-1/2 border-white border-2 p-4 rounded-md my-2 flex flex-col justify-center">
          <span className="text-3xl block text-center text-yellow-200">
            Edit Volunteer Status
          </span>
          <div className="grid grid-flow-row grid-rows-5 justify-center items-center w-full gap-y-6">
            <Select
              value={activityStatus}
              onChange={(e) => setActivityStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="On break">On break</option>
              <option value="Resigned">Resigned</option>
            </Select>
            <div>
              <button
                type="submit"
                className="border-2 border-white p-2 rounded-xl text-white hover:bg-white hover:text-purple-400 w-full transition-all"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef.current}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Edit Volunteer Status
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to edit this volunteer's status?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef.current} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={submit} ml={3}>
                Edit
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default VolunteerStatusForm;
