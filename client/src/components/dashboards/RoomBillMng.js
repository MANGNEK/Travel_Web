import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomBills } from "../../redux/features/roomBillSlice";
import Spinner from "../common/Spinner";
import SideNav from "./SideNav";

function RoomBillMng() {
  const { roomBills, loading } = useSelector((state) => ({
    ...state.roomBill,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomBills());
  }, []);

  // Đặt useState ở đầu component
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) {
    return <Spinner />;
  }

  const itemsPerPage = 10;
  const totalPages = Math.ceil(roomBills.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRoomBills = roomBills.slice(startIndex, endIndex);

  return (
    <div className="container mt-3 pt-5 mb-3">
      <div className="row g-5">
        <SideNav />

        <div className="col-xl-9 col-12 shadow pb-3">
          <h1 className="text-center pt-5 pb-3">ROOM BILL MANAGEMENT</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Phòng</th>
                <th scope="col">Ngày nhận phòng</th>
                <th scope="col">Ngày trả phòng</th>
                <th scope="col">Giá</th>
                <th scope="col">Giảm giá</th>
                <th scope="col">Tổng tiền</th>
                <th scope="col">Người đặt</th>
                <th scope="col">Số điện thoại</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRoomBills.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{startIndex + index + 1}</th>
                  <td>{item.roomNumber}</td>
                  <td>{new Date(item.checkInDate).toLocaleDateString()}</td>
                  <td>{new Date(item.checkOutDate).toLocaleDateString()}</td>
                  <td>{item.price} vnđ/vé</td>
                  <td>{item.discount}%</td>
                  <td>{item.totalPrice}</td>
                  <td>{item.userName}</td>
                  <td>{item.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default RoomBillMng;
