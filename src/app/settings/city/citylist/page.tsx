import React from "react";
import { City, columns } from "./columns";
import DataTableGenerator from "@/main_components/data-table";

import LoadProfileAuth from "@/main_components/loadProfileAuth";
import { apiUrl } from "@/api_config";
import Link from "next/link";

async function getData(): Promise<City[]> {
  // Fetch data from  API .

  const res = await fetch(`${apiUrl}/city`, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default async function SectionList() {
  const data = await getData();

  return (
    <div className="mx-10 my-5">
      <LoadProfileAuth />
      <h1 className="text-primary-color text-lg underline font-semibold">
        City List
      </h1>

      <div className="w-fit">
        <Link href="/settings/city/addcity">
          <h1 className="bg-blue-700 text-white w-fit  px-1 text-sm my-3 cursor-pointer">
            Create City
          </h1>
        </Link>
      </div>
      <DataTableGenerator
        columns={columns}
        data={data}
        filterBy="cityName"
        type="city"
      />
    </div>
  );
}
