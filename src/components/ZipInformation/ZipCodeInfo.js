import React from 'react'
import globalLocation from '../../Assets/ManwithGlobe.png';
import './ZipCodeInfo.css';
import {TbBeach} from 'react-icons/tb';

const ZipCodeInfo = (props) => {
  return (
    <>
    <div className="row big-card rounded align-items-center">
        <div className="text-center col-md-6 col-12">
            <img className="my-image" src={globalLocation} alt="Random Location"/>
        </div>
        <div className="text-center my-card px-5 text-light col-md-6 col-12">
            <div className="py-3">
                <h2 className="display-5">Zip Code Information</h2>
                <h4 className="lead fs-4">Basic Details</h4>
            </div>
            
            <div className="py-3">
                <div className="row">
                    <p className="col-6 lead fs-5">Country: <b>{props.data['country']}</b></p>
                    <p className="col-6 lead fs-5">Country Code: <b>{props.data['country abbreviation']}</b></p>
                </div>
                <div className="row">
                    {props.data['places'][0].state && <p className="col-6 lead fs-5">State: <b>{props.data['places'][0].state}</b></p>}
                    {props.data['places'][0]['state abbreviation'] && <p className="col-6 lead fs-5">State Code: <b>{props.data['places'][0]['state abbreviation']}</b></p>}
                </div>
                <div className="row">
                    {props.data.places.length===1 && <p className="lead col-6 fs-5">City: <b>{props.data.places[0]['place name']}</b></p>}
                    <p className="lead col-6 fs-5">Postal Code: <b>{props.data['post code']}</b></p>
                </div>
                
                
            </div>
        </div>
    </div>

    <div className="row my-5 justify-content-center">
        <div className="text-center city-card rounded col-12 col-sm-8 col-lg-6">
            <div className="py-3">
                <h3 className="h3 py-5"><TbBeach/> Top Places/Cities</h3>
                {props.data.places.map((place, ind)=>{
                    return <p className="fs-5"><b>{ind+1}. {place['place name']}</b></p>
                })}
            </div>
        </div>
    </div>
    </>
  )
}

export default ZipCodeInfo;
