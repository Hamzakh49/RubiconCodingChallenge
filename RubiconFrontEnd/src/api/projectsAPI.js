import axios from "axios";
import { URL } from "./UrlAPI";

const PROJECTS_URL = URL + "/project";

export function getProjects() {
  return axios.get(PROJECTS_URL, {
    headers: {
      Accept: "application/json",
      "-Type": "application/json",
    },
  });
}
export function getProject(id) {
  return axios.get(PROJECTS_URL + `/${id}`, {
    headers: {
      Accept: "application/json",
      "-Type": "application/json",
    },
  });
}
export function deleteProject(id) {
  return axios.delete(PROJECTS_URL + `/${id}`, {
    headers: {
      Accept: "application/json",
      "-Type": "application/json",
    },
  });
}
export function addProject(query) {
  return axios.post(PROJECTS_URL, query, {
    headers: {
      Accept: "application/json",
      "-Type": "application/json",
    },
  });
}
export function updateProject(id, query) {
  return axios.put(PROJECTS_URL + `/${id}`, query, {
    headers: {
      Accept: "application/json",
      "-Type": "application/json",
    },
  });
}
