export const indexController = {
  getHomePage: (req, res) => {
    console.log("Getting home page...");
    res.render("home", { title: "Home" });
  },
};
