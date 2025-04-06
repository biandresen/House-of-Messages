export const formController = {
  getRegisterForm: (req, res) => {
    res.render("register", { title: "Register" });
  },
  postRegisterForm: (req, res) => {
    const { email, firstname, lastname, password, confirmPassword } = req.body;
    console.log(email, firstname, lastname, password, confirmPassword);
    res.sendStatus(200);
  },
};
