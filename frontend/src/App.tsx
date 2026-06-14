import {useState} from "react";
import {translateRequest, type TranslateResponse} from "./utils/requests.js";

function App(){
    const [data, setData] = useState<TranslateResponse | null>(null)

    const payload = {
        userPrompt: "I like baseball.",
        targetLanguage: "French"
    }

    const handleTranslate = async () => {
        const response = await translateRequest(payload)
        setData(response)
    }

    console.log(data?.message[0].output)

  return (
      <>
        <button onClick={handleTranslate}>Translate</button>
      </>
  )
}

export default App;