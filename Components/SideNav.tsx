import React, { useEffect, useState, useRef } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { ImFilesEmpty } from "react-icons/im";
import Logo from "../assets/SchoolSimpLogoBlack.png"
import { getUserInfo } from "./Api/user";
import { Select, Button, useDisclosure} from '@chakra-ui/react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'

const MenuItem = ({ children, Name }: {children:any; Name:string}) => {
  const link:string = Name.toLocaleLowerCase()
  return (
    <div className="flex justify-between items-center w-full hover:shadow-xl py-5 rounded-xl px-5 mt-3 cursor-pointer"
         onClick={function(){window.location.href=`http://localhost:3000/${link}`}}
    >
      {children}
      <h1 className="text-xl">{Name}</h1>
    </div>
  );
};

const LoginButton = ({ authed, Name, email, icon, sendAlert }: {authed:boolean; Name:string; email: string; icon:string; sendAlert:any}) => {
  if (authed) {
    return (
      <div className="border-2 border-black rounded-xl" onClick={sendAlert}>
        <div className="flex justify-center items-center w-full hover:shadow-xl py-5 rounded-xl px-5 cursor-pointer">
          <span className="object-contain">
            <img src={icon} width="30px" height="30px" className="inline"/>
            {email}
          </span>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="border-2 border-black rounded-xl" onClick={function(){window.location.href="http://localhost:8000/google"}}>
        <div className="flex justify-center items-center w-full hover:shadow-xl py-5 rounded-xl px-5 cursor-pointer">
          <h1 className="text-xl">{Name}</h1>
        </div>
      </div>
    );
  }
};

const SideNav = () => {
  const [email, setEmail] = useState<string>("");
  const [profileIconLink, setProfileIconLink] = useState<string>("")
  const [authed, setAuthed] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef();


  const getInfo = async () => {
    try {
      const result = await getUserInfo();
      setEmail(result.email);
      setProfileIconLink(result.picture);
    }
    catch(error) {
      console.log(error)
      setAuthed(false)
      window.location.href="http://localhost:8000/google"
    }
  }

  useEffect(() => {
    if (email.length > 0 && email !== null) {
      setAuthed(true)
    }
  }, [email])

  useEffect(() => {
    setTimeout(() => {getInfo()}, 1000)
  }, [])

  const sendAlert = () => {
    onOpen()
  }

  const logout = () => {
    localStorage.clear()
    setAuthed(false)
    setEmail("")
    setProfileIconLink("")
    onClose()
    window.location.href = "http://localhost:3000/home"
  }


  return (
    <div className="flex flex-col align-center w-full h-full bg-slate-200">
      <div className="h-[120px] bg-blue-600">
        <img src={Logo.src} height="120" width="120" style={{margin: "auto"}}/>
      </div>

      <div>
        <LoginButton Name="Login" authed={authed} email={email} icon={profileIconLink} sendAlert={sendAlert}/>
      </div>

      <div className="flex flex-col mt-2">
        <MenuItem Name="Home" children={<AiOutlineHome size={23} />} />
        <MenuItem Name="Volunteers" children={<BsPeople size={23} />} />
        <MenuItem Name="Resources" children={<ImFilesEmpty size={23} />} />
      </div>

      <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef.current}
            onClose={onClose}
        >
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Logout
                </AlertDialogHeader>

                <AlertDialogBody>
                Are you sure you want to logout?
                </AlertDialogBody>

                <AlertDialogFooter>
                <Button ref={cancelRef.current} onClick={onClose}>
                    Cancel
                </Button>
                <Button colorScheme='red' onClick={logout} ml={3}>
                    Logout
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    </div>
  );
};

export default SideNav;
