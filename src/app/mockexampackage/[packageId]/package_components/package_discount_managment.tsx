"use client";
import React, { useEffect, useState } from "react";
import { CalanderForm } from "./discountmanagement";
import SwitchDialog from "@/my_components/switch_dialog";
import EditCellDialog from "@/my_components/edit_cell_dialog";

export default function Mock_package_discount_managment({
  discountExpiryDate,
  PackageId,
  packageDiscountStatus,
  packageDiscountPrice,

  packagePrice,
}: any) {
  const [daysLeftBeforExpiry, setDaysLeftBeforeExpiry] = useState("");
  const [discontPrice, setDiscontPrice] = useState(packageDiscountPrice);

  function isDate(value: any): value is Date {
    return value instanceof Date && !isNaN(value.getTime());
    // console.log("initial01: " + daysLeftBeforExpiry);
  }

  const today: Date = new Date();
  // console.log("initial00: " + daysLeftBeforExpiry);
  let daysLeft = 0;

  if (isDate(new Date(discountExpiryDate)) && isDate(today)) {
    daysLeft = Math.floor(
      (new Date(discountExpiryDate).getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
    );
    console.log("Days Left: " + daysLeft);
    //   console.log("initial: " + daysLeftBeforExpiry);

    // Use daysLeft here
  } else {
    // Handle invalid date cases
  }

  useEffect(() => {
    // This code runs after every render
    setDiscontPrice(packageDiscountPrice);
  }, [packageDiscountPrice]);

  useEffect(() => {
    // This code runs after every render
    setDaysLeftBeforeExpiry(daysLeft.toString());
  }, [daysLeft]);
  return (
    <div>
      <div>
        <h1>Discount Management</h1>
      </div>

      <div>
        <div className="py-5">
          <div>
            <h1>
              <span className="text-primary-color font-semibold">
                {" "}
                Expiry Date Saved:
              </span>{" "}
              {new Date(discountExpiryDate).toDateString()}
            </h1>

            <div>
              <div>
                {isDate(new Date(discountExpiryDate)) && isDate(today) ? (
                  <h1>
                    There are{" "}
                    {parseFloat(daysLeftBeforExpiry) > 0
                      ? daysLeftBeforExpiry
                      : "0"}{" "}
                    days left until the expiry date.
                  </h1>
                ) : (
                  <h1>Unable to determine remaining days.</h1> // Handle invalid date cases
                )}
              </div>
            </div>
          </div>
          <div>
            <CalanderForm packageId={PackageId} />
          </div>

          <button
            onClick={() => {
              console.log("test: " + packageDiscountStatus);
            }}
          ></button>
        </div>
      </div>

      <div>
        <h1>Regulat Price: {packagePrice} Birr</h1>
        <h1>Discount Price: {discontPrice} Birr</h1>
        {parseFloat(packagePrice) < parseFloat(discontPrice) ? (
          <h1 className="text-red-600">
            The regular price is lessthan the dicount given!
          </h1>
        ) : (
          <h1>
            Discount in percent :{" "}
            {(((packagePrice - discontPrice) / packagePrice) * 100).toFixed(2)}%
          </h1>
        )}
        <div>
          <EditCellDialog
            content={packageDiscountPrice}
            dataType="number"
            field="temporaryPrice"
            id={PackageId}
            type="mockexampackage"
          />
        </div>
      </div>

      <div className="w-full bg-blue-200 py-5 ">
        <table className="  w-full ">
          <tr className="text-blue-900">
            <th>Main Price</th>
            <th>Discounted Price</th>
            <th>Discount in %</th>
          </tr>
          <tr>
            <th>{packagePrice}</th>
            <th>{packageDiscountPrice}</th>
            <th>
              {" "}
              {parseFloat(packagePrice) < parseFloat(discontPrice) ? (
                <h1 className="text-red-600">Check Price!</h1>
              ) : (
                <h1>
                  {(
                    ((packagePrice - discontPrice) / packagePrice) *
                    100
                  ).toFixed(2)}
                  %
                </h1>
              )}
            </th>
            <th>
              {" "}
              <div>
                <EditCellDialog
                  content={packageDiscountPrice}
                  dataType="number"
                  field="temporaryPrice"
                  id={PackageId}
                  type="mockexampackage"
                />
              </div>
            </th>
          </tr>
        </table>
      </div>

      <div>
        <h1>Discount Status: {packageDiscountStatus?.toString()}</h1>
        <div>
          <SwitchDialog
            backTo=""
            buttonTitle={"Change Status"}
            field="discountStatus"
            id={PackageId}
            type="mockexampackage"
            content={packageDiscountStatus}
          />
        </div>
      </div>
    </div>
  );
}
