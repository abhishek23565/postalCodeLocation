import React, { useState, useCallback, useRef } from 'react';
import {IoMdPin} from 'react-icons/io'
import '../InputForm/InputForm.css';
import ZipCodeInfo from '../ZipInformation/ZipCodeInfo';

const InputForm = () => {
  const zipCodeRef = useRef();
  const [zipInfo, setZipInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [isError, setIsError] = useState(null);

  // fetching data using the async await and Handling form submission
  const formSubmitHandler = useCallback(async (e)=>{
    e.preventDefault();
    const enteredZipCode = zipCodeRef.current.value;
    const URL = `https://api.zippopotam.us/in/${enteredZipCode}`;
    
    if(enteredZipCode.trim().length !== 0){
      setIsInputEmpty(false);
      try{
        setIsLoading(true);
        setIsError(null);
        const response = await fetch(URL);
        if(!response.ok){
          throw new Error('Data Not Found..! Enter a valid zip code');
        }
        const data = await response.json();
        setZipInfo(data);
      } catch (error){
        setIsError(error.message)
      }
    }
    else{
      setIsInputEmpty(true);
    }
    setIsLoading(false);
    zipCodeRef.current.value = '';
  }, []);

  console.log(zipInfo);

  return (
    <div>
      <div className="container-fluid my-container">
          <div className="container py-5 text-center">
            <h2 className="display-4 ">We Just need a Zip Code!!</h2>
            <p className="lead">Please enter the Zip Code in the below input bar to get the all information about that Zip Code.</p>
          </div>
          <div className="container text-center">
              <form onSubmit={formSubmitHandler} className="d-flex my-form align-items-center justify-content-center">
                  <IoMdPin className="zip-icon"/>
                  <input ref={zipCodeRef} type="text" className="form-control my-input w-25" autoComplete="new-password" placeholder="Enter Postal Code"/>
                  <button className="btn btn-primary mx-3">Submit</button>
              </form>
          </div>
          <div className="container py-5">
            {!isLoading && Object.keys(zipInfo).length === 0 && !isInputEmpty && !isError && <p className="fs-5 text-center">Enter Zip Code & Press the button to collect the postal code information.</p>}
            {!isLoading && isInputEmpty && !isError && <p className="fs-5 text-error text-center">Please enter a Zip Code.</p>}
            {isLoading && <p className="fs-5 text-center">Loading...</p>}
            {!isLoading && isError && <p className="fs-5 text-error text-center"><b>{isError}</b></p>}
            {!isLoading && !isError && Object.keys(zipInfo).length !== 0 && <ZipCodeInfo data={zipInfo} />}
          </div>

      </div>
    </div>
  )
}

export default InputForm;
