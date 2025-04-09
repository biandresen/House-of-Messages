import MessagesModel from "../models/MessagesModel.js";
import { formatDate } from "../utils/formatDate.js";

export const indexController = {
  getHomePage: async (req, res) => {
    console.log("Getting home page...");
    const user = req.user;
    console.log(user);
    if (!user) return res.redirect("/login");

    try {
      const latestMessage = await MessagesModel.getMessageByLatest();
      latestMessage.created_at = formatDate(latestMessage.created_at);
      user.created_at = formatDate(user.created_at);
      res.render("home", { title: "Home", user, latestMessage });
    } catch (err) {
      console.error("Error during the getHomePage controller: ", err);
      res.render("home", {
        title: "Home",
        user,
        errorMsg: err.message || "Something went wrong fetching messages.",
      });
    }
  },
  get404Page: async (req, res) => {
    console.log("Getting 404-page...");
    res.status(404).render("404-page", { title: "Page Not Found" });
  },
  logout: (req, res) => {
    const user = req?.user;
    if (!user) res.redirect("/login");
    req.logout((err) => {
      if (err) return next(err);
      res.redirect("/login");
    });
  },
  getMessagesPage: async (req, res) => {
    console.log("Getting messages page...");
    const user = req?.user || false;
    try {
      const allMessages = await MessagesModel.getAllMessages();

      const allMessagesFormatted = allMessages.map((message) => ({
        ...message,
        created_at: formatDate(message.created_at),
      }));

      res.render("messages", {
        title: "Messages",
        allMessages: allMessagesFormatted,
        user,
      });
    } catch (err) {
      console.error("Error getting all messages: ", err);
      return res.render("messages", { title: "Messages" });
    }
  },
  getNewMessagePage: async (req, res) => {
    console.log("Getting new message page...");
    let latestMessage;
    let yourLatestMessage;
    const user = req?.user || false;
    if (!user) return res.redirect("/messages");

    try {
      latestMessage = await MessagesModel.getMessageByLatest();
      if (latestMessage) latestMessage.created_at = formatDate(latestMessage.created_at);
    } catch (err) {
      console.error("Error getting latest message: ", err);
    }

    try {
      if (user) {
        yourLatestMessage = await MessagesModel.getUsersLatestMessageById(user.id);
        if (yourLatestMessage)
          yourLatestMessage.created_at = formatDate(yourLatestMessage.created_at);
      }
    } catch (err) {
      console.error("Error getting a user's latest message: ", err);
    }

    res.render("new-message", {
      title: "New Message",
      user,
      latestMessage,
      yourLatestMessage,
    });
  },
  postNewMessage: async (req, res) => {
    const { title, text } = req.body;
    const user = req?.user || false;
    if (!user) return res.redirect("/messages");
    console.log(title, text);
    try {
      const result = await MessagesModel.postNewMessage(user.id, title, text);
      console.log("New message posted: ", result);
      res.redirect("/messages");
    } catch (err) {
      console.error("Error during posting of new message: ", err);
      res.render("new-message", {
        title: "New Message",
        errorMsg: "Couldn't post message. Try again later...",
      });
    }
  },
  deleteMessage: async (req, res) => {
    const messageId = req.body?.id;
    if (!messageId) return res.redirect("/messages");
    try {
      const result = await MessagesModel.deleteMessage(messageId);
      console.log("Deleted message: ", result);
      res.redirect("/messages");
    } catch (err) {
      console.log("Error during deletion of message: ", err);
    }
  },
};
