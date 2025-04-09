import MessagesModel from "../models/MessagesModel.js";
import { formatDate } from "../utils/formatDate.js";

export const indexController = {
  getHomePage: async (req, res) => {
    console.log("Getting home page...");
    const user = req.user;
    console.log(user);
    if (!user) return res.redirect("/login");

    try {
      const latestMessage = await MessagesModel.findMessageByLatest();
      latestMessage.created_at = formatDate(latestMessage.created_at);
      user.created_at = formatDate(user.created_at);
      res.render("home", { title: "Home", user, latestMessage });
    } catch (err) {
      console.log("Error during the getHomePage controller: ", err);
      res.render("home", {
        title: "Home",
        user,
        errorMsg: err.message || "Something went wrong fetching messages.",
      });
    }
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
    const allMessages = await MessagesModel.getAllMessages();

    const allMessagesFormatted = allMessages.map((message) => ({
      ...message,
      created_at: formatDate(message.created_at),
    }));

    res.render("messages", { title: "Messages", allMessages: allMessagesFormatted });
  },
};
