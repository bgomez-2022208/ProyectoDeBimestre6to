import bcryptjs from 'bcryptjs';
import Admin from '../admin/admin.js'
import { generarJWT } from '../helpers/generate-jwt.js'; 

export const login = async (req, res) => {
    const { correo, password } = req.body;

  try {
    const admin = await Admin.findOne({ correo });

    if (!admin) {
      return res.status(400).json({
        msg: "Incorrect credentials, Email does not exist in the database",
      });
    }
    console.log("dasdasdsa");
    if (!admin.estado) {
      return res.status(400).json({
        msg: "The user does not exist in the database",
      });
    }
    const validPassword = bcryptjs.compareSync(password, admin.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Password is incorrect",
      });
    }
    const token = await generarJWT(admin.id);

    res.status(200).json({
      msg: 'Login Ok!!!',
      admin,
      token
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Contact administrator",
    });
  }
}