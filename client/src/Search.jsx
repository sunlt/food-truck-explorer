import React, { useEffect, useState } from 'react';
import http from './http'
import { Input, Table, Space } from 'antd';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import L from "leaflet";
import 'leaflet/dist/leaflet.css'
const { Column } = Table;
const marker_icon = require('./map-marker-2-32.png')
  


async function geoFindMe() {
    return new Promise((resolve,reject) => {
        function success(position) {
            resolve(position.coords)
            // const latitude = position.coords.latitude;
            // const longitude = position.coords.longitude; 
        }         
        navigator.geolocation.getCurrentPosition(success, reject);
    });
}

const Search = () => {
    const [data, setData] = useState({
        list: [],
        total: 0,
    });
    const [query, setQuery] = useState({
        keyword:'', lat:null, long: null, page : 1, pageSize : 10
    })


    const doSearch = async (query) => { 
        setQuery(query)
        http.get('/search', {
            params: query
        }).then((rev) => {
            setData(rev);
        })
    }

    useEffect(() => {
        
        geoFindMe().then((coords) => {
            doSearch({...query,lat:coords.latitude, long: coords.longitude});
        }).catch(() => {
            doSearch(query);
        });
        
    },[])



    const handleSearch = (value) => {
        doSearch({
            ...query,
            value
        });
    } 
    return <>
        <Input.Search onSearch={handleSearch} placeholder="Search name" />
        <Table dataSource={data.list} rowKey="locationid" pagination={{
            pageSize: query.pageSize,
            current: query.page,
            total: data.total,
            showSizeChanger: false,
            onChange:(page) => doSearch({...query, page})
        }}>
            <Column title="Name" dataIndex="Applicant" />
            <Column title="FacilityType" dataIndex="FacilityType" />
            <Column title="Address" dataIndex="Address" />
            <Column title="Status" dataIndex="Status" />
            <Column title="FoodItems" dataIndex="FoodItems" />           
            <Column
            title="Action"
            key="action"
            render={(_, record) => (
                <Space size="middle">
                <Link to={`/info?id=${record.locationid}`}>Info</Link>
                </Space>
            )}
            />
        </Table> 
        {data.list[0] && (
        <MapContainer center={[data.list[0].Latitude,data.list[0].Longitude]} zoom={13}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

             
            {data.list.map(row => (
                <Marker key={row.locationid} position={[row.Latitude,row.Longitude]} icon={L.icon({
                    iconUrl: `https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png`, 
                })} >
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            ))}
        </MapContainer> 
        )}
    </>
}


export default Search;