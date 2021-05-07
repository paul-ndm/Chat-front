import React from 'react';
import { useAuth } from '../../context/authState'

const SearchBar = ({keyword,setKeyword}) => {
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  return (
    <input 
     style={BarStyling}
     key="random1"
     value={keyword}
     placeholder={"search contacts"}
     onChange={(e) => setKeyword(e.target.value)}
    />
  );
}

const ContactsList = ({countryList=[]}) => {
    return (
      <>
      { countryList.map((data,index) => {
          if (data) {
            return (
              <div key={data.name}>
                <h1>{data.name}</h1>
          </div>	
             )	
           }
           return null
      }) }
      </>
    );
  }

