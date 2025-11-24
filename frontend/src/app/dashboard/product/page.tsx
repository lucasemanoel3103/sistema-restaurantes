import { Form } from "./components/form"
import { api } from "@/services/api"
import { getCookieServer } from "@/lib/cookieServers"

export default async function Product(){
  const token = await getCookieServer();

  const response = await api.get("/show", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

    return(
      <Form categories={response.data}/>
    )
}