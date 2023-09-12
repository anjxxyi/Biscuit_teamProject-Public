import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiFillSetting, AiFillEdit } from 'react-icons/Ai'
import { Context } from '../store/Context'
import { useState } from 'react'


const AdminHandler = ({ edit, children }) => {
  // useInfo
  const props = useContext(Context);
  const userInfo = props.userInfo;

  // path
	const path = useLocation().pathname.replace("/", "").split("/")[0];

  // handlerOpen
  const [isOpen, setIsOpen] = useState(false);
  const handlerOpen = () => setIsOpen(!isOpen);

  return (
    <>
    {userInfo && (userInfo?.authority == null && userInfo?.authority == undefined) || userInfo?.authority == "U" ?
      null
      :
      <div id="adminHandler">
        <button type="button" className="setBtn" onClick={handlerOpen}><AiFillSetting/></button>
        {isOpen ? 
        <div className="btnBox">
          {path == "campaign" ? null : <Link to={edit}><AiFillEdit/></Link>}
          {children}
        </div> : null
        }
      </div>
      }
    </>
  )
}

export default AdminHandler