import jwt from 'jsonwebtoken'
import Admin from '../admin/admin.js'
import Customer from '../customer/customer.js';

export const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const admin = await Admin.findById(uid);
    if(!admin){
      return res.status(401).json({
        msg: 'User does not exist in the database'
      })
    }
    if(!admin.estado){
      return res.status(401).json({
        msg: 'Invalid token - user with status:false'
      })
    }

    req.admin = admin;

    next();
  } catch (e) {
    console.log(e),
      res.status(401).json({
        msg: "Token no válido",
      });
  }
}



export const validarJWTCustomer = async (req, res, next) => {
  const token = req.header("x-token");

if (!token) {
  return res.status(401).json({
    msg: "No hay token en la petición",
  });
}

try {
  const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
  const customer = await Customer.findById(uid);
  if(!customer){
    return res.status(401).json({
      msg: 'User does not exist in the database'
    })
  }
  if(!customer.estado){
    return res.status(401).json({
      msg: 'Invalid token - user with status:false'
    })
  }

  req.customer = customer;

  next();
} catch (e) {
  console.log(e),
    res.status(401).json({
      msg: "Token no válido",
    });
}
}