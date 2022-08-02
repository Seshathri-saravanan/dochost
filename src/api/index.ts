import axios from "axios";
const ACCESS_TOKEN_KEY = "access_token";
const url = "http://localhost:3001";

export async function getAllProjects() {
  const res = await axios.get(`${url}/project`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
    },
  });
  return res.data;
}

export async function getProjectDetails(projectId: number) {
  const res = await axios.get(`${url}/project/${projectId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
    },
  });
  return res.data;
}

export async function createPage(projectId: number, pageName: string) {
  const res = await axios.post(
    `${url}/page`,
    {
      projectId,
      pageName,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
      },
    }
  );
  return res.data;
}

export async function updatePage(pageId: number, pageData: any) {
  const res = await axios.put(`${url}/page/${pageId}`, pageData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
    },
  });
  return res.data;
}

export async function createProject(project: any) {
  const res = await axios.post(`${url}/project`, project, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
    },
  });
  return res.data;
}

export async function updateProject(pageId: number, pageData: any) {
  const res = await axios.put(`${url}/page/${pageId}`, pageData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
    },
  });
  return res.data;
}