import axios from "axios";
import { URL } from "./UrlAPI";

const GET_PROJECTS = URL + "/project";
const POST_PROJECT = URL + "/project";

export function getProjects() {
  return axios.get(GET_PROJECTS, {
    headers: {
      Accept: "application/json",
      "-Type": "application/json",
    },
  });
}
export function addProject(query) {
  return axios.post(POST_PROJECT, query, {
    headers: {
      Accept: "application/json",
      "-Type": "application/json",
    },
  });
}
