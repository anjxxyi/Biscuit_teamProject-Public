import React from 'react'
import DaumPostcode from "react-daum-postcode"

// 참고 : /pages/bookclass/BookclassApplyForm

const PopupPostCode = ({ onClose, setLocation, setPostcode, locationDetail }) => {
  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = ''; 
    
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      };
      if (data.buildingName !== '') {
          extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      };
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    };
    setLocation(fullAddress);
    setPostcode(data.zonecode);
    locationDetail && (locationDetail.current.value = "");
    onClose();
  };

  return(
    <div id="modalContent">
      <DaumPostcode onComplete={handlePostCode} />
      <div className="bgClickClose" onClick={onClose}></div>
    </div>
  )
}
 
export default PopupPostCode;