import { BASE_URL } from "@/constants/server";
import axios from "axios";
import { USER_ROLES } from "@/constants/enum";
import LoginSession from "@/app/cookie";
import { CreateOrgDTO } from "./constant/request";

const ORG_URL = `${BASE_URL}/org-config`;

export const OrgConfigService = {
  getConfig: async (): Promise<any> => {
    return await axios
      .get(`${ORG_URL}/`, {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        return error.response.data;
      });
  },

  updateConfig: async (id: string, payload: Object): Promise<any> => {
    return await axios
      .put(`${ORG_URL}/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        return error.response.data;
      });
  },
};
