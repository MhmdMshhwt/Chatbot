import React, { useContext } from 'react';
import SidebarHeader from './header';
import ChatAreaContext from '../../../context/chatArea-context';
import ArchivedClients from './archivedClients';


const Sidebar4 = () => {
  const {
    value,
  } = useContext(ChatAreaContext);
  
 
  return (
    <div style={{display: value === 3? 'flex' : 'none', visibility: value === 3? 'visible' : 'hidden' }} className="border-r border-gray-200 flex-col max-h-screen h-screen " >
      <SidebarHeader />
      <ArchivedClients />
    </div>
  );
};

export default Sidebar4;
