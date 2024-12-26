import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadingActions } from "../store/loadingSlice";
import { downloadGame, fetchGames } from "../store/gameSlice";
import Swal from "sweetalert2"; // Import SweetAlert2
import LoadingSpinner from "../components/common/LoadingSpinner";
import { FaDownload } from "react-icons/fa";
import api from "../api/axiosApi";
import { RiAiGenerate } from "react-icons/ri";

const SearchGames = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(""); // State to store error message
  const { games, downloadData, loading } = useSelector((store) => store.game);
  const globalLoading = useSelector((store) => {
    store.loading;
  });

  useEffect(() => {
    try {
      dispatch(loadingActions.setLoading(true));
      const gameData = {
        userName: "",
        gameName: "",
        gameNO: "",
        ticketPrize: "",
      };
      // Make API request to your backend
      dispatch(fetchGames(gameData));
    } catch (err) {
      console.error("Error during search:", err);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      dispatch(loadingActions.setLoading(false)); // Reset loading state
    }
  }, []);

  return (
    <>
      {globalLoading || loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {error && (
            <div className=" bg-white p-6 rounded-lg shadow-lg w-full">
              <div className="text-left text-red-600 font-semibold">
                {error || "An error occurred. Please try again later."}
              </div>
            </div>
          )}

          <div className="p-2 md:p-6 bg-gray-100 w-full">
            <AvailableGamesTable games={games} />
            {downloadData ? <FileTable downloadData={downloadData} /> : ""}
          </div>
        </>
      )}
    </>
  );
};

export default SearchGames;

const AvailableGamesTable = (games) => {
  const dispatch = useDispatch();
  //Handle Generation
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
          `/generateAllData?gameNo=${games[0].gameNo}&batchNo=${games[0].batchNo}`
        );
        if (generateResponse.data.data === "success") {
          // Show success alert if the response is successful
          Swal.fire({
            title: "Success!",
            text: "Data generated successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
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
  // Handle Download Click - Show confirmation popup
  const handleDownloadClick = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to continue with the download ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Download",
      cancelButtonText: "No, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const downloadData = {
          noOfTickets: games.games[0].noOfTickets,
          gameName: games.games[0].gameName,
          gameNO: games.games[0].gameNo,
          no_Of_Tickets_Per_Book: "50",
          no_Of_Books_Per_Pack: "20",
          noOfticketsInFile: games.games[0].noOfTickets,
          batchNo: games.games[0].batchNo,
        };
        // If user clicks "Yes", you can proceed with the download logic
        const downloadResponse = await dispatch(downloadGame(downloadData));
        if (downloadResponse) {
          setDownload(true);
        }
        // Implement your download logic here
      } else {
        // If user clicks "No", do nothing
        console.log("Download canceled.");
      }
    });
  };
  return (
    <div className=" bg-white p-2 md:p-6 rounded-lg shadow-lg ">
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gradient-to-r from-gray-200 to-gray-300">
            <tr>
              <th className="py-3 md:px-4 px-1 text-center font-semibold">
                S.No
              </th>
              <th className="py-3 md:px-4 px-1 text-center font-semibold">
                Game Name
              </th>
              <th className="py-3 md:px-4 px-1 text-center font-semibold">
                Game No
              </th>
              <th className="py-3 md:px-4 px-1 text-center font-semibold">
                Batch No
              </th>
              <th className="py-3 md:px-4 px-1 text-center font-semibold">
                Ticket Cost
              </th>
              <th className="py-3 md:px-4 px-1 text-center font-semibold">
                Total Ticket QTY
              </th>
              <th className="py-3 md:px-4 px-1 text-center font-semibold">
                Status
              </th>
              <th className="py-3 md:px-4 px-1 text-center font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {games.games.length > 0 ? (
              games.games.map((gameItem, index) => (
                <tr
                  key={gameItem.gameNo}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition-colors`}
                >
                  <td className="text-center py-3 md:px-4 px-1">{index + 1}</td>
                  <td className="text-center py-3 md:px-4 px-1">
                    {gameItem.gameName}
                  </td>
                  <td className="text-center py-3 md:px-4 px-1">
                    {gameItem.gameNo}
                  </td>
                  <td className="text-center py-3 md:px-4 px-1">
                    {gameItem.batchNo}
                  </td>
                  <td className="text-center py-3 md:px-4 px-1">
                    {" "}
                    {gameItem.ticketCost}
                  </td>
                  <td className="text-center py-3 md:px-4 px-1">
                    {gameItem.noOfTickets}
                  </td>
                  <td className="text-center py-3 md:px-4 px-1">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        gameItem.status === "Initiated"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {gameItem.status === "Initiated"
                        ? "Uploaded"
                        : gameItem.status}
                    </span>
                  </td>
                  <td className="text-center py-3 md:px-4 px-1">
                    {gameItem.status === "Initiated" ? (
                      <button
                        onClick={handleGenerateClick}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                      >
                        <RiAiGenerate size={24} />
                        <span className="hidden md:inline">Generate</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleDownloadClick}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                      >
                        <FaDownload size={24} />
                        <span className="hidden md:inline">Download</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  {"No results found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const FileTable = (downloadData) => {
  const dispatch = useDispatch();

  const handleDownload = async (fileNametoDownload, fileName) => {
    dispatch(loadingActions.setLoading(true));
    try {
      const response = await api.get("/downloadFile", {
        params: { fileNametoDownload },
      });

      if (response && response.data.downloadUrl) {
        const downloadUrl = response.data.downloadUrl;
        const fileResponse = await api.get(downloadUrl, {
          responseType: "blob",
        });

        if (fileResponse.status === 200) {
          const blob = fileResponse.data;
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          throw new Error("Failed to download the file");
        }
      } else {
        throw new Error("Download URL not found in the response");
      }
    } catch (error) {
      console.error("Error during download:", error);
    }
    dispatch(loadingActions.setLoading(false));
  };

  const clickme = (filePath, fileName) => {
    handleDownload(filePath, fileName);
  };

  return (
    <div className=" bg-white p-1 md:p-6 rounded-lg shadow-lg mt-6">
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gradient-to-r from-gray-200 to-gray-300">
            <tr>
              <th className="py-3 md:px-4 px-1 text-center font-semibold">
                Ticket Range
              </th>
              <th className="py-3 md:px-4 px-1 text-center font-semibold">
                Ticket Text File
              </th>
              <th className="py-3 md:px-4 px-1 text-center font-semibold">
                Ticket VIRN File
              </th>
            </tr>
          </thead>
          <tbody>
            {downloadData.downloadData.data.length > 0 ? (
              downloadData.downloadData.data.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition-colors`}
                >
                  <td className="text-center py-3 px-4">{item.TicketRange}</td>
                  <td className="text-center py-3 px-4">
                    <Link
                      to="#"
                      onClick={() =>
                        clickme(
                          item.files.textFile.link,
                          item.files.textFile.filename
                        )
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {item.files.textFile.filename}
                    </Link>
                  </td>
                  <td className="text-center py-3 px-4">
                    <Link
                      to="#"
                      onClick={() =>
                        clickme(
                          item.files.virnFile.link,
                          item.files.virnFile.filename
                        )
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {item.files.virnFile.filename}
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No files available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
