import React, { useContext } from 'react';
import SidebarHeader from './header';
import ChatAreaContext from '../../../context/chatArea-context';
import UnreadClients from './unreadClients';


const Sidebar3 = () => {
  const {
    value,
  } = useContext(ChatAreaContext);
  
  return (
      <div style={{display: value === 2? 'flex' : 'none', visibility: value === 2? 'visible' : 'hidden' }} className="border-r border-gray-200 flex-col max-h-screen h-screen ">
        <SidebarHeader />    
        <UnreadClients />  
      </div>
  );
};

export default Sidebar3;
