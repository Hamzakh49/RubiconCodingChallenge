import axios from "axios";
import { URL } from "./UrlAPI";

const GET_TASKS = URL + "/task/get-task";
const POST_TASK = URL + "/task/add-task";

export function getTasks() {
  return axios.get(GET_TASKS, {
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
