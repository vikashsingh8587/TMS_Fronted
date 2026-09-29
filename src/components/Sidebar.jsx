import { useState } from "react";
import { useDispatch } from "react-redux";

import "../assets/styles/Sidebar.css";
import logo from "../assets/logo.png";

import ChatHistory from "./ChatHistory";

import {
  setMessages,
  setSessionId,
  setError,
} from "../store/slices/chatSlice";


function Sidebar({
  isOpen,
  onClose,
  onToggle,
  onNewChat,
  onOpenChat,
  activeSessionId,
}) {

  const dispatch = useDispatch();

  // ============================================================
  // ACTIVE SIDEBAR SECTION
  // ============================================================

  const [activeSection, setActiveSection] =
    useState("new");


  // ============================================================
  // NEW CHAT
  // ============================================================

  const handleNewChat = async () => {

    // History hide
    setActiveSection("new");

    // Parent Dashboard new chat create karega
    if (onNewChat) {
      await onNewChat();
    }
  };


  // ============================================================
  // CHATS TOGGLE
  // ============================================================

  const handleChats = () => {

    setActiveSection((previous) => {

      if (previous === "chats") {
        return "new";
      }

      return "chats";

    });

  };


  // ============================================================
  // OPEN OLD CHAT
  // ============================================================

  const handleChatSelect = (chat) => {

    if (!chat) {
      return;
    }


    // Old chat open hone ke baad
    // Recent Chats hide
    setActiveSection("new");


    // ==========================================================
    // SESSION ID
    // ==========================================================

    dispatch(
      setSessionId(
        chat.session_id
      )
    );


    // ==========================================================
    // OLD MESSAGES
    // ==========================================================

    dispatch(
      setMessages(
        chat.messages || []
      )
    );


    // Clear previous error
    dispatch(
      setError(null)
    );


    // ==========================================================
    // DASHBOARD KO INFORM
    // ==========================================================

    if (onOpenChat) {

      onOpenChat(
        chat.session_id
      );

    }


    // ==========================================================
    // MOBILE SIDEBAR CLOSE
    // ==========================================================

    if (onClose) {
      onClose();
    }

  };


  return (

    <aside
      className={`sidebar ${
        isOpen
          ? "sidebar-open"
          : "sidebar-closed"
      }`}
    >

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="sidebar-header">

        <button
          className="logo-button"
          onClick={onToggle}
          aria-label="Toggle sidebar"
          type="button"
        >

          <img
            src={logo}
            alt="My AI"
          />

        </button>


        <div className="brand-name">
          My AI
        </div>


        {/* MOBILE CLOSE */}

        <button
          className="mobile-close-btn"
          onClick={onClose}
          aria-label="Close sidebar"
          type="button"
        >
          ×
        </button>

      </div>


      {/* ======================================================
          SIDEBAR BODY
      ====================================================== */}

      <div className="sidebar-body">


        {/* ====================================================
            NEW CHAT
        ==================================================== */}

        <button
          className={`new-chat-btn ${
            activeSection === "new"
              ? "sidebar-active"
              : ""
          }`}
          onClick={handleNewChat}
          type="button"
        >

          <span className="new-chat-icon">
            +
          </span>

          <span>
            New Chat
          </span>

        </button>


        {/* ====================================================
            MENU
        ==================================================== */}

        <nav className="sidebar-menu">


          {/* ================= CHAT ================= */}

          <button
            className={`menu-item ${
              activeSection === "chats"
                ? "menu-item-active"
                : ""
            }`}
            onClick={handleChats}
            type="button"
          >

            <span className="menu-icon">
              💬
            </span>

            <span>
              Chats
            </span>

          </button>


          {/* ================= SEARCH ================= */}

          <button
            className="menu-item"
            type="button"
          >

            <span className="menu-icon">
              🔍
            </span>

            <span>
              Search
            </span>

          </button>


          {/* ================= FAVORITES ================= */}

          <button
            className="menu-item"
            type="button"
          >

            <span className="menu-icon">
              ⭐
            </span>

            <span>
              Favorites
            </span>

          </button>


          {/* ================= SETTINGS ================= */}

          <button
            className="menu-item"
            type="button"
          >

            <span className="menu-icon">
              ⚙️
            </span>

            <span>
              Settings
            </span>

          </button>

        </nav>


        {/* ====================================================
            CHAT HISTORY
            SHOW ONLY WHEN CHATS IS ACTIVE
        ==================================================== */}

        {activeSection === "chats" && (

          <div className="sidebar-chat-history">

            <ChatHistory
              onChatSelect={
                handleChatSelect
              }
            />

          </div>

        )}

      </div>


      {/* ======================================================
          USER
      ====================================================== */}

      <div className="sidebar-user">

        <div className="user-avatar">
          J
        </div>


        <div className="user-info">

          <strong>
            Jai
          </strong>

          <span>
            Free Plan
          </span>

        </div>

      </div>

    </aside>

  );
}


export default Sidebar;