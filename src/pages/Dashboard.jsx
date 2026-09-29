import { useState } from "react";
import { useDispatch } from "react-redux";

import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";

import {
  clearMessages,
  setSessionId,
  setError,
} from "../store/slices/chatSlice";

import {
  createChatSession,
} from "../services/api";

import "../assets/styles/Dashboard.css";


function Dashboard() {

  const dispatch = useDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [activeSessionId, setActiveSessionId] =
    useState(null);


  // ============================================================
  // NEW CHAT
  // ============================================================

  const handleNewChat = async () => {

    try {

      // Purane messages clear
      dispatch(clearMessages());

      dispatch(setError(null));


      // New session backend me create
      const data =
        await createChatSession();


      const sessionId =
        data.session_id ||
        data.data?.session_id;


      if (!sessionId) {
        throw new Error(
          "Session ID was not received."
        );
      }


      // Redux me session save
      dispatch(
        setSessionId(sessionId)
      );


      // Dashboard state me bhi save
      setActiveSessionId(sessionId);


    } catch (error) {

      console.error(
        "Error creating new chat:",
        error
      );

      dispatch(
        setError(
          "Unable to create a new chat."
        )
      );

    }
  };


  // ============================================================
  // OPEN OLD CHAT
  // ============================================================

  const handleOpenChat = (sessionId) => {

    setActiveSessionId(sessionId);

  };


  return (

    <div className="dashboard">

      <Sidebar

        isOpen={sidebarOpen}

        onClose={() =>
          setSidebarOpen(false)
        }

        onToggle={() =>
          setSidebarOpen((prev) => !prev)
        }

        onNewChat={handleNewChat}

        onOpenChat={handleOpenChat}

        activeSessionId={activeSessionId}

      />


      {sidebarOpen && (

        <div
          className="sidebar-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />

      )}


      <main className="chat-area-wrapper">

        <ChatArea
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

      </main>

    </div>
  );
}


export default Dashboard;