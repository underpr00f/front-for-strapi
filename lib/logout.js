import Cookie from "js-cookie";
import { redirectToLogin } from './redirectToLogin'

  
export async function logout() {
	Cookie.remove("token");
};