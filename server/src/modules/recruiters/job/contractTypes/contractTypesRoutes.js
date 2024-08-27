import { Router } from "express";
import { isToken } from "../../../../middlewares/jwt/isVerifiedAccount.js";
import { getContractTypesCtrl } from "./contractTypesControllers.js";

const contractTypeRoutes = Router()

contractTypeRoutes.get('get-contract-types', isToken, getContractTypesCtrl)

export default contractTypeRoutes