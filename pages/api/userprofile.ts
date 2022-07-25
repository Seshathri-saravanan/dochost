import axios from "axios";

export default async function handler(req: any, res: any) {
  const result = await axios.get("http://localhost:3001/userprofile", {
    headers: { ...req.headers },
  });
  console.log("result is", req);
  res.status(200).json(result.data);
}
