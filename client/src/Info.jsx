import React, { useEffect, useState } from "react";
import http from "./http";
import { Skeleton, Descriptions } from "antd";
import { useSearchParams } from "react-router-dom";

const Info = () => {
  const [params] = useSearchParams();
  const id = params.get("id");

  const [info, setInfo] = useState(null);

  useEffect(() => {
    http
      .get("/info", {
        params:{id: id}
      })
      .then((rev) => {
        setInfo(rev.data);
      })
  }, [id]);
  
 const items = info ? [{ 
    label: 'FacilityType',
    children: info.FacilityType,
 },{ 
    label: 'Address',
    children: info.Address,
 },{ 
    label: 'LocationDescription',
    children: info.LocationDescription,
 },{ 
    label: 'FoodItems',
    children: info.FoodItems,
 },{ 
    label: 'Status',
    children: info.Status,
 },{ 
    label: 'ExpirationDate',
    children: info.ExpirationDate,
 },{ 
    label: 'dayshours',
    children: info.dayshours,
 },{ 
    label: 'Zip Codes',
    children: info['Zip Codes'],
 }
]: [];
  return <>
    <Descriptions title={info?.Applicant}  bordered items={items} />
  </>;
};

export default Info;
