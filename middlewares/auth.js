import { getUser } from "../services/auth.js";
export function restrictToLoggedInUserOnly(req,res,next){
    const userId= req.cookies?.sessionID;
    
    if(!userId) return res.redirect('/login')

    const user = getUser(userId);

    if(!user) {
    res.clearCookie("sessionID");
    return res.redirect("/login");
    }
    req.user = user;

    next();
}

export function checkAuth(req,res,next){
    const userId= req.cookies?.sessionID;

    // if(!userId) return res.redirect('/login')
    const user = getUser(userId);

    // if(!user) return res.redirect('/login')
    
    req.user = user;
    next();
}