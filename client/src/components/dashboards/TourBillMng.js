import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTourBills } from "../../redux/features/tourBillSlice";
import Spinner from "../common/Spinner";
import SideNav from "./SideNav";

function TourBillMng() {
  const { tourBills, loading } = useSelector((state) => ({
    ...state.tourBill,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTourBills());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Số lượng mục trên mỗi trang

  if (loading) {
    return <Spinner />;
  }

  const totalPages = Math.ceil(tourBills.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTourBills = tourBills.slice(startIndex, endIndex);

  return (
    <div className="container mt-3 pt-5 mb-3">
      <div className="row g-5">
        <SideNav />

        <div className="col-xl-9 shadow pb-3">
          <h1 className="text-center pt-5 pb-3">TOUR BILL MANAGEMENT</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tour</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Giá</th>
                <th scope="col">Giảm giá</th>
                <th scope="col">Tổng tiền</th>
                <th scope="col">Người đặt</th>
                <th scope="col">Số điện thoại</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTourBills.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{startIndex + index + 1}</th>
                  <td>{item.tourTitle}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price} vnđ/vé</td>
                  <td>{item.discount}%</td>
                  <td>{item.totalPrice}</td>
                  <td>{item.userName}</td>
                  <td>{item.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Hiển thị thanh phân trang */}
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

export default TourBillMng;
