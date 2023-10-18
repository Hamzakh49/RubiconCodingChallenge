import axios from "axios";
import { URL } from "./UrlAPI";

const GET_TASKS = URL + "/task/get-task";
const GET_TASK = URL + "/task/get-task";
const POST_TASK = URL + "/task/add-task";
const PUT_TASK = URL + "/task/update-task";
const DEL_TASK = URL + "/task/delete-task";

export function getTasks() {
  return axios.get(GET_TASKS, {
    headers: {
      Accept: "application/json",
      "-Type": "application/json",
    },
  });
}
export function getTask(id) {
  return axios.get(GET_TASK + `/${id}`, {
    headers: {
      Accept: "application/json",
      "-Type": "application/json",
    },
  });
}

export function addTask(query) {
  return axios.post(POST_TASK, query, {
    headers: {
      Accept: "application/json",
      "-Type": "application/json",
    },
  });
}

export function updateTask(id, query) {
  return axios.put(PUT_TASK + `/${id}`, query, {
    headers: {
      Accept: "application/json",
      "-Type": "application/json",
    },
  });
}

export function deleteTask(id) {
  return axios.delete(DEL_TASK + `/${id}`, {
    headers: {
      Accept: "application/json",
      "-Type": "application/json",
    },
  });
}
