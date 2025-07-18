import React, { useEffect, useState } from "react";
import danhSachGhe from "./danhSachGhe.json"; // Đảm bảo bạn đặt đúng đường dẫn file

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [userName, setUserName] = useState("");
  const [seatCount, setSeatCount] = useState();

  const toggleSeat = (seat) => {
    if (seat.daDat) return; // Không cho chọn ghế đã đặt
    if (selectedSeats.find((s) => s.soGhe === seat.soGhe)) {
      setSelectedSeats(selectedSeats.filter((s) => s.soGhe !== seat.soGhe));
    } else {
      if (selectedSeats.length < seatCount) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">MOVIE SEAT SELECTION</h1>

      {/* Input Thông Tin */}
      <div className="w-full max-w-xl mb-4">
        <label className="block text-sm mb-1">Name *</label>
        <input
          className="w-full p-2 text-white mb-3"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label className="block text-sm mb-1">Number of Seats *</label>
        <input
          type="number"
          className="w-full p-2 text-black"
          min="1"
          max="12"
          value={seatCount}
          onChange={(e) => setSeatCount(Number(e.target.value))}
        />
      </div>

      {/* Sơ Đồ Ghế */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-xl">
        {danhSachGhe.map((row, index) => (
          <div key={index} className="flex mb-2 items-center">
            {row.hang && <span className="w-6 mr-2">{row.hang}</span>}
            <div className="grid grid-cols-12 gap-1 w-full">
              {row.danhSachGhe.map((seat) => {
                const isSelected = selectedSeats.find(
                  (s) => s.soGhe === seat.soGhe
                );
                return (
                  <button
                    key={seat.soGhe}
                    onClick={() => toggleSeat(seat)}
                    className={`h-8 rounded text-xs ${
                      seat.daDat
                        ? "bg-red-500 cursor-not-allowed"
                        : isSelected
                        ? "bg-green-500"
                        : "border border-yellow-500"
                    }`}
                  >
                    {seat.soGhe.replace(row.hang, "")}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Ghi chú */}
        <div className="flex justify-between text-sm mt-4">
          <div>
            <span className="inline-block w-4 h-4 bg-green-500 mr-2" />
            Selected
          </div>
          <div>
            <span className="inline-block w-4 h-4 bg-red-500 mr-2" />
            Reserved
          </div>
          <div>
            <span className="inline-block w-4 h-4 border border-yellow-500 mr-2" />
            Empty
          </div>
        </div>
      </div>

      {/* Thông tin xác nhận */}
      <div className="bg-white text-black mt-6 p-4 rounded w-full max-w-md">
        <h2 className="text-lg font-bold">Confirm Selection</h2>
        <div className="flex justify-between border-t pt-2">
          <div>{userName || "N/A"}</div>
          <div>{selectedSeats.length} seat(s)</div>
        </div>
        <div className="mt-2 text-sm">
          Seats: {selectedSeats.map((s) => s.soGhe).join(", ")}
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
