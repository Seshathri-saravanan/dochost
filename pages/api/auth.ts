import axios from "axios";

export default async function handler(req: any, res: any) {
  const result = await axios.post("http://localhost:3001/login", req.body);
  console.log("result is", result);
  res.status(200).json(result.data);
}
