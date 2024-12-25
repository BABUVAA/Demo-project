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
  const [download, setDownload] = useState(false);
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
          noOfTickets: games[0].noOfTickets,
          gameName: games[0].gameName,
          gameNO: games[0].gameNo,
          no_Of_Tickets_Per_Book: "50",
          no_Of_Books_Per_Pack: "20",
          noOfticketsInFile: games[0].noOfTickets,
          batchNo: games[0].batchNo,
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
  const handleDownload = async (fileNametoDownload, fileName) => {
    console.log("downloading file");
    dispatch(loadingActions.setLoading(true));
    try {
      // Step 1: Call backend to get the download URL
      const response = await api.get("/downloadFile", {
        params: { fileNametoDownload },
      });

      if (response && response.data.downloadUrl) {
        // Step 2: Extract the download URL from the backend response
        const downloadUrl = response.data.downloadUrl;

        console.log(downloadUrl);
        // Step 3: Make a GET request to download the file from the server
        const fileResponse = await api.get(downloadUrl, {
          responseType: "blob", // Ensure the response is treated as binary data (blob)
        });
        console.log;

        console.log(fileResponse);
        if (fileResponse.status === 200) {
          console.log("downloadinggg");
          // Step 4: Create a Blob from the file response
          const blob = fileResponse.data;

          // Step 5: Create an <a> element to trigger the download
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob); // Create a temporary URL for the blob
          link.download = fileName; // The filename to be used for the download

          // Step 6: Trigger the download
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link); // Clean up the DOM
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
    // Trigger the download
    const fileNametoDownload = filePath;
    const fileNametoDownload2 = ""; // Example for VIRN file, adjust based on logic
    handleDownload(fileNametoDownload, fileName);
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
    <>
      {globalLoading || loading ? (
        <LoadingSpinner />
      ) : (
        <div className="p-6 bg-gray-100 w-full">
          <div className="mt-8">
            <div className="greyStrip p-4 w-full flex justify-center">
              <h2 className="text-2xl font-semibold mb-4">Available Games</h2>
            </div>
            <div className="innerBox bg-white p-6 rounded-lg shadow-lg">
              <table className="w-full table-auto">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 text-center">S.No</th>
                    <th className="py-2 text-center">Game Name</th>
                    <th className="py-2 text-center">Game No</th>
                    <th className="py-2 text-center">Batch No</th>
                    <th className="py-2 text-center">Ticket Cost</th>
                    <th className="py-2 text-center">Total Ticket QTY</th>
                    <th className="py-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {games.length > 0 ? (
                    games.map((gameItem, index) => (
                      <tr key={gameItem.gameNo}>
                        <td className="text-center py-2">{index + 1}</td>
                        <td className="text-center py-2">
                          {gameItem.gameName}
                        </td>
                        <td className="text-center py-2">{gameItem.gameNo}</td>
                        <td className="text-center py-2">{gameItem.batchNo}</td>
                        <td className="text-center py-2">
                          {gameItem.ticketCost}
                        </td>
                        <td className="text-center py-2">
                          {gameItem.noOfTickets}
                        </td>
                        <td className="text-center py-2">
                          {gameItem.status === "Initiated"
                            ? "Uploaded"
                            : gameItem.status}
                        </td>
                        {gameItem.status === "Initiated" ? (
                          <td className=" flex  text-center py-2">
                            <Link
                              to="generateData"
                              className="text-blue-600 hover:text-blue-800"
                              onClick={handleGenerateClick}
                            >
                              <RiAiGenerate size={30}></RiAiGenerate>
                            </Link>
                            <label>Generate</label>
                          </td>
                        ) : (
                          <td className=" inline-block text-center py-2">
                            <Link
                              to=""
                              onClick={() => handleDownloadClick()}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <FaDownload size={30} />
                            </Link>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center py-4">
                        {error || "No results found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {download ? (
            <>
              <div className="FormSection block" id="downlaod_data">
                <div className="greyStrip p-4 w-full flex justify-center">
                  <h2 className="text-2xl font-semibold mb-4">
                    Test Ready Data
                  </h2>
                </div>
                <div className="innerBox bg-white p-6 rounded-lg shadow-lg">
                  <div id="DownloadFilesList">
                    <form
                      id="download"
                      name="download"
                      action="/WeaverBO/com/stpl/pms/action/bo/gl/st_download_game_downloadFile.action"
                      method="post"
                    >
                      <table className="min-w-full table-auto border-collapse">
                        <thead>
                          <tr className="text-center bg-gray-100 border-b">
                            <th className="px-4 py-2">Ticket Range</th>
                            <th className="px-4 py-2">Ticket Text File</th>
                            <th className="px-4 py-2">Ticket VIRN File</th>
                          </tr>
                        </thead>
                        <tbody>
                          {downloadData.data.map((item, index) => (
                            <tr key={index} className="text-center border-b">
                              <td className="px-4 py-2">{item.TicketRange}</td>
                              <td className="px-4 py-2">
                                <a
                                  href="#"
                                  onClick={() =>
                                    clickme(
                                      item.files.textFile.link,
                                      item.files.textFile.fileName
                                    )
                                  }
                                >
                                  {item.files.textFile.filename}
                                </a>
                                <input
                                  type="hidden"
                                  name="fileNametoDownlaod"
                                  value=""
                                  id="fileNametoDownlaod"
                                />
                              </td>
                              <td className="px-4 py-2">
                                <a
                                  href="#"
                                  onClick={() =>
                                    clickme(
                                      item.files.virnFile.link,
                                      item.files.virnFile.filename
                                    )
                                  }
                                >
                                  {item.files.virnFile.filename}
                                </a>
                                <input
                                  type="hidden"
                                  name="fileNametoDownlaod"
                                  value=""
                                  id="fileNametoDownlaod"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="flex justify-between mt-4">
                        <div className="text-sm">
                          <label
                            htmlFor="subReportTable1_length"
                            className="font-medium"
                          >
                            Show
                          </label>
                          <select
                            id="subReportTable1_length"
                            className="border border-gray-300 rounded p-2"
                          >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="10000">10000</option>
                          </select>
                          <span className="ml-2">entries</span>
                        </div>
                        <div className="text-sm">
                          <label htmlFor="search" className="font-medium">
                            Search:
                          </label>
                          <input
                            id="search"
                            type="search"
                            className="border border-gray-300 rounded p-2"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <div className="text-sm">
                          Showing 1 to 1 of 1 entries
                        </div>
                        <div className="text-sm flex space-x-2">
                          <a
                            href="#"
                            className="text-blue-600 disabled cursor-not-allowed"
                          >
                            Previous
                          </a>
                          <span className="text-blue-600">1</span>
                          <a
                            href="#"
                            className="text-blue-600 disabled cursor-not-allowed"
                          >
                            Next
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* <div className="FormSection block" id="downlaod_data_testFiles">
          <div className="greyStrip p-4 w-full flex justify-center">
            <h2 className="text-2xl font-semibold mb-4">Test Reports</h2>
          </div>
          <div className="innerBox bg-white p-6 rounded-lg shadow-lg">
            <div id="DownloadTestFilesList">
              <form
                id="download"
                name="download"
                action="/WeaverBO/com/stpl/pms/action/bo/gl/st_download_game_downloadFile.action"
                method="post"
              >
                <table className="min-w-full table-auto border-collapse">
                  <thead>
                    <tr className="text-center bg-gray-100 border-b">
                      <th className="px-4 py-2">Pack File</th>
                      <th className="px-4 py-2">Book File</th>
                      <th className="px-4 py-2">Prize Pattern File</th>
                      <th className="px-4 py-2">Consecutive Pattern File</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center border-b">
                      <td className="px-4 py-2">
                        <a
                          href="javascript:;"
                          onclick="clickme('/home/devops/jboss-4.2.3.GA/server/default/./deploy/WeaverBO-1.0.9-SNAPSHOT.war/100/TextFiles/100_1_24-12-24_PackTesting.xls')"
                        >
                          PackTesting.xls
                        </a>
                        <input
                          type="hidden"
                          name="fileNametoDownlaod"
                          value=""
                          id="fileNametoDownlaod"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <a
                          href="javascript:;"
                          onclick="clickme('/home/devops/jboss-4.2.3.GA/server/default/./deploy/WeaverBO-1.0.9-SNAPSHOT.war/100/TextFiles/100_1_24-12-24_BookTesting.xls')"
                        >
                          BookTesting.xls
                        </a>
                        <input
                          type="hidden"
                          name="fileNametoDownlaod"
                          value=""
                          id="fileNametoDownlaod"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <a
                          href="javascript:;"
                          onclick="clickme('/home/devops/jboss-4.2.3.GA/server/default/./deploy/WeaverBO-1.0.9-SNAPSHOT.war/100/TextFiles/100_1_24-12-24_PrizePatternTesting.xls')"
                        >
                          PrizePatternTesting.xls
                        </a>
                        <input
                          type="hidden"
                          name="fileNametoDownlaod"
                          value=""
                          id="fileNametoDownlaod"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <a
                          href="javascript:;"
                          onclick="clickme('/home/devops/jboss-4.2.3.GA/server/default/./deploy/WeaverBO-1.0.9-SNAPSHOT.war/100/TextFiles/100_1_24-12-24_ConsWinTesting.xls')"
                        >
                          ConsecutivePatternTesting.xls
                        </a>
                        <input
                          type="hidden"
                          name="fileNametoDownlaod"
                          value=""
                          id="fileNametoDownlaod"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div> */}
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export default SearchGames;
