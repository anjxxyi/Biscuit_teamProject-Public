import React, { useEffect, useState } from 'react'

const Dropdown = ({ visibility, handleDropdown, children }) => {
  const [visibilityAnimation, setVisibilityAnimation] = useState(false);

  useEffect(() => {
    if (visibility) {
      setVisibilityAnimation(true);
      document.body.style= `overflow:hidden`;
      return () => document.body.style = `overflow:auto`;
    } else {
      setTimeout(() => {
        setVisibilityAnimation(false);
      }, 300);
    }
  }, [visibility]);

  return (
    <>
    {visibilityAnimation ? 
      <div id="headerDropdown" className={`${visibility ? "slideFadeInDropdown" : "slideFadeOutDropdown"}`}>
        <div className="wrapper">{ visibilityAnimation  && children }</div>
        <div onClick={handleDropdown}></div>
      </div> 
      : null
    }
    </>
  )
}

export default Dropdown