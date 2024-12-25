import { useEffect, useState } from "react";
import api from "../api/axiosApi";
import Swal from "sweetalert2";

const GenerateData = () => {
  return (
    <>
      <div className="flex flex-col flex-wrap h-full w-full">
        <div className="greyStrip p-4 w-full flex justify-center">
          <h2 className="text-2xl font-semibold mb-4">Generate Data</h2>
        </div>
        <GenerateField />
      </div>
    </>
  );
};
export default GenerateData;

const GenerateField = () => {
  const [data, setData] = useState(false); // Determines if gameNo dropdown should appear
  const [batchData, setBatchData] = useState(false); // Determines if batch dropdown should appear
  const [batchNumbers, setBatchNumbers] = useState([]);
  const [gameNumbers, setGameNumbers] = useState([]); // Holds the fetched game numbers
  const [ticketStatus, setTicketStatus] = useState("Initiated"); // Default ticket status
  const [gameStatus, setGameStatus] = useState(""); // Default ticket status
  const [batchStatus, setBatchStatus] = useState("");

  useEffect(() => {
    // Call handleTicketStatusChange with "Initiated" on initial render
    handleTicketStatusChange({ target: { value: "Initiated" } });
  }, []);

  // Function to handle ticket status change
  const handleTicketStatusChange = async (event) => {
    const status = event.target.value;
    setTicketStatus(status); // Update ticketStatus state
    if (status === "-1") {
      setData(false);
      setGameNumbers([]);
      return;
    }
    try {
      // Call server API with the selected ticketStatus
      const response = await api.get(`/generateData?ticketStatus=${status}`);
      const result = response.data.data;
      setGameNumbers(result); // Set game numbers from server response
      setData(true); // Show the game number dropdown
    } catch (error) {
      console.error("Error fetching game numbers:", error);
    }
  };

  const gameNoChange = async (event) => {
    const gameNo = event.target.value;
    setGameStatus(gameNo); // Update ticketStatus state
    if (gameNo === "-1") {
      setBatchData(false);
      setBatchNumbers([]);
      return;
    }
    try {
      // Call server API with the selected ticketStatus
      const response = await api.get(
        `/generateGameData?gameNo=${gameNo}&ticketStatus=${ticketStatus}`
      );
      const result = response.data.data;
      setBatchNumbers(result); // Set game numbers from server response
      setBatchData(true); // Show the game number dropdown
    } catch (error) {
      console.error("Error fetching batch numbers:", error);
    }
  };
  const handlebatch = async (event) => {
    const batchNo = event.target.value;
    setBatchStatus(batchNo); // Update Status state
    return;
  };
  const handleGenerateClick = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to continue with the Generate ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Generate",
      cancelButtonText: "No, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // If user clicks "Yes", you can proceed with the download logic
        const generateResponse = await api.get(
          `/generateAllData?gameNo=${gameStatus}&batchNo=${batchStatus}`
        );
        if (generateResponse.data.data === "success") {
          // Show success alert if the response is successful
          Swal.fire({
            title: "Success!",
            text: "Data generated successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
          console.log(generateResponse.data);
        } else {
          // Handle failure case if needed
          Swal.fire({
            title: "Error!",
            text: "There was an issue with the data generation.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } else {
        // If user clicks "No", do nothing
        console.log("Generation Cancel.");
      }
    });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md w-3/4">
        <div className="mb-6 border-b pb-4">
          <h4 className="text-lg font-medium">Required Information</h4>
        </div>

        <div id="game-status-div" className="mb-6">
          <div className="mb-2">
            <label
              htmlFor="ticketStatus"
              className="block text-sm font-medium text-gray-700"
            >
              Select Ticket Status
            </label>
          </div>
          <div id="show-ticket-status-div">
            <select
              name="ticketStatus"
              id="ticketStatus"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={ticketStatus} // Controlled select, bound to ticketStatus state
              onChange={handleTicketStatusChange}
            >
              <option value="Initiated">Initiated</option>
              <option value="Generated">Generated</option>
            </select>
          </div>
        </div>

        {data ? (
          <div id="game-number-div" className="mb-6">
            <div className="mb-2">
              <label
                htmlFor="gameNo"
                className="block text-sm font-medium text-gray-700"
              >
                Select Game Number
              </label>
            </div>
            <div id="show-game-number-div">
              <select
                name="gameNo"
                id="gameNo"
                onChange={gameNoChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="-1">--Please Select--</option>
                {gameNumbers.map((game, index) => (
                  <option key={index} value={game}>
                    {game}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : null}

        {batchData ? (
          <div id="game-number-div" className="mb-6">
            <div className="mb-2">
              <label
                htmlFor="gameNo"
                className="block text-sm font-medium text-gray-700"
              >
                Select Batch Number
              </label>
            </div>
            <div id="show-game-number-div">
              <select
                name="batchNo"
                id="batchNo"
                onChange={handlebatch}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="-1">--Please Select--</option>
                {batchNumbers.map((game, index) => (
                  <option key={index} value={game}>
                    {game}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : null}
        {/* Add Generate button below batch number section */}
        {batchData ? (
          <div className="flex justify-center">
            <button
              onClick={handleGenerateClick}
              className="px-4 py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Generate
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
