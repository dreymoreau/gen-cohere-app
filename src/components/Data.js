import { useState }from 'react'
import axios from 'axios'


export default function Test() {
  const [input, setInput] = useState("");
  const [data, setData] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const options = {
    method: "POST",
    url: "https://api.cohere.ai/v1/generate",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: "Bearer vuQvupQyuoKFIURO1S2MfXD98MGLabbnnrnYtrUE",
    },
    data: {
      model: "command",
      temperature: 0.9,
      max_tokens: 200,
      return_likelihoods: "NONE",
      k: 0,
      stop_sequences: [],
      truncate: "END",
      prompt: `A poem about ${input}`,
    },
  };

  const handleData = (e) => {
    e.preventDefault();
    setResults(null);
    axios
      .request(options)
      .then((res) => {
        console.log(res);
        // gets data from the array and stores it in a variable
        const receivedData = res.data.generations[0].text;
        // accesses the array with the info stored in the variable but gets only the text back from the api
        // const actualData = receivedData.split(' ')[1]
        setData(receivedData);
      })
      .catch((err) => {
        setError("aw dang! something went wrong, try again :)", err.message);
      });
    setResults(true);
  };
  return (
    <div>
      <div>
        <form className="mt-10" action="submit" onSubmit={handleData}>
          <label id="text"></label>
          <input
            type="text"
            placeholder="generate a poem about..."
            onChange={handleInput}
            className="border-2 border-black border-solid ml-3 p-1 rounded"
            required
          />
          <button
            className="border-2 border-black border-solid bg-orange-200 ml-3 p-1 rounded hover:bg-red-300 cursor-pointer; "
            type="submit"
          >
            Get Poem!
          </button>
        </form>
      </div>

      <div className="flex flex-row justify-center ml-23 p-14 mt-7">
        <div className="bg-green-300">
          {error && <div>{error}</div>}
          {results && (
            <div>
              <p>{data}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}