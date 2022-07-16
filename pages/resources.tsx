import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Table from "../Components/table/table";
import SideNav from "../Components/SideNav";
import Image from "next/image";
import SchoolSimpLogoBlue from "../assets/SchoolSimpLogoBlue.png";
import StaffCommunityIcon from "../assets/StaffCommunityIcon.png";
import StaffResourcesIcon from "../assets/StaffResourcesIcon.png";
import SchoolSimpDiscordIcon from "../assets/SchoolSimpDiscordIcon.png";

const ResourceItem = ({
  children,
  Name,
  link,
}: {
  children: any;
  Name: string;
  link: string;
}) => {
  return (
    <div
      className="flex border-blue-600 border-2 rounded-xl items-center w-full hover:shadow-xl py-5 rounded-xl px-5 mt-3 cursor-pointer"
      onClick={function () {
        window.open(`${link}`, "_blank");
      }}
    >
      {children}
      <h1 className="text-xl pl-5">{Name}</h1>
    </div>
  );
};

const Resources: NextPage = () => {
  return (
    <>
      <div className="w-full flex">
        <div className="w-[20%] h-screen sticky top-0 2xl:w-[15%]">
          <SideNav />
        </div>
        <div className="w-full px-5 py-3">
          <h1 className="font-semibold text-5xl mb-4">Resources</h1>

          <h1 className="font-semibold text-3xl mt-10 mb-1">
            Middleman App Bugs, Questions, and Feature Requests
          </h1>
          <div>
            Please contact Josef (pancakes#1412) or Jason (Jaysunny#4060) on
            Discord.
          </div>

          <h1 className="font-semibold text-3xl mt-10 mb-1">
            Organization Resources
          </h1>
          <div>
            <ResourceItem
              Name="Employee Handbook"
              link="https://schoolsimplified.notion.site/E-M-P-L-O-Y-E-E-H-A-N-D-B-O-O-K-2f7ec2c8f87e4bca8921f4117dbacd35"
              children={
                <Image src={SchoolSimpLogoBlue.src} height="70" width="70" />
              }
            />
          </div>

          <h1 className="font-semibold text-3xl mt-10 mb-1">Discord Servers</h1>
          <div className="grid grid-cols-2 gap-4">
            <ResourceItem
              Name="School Simplified Main Discord"
              link="https://discord.gg/school"
              children={
                <Image
                  className="rounded-full"
                  src={SchoolSimpDiscordIcon.src}
                  height="70"
                  width="70"
                />
              }
            />
            <ResourceItem
              Name="Staff Resources & Information"
              link="https://discord.gg/aWsdY4fqxj"
              children={
                <Image
                  className="rounded-full"
                  src={StaffResourcesIcon.src}
                  height="70"
                  width="70"
                />
              }
            />
            <ResourceItem
              Name="School Simplified Staff Community"
              link="https://discord.gg/VsdU7qV2vS"
              children={
                <Image
                  className="rounded-full"
                  src={StaffCommunityIcon.src}
                  height="70"
                  width="70"
                />
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Resources;
